'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  
  return (
    <div className="w-full min-h-screen relative">
      <motion.main className="max-w-screen-2xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
{/* Question Content Area */}
<div className="lg:col-span-8 space-y-8">
<div className="bg-surface-container-lowest p-8 md:p-12 rotate-[-0.5deg] sketchy-border">
<div className="mb-8">
<span className="font-headline text-secondary font-bold text-sm uppercase tracking-widest mb-2 block">Question 14</span>
<h1 className="font-headline text-3xl md:text-4xl text-on-surface font-bold leading-tight">
                        Calculate the <span className="marker-stroke">maximum load-bearing capacity</span> of a reinforced concrete beam with the following vector dimensions?
                    </h1>
</div>
<div className="aspect-video bg-surface-container-low mb-10 flex items-center justify-center relative overflow-hidden rounded-xl border-dashed border-2 border-outline/30">
<img alt="Blueprint" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-multiply" data-alt="Technical architectural blueprint of a structural beam system" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBReiyOZZTdXd8YYlpKRi_wCk96TMm0xeS-Sm67juMgso2REHTRGzDpa1KszWaI4GdCkkm5Veliyiq3eiRvhPZ_o8rXbVMCX-8svhVwMlAOZFc4XNoni2y489G51JviTzDKP4DDezXIEy4-XCmUpTUn3JavrH7BpIPSUQe9pnbEhfXheJdfPvMhtx2ZSv7OstkIad8dKrCoYnnwqnmVUcqiC16dJ1OpqU_QTv1G64gcDksBpXABHe__ZNedGP1n598rwpe5qop8LLw"/>
<div className="relative z-10 flex flex-col items-center">
<span className="material-symbols-outlined text-6xl text-primary/40 mb-2">architecture</span>
<p className="font-headline text-on-surface/50 font-medium">FIG 14.2: CROSS-SECTIONAL ANALYSIS</p>
</div>
</div>
<div className="space-y-4">
{/* Option A */}
<label className="group flex items-center p-5 cursor-pointer bg-surface rounded-xl border-2 border-transparent hover:border-primary/30 transition-all duration-200">
<input className="w-6 h-6 border-2 border-primary text-primary focus:ring-secondary" name="exam_option" type="radio"/>
<div className="ml-4">
<span className="block font-headline font-bold text-on-surface">Option A</span>
<span className="text-on-surface-variant">The tensile strength exceeds 450 MPa under uniform distribution.</span>
</div>
</label>
{/* Option B (Selected) */}
<label className="group flex items-center p-5 cursor-pointer bg-secondary-container/10 border-2 border-secondary rounded-xl transition-all duration-200 shadow-[4px_4px_0px_0px_#fdc003]">
<input defaultChecked className="w-6 h-6 border-2 border-secondary text-secondary focus:ring-secondary" name="exam_option" type="radio"/>
<div className="ml-4">
<span className="block font-headline font-bold text-secondary">Option B</span>
<span className="text-on-surface font-medium">Standard vector displacement occurs at 12.5kN/m² as per FIG 14.2.</span>
</div>
</label>
{/* Option C */}
<label className="group flex items-center p-5 cursor-pointer bg-surface rounded-xl border-2 border-transparent hover:border-primary/30 transition-all duration-200">
<input className="w-6 h-6 border-2 border-primary text-primary focus:ring-secondary" name="exam_option" type="radio"/>
<div className="ml-4">
<span className="block font-headline font-bold text-on-surface">Option C</span>
<span className="text-on-surface-variant">Zero-gravity assumption yields a differential of 0.04 across the axis.</span>
</div>
</label>
</div>
</div>
{/* Hand-drawn Navigation Buttons */}
<div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4">
<button className="w-full sm:w-auto px-10 py-4 font-headline font-black uppercase tracking-widest text-[#133347] bg-surface-container-high sketchy-border hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                    Back
                </button>
<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
<button className="px-10 py-4 font-headline font-black uppercase tracking-widest text-on-primary bg-primary sketchy-border hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                        Next Question
                    </button>
<button className="px-10 py-4 font-headline font-black uppercase tracking-widest text-on-tertiary bg-tertiary sketchy-border-secondary hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all" >
                        Submit Exam
                    </button>
</div>
</div>
</div>
{/* Sidebar Navigation */}
<div className="lg:col-span-4 space-y-6">
<div className="bg-surface-container-low p-6 rotate-[1deg] sketchy-border">
<div className="flex items-center justify-between mb-6">
<h3 className="font-headline font-black uppercase text-xl text-on-surface">Navigation</h3>
<div className="flex items-center gap-2 text-secondary">
<span className="material-symbols-outlined text-lg">timer</span>
<span className="font-headline font-bold">42:15</span>
</div>
</div>
<div className="grid grid-cols-5 gap-3">
{/* Numbers 1-30 mockup */}
<div className="aspect-square flex items-center justify-center font-headline font-bold bg-primary text-on-primary rounded border border-on-surface/20">1</div>
<div className="aspect-square flex items-center justify-center font-headline font-bold bg-primary text-on-primary rounded border border-on-surface/20">2</div>
<div className="aspect-square flex items-center justify-center font-headline font-bold bg-primary text-on-primary rounded border border-on-surface/20">3</div>
<div className="aspect-square flex items-center justify-center font-headline font-bold bg-surface-container-highest text-primary rounded border border-on-surface/20">4</div>
<div className="aspect-square flex items-center justify-center font-headline font-bold bg-surface-container-highest text-primary rounded border border-on-surface/20">5</div>
<div className="aspect-square flex items-center justify-center font-headline font-bold bg-surface-container-highest text-primary rounded border border-on-surface/20">6</div>
<div className="aspect-square flex items-center justify-center font-headline font-bold bg-primary text-on-primary rounded border border-on-surface/20">7</div>
<div className="aspect-square flex items-center justify-center font-headline font-bold bg-primary text-on-primary rounded border border-on-surface/20">8</div>
<div className="aspect-square flex items-center justify-center font-headline font-bold bg-primary text-on-primary rounded border border-on-surface/20">9</div>
<div className="aspect-square flex items-center justify-center font-headline font-bold bg-primary text-on-primary rounded border border-on-surface/20">10</div>
<div className="aspect-square flex items-center justify-center font-headline font-bold bg-primary text-on-primary rounded border border-on-surface/20">11</div>
<div className="aspect-square flex items-center justify-center font-headline font-bold bg-primary text-on-primary rounded border border-on-surface/20">12</div>
<div className="aspect-square flex items-center justify-center font-headline font-bold bg-primary text-on-primary rounded border border-on-surface/20">13</div>
<div className="aspect-square flex items-center justify-center font-headline font-bold bg-secondary-container text-on-secondary-container rounded-sm border-2 border-on-surface scale-110 shadow-sm">14</div>
<div className="aspect-square flex items-center justify-center font-headline font-bold bg-surface-container-lowest text-on-surface/20 rounded border border-on-surface/10">15</div>
<div className="aspect-square flex items-center justify-center font-headline font-bold bg-surface-container-lowest text-on-surface/20 rounded border border-on-surface/10">16</div>
<div className="aspect-square flex items-center justify-center font-headline font-bold bg-surface-container-lowest text-on-surface/20 rounded border border-on-surface/10">17</div>
<div className="aspect-square flex items-center justify-center font-headline font-bold bg-tertiary-container text-on-tertiary-container rounded border border-tertiary/40" title="Flagged for review">18</div>
<div className="aspect-square flex items-center justify-center font-headline font-bold bg-surface-container-lowest text-on-surface/20 rounded border border-on-surface/10">19</div>
<div className="aspect-square flex items-center justify-center font-headline font-bold bg-surface-container-lowest text-on-surface/20 rounded border border-on-surface/10">20</div>
</div>
<div className="mt-8 pt-6 border-t-2 border-on-surface/5 space-y-4">
<div className="flex items-center gap-3">
<div className="w-4 h-4 bg-primary rounded"></div>
<span className="text-xs font-headline font-bold uppercase tracking-wider text-on-surface-variant">Completed</span>
</div>
<div className="flex items-center gap-3">
<div className="w-4 h-4 bg-secondary-container rounded-sm border-2 border-on-surface"></div>
<span className="text-xs font-headline font-bold uppercase tracking-wider text-on-surface-variant">Current</span>
</div>
<div className="flex items-center gap-3">
<div className="w-4 h-4 bg-tertiary-container rounded"></div>
<span className="text-xs font-headline font-bold uppercase tracking-wider text-on-surface-variant">Flagged</span>
</div>
</div>
</div>
{/* Quick Notes Area */}
<div className="bg-surface-container-highest p-6 rotate-[-1.2deg] sketchy-border-secondary">
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-secondary">edit_note</span>
<h3 className="font-headline font-black uppercase text-lg text-secondary">Drafting Area</h3>
</div>
<p className="text-xs text-on-surface-variant italic leading-relaxed mb-4">
                    Use this space for temporary calculations or scribbles. Notes are not graded.
                </p>
<div className="w-full h-32 bg-surface-container-lowest/50 border-2 border-dashed border-secondary/30 rounded-lg flex items-center justify-center">
<span className="text-secondary/40 material-symbols-outlined text-4xl">draw</span>
</div>
</div>
</div>
</motion.main>
    </div>
  );
}
