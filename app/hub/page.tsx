import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { connectToDatabase } from '@/database/mongoose';
import JeeTest from '@/database/models/jee-test.model';
import { HubDashboard } from '@/components/layout/HubDashboard';
import RetentionWidget from '@/components/RetentionWidget';
import User from '@/database/models/user.model';

export default async function HubPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  await connectToDatabase();
  const existingTest = await JeeTest.findOne({ userId });

  if (!existingTest) {
    redirect('/onboarding/target');
  }

  const userDoc = await User.findOne({ userId }).lean();
  const weakTopics = userDoc?.weakTopics || [];

  return (
    <HubDashboard weakTopics={weakTopics}>
      <RetentionWidget userId={userId} />
    </HubDashboard>
  );
}
