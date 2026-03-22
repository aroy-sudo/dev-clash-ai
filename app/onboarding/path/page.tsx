'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  
  return (
    <div className="w-full min-h-screen relative">
      <header className="bg-[#f6faff] dark:bg-[#133347] flex justify-between items-center w-full px-6 py-4 mx-auto fixed top-0 z-40">
<div className="flex items-center gap-4">
<span className="font-['Space_Grotesk'] font-bold tracking-tight text-2xl font-black text-[#006b5c] dark:text-[#00bfa5]">Vector</span>
</div>
<div className="flex items-center gap-6">
<div className="hidden md:flex gap-8 font-['Space_Grotesk'] font-bold text-sm">
<a className="text-[#133347] dark:text-[#f6faff] hover:opacity-80 transition-opacity" href="#">Curriculum</a>
<a className="text-[#133347] dark:text-[#f6faff] hover:opacity-80 transition-opacity" href="#">Archive</a>
<a className="text-[#133347] dark:text-[#f6faff] hover:opacity-80 transition-opacity" href="#">Resources</a>
</div>
<span className="material-symbols-outlined text-[#006b5c] dark:text-[#00bfa5] cursor-pointer" data-icon="help_outline">help_outline</span>
</div>
</header><nav className="fixed left-0 top-0 h-full z-40 flex flex-col py-8 bg-[#f6faff] dark:bg-[#133347] h-screen w-20 md:w-64 border-r-[0.5px] border-[#133347]/10 pt-24">
<div className="px-6 mb-12">
<p className="font-['Work_Sans'] text-xs uppercase tracking-widest text-[#006b5c] mb-1">Step 2 of 3</p>
<h3 className="font-headline font-bold text-lg text-[#133347]">Drafting your future</h3>
</div>
<div className="flex flex-col gap-2 w-full">
<div className="flex items-center gap-3 py-3 text-[#133347]/50 dark:text-[#f6faff]/50 pl-4 font-['Work_Sans'] text-sm uppercase tracking-widest transition-all duration-300 ease-in-out hover:bg-[#00bfa5]/10 cursor-pointer">
<span className="material-symbols-outlined" data-icon="edit">edit</span>
<span className="hidden md:block">Identity</span>
</div>
<div className="flex items-center gap-3 py-3 text-[#006b5c] dark:text-[#00bfa5] font-black border-l-4 border-[#fdc003] pl-4 font-['Work_Sans'] text-sm uppercase tracking-widest transition-all duration-300 ease-in-out cursor-default">
<span className="material-symbols-outlined" data-icon="architecture">architecture</span>
<span className="hidden md:block">Path</span>
</div>
<div className="flex items-center gap-3 py-3 text-[#133347]/50 dark:text-[#f6faff]/50 pl-4 font-['Work_Sans'] text-sm uppercase tracking-widest transition-all duration-300 ease-in-out hover:bg-[#00bfa5]/10 cursor-pointer">
<span className="material-symbols-outlined" data-icon="biotech">biotech</span>
<span className="hidden md:block">Focus</span>
</div>
</div>
<div className="mt-auto px-6">
<div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border-2 border-primary mb-4">
<img alt="User Draft Profile" data-alt="User profile avatar illustration with creative glasses" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnzO0UckEXYBDHg8BRO7n6cttQX8KvgHGn9RPU4lhnyx2GnzTGS3oAZVqeJu3sW5KGYn96sGfu8z3rU74PwoZ4qMBsVz2JHx-qJoC6tDOZb4U-zYetMbVVj6bWz_tbKV4w6ZFM5oqMWnm8feqtqhpk1r9AoFj6xMx-PSm9VwNiu3CV3GTp8VmC5bJuzzfj5hIahQ6D1scGPQouijvLobmbbaAIFsm0p2ohvtliMZTkuzueG1SzzsRAcRMIuLE4H1z72he5LWcS4GU"/>
</div>
<button className="hidden md:block w-full py-3 bg-primary text-on-primary font-headline font-bold rounded-lg sketchy-border transition-all" onClick={() => router.push("/onboarding/blueprint")}>Continue Draft</button>
</div>
</nav><motion.main className="md:ml-64 pt-20 pb-32 min-h-screen flex flex-col items-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
<div className="max-w-6xl w-full px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
{/* Left Narrative */}
<div className="lg:col-span-5 flex flex-col gap-6">
<h1 className="font-headline text-6xl md:text-7xl font-black text-on-background leading-tight tracking-tighter">
                    Choose <br/> <span className="hand-drawn-underline">your path.</span>
</h1>
<p className="font-body text-xl text-on-surface-variant max-w-md leading-relaxed">
                    The architect’s journey isn’t linear. Decide how you want to build your expertise. One is a structured blueprint, the other a boundless exploration.
                </p>
{/* Diverging Path Illustration */}
<div className="relative w-full h-48 mt-8 flex justify-center overflow-visible">
<svg className="w-full h-full stroke-on-background fill-none"  viewBox="0 0 400 200">
{/* Path base */}
<path d="M200 200 Q200 150 200 130"></path>
{/* Left fork */}
<path d="M200 130 Q200 80 50 20"></path>
{/* Right fork */}
<path d="M200 130 Q200 80 350 20"></path>
{/* Decorative scribbles */}
<path className="stroke-secondary" d="M190 145 Q195 140 205 142" ></path>
<circle className="fill-primary" cx="50" cy="20" r="8"></circle>
<circle className="fill-tertiary" cx="350" cy="20" r="8"></circle>
</svg>
</div>
</div>
{/* Right: Choice Cards */}
<div className="lg:col-span-7 grid md:grid-cols-2 gap-8">
{/* Online Course Card */}
<div className="group relative bg-surface-container-low p-8 rounded-xl sketchy-border transition-all duration-300 cursor-pointer flex flex-col h-full -rotate-1 hover:rotate-0" onClick={() => router.push("/onboarding/blueprint")}>
<div className="mb-6 h-40 bg-white/50 rounded-lg flex items-center justify-center relative overflow-hidden">
<span className="material-symbols-outlined text-7xl text-primary" data-icon="school">school</span>
{/* Glowing path element */}
<div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
</div>
<h3 className="font-headline text-2xl font-extrabold mb-3 text-on-background">Online Course</h3>
<p className="font-body text-sm text-on-surface-variant flex-grow">
                        A structured, mentor-led sequence. Follow the curated blueprint from fundamentals to mastery with a cohort of fellow draftsmen.
                    </p>
<div className="mt-8 flex items-center justify-between">
<span className="text-xs font-label uppercase tracking-widest font-bold text-primary">Curated Flow</span>
<span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform" data-icon="arrow_forward">arrow_forward</span>
</div>
</div>
{/* Free Learning Card */}
<div className="group relative bg-surface-container-low p-8 rounded-xl sketchy-border transition-all duration-300 cursor-pointer flex flex-col h-full rotate-1 hover:rotate-0" onClick={() => router.push("/onboarding/blueprint")}>
<div className="mb-6 h-40 bg-white/50 rounded-lg flex items-center justify-center relative overflow-hidden">
<span className="material-symbols-outlined text-7xl text-tertiary" data-icon="explore">explore</span>
{/* Compass overlay */}
<div className="absolute inset-0 bg-tertiary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
</div>
<h3 className="font-headline text-2xl font-extrabold mb-3 text-on-background">Free Learning</h3>
<p className="font-body text-sm text-on-surface-variant flex-grow">
                        The open library approach. Browse the archives at your own pace. Ideal for those who prefer to draft their own curriculum.
                    </p>
<div className="mt-8 flex items-center justify-between">
<span className="text-xs font-label uppercase tracking-widest font-bold text-tertiary">Self-Directed</span>
<span className="material-symbols-outlined text-tertiary group-hover:translate-x-2 transition-transform" data-icon="arrow_forward">arrow_forward</span>
</div>
</div>
</div>
</div>
{/* Secondary Affirmation Section */}
<section className="mt-12 max-w-4xl px-8 text-center">
<div className="bg-secondary-container/20 p-8 rounded-full border-2 border-dashed border-secondary/30">
<p className="font-headline font-medium text-[#133347] italic">
                    "Every great structure begins with a single, intentional line."
                </p>
</div>
</section>
</motion.main><footer className="fixed bottom-8 left-0 w-full z-50 flex justify-between px-12 items-center bg-transparent pointer-events-none">
<div className="pointer-events-auto">
<button className="flex flex-col items-center justify-center text-[#133347] dark:text-[#f6faff] p-4 opacity-40 hover:opacity-100 transition-all font-['Space_Grotesk'] font-bold text-[12px]" onClick={() => router.push("/onboarding/target")}>
<span className="material-symbols-outlined mb-1" data-icon="arrow_back">arrow_back</span>
Back
</button>
</div>
<div className="flex items-center gap-2 px-8 py-3 bg-white/80 backdrop-blur-md rounded-full shadow-xl pointer-events-auto border border-[var(--border-subtle)]">
<div className="w-2 h-2 rounded-full bg-black/20"></div>
<div className="w-8 h-2 rounded-full bg-[#fdc003]"></div>
<div className="w-2 h-2 rounded-full bg-black/20"></div>
</div>
<div className="pointer-events-auto">
<button className="flex flex-col items-center justify-center bg-[#fdc003] text-[#133347] rounded-full p-4 scale-110 shadow-lg hover:scale-115 transition-transform font-['Space_Grotesk'] font-bold text-[12px] active:scale-90 duration-150" onClick={() => router.push("/onboarding/blueprint")}>
<span className="material-symbols-outlined font-bold mb-1" data-icon="arrow_forward">arrow_forward</span>
Next
</button>
</div>
</footer>
    </div>
  );
}
