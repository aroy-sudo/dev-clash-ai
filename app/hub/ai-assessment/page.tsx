'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  
  return (
    <div className="w-full min-h-screen relative">
      <motion.main className="max-w-6xl mx-auto px-4 py-12 md:py-20" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
{/* Report Card Container */}
<div className="relative bg-surface-container-lowest p-8 md:p-16 shadow-xl border-l-[30px] border-[#133347]/5 rotate-[-0.5deg]">
{/* Marginalia Stats */}
<div className="absolute -right-8 top-12 hidden lg:block w-48 font-handwritten text-tertiary rotate-6 space-y-8">
<div className="space-y-1">
<p className="text-xs uppercase opacity-70">Accuracy</p>
<p className="text-4xl font-bold">84%</p>
<div className="w-full h-2 bg-surface-container border border-tertiary overflow-hidden">
<div className="h-full bg-tertiary" ></div>
</div>
</div>
<div className="space-y-1">
<p className="text-xs uppercase opacity-70">Time Taken</p>
<p className="text-3xl font-bold">14m 22s</p>
<p className="text-[10px] leading-tight">"A bit rushed in section 2!"</p>
</div>
<div className="space-y-1">
<p className="text-xs uppercase opacity-70">Difficulty</p>
<p className="text-2xl font-bold">Hardest</p>
</div>
</div>
{/* Header Section */}
<div className="border-b-2 border-dashed border-outline-variant pb-8 mb-12 relative">
<div className="absolute -top-4 -left-4 text-tertiary font-handwritten text-6xl rotate-[-15deg] opacity-80">
                    B+
                </div>
<h1 className="font-headline text-5xl font-black uppercase tracking-tighter text-on-surface">
                    Assessment Result
                </h1>
<p className="font-body text-outline mt-2 uppercase tracking-widest text-sm">Course: Advanced Vector Dynamics / ID: #AI-992-TX</p>
</div>
{/* Main Feedback Grid */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
{/* Summary Text Section */}
<div className="lg:col-span-7 space-y-8">
<div>
<h2 className="font-headline text-2xl font-bold mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">analytics</span>
                            Tutor's Review
                        </h2>
<p className="font-handwritten text-xl leading-relaxed text-on-surface-variant">
                            Overall, a strong performance in geometric reasoning. You clearly understand the <span className="scribble-underline">fundamental constraints</span> of the system. However, your application of Euler's variables remains inconsistent. Look at how you handled Question 4 – you almost had it, then overshot the vector sum! 
                        </p>
</div>
<div className="space-y-4">
<h3 className="font-headline text-lg font-bold uppercase tracking-tight">Key Learnings</h3>
<div className="space-y-6">
{/* Strength */}
<div className="flex gap-4 items-start p-4 bg-primary/5 rounded-xl border-l-4 border-primary">
<span className="material-symbols-outlined text-primary text-3xl font-bold">check_circle</span>
<div>
<h4 className="font-headline font-bold">Asymmetric Loading</h4>
<p className="text-sm opacity-80">Excellent grasp of non-linear force distribution. Your math here was flawless.</p>
</div>
</div>
{/* Weakness */}
<div className="flex gap-4 items-start p-4 bg-tertiary/5 rounded-xl border-l-4 border-tertiary relative overflow-hidden">
<span className="material-symbols-outlined text-tertiary text-3xl font-bold">error</span>
<div>
<h4 className="font-headline font-bold">Tension Coefficients</h4>
<p className="text-sm opacity-80">You're still defaulting to linear models. This resulted in a 12% calculation error in Section C.</p>
</div>
<div className="absolute -right-4 -top-4 opacity-10">
<span className="material-symbols-outlined text-9xl">close</span>
</div>
</div>
</div>
</div>
</div>
{/* Visual Grid Markup Section */}
<div className="lg:col-span-5 relative">
<div className="bg-surface-container-low p-6 sketchy-border aspect-square relative flex flex-col items-center justify-center overflow-hidden">
{/* Blueprint Grid Background */}
<div className="absolute inset-0 opacity-10" ></div>
{/* The "Sketched" Graphic */}
<div className="relative w-full h-full flex flex-col items-center justify-center">
<svg className="w-4/5 h-4/5 text-primary opacity-60" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 100 100">
<path d="M10 90 L50 10 L90 90 Z" strokeDasharray="4 2"></path>
<circle cx="50" cy="50" r="30" strokeDasharray="2 4"></circle>
<path d="M0 50 H100 M50 0 V100" opacity="0.3" strokeWidth="0.5"></path>
</svg>
{/* Messy Red Circle Markup */}
<div className="absolute top-[20%] right-[15%] w-24 h-24 red-circle flex items-center justify-center p-2 text-center pointer-events-none">
<span className="font-handwritten text-tertiary text-xs leading-none font-bold">RE-CALCULATE<br/>RADIUS!</span>
</div>
{/* Bold Green Checkmark */}
<div className="absolute bottom-[20%] left-[20%] rotate-[-10deg]">
<span className="material-symbols-outlined text-primary text-6xl" >check_circle</span>
<span className="font-handwritten text-primary text-sm block -mt-2 font-bold">PERFECT SLANT</span>
</div>
</div>
</div>
<div className="mt-4 font-handwritten text-center text-outline text-sm">
                        Figure 1.2: Geometric Tension Map (Calculated vs Expected)
                    </div>
</div>
</div>
{/* CTA Section */}
<div className="mt-16 flex flex-col md:flex-row gap-6 items-center justify-between pt-12 border-t-2 border-[#133347]/5">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white shadow-lg">
<span className="material-symbols-outlined">auto_awesome</span>
</div>
<div>
<p className="font-headline font-bold text-sm">AI Learning Path Generated</p>
<p className="text-xs opacity-60">Focusing on "Tension Modeling" next.</p>
</div>
</div>
<div className="flex gap-4">
<button className="px-8 py-3 bg-primary text-on-primary font-headline font-bold uppercase tracking-widest rounded-xl hover:bg-primary-container transition-all active:scale-95 shadow-lg border-b-4 border-on-primary-fixed-variant">
                        Review Incorrect
                    </button>
<button className="px-8 py-3 bg-secondary text-on-secondary font-headline font-bold uppercase tracking-widest rounded-xl hover:bg-secondary-container transition-all active:scale-95 shadow-lg border-b-4 border-on-secondary-fixed-variant">
                        Next Lesson
                    </button>
</div>
</div>
</div>
{/* Secondary Content: Recommended Reading */}
<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="bg-surface-container-high p-6 rounded-3xl border-2 border-dashed border-outline-variant hover:rotate-1 transition-transform">
<h4 className="font-headline font-bold text-lg mb-2">Vector Anatomy 101</h4>
<p className="text-sm opacity-70 mb-4">A refresher on basic tension points.</p>
<a className="text-primary font-bold text-sm flex items-center gap-1" href="#">Open PDF <span className="material-symbols-outlined text-xs">open_in_new</span></a>
</div>
<div className="bg-surface-container-high p-6 rounded-3xl border-2 border-dashed border-outline-variant hover:-rotate-1 transition-transform">
<h4 className="font-headline font-bold text-lg mb-2">The Golden Ratio</h4>
<p className="text-sm opacity-70 mb-4">Mastering balance in asymmetric design.</p>
<a className="text-primary font-bold text-sm flex items-center gap-1" href="#">Watch Video <span className="material-symbols-outlined text-xs">play_circle</span></a>
</div>
<div className="bg-surface-container-high p-6 rounded-3xl border-2 border-dashed border-outline-variant hover:rotate-2 transition-transform">
<h4 className="font-headline font-bold text-lg mb-2">Euler’s variables</h4>
<p className="text-sm opacity-70 mb-4">Worksheets to fix your calculation errors.</p>
<a className="text-primary font-bold text-sm flex items-center gap-1" href="#">Download Zip <span className="material-symbols-outlined text-xs">download</span></a>
</div>
</div>
</motion.main>
    </div>
  );
}
