import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { connectToDatabase } from '@/database/mongoose';
import TestAttempt from '@/database/models/test-attempt.model';
import Link from 'next/link';

export default async function HistoryPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  await connectToDatabase();
  
  // Fetch all attempts sorted by most recent
  const attempts = await TestAttempt.find({ userId }).sort({ createdAt: -1 }).lean();

  return (
    <div className="w-full min-h-screen relative pt-28 px-6 pb-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-headline text-5xl md:text-6xl font-black text-[#133347] mb-8 flex items-center gap-4">
          <span className="material-symbols-outlined text-6xl text-primary" data-icon="history_edu">history_edu</span>
          Assessment <span className="scribble-underline px-1">Archive</span>
        </h1>
        
        <p className="font-body text-[#133347]/80 text-xl font-medium mb-12 max-w-2xl">
          Review your past performances, analyze your mistakes, and track your architectural growth over time.
        </p>

        {attempts.length === 0 ? (
          <div className="bg-surface-container-high p-12 rounded-2xl border-4 border-dashed border-[#133347]/30 text-center hand-drawn-box">
            <span className="material-symbols-outlined text-6xl text-[#133347]/40 mb-4" data-icon="folder_off">folder_off</span>
            <h3 className="font-headline text-2xl font-black text-[#133347]/60">The archive is empty.</h3>
            <p className="font-body text-[#133347]/50 mt-2">Take a mock test from the Hub to start building your history.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {attempts.map((attempt: any, idx: number) => {
              const date = new Date(attempt.createdAt);
              const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              
              const totalScore = attempt.totalQuestions > 0 ? attempt.totalQuestions * 4 : 0;
              const percentage = totalScore > 0 ? Math.round((attempt.overallScore / totalScore) * 100) : 0;
              
              // Rotate slightly for the report card effect
              const rotation = idx % 2 === 0 ? '-rotate-1' : 'rotate-1';

              return (
                <div key={attempt._id.toString()} className={`bg-[#f6faff] p-8 rounded-xl border-4 border-[#133347] shadow-[8px_8px_0px_0px_rgba(19,51,71,1)] transform ${rotation} hover:rotate-0 hover:-translate-y-2 transition-all group flex flex-col`}>
                  
                  {/* Top Header */}
                  <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-dashed border-[#133347]/20">
                    <div>
                      <span className="bg-[#fdc003] text-[#133347] font-bold text-xs uppercase tracking-widest px-2 py-1 rounded inline-block mb-2 border-2 border-[#133347]">
                        {attempt.testType || 'Full Test'}
                      </span>
                      <h3 className="font-headline text-2xl font-black text-[#133347] leading-tight">
                        {formattedDate}
                      </h3>
                    </div>
                    <div className="bg-[#133347] text-[#f6faff] w-14 h-14 rounded-full flex flex-col justify-center items-center transform rotate-6 border-4 border-[#00bfa5] shadow-sm">
                      <span className="font-headline font-black text-lg leading-none">{attempt.overallScore}</span>
                    </div>
                  </div>

                  {/* Body Stats */}
                  <div className="flex-grow space-y-4 mb-6">
                    <div className="flex justify-between text-sm font-bold text-[#133347]/80">
                      <span>Questions Attempted: {attempt.answers?.length || 0} / {attempt.totalQuestions || 0}</span>
                      <span>{percentage}% Accuracy</span>
                    </div>
                    {attempt.topicsCovered && attempt.topicsCovered.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {attempt.topicsCovered.slice(0, 3).map((topic: string, i: number) => (
                          <span key={i} className="text-[10px] uppercase font-bold text-[#006b5c] bg-[#00bfa5]/10 px-2 py-1 rounded">
                            {topic}
                          </span>
                        ))}
                        {attempt.topicsCovered.length > 3 && (
                          <span className="text-[10px] uppercase font-bold text-[#133347] bg-[#133347]/5 px-2 py-1 rounded">
                            +{attempt.topicsCovered.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Footer Action */}
                  <div className="mt-auto pt-4 border-t-2 border-dashed border-[#133347]/20 flex justify-between items-center">
                    <span className="text-xs font-bold text-[#133347]/60">{Math.round((attempt.timeTaken || 0) / 60)} min elapsed</span>
                    <Link href={`/hub/history/${attempt._id.toString()}`} className="font-headline font-black text-[#006b5c] flex items-center gap-1 group-hover:underline">
                      View Report <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1" data-icon="arrow_forward">arrow_forward</span>
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
