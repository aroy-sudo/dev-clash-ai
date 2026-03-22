'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/onboardingStore';

export default function Page() {
  const router = useRouter();
  const { hasTakenAssessment } = useOnboardingStore();
  const [isMounted, setIsMounted] = React.useState(false);
  const [expandedNode, setExpandedNode] = React.useState<string | null>(null);
  const [isCustomModalOpen, setIsCustomModalOpen] = React.useState(false);
  const [customTopicName, setCustomTopicName] = React.useState('');
  const [customNodes, setCustomNodes] = React.useState<string[]>([]);

  const handleCreateCustomTopic = () => {
    if (customTopicName.trim()) {
      setCustomNodes([...customNodes, customTopicName.trim()]);
      setCustomTopicName('');
      setIsCustomModalOpen(false);
    }
  };

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (!hasTakenAssessment) {
    return (
      <div className="w-full min-h-screen bg-surface relative flex flex-col items-center justify-center overflow-hidden">
        {/* Parchment Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/always-grey.png')] opacity-10 pointer-events-none mix-blend-multiply"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary-container/20 rounded-full blur-3xl -z-10"></div>

        <motion.div 
          className="relative z-10 flex flex-col items-center text-center p-8 max-w-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="mb-12 relative">
            <div className="absolute -inset-4 border-4 border-dashed border-outline-variant rounded-full animate-[spin_30s_linear_infinite] opacity-50"></div>
            <span className="material-symbols-outlined text-[120px] text-primary" data-icon="explore">explore</span>
          </div>

          <h1 className="font-headline font-black text-6xl md:text-8xl text-on-surface tracking-tighter leading-none mb-6">
            Map your <br/><span className="text-secondary scribble-underline">territory.</span>
          </h1>
          <p className="font-body text-xl md:text-2xl font-medium text-on-surface-variant max-w-lg mb-12">
            Take the diagnostic assessment to generate your personalized learning path.
          </p>

          <button 
            onClick={() => router.push('/hub/mock-test/setup')}
            className="group relative flex items-center justify-center gap-4 px-12 py-6 bg-primary border-4 border-on-surface text-on-primary rounded-2xl transform hover:-translate-y-2 hover:translate-x-1 active:translate-y-1 transition-all shadow-[8px_8px_0px_0px_rgba(0,30,46,1)] hover:shadow-none overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:20px_20px]"></div>
            <span className="font-headline font-black text-3xl z-10">Take Assessment</span>
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center border-2 border-on-surface z-10 transform group-hover:rotate-90 transition-transform">
               <span className="material-symbols-outlined text-on-secondary font-black" data-icon="add">add</span>
            </div>
          </button>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="w-full min-h-screen relative bg-surface">
      {/* Parchment Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/always-grey.png')] opacity-10 pointer-events-none mix-blend-multiply"></div>
      
      <motion.main className="pt-24 pb-12 min-h-screen relative overflow-x-hidden px-4 md:px-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
        {/* Parchment Texture Background Decorations */}
        <div className="absolute top-40 right-10 opacity-10 pointer-events-none rotate-12">
          <span className="material-symbols-outlined text-9xl" data-icon="architecture">architecture</span>
        </div>
        <div className="absolute bottom-40 left-10 opacity-10 pointer-events-none -rotate-6">
          <span className="material-symbols-outlined text-9xl" data-icon="edit_note">edit_note</span>
        </div>
        <header className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="font-headline text-6xl md:text-8xl font-black text-primary italic uppercase tracking-tighter mb-4">The Journey</h1>
          <p className="font-headline text-xl text-secondary font-bold tracking-tight">Mapping your path to mastery through the physical world.</p>
        </header>
        
        {/* The Treasure Map Path */}
        <div className="relative max-w-3xl mx-auto pb-48">
          {/* Winding Path SVG */}
          <div className="absolute inset-0 z-0 pointer-events-none flex justify-center">
            <svg className="opacity-20 stroke-primary h-[1200px]" fill="none" viewBox="0 0 400 1200" xmlns="http://www.w3.org/2000/svg">
              <path className="sketchy-path" d="M200 0 C 350 150, 50 250, 200 400 S 350 650, 200 800 S 50 1050, 200 1200" strokeLinecap="round" strokeWidth="12" strokeDasharray="20 20"></path>
            </svg>
          </div>
          
          {/* Roadmap Nodes */}
          <div className="space-y-[150px] relative z-10 flex flex-col items-center pt-10">
            {/* Node 1: Expandable Kinematics */}
            <div className="group relative flex flex-col items-center ml-[100px] w-full">
              <div 
                onClick={() => setExpandedNode(expandedNode === 'kinematics' ? null : 'kinematics')}
                className="node-float w-28 h-28 bg-primary-container border-4 border-on-surface rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,30,46,1)] cursor-pointer hover:bg-primary transition-colors"
                style={{ zIndex: 20 }}
              >
                <span className="material-symbols-outlined text-6xl text-on-surface" data-icon="speed">speed</span>
              </div>
              <div className="mt-4 bg-surface-container-highest px-6 py-2 border-4 border-on-surface -rotate-2 relative z-20">
                <span className="font-headline font-black text-on-surface text-xl uppercase">Kinematics</span>
              </div>

              {/* Node Expansion View */}
              {expandedNode === 'kinematics' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="w-full max-w-sm mt-8 relative z-10 flex flex-col items-center gap-6"
                >
                  <div className="absolute top-0 bottom-0 left-1/2 w-1.5 bg-on-surface border-x-2 border-on-surface border-dashed -translate-x-1/2 z-0"></div>
                  
                  {/* Sub-module 1 */}
                  <div className="w-64 bg-[#fff9c4] p-4 border-2 border-on-surface shadow-[4px_4px_0px_0px_rgba(0,30,46,1)] rotate-[-1deg] relative z-10 cursor-pointer hover:-translate-y-1 transition-transform">
                    <span className="font-headline font-bold text-lg block border-b-2 border-on-surface/20 pb-2 mb-2">1. Displacement</span>
                    <span className="text-sm font-body font-medium italic text-on-surface-variant flex items-center gap-2">
                       <span className="material-symbols-outlined text-sm" data-icon="draw">draw</span> Quick Review
                    </span>
                  </div>

                  {/* Sub-module 2 */}
                  <div className="w-64 bg-[#fff9c4] p-4 border-2 border-on-surface shadow-[4px_4px_0px_0px_rgba(0,30,46,1)] rotate-[1.5deg] relative z-10 cursor-pointer hover:-translate-y-1 transition-transform">
                    <span className="font-headline font-bold text-lg block border-b-2 border-on-surface/20 pb-2 mb-2">2. Velocity-Time</span>
                    <span className="text-sm font-body font-medium italic text-on-surface-variant flex items-center gap-2">
                       <span className="material-symbols-outlined text-sm" data-icon="draw">draw</span> 3 Exercises
                    </span>
                  </div>

                  {/* Top-Level Boss Fight */}
                  <div className="mt-4 node-float w-32 h-32 bg-tertiary-container border-4 border-tertiary rounded-xl flex items-center justify-center shadow-[10px_10px_0px_0px_rgba(172,51,42,1)] cursor-pointer rotate-3 z-10 hover:bg-tertiary transition-colors" onClick={() => router.push('/hub/mock-test/setup')}>
                    <div className="absolute -top-3 -right-3 bg-secondary text-on-secondary px-2 py-1 text-xs font-black uppercase rotate-6 border-2 border-black">Module Test</div>
                    <span className="material-symbols-outlined text-6xl text-on-tertiary-container" data-icon="skull">skull</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Node 2: Dynamics (Locked example) */}
            <div className={`group relative flex flex-col items-center mr-[150px] transition-all duration-500 ${expandedNode === 'kinematics' ? 'opacity-40 translate-y-24' : ''}`}>
              <div className="node-float w-24 h-24 bg-surface-container-low border-4 border-outline rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(108,122,118,1)] opacity-80 cursor-not-allowed">
                <span className="material-symbols-outlined text-5xl text-outline" data-icon="settings_input_component">settings_input_component</span>
                <div className="absolute -left-6 top-0 bg-surface p-1 rounded-full border-2 border-outline">
                  <span className="material-symbols-outlined text-outline" data-icon="lock">lock</span>
                </div>
              </div>
              <div className="mt-4 bg-surface px-4 py-1 border-2 border-dashed border-outline rotate-1">
                <span className="font-headline font-black text-outline uppercase tracking-widest text-sm">Dynamics</span>
              </div>
            </div>
            
            {/* Dynamically Added Custom Nodes */}
            {customNodes.map((nodeName, idx) => (
              <div key={idx} className={`group relative flex flex-col items-center ${idx % 2 === 0 ? 'ml-[50px]' : 'mr-[50px]'}`}>
                <div 
                  onClick={() => setExpandedNode(expandedNode === `custom-${idx}` ? null : `custom-${idx}`)}
                  className="node-float w-24 h-24 bg-primary-container border-4 border-on-surface rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,30,46,1)] cursor-pointer hover:bg-primary transition-colors"
                  style={{ zIndex: 15 }}
                >
                  <span className="material-symbols-outlined text-5xl text-on-surface" data-icon="star">star</span>
                </div>
                <div className={`mt-4 bg-surface-container-highest px-4 py-2 border-4 border-on-surface ${idx % 2 === 0 ? '-rotate-2' : 'rotate-2'} relative z-20`}>
                  <span className="font-headline font-black text-on-surface uppercase">{nodeName}</span>
                </div>
                
                {/* Node Expansion View for Custom Node */}
                {expandedNode === `custom-${idx}` && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="w-full max-w-sm mt-8 relative z-10 flex flex-col items-center gap-6"
                  >
                    <div className="absolute top-0 bottom-0 left-1/2 w-1.5 bg-on-surface border-x-2 border-on-surface border-dashed -translate-x-1/2 z-0"></div>
                    
                    <div className="w-64 bg-[#fff9c4] p-4 border-2 border-on-surface shadow-[4px_4px_0px_0px_rgba(0,30,46,1)] rotate-[-1deg] relative z-10 cursor-pointer hover:-translate-y-1 transition-transform">
                      <span className="font-headline font-bold text-lg block border-b-2 border-on-surface/20 pb-2 mb-2">1. Core Concepts</span>
                      <span className="text-sm font-body font-medium italic text-on-surface-variant flex items-center gap-2">
                         <span className="material-symbols-outlined text-sm" data-icon="menu_book">menu_book</span> Theory
                      </span>
                    </div>

                    <div className="mt-4 node-float w-32 h-32 bg-tertiary-container border-4 border-tertiary rounded-xl flex items-center justify-center shadow-[10px_10px_0px_0px_rgba(172,51,42,1)] cursor-pointer rotate-3 z-10 hover:bg-tertiary transition-colors" onClick={() => router.push('/hub/mock-test/setup')}>
                      <div className="absolute -top-3 -right-3 bg-secondary text-on-secondary px-2 py-1 text-xs font-black uppercase rotate-6 border-2 border-black">Module Test</div>
                      <span className="material-symbols-outlined text-6xl text-on-tertiary-container" data-icon="skull">skull</span>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}

            {/* Node Last: Add Custom Topic */}
            <div className={`group relative flex flex-col items-center transition-all duration-500 ${expandedNode === 'kinematics' ? 'opacity-0 pointer-events-none translate-y-24' : ''}`}>
              <div 
                onClick={() => setIsCustomModalOpen(true)}
                className="w-20 h-20 bg-transparent border-4 border-dashed border-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors animate-pulse"
              >
                <span className="material-symbols-outlined text-4xl text-primary" data-icon="add">add</span>
              </div>
              <div className="mt-4 text-center">
                <span className="font-headline font-bold text-primary text-sm uppercase block">Custom Module</span>
                <span className="text-xs text-outline italic">Generate tailored path</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button for Custom Topics */}
        <div className="fixed bottom-10 right-10 z-40">
          <button 
            onClick={() => setIsCustomModalOpen(true)}
            className="bg-secondary hover:bg-[#fdc003] text-on-secondary w-16 h-16 rounded-2xl flex items-center justify-center border-4 border-on-surface shadow-[6px_6px_0px_0px_rgba(0,30,46,1)] transition-transform hover:-translate-y-1 active:translate-y-1 overflow-hidden group"
          >
            <span className="material-symbols-outlined text-4xl transform group-hover:rotate-180 transition-transform duration-500" data-icon="add">add</span>
          </button>
        </div>

        {/* Custom Topic Modal */}
        {isCustomModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/20 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              className="bg-[#fff9c4] border-4 border-on-surface p-8 max-w-md w-full shadow-[12px_12px_0px_0px_rgba(0,30,46,1)] relative"
            >
              <button 
                onClick={() => setIsCustomModalOpen(false)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-error text-white border-2 border-on-surface rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,30,46,1)] hover:bg-error/90"
              >
                <span className="material-symbols-outlined text-xl font-black" data-icon="close">close</span>
              </button>

              <h2 className="font-headline font-black text-3xl text-on-surface mb-2 uppercase italic tracking-tight">Chart New Course</h2>
              <p className="font-body text-sm font-medium text-on-surface-variant mb-6 leading-relaxed">
                Enter a specific topic you're struggling with. We'll generate a custom module and test block designed to fix your weaknesses.
              </p>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="font-headline font-bold text-sm uppercase tracking-wider text-on-surface mb-2 block">Topic Name</label>
                  <input 
                    type="text" 
                    value={customTopicName}
                    onChange={(e) => setCustomTopicName(e.target.value)}
                    placeholder="e.g., Rotational Collision" 
                    className="w-full bg-surface px-4 py-3 border-4 border-on-surface font-headline font-bold text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-4 focus:ring-secondary/50 transition-all rounded-lg"
                  />
                </div>
              </div>

              <button 
                onClick={handleCreateCustomTopic}
                disabled={!customTopicName.trim()}
                className="w-full bg-primary hover:bg-primary-container text-white py-4 font-headline font-black text-xl uppercase tracking-widest border-4 border-on-surface shadow-[6px_6px_0px_0px_rgba(0,30,46,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
              >
                Map It Out
              </button>
            </motion.div>
          </div>
        )}
      </motion.main>
    </div>
  );
}
