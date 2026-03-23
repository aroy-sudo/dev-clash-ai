import { Schema, model, models, Document } from 'mongoose';

export interface IUser extends Document {
  userId: string;
  selectedSyllabus: string[];
  weakTopics: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  userId: { type: String, required: true, unique: true },
  selectedSyllabus: { type: [String], default: [] },
  weakTopics: { type: [String], default: [] }
}, { timestamps: true });

const User = models.User || model<IUser>('User', UserSchema);

export default User;
