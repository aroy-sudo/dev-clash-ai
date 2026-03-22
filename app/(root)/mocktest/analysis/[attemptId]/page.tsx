import { connectToDatabase } from "@/database/mongoose";
import TestAttempt from "@/database/models/test-attempt.model";
import { notFound } from "next/navigation";

export default async function AnalysisDashboardPage({ params }: { params: { attemptId: string } }) {
  await connectToDatabase();

  let attempt;
  try {
    attempt = await TestAttempt.findById(params.attemptId).lean();
  } catch (error) {
    console.error("Invalid attempt ID formatted or DB error", error);
    notFound();
  }

  if (!attempt) {
    notFound();
  }

  const analysis = attempt.performanceAnalysis;

  return (
    <div className="container mx-auto py-12 max-w-4xl space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Performance Analysis</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
           <div className="px-4 py-2 bg-primary/10 text-primary rounded-xl font-bold">
             Score: {attempt.overallScore}
           </div>
           <p>Detailed AI breakdown of your test attempt.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Strengths */}
        <div className="p-6 bg-green-50 dark:bg-green-950/20 rounded-2xl border border-green-200 dark:border-green-900">
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">Strengths</h2>
          <ul className="list-disc pl-5 space-y-2 text-green-900 dark:text-green-100">
            {analysis?.strengths?.map((str: string, index: number) => (
              <li key={index}>{str}</li>
            ))}
            {!analysis?.strengths?.length && <li>No specific strengths identified in this attempt.</li>}
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="p-6 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-200 dark:border-red-900">
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-4">Areas for Improvement</h2>
          <ul className="list-disc pl-5 space-y-2 text-red-900 dark:text-red-100">
             {analysis?.areasForImprovement?.map((area: string, index: number) => (
              <li key={index}>{area}</li>
            ))}
            {!analysis?.areasForImprovement?.length && <li>Great job! Minimal areas for improvement.</li>}
          </ul>
        </div>
      </div>

      {/* Recommended Topics */}
      <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-200 dark:border-blue-900">
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4">Recommended Topics Next</h2>
        <div className="flex flex-wrap gap-2">
           {analysis?.recommendedTopics?.map((topic: string, index: number) => (
            <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Learning Path */}
      <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-2xl font-bold mb-6">Actionable Learning Path</h2>
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
           {analysis?.learningPath?.map((item: any, index: number) => (
             <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white bg-zinc-200 dark:bg-zinc-800 text-zinc-500 font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                  {item.step}
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-zinc-950 p-4 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                   <p className="font-semibold text-zinc-800 dark:text-zinc-200">{item.task}</p>
                </div>
             </div>
           ))}
        </div>
      </div>

    </div>
  );
}
