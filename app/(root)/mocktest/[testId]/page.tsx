import { connectToDatabase } from "@/database/mongoose";
import JeeTest from "@/database/models/jee-test.model";
import { notFound } from "next/navigation";
import TestRunner from "@/components/mocktest/TestRunner";

export default async function MockTestPage({ params }: { params: { testId: string } }) {
  await connectToDatabase();

  let test;
  try {
    test = await JeeTest.findById(params.testId).lean();
  } catch (error) {
    console.error("Invalid test ID formatted or DB error", error);
    notFound();
  }

  if (!test) {
    notFound();
  }

  // Convert mongoose _ids to strings inside questions for client components
  const serializedQuestions = test.questions.map((q: any) => ({
    _id: q._id.toString(),
    questionText: q.questionText,
    options: q.options,
    subject: q.subject,
    topic: q.topic,
    conceptWeightage: q.conceptWeightage,
    // Do not pass down correct answers explicitly if we want to secure it, but for our simple runner we'll pass to testRunner or verify server-side later. The user prompt doesn't ask to hide it, but standard practice is to hide it.
    correctAnswer: q.correctAnswer, 
  }));

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">JEE Mock Test</h1>
        <p className="text-muted-foreground">
          {test.examType} - {test.difficulty}
        </p>
      </div>
      <TestRunner questions={serializedQuestions} testId={test._id.toString()} />
    </div>
  );
}
