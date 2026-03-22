<<<<<<< HEAD
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
=======
'use client';

import React, { useState } from 'react';
import { HandDrawnSidebar } from '@/components/layout/HandDrawnSidebar';
import { cn } from '@/lib/utils';

export default function HubLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6faff] dark:bg-[#133347] font-body text-[#001e2e] selection:bg-[#fdc003] selection:text-[#6c5000] overflow-x-hidden relative flex">
      {/* Global Paper Texture Overlay */}
      <div className="fixed inset-0 parchment-grain z-50 pointer-events-none" />
      
      <HandDrawnSidebar 
        isCollapsed={isCollapsed} 
        onToggle={() => setIsCollapsed(!isCollapsed)} 
      />
      
      {/* Main Content Pane */}
      <div className={cn(
        "relative z-10 w-full transition-all duration-300 ease-in-out",
        isCollapsed ? "md:pl-20" : "md:pl-64"
      )}>
        {children}
      </div>

      {/* Rough Border Detail Elements */}
      <div className="fixed top-0 bottom-0 left-4 w-[1px] bg-black/10 hidden lg:block pointer-events-none" />
      <div className="fixed top-0 bottom-0 right-4 w-[1px] bg-black/10 hidden lg:block pointer-events-none" />
    </div>
>>>>>>> derp
  );
}
