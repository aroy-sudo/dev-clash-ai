'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  
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
<div className="group relative bg-surface-container-low p-8 rounded-xl flex items-center gap-6 cursor-pointer border-2 border-transparent hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-2 hover:rotate-1 shadow-lg overflow-hidden">
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
<div className="group relative bg-secondary-container p-8 rounded-xl flex items-center gap-6 cursor-pointer transform hover:-translate-y-2 hover:-rotate-1 shadow-xl overflow-hidden">
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
<div className="group relative bg-inverse-surface p-8 rounded-xl flex items-center gap-6 cursor-pointer transform hover:-translate-y-2 hover:rotate-2 shadow-2xl overflow-hidden">
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
</motion.main>
    </div>
  );
}
