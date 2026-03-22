'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  
  return (
    <div className="w-full min-h-screen relative">
      <header className="bg-[#f6faff] dark:bg-[#133347] flex justify-between items-center w-full px-6 py-4 mx-auto fixed top-0 z-50">
<div className="font-['Space_Grotesk'] font-bold tracking-tight text-2xl font-black text-[#006b5c] dark:text-[#00bfa5]">
            Vector
        </div>
<div className="flex items-center gap-6">
<span className="material-symbols-outlined text-[#006b5c] dark:text-[#00bfa5] cursor-pointer hover:opacity-80 transition-opacity">help_outline</span>
</div>
</header><nav className="fixed left-0 top-0 h-full z-40 flex flex-col py-8 bg-[#f6faff] dark:bg-[#133347] h-screen w-20 md:w-64 border-r-[0.5px] border-[#133347]/10">
<div className="mt-16 px-6 mb-12">
<div className="flex items-center gap-3 mb-2">
<div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center border-2 border-on-background/10">
<img alt="User" className="rounded-full" data-alt="User avatar placeholder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJKBJqoYByiYOhNOeEBBVtjAQ4IVreIA2z8CXkod6QuKybEHfm6ZxBA0xjB80jbNXmmihAu2LpUvLdOT050sezJQnfAlIjp9pEpLFYwIinVUJlMJNBzU-sN-9LjQEKg_VDS6IAXkwfkuIZGrejCK9Ags-fDff8T6NmISOeeqOYxUJbI8SgnWmlbVMFU83sTElRtUwgeWEqSXtdfje0FqPhuI26_U1MwKFzlBkBH6SxL6Z80EivzDhaO8GZCFmTe4ckVVYvlG5lPws"/>
</div>
<div className="hidden md:block">
<p className="font-['Work_Sans'] text-sm uppercase tracking-widest text-[#006b5c]">Step 3 of 3</p>
<p className="font-headline font-bold text-on-surface">Focus</p>
</div>
</div>
</div>
<div className="flex flex-col gap-2">
{/* Active State Focus (Step 3) */}
<a className="flex items-center gap-4 py-3 transition-all duration-300 ease-in-out text-[#133347]/50 dark:text-[#f6faff]/50 pl-4 hover:bg-[#00bfa5]/10" href="#">
<span className="material-symbols-outlined" data-icon="edit">edit</span>
<span className="hidden md:block font-['Work_Sans'] text-sm uppercase tracking-widest">Identity</span>
</a>
<a className="flex items-center gap-4 py-3 transition-all duration-300 ease-in-out text-[#133347]/50 dark:text-[#f6faff]/50 pl-4 hover:bg-[#00bfa5]/10" href="#">
<span className="material-symbols-outlined" data-icon="architecture">architecture</span>
<span className="hidden md:block font-['Work_Sans'] text-sm uppercase tracking-widest">Path</span>
</a>
<a className="flex items-center gap-4 py-3 transition-all duration-300 ease-in-out text-[#006b5c] dark:text-[#00bfa5] font-black border-l-4 border-[#fdc003] pl-4" href="#">
<span className="material-symbols-outlined" data-icon="biotech">biotech</span>
<span className="hidden md:block font-['Work_Sans'] text-sm uppercase tracking-widest">Focus</span>
</a>
</div>
<div className="mt-auto px-6 hidden md:block">
<button className="w-full py-4 bg-primary text-on-primary font-headline font-bold rounded-xl sketchy-border hover:bg-primary-container transition-colors duration-300 shadow-lg" onClick={() => router.push("/hub")}>
                Continue Draft
            </button>
</div>
</nav><motion.main className="ml-20 md:ml-64 pt-24 pb-32 px-8 min-h-screen" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
{/* Sidebar Header */}
<div className="lg:col-span-4 sticky top-24 self-start">
<h1 className="font-headline text-5xl md:text-6xl font-black text-on-background leading-none mb-6">
                    Where do you <span className="scribble-underline px-1">stand</span> right now?
                </h1>
<p className="font-body text-xl text-on-surface-variant max-w-sm mb-8">
                    Let's map out your current knowledge. Every tick is a brick in your future foundation.
                </p>
{/* Status Card */}
<div className="bg-surface-container-low p-6 rounded-xl border-2 border-outline-variant/20 -rotate-1 shadow-sm">
<h3 className="font-headline font-bold text-tertiary mb-4 flex items-center gap-2">
<span className="material-symbols-outlined" data-icon="history_edu">history_edu</span>
                        Drafting Stats
                    </h3>
<div className="space-y-4">
<div className="flex justify-between items-end">
<span className="font-label text-sm uppercase tracking-tighter">Syllabus Covered</span>
<span className="font-headline font-bold text-2xl">42%</span>
</div>
<div className="h-4 bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-secondary w-[42%] flex items-center justify-end px-1">
<div className="w-2 h-2 rounded-full bg-on-secondary"></div>
</div>
</div>
</div>
</div>
</div>
{/* The Blueprint Grid */}
<div className="lg:col-span-8">
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
{/* Class 11th Section */}
<section className="space-y-6">
<div className="flex items-center gap-4 mb-8">
<span className="text-4xl font-headline font-black text-secondary/30">11</span>
<h2 className="font-headline text-3xl font-bold tracking-tight">Class 11th</h2>
<div className="h-px flex-grow bg-outline-variant/30"></div>
</div>
{/* Physics Card */}
<div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-primary shadow-md transform hover:rotate-1 transition-transform cursor-default">
<div className="flex justify-between items-start mb-4">
<h3 className="font-headline text-xl font-bold flex items-center gap-2">
<span className="material-symbols-outlined text-primary" data-icon="bolt">bolt</span>
                                    Physics
                                </h3>
<span className="bg-primary/10 text-primary font-label text-[10px] px-2 py-1 rounded">CORE</span>
</div>
<ul className="space-y-3">
<li className="flex items-center gap-3 group">
<div className="w-5 h-5 hand-drawn-circle flex items-center justify-center text-secondary group-hover:bg-secondary-container transition-colors">
<span className="material-symbols-outlined text-xs" data-icon="check" >check</span>
</div>
<span className="font-body text-sm font-medium">Mechanics &amp; Kinematics</span>
</li>
<li className="flex items-center gap-3 group">
<div className="w-5 h-5 hand-drawn-circle flex items-center justify-center text-outline group-hover:bg-surface-container-high transition-colors"></div>
<span className="font-body text-sm">Thermodynamics</span>
</li>
</ul>
</div>
{/* Chemistry Section */}
<div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-tertiary shadow-md rotate-1">
<h3 className="font-headline text-xl font-bold flex items-center gap-2 mb-6">
<span className="material-symbols-outlined text-tertiary" data-icon="science">science</span>
                                Chemistry
                            </h3>
<div className="space-y-6">
<div>
<p className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant mb-2">Inorganic</p>
<div className="flex items-center gap-3">
<div className="w-5 h-5 hand-drawn-circle flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-xs" data-icon="check">check</span>
</div>
<span className="font-body text-sm">Periodic Table</span>
</div>
</div>
<div>
<p className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant mb-2">Physical</p>
<div className="flex items-center gap-3">
<div className="w-5 h-5 hand-drawn-circle flex items-center justify-center text-outline"></div>
<span className="font-body text-sm">Mole Concept</span>
</div>
</div>
</div>
</div>
</section>
{/* Class 12th Section */}
<section className="space-y-6">
<div className="flex items-center gap-4 mb-8">
<span className="text-4xl font-headline font-black text-primary/30">12</span>
<h2 className="font-headline text-3xl font-bold tracking-tight">Class 12th</h2>
<div className="h-px flex-grow bg-outline-variant/30"></div>
</div>
{/* Maths Card */}
<div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-secondary shadow-md -rotate-1">
<h3 className="font-headline text-xl font-bold flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-secondary" data-icon="calculate">calculate</span>
                                Mathematics
                            </h3>
<ul className="space-y-3">
<li className="flex items-center gap-3 group">
<div className="w-5 h-5 hand-drawn-circle flex items-center justify-center text-secondary bg-secondary-container">
<span className="material-symbols-outlined text-xs" data-icon="check" >check</span>
</div>
<span className="font-body text-sm font-bold">Calculus II</span>
</li>
<li className="flex items-center gap-3 group">
<div className="w-5 h-5 hand-drawn-circle flex items-center justify-center text-outline"></div>
<span className="font-body text-sm">Vector Algebra</span>
</li>
<li className="flex items-center gap-3 group">
<div className="w-5 h-5 hand-drawn-circle flex items-center justify-center text-outline"></div>
<span className="font-body text-sm">Probability</span>
</li>
</ul>
</div>
{/* Organic Chemistry (Deep Dive) */}
<div className="bg-inverse-surface text-background p-6 rounded-xl shadow-xl sketchy-border">
<div className="flex items-center justify-between mb-4">
<p className="font-label text-[11px] uppercase tracking-tighter text-secondary-container">Deep Focus</p>
<span className="material-symbols-outlined text-secondary-container" data-icon="auto_awesome">auto_awesome</span>
</div>
<h3 className="font-headline text-2xl font-black mb-2">Organic Synthesis</h3>
<p className="font-body text-xs text-background/60 mb-6">Class 12th Chemistry Advanced Path</p>
<div className="p-4 bg-background/5 rounded border border-background/10 space-y-3">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-sm" data-icon="radio_button_checked">radio_button_checked</span>
<span className="font-body text-sm">Alcohols &amp; Ethers</span>
</div>
<div className="flex items-center gap-2 text-background/40">
<span className="material-symbols-outlined text-sm" data-icon="radio_button_unchecked">radio_button_unchecked</span>
<span className="font-body text-sm">Aldehydes</span>
</div>
</div>
</div>
</section>
</div>
{/* Hand-drawn Annotation */}
<div className="mt-12 relative">
<div className="absolute -top-12 -left-8 pointer-events-none">
<svg className="text-tertiary" height="60" viewBox="0 0 60 60" width="60">
<path d="M10 50 L 50 10 M 40 10 L 50 10 L 50 20" fill="none" stroke="currentColor" strokeWidth="2"></path>
</svg>
</div>
<p className="font-headline font-bold text-lg text-tertiary rotate-2">
                        Wait! Don't forget your revision cycles.
                    </p>
</div>
</div>
</div>
</motion.main><nav className="fixed bottom-8 left-0 w-full z-50 flex justify-between px-12 items-center bg-transparent pointer-events-none">
<div className="pointer-events-auto">
<button className="flex flex-col items-center justify-center text-[#133347] dark:text-[#f6faff] p-4 opacity-40 hover:scale-105 transition-transform font-['Space_Grotesk'] text-[12px] font-bold" onClick={() => router.push("/onboarding/path")}>
<span className="material-symbols-outlined mb-1" data-icon="arrow_back">arrow_back</span>
Back
</button>
</div>
<div className="flex flex-col items-center justify-center bg-[#fdc003] text-[#133347] rounded-full p-4 scale-110 shadow-xl border-2 border-on-background pointer-events-auto">
<span className="material-symbols-outlined mb-1" data-icon="gesture">gesture</span>
<span className="font-['Space_Grotesk'] text-[12px] font-bold">The Blueprint</span>
</div>
<div className="pointer-events-auto">
<button className="flex flex-col items-center justify-center text-[#133347] dark:text-[#f6faff] p-4 hover:scale-105 transition-transform group font-['Space_Grotesk'] text-[12px] font-bold bg-white rounded-xl shadow-lg border-2 border-[#133347] px-6" onClick={() => router.push("/hub")}>
<span className="material-symbols-outlined group-hover:translate-x-1 transition-transform mb-1" data-icon="arrow_forward">arrow_forward</span>
Next
</button>
</div>
</nav>
    </div>
  );
}
