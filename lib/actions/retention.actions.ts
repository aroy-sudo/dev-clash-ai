"use server";

import { connectToDatabase } from "@/database/mongoose";
import UserProgress from "@/database/models/user-progress.model";
import JeeTest from "@/database/models/jee-test.model";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { revalidatePath } from "next/cache";


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

/**
 * Interface for the selected topic input
 */
export interface ISelectedTopic {
  subject: string;
  topicName: string;
}

/**
 * Initializes topics for a user in the spaced repetition system.
 * Sets the first review for 24 hours from now (the first steep drop in forgetting curve).
 * 
 * @param userId - The Clerk user ID
 * @param selectedTopics - Array of subject/topic objects to initialize
 * @returns Success status and message
 */
export async function initializeUserTopics(
  userId: string,
  selectedTopics: ISelectedTopic[]
) {
  try {
    await connectToDatabase();

    if (!userId) {
      throw new Error("User ID is required");
    }

    const nextReviewAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Exactly 24 hours from now

    // Using Promise.all for parallel upserts
    const upsertPromises = selectedTopics.map((topic) =>
      UserProgress.findOneAndUpdate(
        { userId, topicName: topic.topicName }, // Filter
        {
          $set: {
            subject: topic.subject,
            retentionLevel: 1,
            nextReviewAt: nextReviewAt,
            lastReviewedAt: new Date(),
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      )
    );

    await Promise.all(upsertPromises);

    // Revalidate the dashboard or roadmap where this data is displayed
    revalidatePath("/hub");
    revalidatePath("/hub/roadmap");

    return { 
      success: true, 
      message: `${selectedTopics.length} topics successfully initialized for spaced repetition.` 
    };
  } catch (error: any) {
    console.error("Error initializing user topics:", error);
    return { 
      success: false, 
      message: error.message || "Failed to initialize topics." 
    };
  }
}

/**
 * Fetches all topics that are due for review (nextReviewAt <= now).
 * 
 * @param userId - The Clerk user ID
 * @returns Array of due topic documents
 */
export async function getDueTopics(userId: string) {
  try {
    await connectToDatabase();

    if (!userId) return [];

    const dueTopics = await UserProgress.find({
      userId,
      nextReviewAt: { $lte: new Date() },
    }).lean();

    // Map to plain objects for safe passing to client components if needed
    return JSON.parse(JSON.stringify(dueTopics));
  } catch (error) {
    console.error("Error fetching due topics:", error);
    return [];
  }
}

/**
 * Generates a targeted 5-question multiple-choice test for due topics.
 * 
 * @param dueTopics - Array of topic names
 * @param difficulty - Easy, Medium, or Hard
 * @returns Array of 5 Questions
 */
export async function generateRetentionTest(dueTopics: string[], difficulty: string) {
  try {
    const prompt = `You are an expert JEE tutor. Generate exactly 5 multiple-choice questions at a ${difficulty} difficulty. 
    The questions MUST strictly cover ONLY the following topics: ${dueTopics.join(', ')}. 
    Do not hallucinate physics constants. Ensure exact syllabus accuracy.`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.ARRAY,
          description: "List of 5 retention test questions",
          items: {
            type: SchemaType.OBJECT,
            properties: {
              questionText: { type: SchemaType.STRING },
              options: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING },
              },
              correctAnswer: { type: SchemaType.STRING },
              subject: { type: SchemaType.STRING },
              topic: { type: SchemaType.STRING },
              conceptWeightage: { type: SchemaType.NUMBER }
            },
            required: ["questionText", "options", "correctAnswer", "subject", "topic", "conceptWeightage"]
          }
        },
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const json = JSON.parse(response.text() || "[]");
    return { success: true, questions: json };
  } catch (error: any) {
    console.error("Error generating retention test:", error);
    return { success: false, message: error.message };
  }
}

/**
 * Updates the forgetting curve parameters based on test results (Ebbinghaus Algorithm).
 * 
 * Strong Recall (isCorrect): retentionLevel++, nextReviewInterval = level * 2 days
 * Memory Decay (!isCorrect): retentionLevel = 0, nextReviewInterval = 24 hours
 * 
 * @param userId - The Clerk user ID
 * @param testResults - Performance per topic
 */
export async function evaluateAndUpdateRetention(
  userId: string, 
  testResults: { topicName: string, isCorrect: boolean }[]
) {
  try {
    await connectToDatabase();

    for (const result of testResults) {
      const progress = await UserProgress.findOne({ userId, topicName: result.topicName });
      
      if (progress) {
        if (result.isCorrect) {
          // Strong Recall: Increment level and expand interval
          progress.retentionLevel = (progress.retentionLevel || 0) + 1;
          const daysToAdd = progress.retentionLevel * 2;
          progress.nextReviewAt = new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000);
        } else {
          // Memory Decay: Reset level and set tight interval
          progress.retentionLevel = 0;
          progress.nextReviewAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        }

        progress.lastReviewedAt = new Date();
        await progress.save();
      }
    }

    revalidatePath("/hub");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating forgetting curve:", error);
    return { success: false, message: error.message };
  }
}

/**
 * Generates a targeted 5-question review for a specific topic and saves it as a JeeTest.
 */
export async function generateTopicReview(userId: string, subject: string, topicName: string) {
  try {
    await connectToDatabase();

    const prompt = `You are an expert JEE tutor. Generate a 5-question multiple-choice test strictly covering the topic: ${topicName} in the subject: ${subject}. Do not include questions from outside this topic.`;

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
    const json = JSON.parse(response.text() || "[]");

    const newTest = await JeeTest.create({
      userId,
      examType: 'RETENTION_REVIEW',
      difficulty: 'Medium',
      questions: json
    });

    return { success: true, testId: newTest._id.toString() };
  } catch (error: any) {
    console.error("Error generating topic review:", error);
    return { success: false, message: error.message };
  }
}
