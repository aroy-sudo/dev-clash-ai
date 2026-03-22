import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/database/mongoose';
import UserProgress from '@/database/models/user-progress.model';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDatabase();

    // Clear existing data for a clean slate
    await UserProgress.deleteMany({ userId });

    const now = new Date();
    // Helper to calculate relative dates
    const addDays = (days: number) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    // Realistic Mock Dataset
    const mockTopics = [
      // OVERDUE / URGENT (Early decay curve)
      { subject: 'Physics', topicName: 'Kinematics 2D', retentionLevel: 0, lastReviewedAt: addDays(-3), nextReviewAt: addDays(-2) },
      { subject: 'Chemistry', topicName: 'Atomic Structure', retentionLevel: 0, lastReviewedAt: addDays(-4), nextReviewAt: addDays(-3) },
      { subject: 'Mathematics', topicName: 'Complex Numbers', retentionLevel: 1, lastReviewedAt: addDays(-5), nextReviewAt: addDays(-1) },
      { subject: 'Physics', topicName: 'Laws of Motion', retentionLevel: 0, lastReviewedAt: addDays(-2), nextReviewAt: addDays(-1) },
      
      // DUE TODAY (Curve flattening opportunity)
      { subject: 'Chemistry', topicName: 'Chemical Bonding', retentionLevel: 1, lastReviewedAt: addDays(-2), nextReviewAt: now },
      { subject: 'Mathematics', topicName: 'Quadratic Equations', retentionLevel: 2, lastReviewedAt: addDays(-4), nextReviewAt: addDays(0) },
      
      // SAFE (Strong memory retention)
      { subject: 'Physics', topicName: 'Work, Energy and Power', retentionLevel: 3, lastReviewedAt: addDays(-2), nextReviewAt: addDays(4) },
      { subject: 'Chemistry', topicName: 'States of Matter', retentionLevel: 4, lastReviewedAt: addDays(-1), nextReviewAt: addDays(7) },
      { subject: 'Mathematics', topicName: 'Permutations and Combinations', retentionLevel: 5, lastReviewedAt: addDays(-2), nextReviewAt: addDays(10) },
    ];

    // Seed the database
    const seededData = await UserProgress.insertMany(
      mockTopics.map(topic => ({ ...topic, userId }))
    );

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${seededData.length} Spaced Repetition topics.`,
      topics: seededData
    });

  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
