'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/onboardingStore';

export default function Page() {
  const router = useRouter();
  const { setTargetExam, setUserClass, targetExam } = useOnboardingStore();
  const [step, setStep] = useState<1 | 2>(1);

  const handleSelectExam = (exam: 'JEE' | 'NEET') => {
    setTargetExam(exam);
    setStep(2);
  };

  const handleSelectClass = (cls: '11th' | '12th' | 'Dropper') => {
    setUserClass(cls);
    router.push("/onboarding/path");
  };
  
  return (
    <div className="w-full min-h-screen relative">
      <header className="bg-[#f6faff] dark:bg-[#133347] flex justify-between items-center w-full px-6 py-4 mx-auto fixed top-0 left-0 z-40">
<div className="flex items-center gap-2">
<span className="text-2xl font-black text-[#006b5c] dark:text-[#00bfa5] font-['Space_Grotesk'] tracking-tight">Vector</span>
</div>
<div className="flex items-center gap-6">
<button className="material-symbols-outlined text-[#133347] dark:text-[#f6faff] hover:opacity-80 transition-opacity" data-icon="help_outline" onClick={() => router.push("/onboarding/path")}>help_outline</button>
</div>
</header><nav className="fixed left-0 top-0 h-full z-40 flex flex-col py-8 bg-[#f6faff] dark:bg-[#133347] h-screen w-20 md:w-64 border-r-[0.5px] border-[#133347]/10 transition-all duration-300 ease-in-out hidden md:flex">
<div className="px-6 mb-12">
<div className="text-[#006b5c] font-black border-l-4 border-[#fdc003] pl-4 mb-1">
<span className="font-['Work_Sans'] text-sm uppercase tracking-widest block">Step 1 of 3</span>
<span className="text-xs opacity-60">Drafting your future</span>
</div>
</div>
<div className="flex flex-col gap-4 w-full">
{/* Active Tab: Identity */}
<a className="text-[#006b5c] dark:text-[#00bfa5] font-black border-l-4 border-[#fdc003] pl-4 flex items-center gap-4 py-3 hover:bg-[#00bfa5]/10 dark:hover:bg-[#00bfa5]/5 transition-all" href="#">
<span className="material-symbols-outlined" data-icon="edit">edit</span>
<span className="font-['Work_Sans'] text-sm uppercase tracking-widest">Identity</span>
</a>
{/* Inactive Tab */}
<a className="text-[#133347]/50 dark:text-[#f6faff]/50 pl-4 flex items-center gap-4 py-3 hover:bg-[#00bfa5]/10 dark:hover:bg-[#00bfa5]/5 transition-all" href="#">
<span className="material-symbols-outlined" data-icon="architecture">architecture</span>
<span className="font-['Work_Sans'] text-sm uppercase tracking-widest">Path</span>
</a>
{/* Inactive Tab */}
<a className="text-[#133347]/50 dark:text-[#f6faff]/50 pl-4 flex items-center gap-4 py-3 hover:bg-[#00bfa5]/10 dark:hover:bg-[#00bfa5]/5 transition-all" href="#">
<span className="material-symbols-outlined" data-icon="biotech">biotech</span>
<span className="font-['Work_Sans'] text-sm uppercase tracking-widest">Focus</span>
</a>
</div>
<div className="mt-auto px-6">
<button className="w-full bg-primary text-on-primary py-4 px-2 font-bold tracking-tight rounded-lg hover:opacity-90 active:scale-95 transition-all">
                Continue Draft
            </button>
</div>
</nav><motion.main className="md:ml-64 pt-20 pb-32 px-6 md:px-12 flex flex-col md:flex-row items-center justify-center min-h-screen gap-12 relative overflow-hidden" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
{/* Background Memphis Shape (Asymmetry) */}
<div className="absolute -top-12 -right-12 w-64 h-64 bg-tertiary-container/20 rounded-full blur-3xl -z-10"></div>
<div className="absolute bottom-20 -left-20 w-80 h-80 bg-secondary-container/10 rounded-full blur-2xl -z-10 rotate-12"></div>
{step === 1 ? (
          <>
            {/* Left Column: Heading */}
            <div className="w-full md:w-1/3 flex flex-col items-start gap-4">
              <div className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container font-bold text-xs uppercase tracking-widest rotate-[-1deg] mb-2">
                Onboarding Flow
              </div>
              <h1 className="font-headline font-black text-6xl md:text-7xl lg:text-8xl text-on-background leading-tight tracking-tighter">
                What's the <span className="scribble-underline text-primary">target?</span>
              </h1>
              <p className="font-body text-xl text-on-surface-variant max-w-sm mt-4 leading-relaxed">
                Every architect needs a blueprint. Select your <span className="font-bold italic">battlefield</span> to begin drafting your curriculum.
              </p>
            </div>
            {/* Center Column: Illustration */}
            <div className="w-full md:w-1/3 relative flex justify-center py-12">
              <div className="relative w-full max-w-[400px] group">
                <div className="absolute -top-8 -left-4 p-4 bg-surface-container-high rounded-full border-2 border-primary/20 animate-bounce transition-transform hover:scale-110">
                  <span className="material-symbols-outlined text-4xl text-primary" data-icon="rocket_launch">rocket_launch</span>
                </div>
                <div className="absolute top-1/2 -right-10 p-4 bg-tertiary-container/30 rounded-xl rotate-12 border-2 border-tertiary/20">
                  <span className="material-symbols-outlined text-4xl text-tertiary" data-icon="emoji_events">emoji_events</span>
                </div>
                <div className="absolute -bottom-4 right-1/4 p-4 bg-secondary-container/40 rounded-full -rotate-6 border-2 border-secondary/20">
                  <span className="material-symbols-outlined text-4xl text-secondary" data-icon="psychology">psychology</span>
                </div>
                <div className="bg-surface-container-low hand-cut-edge p-2 border-[1.5px] border-outline-variant/30 overflow-hidden shadow-sm">
                  <img alt="Minimalist vector illustration of an ambitious student looking up" className="w-full h-auto grayscale contrast-125 opacity-90 mix-blend-multiply" data-alt="Minimalist vector illustration of an ambitious student looking up" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhhXo1YKJfEEqARETBYPb4Fj5kr0mtu7CtX7z3twu6hllxp-I9KDV0ghv9NFoVrnrGKvBVywAzM2DXU8TO4A9qJFgFYQZT0S5HvjOVOwDryYPIMJpEpr05uVxrv1F06J8MdLYXxH9xAA2ULOD647w7XfBdkrappHW0D798WTM4n3lZLJMvpL4IKxfFORtXOSFYqAtwuhQb9LAWZmydaKwivFLmjuLLqOTJxlu0xNgAijBDhO1f0nJpKnuYWYK0VhWzc_0-z_jqzmo"/>
                </div>
              </div>
            </div>
            {/* Right/Bottom Column: Interaction Buttons */}
            <div className="w-full md:w-1/3 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="group relative flex items-center justify-between p-8 bg-[#fdc003] border-4 border-[#133347] text-[#133347] rounded-xl transform hover:-translate-y-1 active:scale-95 transition-all marker-shaded shadow-[8px_8px_0px_0px_rgba(19,51,71,1)] cursor-pointer" onClick={() => handleSelectExam('JEE')}>
                  <div className="flex flex-col items-start">
                    <span className="font-headline font-black text-4xl tracking-tight">JEE</span>
                    <span className="font-body text-sm font-bold opacity-80 uppercase tracking-widest">Engineering Path</span>
                  </div>
                  <span className="material-symbols-outlined text-5xl" data-icon="architecture">architecture</span>
                  <div className="absolute -top-2 -right-2 bg-tertiary text-white text-[10px] font-bold px-2 py-0.5 rounded-full rotate-12">TARGETED</div>
                </div>
                <div className="group relative flex items-center justify-between p-8 bg-surface-container-highest border-2 border-outline-variant text-on-surface rounded-xl transform hover:border-primary transition-all hover:bg-surface-container-low cursor-pointer" onClick={() => handleSelectExam('NEET')} >
                  <div className="flex flex-col items-start">
                    <span className="font-headline font-black text-4xl tracking-tight">NEET</span>
                    <span className="font-body text-sm font-medium opacity-60 uppercase tracking-widest">Medical Journey</span>
                  </div>
                  <span className="material-symbols-outlined text-5xl opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all" data-icon="medical_services">medical_services</span>
                </div>
                <div className="group relative flex items-center justify-between p-6 bg-transparent border-2 border-dashed border-outline-variant text-on-surface-variant rounded-xl hover:bg-surface-container-low transition-all cursor-pointer" onClick={() => router.push("/onboarding/path")} >
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-2xl" data-icon="add_circle">add_circle</span>
                    <span className="font-body font-bold uppercase tracking-widest text-xs">Other Competitive Goals</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Step 2: User Class */}
            <div className="w-full md:w-1/3 flex flex-col items-start gap-4">
              <div className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container font-bold text-xs uppercase tracking-widest rotate-[-1deg] mb-2">
                Academic Phase
              </div>
              <h1 className="font-headline font-black text-6xl md:text-7xl lg:text-8xl text-on-background leading-tight tracking-tighter">
                What's your <span className="scribble-underline text-secondary">status?</span>
              </h1>
              <p className="font-body text-xl text-on-surface-variant max-w-sm mt-4 leading-relaxed">
                Time is the only unrecoverable variable in your equation. Choose your current phase to set your <span className="font-bold italic">deadline</span>.
              </p>
            </div>
            
            <div className="w-full md:w-2/3 flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group relative flex flex-col items-start p-8 bg-surface-container-highest border-4 border-outline-variant text-on-surface rounded-xl transform hover:border-primary transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,107,92,1)] cursor-pointer" onClick={() => handleSelectClass('11th')}>
                  <span className="material-symbols-outlined text-5xl mb-4 text-primary" data-icon="school">school</span>
                  <span className="font-headline font-black text-3xl tracking-tight">11th Grade</span>
                  <span className="font-body text-sm font-medium opacity-60 mt-2">Building the foundation.</span>
                </div>

                <div className="group relative flex flex-col items-start p-8 bg-[#00bfa5] border-4 border-[#133347] text-[#133347] rounded-xl transform hover:-translate-y-1 active:scale-95 transition-all marker-shaded shadow-[8px_8px_0px_0px_rgba(19,51,71,1)] cursor-pointer" onClick={() => handleSelectClass('12th')}>
                  <div className="absolute -top-3 -right-3 bg-tertiary text-white text-[10px] font-bold px-3 py-1 rounded-full rotate-6 shadow-md">CRUSTICAL YEAR</div>
                  <span className="material-symbols-outlined text-5xl mb-4" data-icon="timer">timer</span>
                  <span className="font-headline font-black text-3xl tracking-tight">12th Grade</span>
                  <span className="font-body text-sm font-bold opacity-80 mt-2">The sprint to the finish line.</span>
                </div>

                <div className="group relative flex flex-col items-start p-8 bg-surface-container-low border-4 border-dashed border-outline-variant text-on-surface rounded-xl transform hover:border-tertiary transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(172,51,42,1)] cursor-pointer" onClick={() => handleSelectClass('Dropper')}>
                  <span className="material-symbols-outlined text-5xl mb-4 text-tertiary" data-icon="replay">replay</span>
                  <span className="font-headline font-black text-3xl tracking-tight">Dropper</span>
                  <span className="font-body text-sm font-medium opacity-60 mt-2">The comeback arc. Next level focus.</span>
                </div>
              </div>
            </div>
          </>
        )}
</motion.main><footer className="fixed bottom-8 left-0 w-full z-50 flex justify-between px-12 items-center">
{/* Back Button */}
<button className="flex flex-col items-center justify-center text-[#133347] dark:text-[#f6faff] p-4 opacity-40 transition-transform font-['Space_Grotesk'] text-[12px] font-bold cursor-not-allowed">
<span className="material-symbols-outlined mb-1" data-icon="arrow_back">arrow_back</span>
            Back
        </button>
{/* Step Indicator (Center FAB) */}
<div className="flex flex-col items-center justify-center bg-[#fdc003] text-[#133347] rounded-full p-4 scale-110 shadow-lg border-2 border-[#133347] font-['Space_Grotesk'] text-[12px] font-bold">
<span className="material-symbols-outlined mb-1" data-icon="gesture">gesture</span>
            Step Indicator
        </div>
{/* Next Button */}
<button className="flex flex-col items-center justify-center text-[#133347] dark:text-[#f6faff] p-4 opacity-40 hover:scale-105 transition-transform font-['Space_Grotesk'] text-[12px] font-bold active:scale-90 duration-150" onClick={() => router.push("/onboarding/path")}>
<span className="material-symbols-outlined mb-1" data-icon="arrow_forward">arrow_forward</span>
            Next
        </button>
</footer>
    </div>
  );
}
