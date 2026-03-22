import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { connectToDatabase } from '@/database/mongoose';
import JeeTest from '@/database/models/jee-test.model';

export default async function RootPage() {
  const { userId } = await auth();

  if (userId) {
    await connectToDatabase();
    const existingTest = await JeeTest.findOne({ userId });

    if (existingTest) {
      redirect('/hub');
    } else {
      redirect('/hub/mock-test/setup');
    }
  }

  // If not signed in, show a landing page (or redirect to sign-in if that's preferred, 
  // but usually standard landing page is better).
  // For now, if not signed in, we can show a placeholder or redirect to sign-in.
  // The user said: "If no userId exists, simply render the standard landing page with the sign-in buttons."
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-6xl font-black tracking-tighter uppercase font-headline">Architect Your Future</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The ultimate JEE preparation platform with AI-generated mock tests, 
          real-time performance analysis, and personalized roadmaps.
        </p>
      </div>
      
      <div className="flex gap-4">
        {/* Sign in is handled by the header UserButton/SignInButton already, 
            but adding a CTA here is good practice */}
        <div className="p-4 bg-secondary-container rounded-2xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
           <p className="font-bold">Sign in via the navigation bar to begin your journey.</p>
        </div>
      </div>
    </div>
  );
}
