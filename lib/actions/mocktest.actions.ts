"use server";

import { GoogleGenAI, Type, Schema } from '@google/genai';
import { connectToDatabase } from '@/database/mongoose';
import JeeTest from '@/database/models/jee-test.model';
import TestAttempt from '@/database/models/test-attempt.model';
import { auth } from '@clerk/nextjs/server';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

export async function generateMockTest(params: {
  examType: string;
  difficulty: string;
  subjects: string[];
}) {
  try {
    await connectToDatabase();

    let userId = 'anonymous';
    try {
      const { userId: clerkUserId } = await auth();
      if (clerkUserId) userId = clerkUserId;
    } catch(e) {
      console.log('Clerk Auth error/missing. Falling back to anonymous user.');
    }

    const { examType, difficulty, subjects } = params;
    
    // Limit to 15 questions to ensure prompt processing is reasonably fast for demo
    const noOfQuestions = examType === 'Mains' ? 15 : 10; 

    const prompt = `Act as an expert JEE paper setter. Generate a realistic, syllabus-accurate JEE mock test.
Exam Type: ${examType}
Difficulty: ${difficulty}
Subjects Included: ${subjects.join(', ')}

Please generate ${noOfQuestions} distinct questions reflecting the mix of these subjects. Ensure that the questions match the exact difficulty level specified. Provide exact details.`;

    const responseSchema: Schema = {
      type: Type.ARRAY,
      description: "List of JEE mock test questions",
      items: {
        type: Type.OBJECT,
        properties: {
          questionText: { type: Type.STRING, description: "The full question text including any required context or formula." },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Exactly 4 options for the question."
          },
          correctAnswer: { type: Type.STRING, description: "The correct option text, matching exactly one of the options." },
          subject: { type: Type.STRING, description: "The subject this question belongs to (e.g., Physics, Chemistry, Math)." },
          topic: { type: Type.STRING, description: "The specific topic from the JEE syllabus." },
          conceptWeightage: { type: Type.NUMBER, description: "A weightage score between 1 and 10 indicating concept importance." }
        },
        required: ["questionText", "options", "correctAnswer", "subject", "topic", "conceptWeightage"]
      }
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      }
    });

    const jsonText = response.text || "[]";
    const questions = JSON.parse(jsonText);

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("Failed to generate correct questions format from AI.");
    }

    const newTest = await JeeTest.create({
      userId,
      examType,
      difficulty,
      questions
    });

    return { success: true, testId: newTest._id.toString() };
  } catch (error: any) {
    console.error("Error generating mock test:", error);
    return { success: false, message: error.message || "Failed to generate mock test" };
  }
}

export async function evaluateAndAnalyzeTest(data: { testId: string, answers: { questionId: string, selectedOption: string, timeSpentSeconds: number }[] }) {
  try {
    await connectToDatabase();
    
    let userId = 'anonymous';
    try {
      const { userId: clerkUserId } = await auth();
      if (clerkUserId) userId = clerkUserId;
    } catch(e) { }

    const { testId, answers } = data;

    // Fetch the original test to compare answers
    const test = await JeeTest.findById(testId);
    if (!test) throw new Error("Test not found");

    let overallScore = 0;
    const evaluationData: any[] = [];

    // Calculate score and build detailed data for AI
    for (const testQuestion of test.questions) {
      const userAnswer = answers.find(a => a.questionId === testQuestion._id.toString());
      
      let isCorrect = false;
      let isAttempted = false;

      if (userAnswer && userAnswer.selectedOption) {
        isAttempted = true;
        if (userAnswer.selectedOption === testQuestion.correctAnswer) {
          isCorrect = true;
          overallScore += 4;
        } else {
          overallScore -= 1;
        }
      }

      evaluationData.push({
        topic: testQuestion.topic,
        subject: testQuestion.subject,
        difficulty: test.difficulty,
        isCorrect,
        isAttempted,
        timeSpentSeconds: userAnswer ? userAnswer.timeSpentSeconds : 0
      });
    }

    // Call Gemini for analysis
    const prompt = `Analyze this JEE mock test performance.
Overall Score: ${overallScore} out of ${test.questions.length * 4}.
Detailed Performance per Question:
${JSON.stringify(evaluationData, null, 2)}

Provide a detailed structured analysis containing:
1. strengths (List of topics/subjects the student is exceptionally good at, considering correctness and speed).
2. areasForImprovement (List of topics/subjects the student needs to improve based on incorrect answers or high time spent).
3. recommendedTopics (Next immediate topics they should study).
4. learningPath (A sequential list of actionable steps).
`;

    const responseSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
        areasForImprovement: { type: Type.ARRAY, items: { type: Type.STRING } },
        recommendedTopics: { type: Type.ARRAY, items: { type: Type.STRING } },
        learningPath: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              step: { type: Type.NUMBER },
              task: { type: Type.STRING }
            },
            required: ["step", "task"]
          }
        }
      },
      required: ["strengths", "areasForImprovement", "recommendedTopics", "learningPath"]
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: responseSchema,
        }
    });

    const performanceAnalysis = JSON.parse(response.text || "{}");

    // Save attempt
    const newAttempt = await TestAttempt.create({
      testId,
      userId,
      answers,
      overallScore,
      performanceAnalysis
    });

    return { success: true, attemptId: newAttempt._id.toString() };
  } catch(error: any) {
    console.error("Evaluation error:", error);
    return { success: false, message: error.message };
  }
}

export async function getTestById(testId: string) {
  try {
    await connectToDatabase();
    const test = await JeeTest.findById(testId).lean();
    if (!test) return { success: false, message: "Test not found" };

    const serializedQuestions = test.questions.map((q: any) => ({
      _id: q._id.toString(),
      questionText: q.questionText,
      options: q.options,
      subject: q.subject,
      topic: q.topic,
      conceptWeightage: q.conceptWeightage,
    }));

    return { 
      success: true, 
      test: {
        _id: test._id.toString(),
        examType: test.examType,
        difficulty: test.difficulty,
        questions: serializedQuestions
      } 
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
