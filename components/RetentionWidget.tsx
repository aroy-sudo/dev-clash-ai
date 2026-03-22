import React from 'react';
import Link from 'next/link';
import { getDueTopics } from '@/lib/actions/retention.actions';

/**
 * RetentionWidget - A high-visibility alert component for spaced repetition.
 * Fetches due topics for a user and prompts them to take a retention test.
 * 
 * @param userId - The Clerk user ID
 */
export default async function RetentionWidget({ userId }: { userId: string }) {
  const dueTopics = await getDueTopics(userId);

  if (!dueTopics || dueTopics.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-red-50 border-4 border-red-600 p-6 mb-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:bg-red-100/50">
      {/* Background Decorative "Curve" SVG */}
      <div className="absolute top-0 right-0 w-48 h-48 opacity-5 pointer-events-none transform translate-x-12 -translate-y-12 text-red-900">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 90C30 90 40 10 90 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="flex items-center gap-5 relative z-10 w-full">
        {/* Animated Icon */}
        <div className="bg-red-600 text-white p-4 rounded-full flex-shrink-0 border-2 border-black animate-pulse shadow-lg">
          <span className="material-symbols-outlined text-4xl" data-icon="psychology">psychology</span>
        </div>
        
        <div className="flex-1">
          <h2 className="font-headline font-black text-2xl md:text-3xl text-red-600 leading-tight uppercase tracking-tighter">
            🚨 Memory Decay Alert: Ebbinghaus Curve Active
          </h2>
          <p className="font-body text-red-900/80 font-bold mt-1 text-lg">
            You have <span className="text-red-700 underline decoration-wavy underline-offset-4 decoration-red-400">{dueTopics.length} topics</span> at risk of being forgotten. Review them now to flatten your forgetting curve.
          </p>
          
          {/* Due Topics Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {dueTopics.map((topic: any) => (
              <span 
                key={topic._id} 
                className="bg-white border-2 border-red-200 text-red-700 px-3 py-1 rounded-lg text-sm font-bold shadow-[2px_2px_0px_0px_rgba(254,202,202,1)]"
              >
                {topic.topicName}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Link 
        href="/hub/retention-test"
        className="w-full md:w-auto whitespace-nowrap px-10 py-5 bg-red-600 text-white font-headline font-black text-xl border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3 group relative z-10 active:scale-95"
      >
        Start 5-Question Retention Test
        <span className="material-symbols-outlined group-hover:rotate-12 transition-transform" data-icon="memory">memory</span>
      </Link>
    </div>
  );
}
