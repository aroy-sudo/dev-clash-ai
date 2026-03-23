import { Schema, model, models, Document } from 'mongoose';

export interface IQuestion {
  questionText: string;
  options: string[];
  correctAnswer: string;
  subject: string;
  topic: string;
  conceptWeightage: number;
}

export interface IJeeTest extends Document {
  userId: string;
  examType: 'Mains' | 'Advanced' | 'RETENTION_REVIEW';
  difficulty: string;
  questions: IQuestion[];
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  conceptWeightage: { type: Number, required: true },
});

const JeeTestSchema = new Schema<IJeeTest>({
  userId: { type: String, required: true },
  examType: { type: String, required: true, enum: ['Mains', 'Advanced', 'RETENTION_REVIEW'] },
  difficulty: { type: String, required: true },
  questions: { type: [QuestionSchema], required: true },
}, { timestamps: true });

const JeeTest = models.JeeTest || model<IJeeTest>('JeeTest', JeeTestSchema);

export default JeeTest;
