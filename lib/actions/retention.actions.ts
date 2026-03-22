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
    const prompt = `You are a JEE tutor. Generate a 5-question multiple-choice test at a ${difficulty} difficulty. 
    The questions MUST strictly cover only these topics: ${dueTopics.join(', ')}. 
    Do not hallucinate constants. Ensure exact syllabus accuracy.`;

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

    const questions = JSON.parse(response.text || "[]");
    return { success: true, questions };
  } catch (error: any) {
    console.error("Error generating retention test:", error);
    return { success: false, message: error.message };
  }
}

/**
 * Updates the forgetting curve parameters based on test results.
 * 
 * Correct: retentionLevel++, nextReviewAt = now + (retentionLevel * 2 days)
 * Incorrect: retentionLevel = 0, nextReviewAt = now + 24 hours
 * 
 * @param userId - The Clerk user ID
 * @param topicScores - Results per topic
 */
export async function updateForgettingCurve(
  userId: string, 
  topicScores: { topicName: string, isCorrect: boolean }[]
) {
  try {
    await connectToDatabase();

    const updatePromises = topicScores.map(async (score) => {
      const topic = await UserProgress.findOne({ userId, topicName: score.topicName });
      if (!topic) return;

      let newRetentionLevel = 0;
      let nextReviewAt = new Date();

      if (score.isCorrect) {
        newRetentionLevel = (topic.retentionLevel || 0) + 1;
        // Interval expansion logic: Level 1 -> 2 days, Level 2 -> 4 days, etc.
        const daysToAdd = newRetentionLevel * 2;
        nextReviewAt = new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000);
      } else {
        newRetentionLevel = 0;
        // Reset to 24 hours for immediate reinforcement
        nextReviewAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
      }

      return UserProgress.updateOne(
        { _id: topic._id },
        {
          $set: {
            retentionLevel: newRetentionLevel,
            nextReviewAt: nextReviewAt,
            lastReviewedAt: new Date(),
          }
        }
      );
    });

    await Promise.all(updatePromises);
    revalidatePath("/hub");
    
    return { success: true };
  } catch (error: any) {
    console.error("Error updating forgetting curve:", error);
    return { success: false, message: error.message };
  }
}
