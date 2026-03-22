import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { HubContainer } from '@/components/layout/HubContainer';

export default async function HubLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  return (
    <HubContainer>
      {children}
    </HubContainer>
  );
}
