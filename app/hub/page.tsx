'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/onboardingStore';

export default function Page() {
  const router = useRouter();
  const hasTakenAssessment = useOnboardingStore(state => state.hasTakenAssessment);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

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
