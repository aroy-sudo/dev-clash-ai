"use server";

import { connectToDatabase } from '@/database/mongoose';
import User from '@/database/models/user.model';
import { auth } from '@clerk/nextjs/server';

export async function saveUserSyllabus(selectedSyllabus: string[]) {
  try {
    await connectToDatabase();
    const { userId } = await auth();
    
    if (!userId) {
      throw new Error("Unauthorized");
    }

    let user = await User.findOne({ userId });
    
    if (user) {
      user.selectedSyllabus = selectedSyllabus;
      await user.save();
    } else {
      user = await User.create({
        userId,
        selectedSyllabus,
        weakTopics: []
      });
    }

    return { success: true, user: JSON.parse(JSON.stringify(user)) };
  } catch (error: any) {
    console.error("Error saving user syllabus:", error);
    return { success: false, message: error.message || "Failed to save syllabus" };
  }
}
