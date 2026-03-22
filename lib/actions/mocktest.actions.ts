"use server";

import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { connectToDatabase } from '@/database/mongoose';
import JeeTest from '@/database/models/jee-test.model';
import TestAttempt from '@/database/models/test-attempt.model';
import UserProgress from '@/database/models/user-progress.model';
import { auth } from '@clerk/nextjs/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function generateMockTest(params: {
  examType: string;
  difficulty: string;
  subjects: string[];
  focusOnMistakes?: boolean;
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

    const { examType, difficulty, subjects, focusOnMistakes } = params;
    
    // Limit to 15 questions to ensure prompt processing is reasonably fast for demo
    const noOfQuestions = examType === 'Mains' ? 15 : 10; 

    let mistakeContext = "";
    if (focusOnMistakes && userId !== 'anonymous') {
      const pastAttempts = await TestAttempt.find({ userId }).sort({ createdAt: -1 }).limit(3).lean();
      const improvements = pastAttempts.flatMap((a: any) => a.performanceAnalysis?.areasForImprovement || []);
      const uniqueImprovements = [...new Set(improvements)];
      if (uniqueImprovements.length > 0) {
        mistakeContext = `\nCRITICAL INSTRUCTION: The user has explicitly requested to focus on their past mistakes. They often struggle with the following topics: ${uniqueImprovements.join(', ')}. Please weigh the generated questions heavily towards testing these specific topics and their closely related concepts.`;
      }
    }

    const prompt = `Act as an expert JEE paper setter. Generate a realistic, syllabus-accurate JEE mock test.
Exam Type: ${examType}
Difficulty: ${difficulty}
Subjects Included: ${subjects.join(', ')}
${mistakeContext}

Please generate ${noOfQuestions} distinct questions reflecting the mix of these subjects. Ensure that the questions match the exact difficulty level specified. Provide exact details.`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.ARRAY,
          description: "List of JEE mock test questions",
          items: {
            type: SchemaType.OBJECT,
            properties: {
              questionText: { type: SchemaType.STRING, description: "The full question text including any required context or formula." },
              options: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING },
                description: "Exactly 4 options for the question."
              },
              correctAnswer: { type: SchemaType.STRING, description: "The correct option text, matching exactly one of the options." },
              subject: { type: SchemaType.STRING, description: "The subject this question belongs to (e.g., Physics, Chemistry, Math)." },
              topic: { type: SchemaType.STRING, description: "The specific topic from the JEE syllabus." },
              conceptWeightage: { type: SchemaType.NUMBER, description: "A weightage score between 1 and 10 indicating concept importance." }
            },
            required: ["questionText", "options", "correctAnswer", "subject", "topic", "conceptWeightage"]
          }
        },
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text() || "[]";
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

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            strengths: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
            areasForImprovement: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
            recommendedTopics: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
            learningPath: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  step: { type: SchemaType.NUMBER },
                  task: { type: SchemaType.STRING }
                },
                required: ["step", "task"]
              }
            }
          },
          required: ["strengths", "areasForImprovement", "recommendedTopics", "learningPath"]
        },
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const performanceAnalysis = JSON.parse(response.text() || "{}");

    // Save attempt
    const newAttempt = await TestAttempt.create({
      testId,
      userId,
      answers,
      overallScore,
      performanceAnalysis
    });

    // Check if this was a Spaced Repetition test
    if (test.examType === 'RETENTION_REVIEW' && test.questions.length > 0) {
      // A 5-question test. If they got 3 or more right (12+ points), their memory is strong.
      const isStrongRecall = overallScore >= 12; 
      const topicName = test.questions[0].topic; // All questions are from the same topic
      
      const progress = await UserProgress.findOne({ userId, topicName });
      if (progress) {
        if (isStrongRecall) {
          progress.retentionLevel = (progress.retentionLevel || 0) + 1;
          const daysToAdd = progress.retentionLevel * 2;
          progress.nextReviewAt = new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000);
        } else {
          progress.retentionLevel = 0;
          progress.nextReviewAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Tomorrow
        }
        progress.lastReviewedAt = new Date();
        await progress.save();
      }
    }

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
