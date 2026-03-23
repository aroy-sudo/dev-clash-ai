import { model, Schema, models, Types } from "mongoose";
import { IBookSegment } from "@/types";

const BookSegmentSchema = new Schema<IBookSegment>({
    clerkId: { type: String, required: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true, index: true },
    subject: { type: String, required: true, index: true },
    grade: { type: String, required: true, index: true },
    content: { type: String, required: true },
    embedding: { type: [Number], required: true },
    segmentIndex: { type: Number, required: true, index: true },
    pageNumber: { type: Number, index: true, },
    wordCount: { type: Number, required: true },
}, { timestamps: true });

BookSegmentSchema.index({ bookId: 1, segmentIndex: 1 }, { unique: true });
BookSegmentSchema.index({ bookId: 1, pageNumber: 1 });

BookSegmentSchema.index({ bookId: 1, content: 'text' });

// NOTE: Atlas Vector Search Index Update Required
// The MongoDB Vector Search Index JSON config must be updated to include 
// "subject" and "grade" as filterable fields to properly enable the new filtering logic.

const BookSegment = models.BookSegment || model<IBookSegment>('BookSegment', BookSegmentSchema);

export default BookSegment;
