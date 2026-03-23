'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";
import {CreateBook, TextSegment} from "@/types";
import {connectToDatabase} from "@/database/mongoose";
import {escapeRegex, generateSlug, serializeData} from "@/lib/utils";
import Book from "@/database/models/book.model";
import BookSegment from "@/database/models/book-segment.model";
import mongoose from "mongoose";
import {getUserPlan} from "@/lib/subscription.server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export const getAllBooks = async (search?: string) => {
    try {
        await connectToDatabase();

        let query = {};

        if (search) {
            const escapedSearch = escapeRegex(search);
            const regex = new RegExp(escapedSearch, 'i');
            query = {
                $or: [
                    { title: { $regex: regex } },
                    { author: { $regex: regex } },
                ]
            };
        }

        const books = await Book.find(query).sort({ createdAt: -1 }).lean();

        return {
            success: true,
            data: serializeData(books)
        }
    } catch (e) {
        console.error('Error connecting to database', e);
        return {
            success: false, error: e
        }
    }
}

export const checkBookExists = async (title: string) => {
    try {
        await connectToDatabase();

        const slug = generateSlug(title);

        const existingBook = await Book.findOne({slug}).lean();

        if(existingBook) {
            return {
                exists: true,
                book: serializeData(existingBook)
            }
        }

        return {
            exists: false,
        }
    } catch (e) {
        console.error('Error checking book exists', e);
        return {
            exists: false, error: e
        }
    }
}

export const createBook = async (data: CreateBook) => {
    try {
        await connectToDatabase();

        const slug = generateSlug(data.title);

        const existingBook = await Book.findOne({slug}).lean();

        if(existingBook) {
            return {
                success: true,
                data: serializeData(existingBook),
                alreadyExists: true,
            }
        }

        const { auth } = await import("@clerk/nextjs/server");
        const { userId } = await auth();

        if (!userId || userId !== data.clerkId) {
            return { success: false, error: "Unauthorized" };
        }

        const book = await Book.create({...data, clerkId: userId, slug, totalSegments: 0});

        return {
            success: true,
            data: serializeData(book),
        }
    } catch (e) {
        console.error('Error creating a book', e);

        return {
            success: false,
            error: e,
        }
    }
}

export const getBookBySlug = async (slug: string) => {
    try {
        await connectToDatabase();

        const book = await Book.findOne({ slug }).lean();

        if (!book) {
            return { success: false, error: 'Book not found' };
        }

        return {
            success: true,
            data: serializeData(book)
        }
    } catch (e) {
        console.error('Error fetching book by slug', e);
        return {
            success: false, error: e
        }
    }
}

export const saveBookSegments = async (bookId: string, clerkId: string, subject: string, grade: string, segments: TextSegment[], totalExpectedSegments?: number) => {
    try {
        await connectToDatabase();

        console.log('Saving book segments...');

        const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

        const segmentsToInsert = await Promise.all(
            segments.map(async ({ text, segmentIndex, pageNumber, wordCount }) => {
                const result = await embeddingModel.embedContent(text);
                const embedding = result.embedding.values;
                return { clerkId, bookId, subject, grade, content: text, embedding, segmentIndex, pageNumber, wordCount };
            })
        );

        await BookSegment.insertMany(segmentsToInsert);

        if (totalExpectedSegments !== undefined) {
             await Book.findByIdAndUpdate(bookId, { totalSegments: totalExpectedSegments });
        } else {
             await Book.findByIdAndUpdate(bookId, { $inc: { totalSegments: segments.length } });
        }

        console.log('Book segments saved successfully.');

        return {
            success: true,
            data: { segmentsCreated: segments.length}
        }
    } catch (e) {
        console.error('Error saving book segments', e);

        return {
            success: false,
            error: e,
        }
    }
}

// Searches book segments using MongoDB Atlas Vector Search
export const searchBookSegments = async (query: string, filterConfig: { bookId?: string, subject?: string, grade?: string }, limit: number = 5) => {
    try {
        await connectToDatabase();

        console.log(`Searching for: "${query}" with filters: ${JSON.stringify(filterConfig)}`);

        const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });
        const result = await embeddingModel.embedContent(query);
        const queryVector = result.embedding.values;

        // Construct standard MQL filter object for Atlas Search
        const filter: any = {};
        if (filterConfig.bookId) filter.bookId = new mongoose.Types.ObjectId(filterConfig.bookId);
        if (filterConfig.subject) filter.subject = filterConfig.subject;
        if (filterConfig.grade) filter.grade = filterConfig.grade;

        // Atlas Vector Search aggregation pipeline
        const segments = await BookSegment.aggregate([
            {
                $vectorSearch: {
                    index: "vector_index", // Ensure this matches your Atlas index name
                    path: "embedding",
                    queryVector: queryVector,
                    numCandidates: limit * 10,
                    limit: limit,
                    ...(Object.keys(filter).length > 0 && { filter })
                }
            },
            {
                $project: {
                    _id: 1,
                    bookId: 1,
                    subject: 1,
                    grade: 1,
                    content: 1,
                    segmentIndex: 1,
                    pageNumber: 1,
                    wordCount: 1,
                    score: { $meta: "vectorSearchScore" }
                }
            }
        ]);

        console.log(`Search complete. Found ${segments.length} results`);

        return {
            success: true,
            data: serializeData(segments),
        };
    } catch (error) {
        console.error('Error searching segments:', error);
        return {
            success: false,
            error: (error as Error).message,
            data: [],
        };
    }
};

export const askDoubtText = async (query: string, bookId?: string) => {
    try {
        await connectToDatabase();
        
        let context = "";
        
        // Use provided bookId or fallback to any book
        const bookQuery = bookId ? { _id: bookId } : {};
        const book = await Book.findOne(bookQuery).lean();
        
        if (book) {
            const searchResult = await searchBookSegments(query, { bookId: book._id.toString() }, 3);
            if (searchResult.success && searchResult.data) {
                context = (searchResult.data as {content: string}[]).map(s => s.content).join('\n\n');
            }
        }

        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const systemPrompt = `Important Instruction: The user will speak in Hindi, English, or Hinglish. Reply in the exact same language mix they use. Maintain an encouraging, expert tutor persona.
You are Vector, an expert tutor for JEE exams. Base your answers on the following textbook context if relevant:
<context>
${context}
</context>`;

        const response = await model.generateContent([systemPrompt, query]);
        return { success: true, text: response.response.text() };
        
    } catch (e) {
        console.error("Text doubt error:", e);
        return { success: false, error: "Failed to fetch response" };
    }
}
