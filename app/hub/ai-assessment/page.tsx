import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { connectToDatabase } from '@/database/mongoose';
import TestAttempt from '@/database/models/test-attempt.model';
import JeeTest from '@/database/models/jee-test.model';
import AssessmentTabs from './AssessmentTabs';

export default async function AssessmentHubPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  await connectToDatabase();
  
  // Fetch all attempts sorted by most recent, populating the original test to get correct answers
  const attempts = await TestAttempt.find({ userId })
    .sort({ createdAt: -1 })
    .populate({
      path: 'testId',
      model: JeeTest,
      select: 'questions examType difficulty'
    })
    .lean();
    
  // Sanitize for client component
  const sanitizedAttempts = JSON.parse(JSON.stringify(attempts));

  return (
    <div className="w-full min-h-screen relative pt-24 px-4 pb-12 overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-center gap-3 px-2">
          <span className="material-symbols-outlined text-4xl text-primary font-bold">architecture</span>
          <h1 className="font-headline font-bold tracking-tight text-primary italic text-3xl">AI Assessment Hub</h1>
        </header>

        <main className="relative">
          <AssessmentTabs attempts={sanitizedAttempts} />
        </main>
      </div>
    </div>
  );
}
