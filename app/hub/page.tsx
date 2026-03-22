import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { connectToDatabase } from '@/database/mongoose';
import JeeTest from '@/database/models/jee-test.model';
import { HubDashboard } from '@/components/layout/HubDashboard';
import RetentionWidget from '@/components/RetentionWidget';

export default async function HubPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  await connectToDatabase();
  const existingTest = await JeeTest.findOne({ userId });

  if (!existingTest) {
    redirect('/hub/mock-test/setup');
  }

  return (
    <div className="w-full">
      {/* Global Hero Alert Layer */}
      <section className="pt-28 px-6 -mb-20 relative z-30">
        <RetentionWidget userId={userId} />
      </section>

      {/* Main Dashboard Content */}
      <HubDashboard />
    </div>
  );
}
