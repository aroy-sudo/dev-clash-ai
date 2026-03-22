'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  
  return (
    <div className="w-full min-h-screen relative">
      <motion.main className="pt-24 pb-12 min-h-screen relative overflow-hidden px-4 md:px-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
{/* Parchment Texture Background Decorations */}
<div className="absolute top-40 right-10 opacity-10 pointer-events-none rotate-12">
<span className="material-symbols-outlined text-9xl">architecture</span>
</div>
<div className="absolute bottom-40 left-10 opacity-10 pointer-events-none -rotate-6">
<span className="material-symbols-outlined text-9xl">edit_note</span>
</div>
<header className="max-w-4xl mx-auto mb-16 text-center">
<h1 className="font-headline text-6xl md:text-8xl font-black text-primary italic uppercase tracking-tighter mb-4">The Journey</h1>
<p className="font-headline text-xl text-secondary font-bold tracking-tight">Mapping your path to mastery through the physical world.</p>
</header>
{/* The Treasure Map Path */}
<div className="relative max-w-3xl mx-auto">
{/* Winding Path SVG */}
<div className="absolute inset-0 z-0 pointer-events-none">
<svg className="opacity-20 stroke-primary" fill="none" height="2400" viewBox="0 0 400 2400" width="100%" xmlns="http://www.w3.org/2000/svg">
<path className="sketchy-path" d="M200 0 C 350 150, 50 250, 200 400 S 350 650, 200 800 S 50 1050, 200 1200 S 350 1450, 200 1600 S 50 1850, 200 2000 S 350 2250, 200 2400" strokeLinecap="round" strokeWidth="12"></path>
</svg>
</div>
{/* Roadmap Nodes */}
<div className="space-y-[200px] relative z-10 flex flex-col items-center">
{/* Node 1: Completed */}
<div className="group relative flex flex-col items-center ml-[100px]">
<div className="node-float w-24 h-24 bg-primary-container border-4 border-primary rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,107,92,1)] cursor-pointer">
<span className="material-symbols-outlined text-5xl text-on-primary-container" >speed</span>
</div>
<div className="mt-4 bg-surface-container-highest px-4 py-2 border-2 border-primary -rotate-2">
<span className="font-headline font-black text-primary uppercase">Kinematics</span>
</div>
{/* Tooltip Stickynote */}
<div className="absolute -right-48 top-0 w-40 opacity-0 group-hover:opacity-100 transition-opacity bg-secondary-container p-4 border-2 border-black rotate-3 shadow-xl pointer-events-none">
<p className="font-headline text-xs font-bold text-on-secondary-container">COMPLETED!</p>
<p className="font-body text-[10px] leading-tight mt-1 text-on-secondary-container">12/12 modules finished. Total mastery achieved.</p>
</div>
</div>
{/* Node 2: Current (Active) */}
<div className="group relative flex flex-col items-center mr-[150px]">
{/* You Are Here Arrow */}
<div className="absolute -top-16 -left-8 animate-bounce">
<span className="material-symbols-outlined text-tertiary text-6xl rotate-45" >double_arrow</span>
<span className="absolute top-2 left-16 font-headline font-black text-tertiary bg-white px-2 border-2 border-tertiary whitespace-nowrap">YOU ARE HERE</span>
</div>
<div className="node-float w-32 h-32 bg-secondary-container border-4 border-secondary rounded-full flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(120,89,0,1)] cursor-pointer ring-4 ring-secondary/20 ring-offset-4 ring-offset-background">
<span className="material-symbols-outlined text-6xl text-on-secondary-container" >settings_input_component</span>
</div>
<div className="mt-4 bg-surface-container-highest px-6 py-2 border-4 border-secondary rotate-1">
<span className="font-headline font-black text-secondary text-xl uppercase">Dynamics</span>
</div>
{/* Tooltip Stickynote */}
<div className="absolute -right-48 top-4 w-48 opacity-100 bg-secondary-container p-4 border-2 border-black -rotate-2 shadow-xl">
<div className="flex items-center gap-2 mb-2">
<div className="h-2 w-full bg-on-secondary-container/20 rounded-full overflow-hidden">
<div className="h-full bg-on-secondary-container w-[45%]"></div>
</div>
<span className="text-[10px] font-black">45%</span>
</div>
<p className="font-body text-xs leading-tight text-on-secondary-container">7 modules left to unlock "Energy Systems". Focus on friction!</p>
</div>
</div>
{/* Node 3: Locked */}
<div className="group relative flex flex-col items-center ml-[50px]">
<div className="node-float w-24 h-24 bg-surface-container-low border-4 border-outline-variant rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] opacity-60 grayscale cursor-not-allowed">
<span className="material-symbols-outlined text-5xl text-outline">bolt</span>
</div>
<div className="mt-4 bg-surface-container-low px-4 py-2 border-2 border-dashed border-outline-variant -rotate-1">
<span className="font-headline font-black text-outline uppercase">Work &amp; Energy</span>
</div>
<div className="absolute -left-12 top-0">
<span className="material-symbols-outlined text-outline-variant text-4xl">lock</span>
</div>
</div>
{/* Node 4: Locked */}
<div className="group relative flex flex-col items-center mr-[100px]">
<div className="node-float w-24 h-24 bg-surface-container-low border-4 border-outline-variant rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] opacity-40 grayscale cursor-not-allowed">
<span className="material-symbols-outlined text-5xl text-outline">group_work</span>
</div>
<div className="mt-4 bg-surface-container-low px-4 py-2 border-2 border-dashed border-outline-variant rotate-2">
<span className="font-headline font-black text-outline uppercase">Circular Motion</span>
</div>
</div>
{/* Node 5: Milestone Boss */}
<div className="group relative flex flex-col items-center">
<div className="node-float w-40 h-40 bg-tertiary-container border-4 border-tertiary rounded-xl flex items-center justify-center shadow-[12px_12px_0px_0px_rgba(172,51,42,1)] cursor-not-allowed rotate-3">
<span className="material-symbols-outlined text-8xl text-on-tertiary-container" >military_tech</span>
</div>
<div className="mt-6 bg-tertiary px-8 py-3 border-2 border-black -rotate-3">
<span className="font-headline font-black text-white text-2xl uppercase italic">The Mid-Term Duel</span>
</div>
<div className="absolute -right-32 top-10 w-24 h-24 border-4 border-dashed border-tertiary/30 rounded-full flex items-center justify-center text-tertiary/40">
<span className="material-symbols-outlined text-5xl">lock_open</span>
</div>
</div>
</div>
</div>
{/* Floatting UI Elements (Ink Splatters and Notes) */}
<div className="fixed bottom-10 right-10 z-30">
<button className="bg-primary hover:bg-primary-container text-white w-16 h-16 rounded-lg flex items-center justify-center border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 active:translate-y-1">
<span className="material-symbols-outlined text-3xl">add</span>
</button>
</div>
<div className="fixed top-1/2 -left-16 rotate-90 hidden xl:block">
<div className="bg-secondary-container border-2 border-secondary px-4 py-1 text-xs font-headline font-black text-secondary uppercase tracking-widest">
                Scroll to explore your future
            </div>
</div>
</motion.main>
    </div>
  );
}
