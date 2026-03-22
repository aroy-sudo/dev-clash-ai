import { Schema, model, models, Document } from 'mongoose';

export interface IUserProgress extends Document {
  userId: string;
  subject: string;
  topicName: string;
  retentionLevel: number;
  nextReviewAt: Date;
  lastReviewedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserProgressSchema = new Schema<IUserProgress>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      enum: ['Physics', 'Chemistry', 'Mathematics'], // Based on provided examples
    },
    topicName: {
      type: String,
      required: [true, 'Topic name is required'],
    },
    retentionLevel: {
      type: Number,
      default: 0,
    },
    nextReviewAt: {
      type: Date,
      required: [true, 'Next review date is required'],
    },
    lastReviewedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for fast queries based on user and topic
UserProgressSchema.index({ userId: 1, topicName: 1 });

const UserProgress = models.UserProgress || model<IUserProgress>('UserProgress', UserProgressSchema);

export default UserProgress;
