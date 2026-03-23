'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/onboardingStore';
import { calculateTargetExamDate } from '@/lib/utils';

export function HubDashboard({ children, weakTopics = [] }: { children?: React.ReactNode, weakTopics?: string[] }) {
  const router = useRouter();
  const { hasTakenAssessment, targetExam, userClass } = useOnboardingStore();
  const [isMounted, setIsMounted] = React.useState(false);
  const [daysLeft, setDaysLeft] = React.useState<number>(0);
  
  React.useEffect(() => {
    setIsMounted(true);
    const targetDate = calculateTargetExamDate(targetExam, userClass);
    const diffTime = targetDate.getTime() - Date.now();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysLeft(diffDays > 0 ? diffDays : 0);
  }, [targetExam, userClass]);
  
  return (
    <div className="w-full min-h-screen relative">
      <motion.main className="pt-28 px-6 pb-12 relative z-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
        {/* Dynamic Injected Children */}
        {children}

        {/* Assessment Warning Banner */}
        {isMounted && !hasTakenAssessment && (
          <motion.div 
            initial={{ opacity: 0, y: -20, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            className="w-full bg-[#fdc003] p-6 md:p-8 mb-12 rounded-2xl border-4 border-[#133347] shadow-[8px_8px_0px_0px_rgba(19,51,71,1)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 z-20 hand-drawn-box"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex items-start md:items-center gap-4 w-full">
              <div className="bg-[#133347] text-[#fdc003] p-3 rounded-full flex-shrink-0 border-2 border-transparent">
                  <span className="material-symbols-outlined text-4xl animate-pulse" data-icon="warning">warning</span>
              </div>
              <div>
                <h2 className="font-headline font-black text-2xl md:text-3xl text-[#133347] leading-tight">⚠️ Assessment Pending</h2>
                <p className="font-body text-[#133347]/90 font-bold mt-1 max-w-lg">Take your diagnostic test to unlock your personalized roadmap.</p>
              </div>
            </div>
            <button 
              onClick={() => router.push('/hub/mock-test?auto=true')}
              className="w-full md:w-auto whitespace-nowrap px-10 py-4 bg-white text-[#133347] font-headline font-black text-xl border-4 border-[#133347] rounded-xl shadow-[6px_6px_0px_0px_rgba(19,51,71,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group flex items-center justify-center gap-2"
            >
              Take Test
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
            </button>
          </motion.div>
        )}

        {/* Hero Section: Days Left */}
        <section className="mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h1 className="font-headline text-6xl md:text-8xl font-black text-primary leading-none mb-4 tracking-tighter">
              THE <span className="text-secondary marker-underline italic">HUB</span>
            </h1>
            <p className="text-xl font-medium text-outline max-w-md">Your drafting table for academic dominance. Every stroke counts toward the final blueprint.</p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-tertiary/10 rounded-full blur-2xl group-hover:bg-tertiary/20 transition-colors"></div>
            <div className="relative bg-surface-container-low p-8 rough-border border-4 border-primary transform -rotate-2 flex flex-col items-center">
              <span className="text-8xl font-black font-headline text-primary leading-none">{isMounted ? daysLeft : '--'}</span>
              <span className="text-sm font-bold uppercase tracking-widest text-secondary -mt-2">Days Left</span>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center border-2 border-black rotate-12">
                <span className="material-symbols-outlined text-on-secondary-container" data-icon="timer">timer</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Streak Calendar (Bento Large) */}
          <div className="md:col-span-8 bg-surface-container-lowest p-8 rounded-xl shadow-[8px_8px_0px_0px_rgba(0,107,92,0.1)] border-2 border-primary/20 relative overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline text-2xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" data-icon="edit_calendar">edit_calendar</span>
                Daily Commits
              </h3>
              <div className="flex gap-2">
                <div className="w-4 h-4 rounded-sm bg-primary-container"></div>
                <div className="w-4 h-4 rounded-sm bg-secondary-container"></div>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-4 md:gap-6">
              <div className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-outline-variant rounded-lg opacity-40">1</div>
              <div className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-outline-variant rounded-lg opacity-40">2</div>
              <div className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-outline-variant rounded-lg opacity-40">3</div>
              <div className="aspect-square flex flex-col items-center justify-center bg-primary-container border-2 border-primary transform rotate-2 flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-container" data-icon="check" >check</span>
              </div>
              <div className="aspect-square flex flex-col items-center justify-center bg-secondary-container border-2 border-secondary transform -rotate-1 flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-container" data-icon="bolt" >bolt</span>
              </div>
              <div className="aspect-square flex flex-col items-center justify-center bg-primary-container border-2 border-primary transform rotate-3 flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-container" data-icon="done_all" >done_all</span>
              </div>
              <div className="aspect-square flex flex-col items-center justify-center bg-primary-container border-2 border-primary transform -rotate-2 flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-container" data-icon="edit" >edit</span>
              </div>
              <div className="aspect-square flex flex-col items-center justify-center bg-primary-container border-2 border-primary transform rotate-1 flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-container" data-icon="star" >star</span>
              </div>
              <div className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-outline-variant rounded-lg">9</div>
              <div className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-outline-variant rounded-lg">10</div>
              <div className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-outline-variant rounded-lg">11</div>
              <div className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-outline-variant rounded-lg">12</div>
              <div className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-outline-variant rounded-lg">13</div>
              <div className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-outline-variant rounded-lg">14</div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 pointer-events-none transform -rotate-12">
              <span className="material-symbols-outlined text-9xl text-primary" data-icon="edit">edit</span>
            </div>
          </div>

          {/* Stats & Rank (Bento Tall) */}
          <div className="md:col-span-4 flex flex-col gap-8">
            <div className="bg-surface-container-high p-8 rounded-xl border-4 border-dashed border-primary transform rotate-1 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-tertiary/5"></div>
              <div className="relative z-10">
                <h4 className="font-headline text-lg font-bold text-outline uppercase tracking-widest mb-4">Rank Velocity</h4>
                <div className="relative inline-block mb-4">
                  <div className="absolute -inset-6 border-4 border-tertiary rounded-full animate-pulse opacity-30"></div>
                  <div className="absolute -inset-4 border-2 border-primary rounded-full animate-bounce opacity-40"></div>
                  <div className="w-32 h-32 rounded-full bg-surface-container-lowest flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="font-headline text-5xl font-black text-tertiary">#42</span>
                  </div>
                </div>
                <p className="font-headline text-2xl font-black text-primary">Top 2% <span className="text-sm font-medium text-outline">Expected</span></p>
              </div>
            </div>
            <div className="bg-surface-container-low p-6 rounded-xl border-2 border-primary/20 shadow-lg">
              <h4 className="font-headline font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm" data-icon="trending_up">trending_up</span>
                Performance Gauge
              </h4>
              <div className="space-y-4">
                <div className="h-6 w-full bg-surface-container rounded-full overflow-hidden border-2 border-black">
                  <div className="h-full bg-secondary-container border-r-2 border-black w-[85%] relative">
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.1)_25%,rgba(0,0,0,0.1)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.1)_75%,rgba(0,0,0,0.1))] bg-[length:10px_10px]"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-tighter text-outline">
                  <span>Drafting</span>
                  <span>Architect Level</span>
                </div>
              </div>
            </div>
          </div>

          {/* Target Locked - Weak Topics */}
          {weakTopics.length > 0 && (
            <div className="md:col-span-12 bg-surface-container-highest p-8 rounded-xl border-4 border-dashed border-[#ac332a] hand-drawn-box relative overflow-hidden mt-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#ac332a] text-white p-2 rounded-full transform -rotate-6">
                  <span className="material-symbols-outlined" data-icon="crisis_alert">crisis_alert</span>
                </div>
                <h3 className="font-headline text-3xl font-black text-[#133347]">Target Locked</h3>
              </div>
              <p className="font-body text-[#133347]/80 font-bold mb-6">Focus your artillery on these high-priority weak zones:</p>
              
              <div className="flex flex-wrap gap-4">
                {weakTopics.map((topic, idx) => (
                  <span key={idx} className="bg-[#fdc003]/20 text-[#133347] font-bold px-4 py-2 border-2 border-[#133347] rounded-lg shadow-[4px_4px_0px_0px_rgba(19,51,71,1)] transform hover:-translate-y-1 transition-transform flex items-center gap-2" style={{ transform: `rotate(${Math.random() * 4 - 2}deg)` }}>
                    <span className="text-xl">⚠️</span> {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quick Access Section */}
          <section className="md:col-span-12 mt-4">
            <h3 className="font-headline text-3xl font-black text-primary mb-8 flex items-center gap-4">
              Drafting <span className="material-symbols-outlined" data-icon="architecture">architecture</span> Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div onClick={() => router.push('/hub/mock-test')} className="group relative flex flex-col items-start p-8 bg-surface-container-lowest text-primary rounded-xl border-4 border-black transform transition-transform hover:-translate-y-2 hover:translate-x-1 active:translate-y-1 overflow-hidden cursor-pointer">
                <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4">
                  <span className="material-symbols-outlined text-8xl" data-icon="quiz">quiz</span>
                </div>
                <span className="material-symbols-outlined text-4xl mb-4" data-icon="quiz">quiz</span>
                <h4 className="font-headline text-2xl font-black mb-2 text-tertiary">Full Tests</h4>
                <p className="text-sm text-outline leading-tight">Put your blueprints to the ultimate stress test.</p>
                <div className="mt-6 flex items-center gap-2 font-bold text-sm uppercase tracking-widest bg-tertiary/10 px-3 py-1 rounded-full text-tertiary">
                  Begin <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        {/* Floating Decorative Element */}
        <div className="fixed bottom-10 right-10 hidden xl:block z-0 opacity-20 transform rotate-12 pointer-events-none">
          <span className="material-symbols-outlined text-[12rem] text-outline" data-icon="square_foot">square_foot</span>
        </div>
      </motion.main>
    </div>
  );
}
