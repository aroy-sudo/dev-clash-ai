'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  
  return (
    <div className="w-full min-h-screen relative">
      <motion.main className="pt-20 h-screen relative bg-surface overflow-hidden" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
{/* Desk Background Texture */}
<div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden select-none">
<div className="absolute top-10 right-10 rotate-12">
<div className="w-48 h-64 border-2 border-on-surface/20 rounded-lg flex flex-col p-4 space-y-2">
<div className="h-2 w-full bg-on-surface/10"></div>
<div className="h-2 w-3/4 bg-on-surface/10"></div>
<div className="h-2 w-1/2 bg-on-surface/10"></div>
</div>
</div>
<div className="absolute bottom-20 left-10 -rotate-6">
<div className="w-32 h-4 bg-primary/20 rounded-full"></div>
</div>
<div className="absolute bottom-10 right-20 rotate-45">
<div className="w-2 h-40 bg-secondary/20 rounded-full"></div>
</div>
</div>
<div className="paper-grain absolute inset-0 z-0"></div>
<div className="h-full flex flex-col max-w-4xl mx-auto px-6 relative z-10">
{/* Header Section */}
<div className="py-6 flex flex-col items-center">
<h1 className="font-headline text-5xl font-black text-primary italic tracking-tight mb-2 marker-underline">
                    Doubt Solver
                </h1>
<p className="font-body text-secondary font-bold">Ask anything, I'll sketch the answer.</p>
</div>
{/* Chat Interface */}
<div className="flex-1 bg-surface-container-low sketched-border shadow-2xl mb-8 flex flex-col overflow-hidden relative rotate-[0.5deg]">
{/* Chat Feed */}
<div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
{/* AI Bubble */}
<div className="flex gap-4 max-w-[85%]">
<div className="w-10 h-10 shrink-0 bg-primary-container border-2 border-black rounded-sm flex items-center justify-center -rotate-3">
<span className="material-symbols-outlined text-on-primary-container">smart_toy</span>
</div>
<div className="bg-surface-container-highest sketched-border p-5 chat-bubble-ai relative">
<p className="font-headline text-lg leading-relaxed text-on-surface">
                                Hello, Architect! I've got my markers ready. What's puzzling you today? Let's draft a solution.
                            </p>
</div>
</div>
{/* User Bubble */}
<div className="flex gap-4 max-w-[85%] ml-auto flex-row-reverse">
<div className="w-10 h-10 shrink-0 bg-secondary-container border-2 border-black rounded-sm flex items-center justify-center rotate-6">
<span className="material-symbols-outlined text-on-secondary-container">person</span>
</div>
<div className="bg-surface-container sketched-border p-5 chat-bubble-user relative -rotate-1">
<p className="font-headline text-lg leading-relaxed text-on-surface">
                                Can you explain how the structural loading works on the cantilever section of the museum design?
                            </p>
</div>
</div>
{/* AI Bubble Response */}
<div className="flex gap-4 max-w-[85%]">
<div className="w-10 h-10 shrink-0 bg-primary-container border-2 border-black rounded-sm flex items-center justify-center -rotate-1">
<span className="material-symbols-outlined text-on-primary-container">smart_toy</span>
</div>
<div className="bg-surface-container-highest sketched-border p-5 chat-bubble-ai relative rotate-1">
<p className="font-headline text-lg leading-relaxed text-on-surface mb-4">
                                Think of the cantilever as a giant arm holding a heavy weight. The stress is highest at the shoulder (the fixed point).
                            </p>
<div className="p-4 bg-white/50 sketched-border mb-4">
<img className="w-full h-48 object-cover rounded opacity-80 grayscale" data-alt="Architectural sketch showing force vectors on cantilever" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCClpDRPZRFy83q8NEe_rObDBxZSjS_WHD8CFXJLIz5cvm4GDVpAdrqElQM6ACu6Uf_VmOHQojrKM4RNZyuTJhf4wxEejL-eOtBolOl78BteFc5sVE9e_taM6synqeBTpgrHnZQiZbmxDrPD_uBqSs6cVVKVe28NSI0vBlutBNUEI1jjDRWPOk0bw9OezRIcboR_w4ngt5GNzMxtprEsJe9kEsOdbSic8vrg6UW9HQ5ZtVSvCJeWExQU2HxObBHiJn_fsYZSwcCSE"/>
</div>
<p className="font-headline text-lg leading-relaxed text-on-surface">
                                We need to reinforce the tension side (top) and compression side (bottom) with specific vector distributions.
                            </p>
</div>
</div>
</div>
{/* Input Area */}
<div className="p-6 bg-surface-container-high border-t-2 border-dashed border-primary/20">
<div className="flex items-end gap-4">
<div className="flex-1 bg-surface-container-lowest sketched-border min-h-[60px] p-4 flex items-start -rotate-[0.2deg] shadow-inner relative group">
<span className="font-headline text-xl text-on-surface-variant flex items-center">
                                Type your question here...<span className="w-0.5 h-6 bg-secondary ml-1 cursor-blink"></span>
</span>
</div>
<button className="bg-primary text-on-primary font-headline font-black text-xl px-8 py-4 sketched-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-2 uppercase italic rotate-2">
                            Send
                            <span className="material-symbols-outlined">draw</span>
</button>
</div>
</div>
</div>
</div>
{/* Floating Decorative Elements */}
<div className="fixed bottom-10 right-10 z-50 pointer-events-none hidden lg:block">
<div className="w-24 h-24 bg-tertiary-container sketched-border flex items-center justify-center -rotate-12 translate-y-4 translate-x-4 shadow-xl">
<span className="material-symbols-outlined text-4xl text-on-tertiary-container">lightbulb</span>
</div>
<div className="w-24 h-24 bg-secondary-container sketched-border flex items-center justify-center rotate-6 shadow-xl relative z-10">
<span className="material-symbols-outlined text-4xl text-on-secondary-container">architecture</span>
</div>
</div>
</motion.main>
    </div>
  );
}
