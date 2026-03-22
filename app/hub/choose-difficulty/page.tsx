'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  
  return (
    <div className="w-full min-h-screen relative">
      <motion.main className="min-h-screen pt-24 pb-32 md:pb-12 px-6 flex flex-col md:flex-row items-center justify-center max-w-screen-2xl mx-auto gap-12 relative" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
{/* Background Memphis Elements */}
<div className="absolute top-1/4 left-10 w-32 h-32 bg-secondary-container rounded-full opacity-20 -z-10 blur-2xl"></div>
<div className="absolute bottom-1/4 right-20 w-48 h-48 bg-tertiary-container rounded-full opacity-10 -z-10 blur-3xl"></div>
{/* Left Side: Typography */}
<div className="w-full md:w-1/2 flex flex-col items-start justify-center space-y-4">
<span className="bg-primary-container/20 text-primary px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase font-headline">Mock Test v2.4</span>
<h1 className="font-headline text-6xl md:text-8xl font-black text-on-surface leading-[0.9] tracking-tighter">
                Select Your<br/>
<span className="text-primary italic">Challenge.</span>
</h1>
<div className="scribble-underline w-64 md:w-96"></div>
<p className="text-xl md:text-2xl text-on-surface-variant max-w-md mt-8 font-body font-medium leading-relaxed">
                Choose the architectural rigor of your next assessment. From foundational sketches to chaotic site plans.
            </p>
</div>
{/* Right Side: Cards */}
<div className="w-full md:w-1/2 grid grid-cols-1 gap-6 perspective-1000">
{/* Easy Card */}
<div 
  onClick={() => setSelectedDifficulty('Easy')}
  className={`group relative p-8 rounded-xl flex items-center gap-6 cursor-pointer border-4 transition-all duration-300 transform shadow-lg overflow-hidden ${
    selectedDifficulty === 'Easy' 
      ? 'bg-surface-container-low border-primary scale-105 rotate-1 z-10' 
      : 'bg-surface-container-low border-transparent hover:border-primary/20 hover:-translate-y-2 hover:rotate-1 opacity-80 hover:opacity-100'
  }`}
>
<div className="w-24 h-24 bg-surface flex items-center justify-center rounded-xl rotate-[-3deg] border-2 border-primary/10">
<span className="material-symbols-outlined text-5xl text-primary" >architecture</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start">
<h3 className="font-headline text-3xl font-bold uppercase text-on-surface">Easy</h3>
<span className="text-xs font-bold uppercase tracking-widest text-primary/60">45 Mins</span>
</div>
<p className="text-on-surface-variant font-medium mt-1">Foundational concepts and basic structural integrity.</p>
</div>
<div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
<span className="material-symbols-outlined text-9xl">edit_note</span>
</div>
</div>
{/* Medium Card */}
<div 
  onClick={() => setSelectedDifficulty('Medium')}
  className={`group relative p-8 rounded-xl flex items-center gap-6 cursor-pointer border-4 transition-all duration-300 transform shadow-xl overflow-hidden ${
    selectedDifficulty === 'Medium' 
      ? 'bg-secondary-container border-on-secondary-container scale-105 -rotate-1 z-10' 
      : 'bg-secondary-container border-transparent hover:-translate-y-2 hover:-rotate-1 opacity-80 hover:opacity-100'
  }`}
>
<div className="w-24 h-24 bg-on-secondary-container/10 flex items-center justify-center rounded-xl rotate-[2deg] border-2 border-on-secondary-container/20">
<span className="material-symbols-outlined text-5xl text-on-secondary-container" >square_foot</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start">
<h3 className="font-headline text-3xl font-bold uppercase text-on-secondary-container">Medium</h3>
<span className="text-xs font-bold uppercase tracking-widest text-on-secondary-container/60">90 Mins</span>
</div>
<p className="text-on-secondary-container/80 font-medium mt-1">Complex load-bearing problems and site optimization.</p>
</div>
<div className="absolute -right-4 -bottom-4 opacity-10">
<span className="material-symbols-outlined text-9xl">architecture</span>
</div>
</div>
{/* Hard Card */}
<div 
  onClick={() => setSelectedDifficulty('Hard')}
  className={`group relative p-8 rounded-xl flex items-center gap-6 cursor-pointer border-4 transition-all duration-300 transform shadow-2xl overflow-hidden ${
    selectedDifficulty === 'Hard' 
      ? 'bg-inverse-surface border-tertiary scale-105 rotate-2 z-10' 
      : 'bg-inverse-surface border-transparent hover:-translate-y-2 hover:rotate-2 opacity-80 hover:opacity-100'
  }`}
>
<div className="w-24 h-24 bg-tertiary flex items-center justify-center rounded-xl rotate-[-5deg] border-2 border-on-tertiary/20">
<span className="material-symbols-outlined text-5xl text-on-tertiary" >home_repair_service</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start">
<h3 className="font-headline text-3xl font-bold uppercase text-surface">Hard</h3>
<span className="text-xs font-bold uppercase tracking-widest text-tertiary-container/60">180 Mins</span>
</div>
<p className="text-surface/70 font-medium mt-1">High-stakes urban planning and structural failures.</p>
</div>
<div className="absolute -right-8 -bottom-8 opacity-20 text-tertiary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[10rem]">ink_highlighter</span>
</div>
</div>
</div>

<AnimatePresence>
{selectedDifficulty && (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="mt-12 w-full flex justify-center col-span-1"
    >
        <button 
            onClick={() => router.push('/hub/mock-test')}
            className="w-full md:w-auto px-16 py-6 bg-[#fdc003] text-[#133347] font-headline text-3xl font-black rounded-2xl border-4 border-[#133347] shadow-[8px_8px_0px_0px_rgba(19,51,71,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(19,51,71,1)] transition-all flex items-center justify-center gap-4 group"
        >
            Start Test
            <span className="material-symbols-outlined text-4xl group-hover:translate-x-2 transition-transform" data-icon="arrow_forward">arrow_forward</span>
        </button>
    </motion.div>
)}
</AnimatePresence>

</motion.main>
    </div>
  );
}
