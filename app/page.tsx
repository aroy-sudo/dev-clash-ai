import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { connectToDatabase } from '@/database/mongoose';
import JeeTest from '@/database/models/jee-test.model';

export default async function RootPage() {
  const { userId } = await auth();

  if (userId) {
    try {
      await connectToDatabase();
      const existingTest = await JeeTest.findOne({ userId });

      if (existingTest) {
        redirect('/hub');
      } else {
        redirect('/hub/mock-test/setup');
      }
    } catch (error) {
      console.error("Error finding JEE test:", error);
      redirect('/hub/mock-test/setup');
    }
  }

  redirect('/onboarding/target');
}
