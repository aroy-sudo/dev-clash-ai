import React from 'react';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6faff] font-body text-[#001e2e] selection:bg-[#fdc003] selection:text-[#6c5000] overflow-x-hidden relative">
      <div className="fixed inset-0 parchment-grain z-50 pointer-events-none" />
      
      {children}
    </div>
  );
}
