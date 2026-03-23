import { Schema, model, models, Document } from 'mongoose';

export interface IAnswer {
  questionId: string;
  selectedOption?: string;
  timeSpentSeconds: number;
}

export interface ILearningStep {
  step: number;
  task: string;
}

export interface IPerformanceAnalysis {
  strengths: string[];
  areasForImprovement: string[];
  recommendedTopics: string[];
  learningPath: ILearningStep[];
}

export interface ITestAttempt extends Document {
  testId: Schema.Types.ObjectId;
  userId: string;
  testType: string; // 'Full', 'Custom', 'Quick Review'
  topicsCovered: string[];
  answers: IAnswer[];
  overallScore: number;
  totalQuestions: number;
  timeTaken: number;
  detailedFeedback?: string;
  performanceAnalysis: IPerformanceAnalysis;
  createdAt: Date;
  updatedAt: Date;
}

const AnswerSchema = new Schema<IAnswer>({
  questionId: { type: String, required: true },
  selectedOption: { type: String, required: false },
  timeSpentSeconds: { type: Number, required: true },
});

const LearningStepSchema = new Schema<ILearningStep>({
  step: { type: Number, required: true },
  task: { type: String, required: true },
});

const PerformanceAnalysisSchema = new Schema<IPerformanceAnalysis>({
  strengths: { type: [String], default: [] },
  areasForImprovement: { type: [String], default: [] },
  recommendedTopics: { type: [String], default: [] },
  learningPath: { type: [LearningStepSchema], default: [] },
});

const TestAttemptSchema = new Schema<ITestAttempt>({
  testId: { type: Schema.Types.ObjectId, ref: 'JeeTest', required: true },
  userId: { type: String, required: true }, // from Clerk
  testType: { type: String, default: 'Full' },
  topicsCovered: { type: [String], default: [] },
  answers: { type: [AnswerSchema], required: true },
  overallScore: { type: Number, required: true },
  totalQuestions: { type: Number, default: 0 },
  timeTaken: { type: Number, default: 0 },
  detailedFeedback: { type: String, required: false },
  performanceAnalysis: { type: PerformanceAnalysisSchema, required: true },
}, { timestamps: true });

const TestAttempt = models.TestAttempt || model<ITestAttempt>('TestAttempt', TestAttemptSchema);

export default TestAttempt;
