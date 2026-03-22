import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { connectToDatabase } from '@/database/mongoose';
import JeeTest from '@/database/models/jee-test.model';

export default async function RootPage() {
  const { userId } = await auth();

  let targetDashboard = '/hub/mock-test/setup';
  if (userId) {
    try {
      await connectToDatabase();
      const existingTest = await JeeTest.findOne({ userId });
      if (existingTest) {
        targetDashboard = '/hub';
      }
    } catch(e) {
      console.error('Error fetching existing tests on landing page', e);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-8 bg-surface">
      <div className="space-y-4">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase font-headline text-on-surface">Architect Your Future</h1>
        <p className="text-xl md:text-2xl text-on-surface-variant font-medium max-w-2xl mx-auto">
          The ultimate JEE preparation platform with AI-generated mock tests,
          real-time performance analysis, and personalized roadmaps.
        </p>
      </div>

      {userId ? (
        <Link href={targetDashboard} className="mt-12 px-8 py-4 bg-primary text-on-primary font-headline font-black text-2xl uppercase tracking-widest border-4 border-on-surface shadow-[6px_6px_0px_0px_rgba(0,30,46,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all rounded-xl">
          Enter Academy
        </Link>
      ) : (
        <div className="mt-12 px-8 py-4 bg-secondary-container text-on-surface-variant font-headline font-bold text-xl border-4 border-dashed border-outline-variant">
          Sign in above to begin your journey.
        </div>
      )}
    </main>
  );
}
