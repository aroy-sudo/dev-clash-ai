"use server";

import { connectToDatabase } from "@/database/mongoose";
import UserProgress from "@/database/models/user-progress.model";
import { GoogleGenAI, Type, Schema } from '@google/genai';
import { revalidatePath } from "next/cache";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

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

    const responseSchema: Schema = {
      type: Type.ARRAY,
      description: "List of 5 retention test questions",
      items: {
        type: Type.OBJECT,
        properties: {
          questionText: { type: Type.STRING },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          correctAnswer: { type: Type.STRING },
          subject: { type: Type.STRING },
          topic: { type: Type.STRING },
          conceptWeightage: { type: Type.NUMBER }
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

    const json = JSON.parse(response.text || "[]");
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
