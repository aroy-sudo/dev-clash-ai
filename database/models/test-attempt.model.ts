import { Schema, model, models, Document } from 'mongoose';

export interface IAnswer {
  questionId: string;
  selectedOption: string;
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
  answers: IAnswer[];
  overallScore: number;
  performanceAnalysis: IPerformanceAnalysis;
  createdAt: Date;
  updatedAt: Date;
}

const AnswerSchema = new Schema<IAnswer>({
  questionId: { type: String, required: true },
  selectedOption: { type: String, required: true },
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
  answers: { type: [AnswerSchema], required: true },
  overallScore: { type: Number, required: true },
  performanceAnalysis: { type: PerformanceAnalysisSchema, required: true },
}, { timestamps: true });

const TestAttempt = models.TestAttempt || model<ITestAttempt>('TestAttempt', TestAttemptSchema);

export default TestAttempt;
