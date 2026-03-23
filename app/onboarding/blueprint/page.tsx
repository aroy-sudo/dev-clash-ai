'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/onboardingStore';
import { SYLLABUS_DATA } from '@/constants';
import { saveUserSyllabus } from '@/lib/actions/user.actions';
import { toast } from 'sonner';

export default function Page() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const targetExam = useOnboardingStore(state => state.targetExam);
  const coursePercentage = useOnboardingStore(state => state.coursePercentage);

  const subjects = SYLLABUS_DATA.subject_topics.filter(s => {
    if (targetExam === 'JEE' && s.is_neet_only) return false;
    if (targetExam === 'NEET' && s.is_jee_only) return false;
    return true;
  });

  const [checkedTopics, setCheckedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setIsMounted(true);
    const initialChecked: Record<string, boolean> = {};
    
    subjects.forEach(subject => {
      const allTopics = subject.topics || (subject.categories?.flatMap(c => c.topics) || []);
      const numToCheck = Math.floor(allTopics.length * (coursePercentage / 100));
      
      allTopics.forEach((topic, index) => {
        initialChecked[topic.topic_id] = index < numToCheck;
      });
    });
    
    setCheckedTopics(initialChecked);
  }, []); // Run only once to prepopulate

  const toggleTopic = (topicId: string) => {
    setCheckedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const totalTopics = Object.keys(checkedTopics).length;
  const checkedCount = Object.values(checkedTopics).filter(Boolean).length;
  const currentProgress = totalTopics === 0 ? 0 : Math.round((checkedCount / totalTopics) * 100);

  const [isSaving, setIsSaving] = useState(false);

  const handleConfirmDraft = async () => {
    setIsSaving(true);
    const selected = Object.keys(checkedTopics).filter(k => checkedTopics[k]);
    try {
      const res = await saveUserSyllabus(selected);
      if (res.success) {
        setIsModalOpen(true);
      } else {
        toast.error(res.message || "Failed to save syllabus");
      }
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

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
<button disabled={isSaving} className="w-full py-4 bg-primary text-on-primary font-headline font-bold rounded-xl sketchy-border hover:bg-primary-container transition-colors duration-300 shadow-lg disabled:opacity-50" onClick={handleConfirmDraft}>
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
<span className="font-headline font-bold text-2xl">{isMounted ? `${currentProgress}%` : '0%'}</span>
</div>
<div className="h-4 bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-secondary flex items-center justify-end px-1 transition-all duration-500" style={{ width: `${isMounted ? currentProgress : 0}%` }}>
<div className="w-2 h-2 rounded-full bg-on-secondary"></div>
</div>
</div>
</div>
</div>
</div>
{/* The Blueprint Grid */}
<div className="lg:col-span-8">
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {subjects.map((subject, index) => {
    const isAlt = index % 2 !== 0;
    const borderColor = 
      subject.subject_name === 'Physics' ? 'border-primary' : 
      subject.subject_name === 'Chemistry' ? 'border-tertiary' :
      subject.subject_name === 'Mathematics' ? 'border-secondary' : 'border-[#00bfa5]';
    const textColor = 
      subject.subject_name === 'Physics' ? 'text-primary' : 
      subject.subject_name === 'Chemistry' ? 'text-tertiary' :
      subject.subject_name === 'Mathematics' ? 'text-secondary' : 'text-[#00bfa5]';
    const iconName = 
      subject.subject_name === 'Physics' ? 'bolt' : 
      subject.subject_name === 'Chemistry' ? 'science' :
      subject.subject_name === 'Mathematics' ? 'calculate' : 'biotech';

    return (
      <div key={subject.subject_id} className={`bg-surface-container-lowest p-6 rounded-xl border-l-4 ${borderColor} shadow-md ${isAlt ? 'rotate-1' : '-rotate-1'} transition-transform hover:rotate-0 flex flex-col h-full`}>
        <div className="flex justify-between items-start mb-6">
          <h3 className="font-headline text-xl font-bold flex items-center gap-2">
            <span className={`material-symbols-outlined ${textColor}`} data-icon={iconName}>{iconName}</span>
            {subject.subject_name}
          </h3>
          <span className={`bg-[#133347]/5 ${textColor} font-label text-[10px] px-2 py-1 rounded font-bold`}>{subject.difficulty_level.toUpperCase()}</span>
        </div>

        <div className="flex-grow overflow-y-auto pr-2 max-h-[350px] custom-scrollbar">
          {subject.topics && (
            <ul className="space-y-3">
              {subject.topics.map(topic => (
                <li key={topic.topic_id} className="flex items-start gap-3 group cursor-pointer" onClick={() => toggleTopic(topic.topic_id)}>
                  <div className={`mt-0.5 w-5 h-5 flex-shrink-0 hand-drawn-circle flex items-center justify-center transition-colors ${checkedTopics[topic.topic_id] ? `${textColor} bg-[#133347]/5` : 'text-outline group-hover:bg-surface-container-high'}`}>
                    {checkedTopics[topic.topic_id] && <span className="material-symbols-outlined text-xs" data-icon="check">check</span>}
                  </div>
                  <span className={`font-body text-sm ${checkedTopics[topic.topic_id] ? 'font-bold opacity-100' : 'opacity-80'}`}>{topic.topic_name}</span>
                </li>
              ))}
            </ul>
          )}
          
          {subject.categories && (
            <div className="space-y-6">
              {subject.categories.map(cat => (
                <div key={cat.category_name}>
                  <p className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant mb-3 font-bold">{cat.category_name}</p>
                  <ul className="space-y-3">
                    {cat.topics.map(topic => (
                      <li key={topic.topic_id} className="flex items-start gap-3 group cursor-pointer" onClick={() => toggleTopic(topic.topic_id)}>
                        <div className={`mt-0.5 w-5 h-5 flex-shrink-0 hand-drawn-circle flex items-center justify-center transition-colors ${checkedTopics[topic.topic_id] ? `${textColor} bg-[#133347]/5` : 'text-outline group-hover:bg-surface-container-high'}`}>
                          {checkedTopics[topic.topic_id] && <span className="material-symbols-outlined text-xs" data-icon="check">check</span>}
                        </div>
                        <span className={`font-body text-sm ${checkedTopics[topic.topic_id] ? 'font-bold opacity-100' : 'opacity-80'}`}>{topic.topic_name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  })}
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
<button disabled={isSaving} className="flex flex-col items-center justify-center text-[#133347] dark:text-[#f6faff] p-4 hover:scale-105 transition-transform group font-['Space_Grotesk'] text-[12px] font-bold bg-white rounded-xl shadow-lg border-2 border-[#133347] px-6 disabled:opacity-50" onClick={handleConfirmDraft}>
<span className="material-symbols-outlined group-hover:translate-x-1 transition-transform mb-1" data-icon="arrow_forward">arrow_forward</span>
Next
</button>
</div>
</nav>

<AnimatePresence>
{isModalOpen && (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center sm:p-4">
        <motion.div 
            initial={{ y: "100%", opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full h-[85vh] sm:h-auto sm:max-w-2xl bg-[#f6faff] border-t-4 sm:border-4 border-[#133347] sm:rounded-3xl rounded-t-3xl p-8 shadow-[12px_12px_0px_0px_rgba(19,51,71,1)] relative hand-drawn-box flex flex-col justify-center gap-8 overflow-y-auto"
        >
            <button 
                onClick={() => setIsModalOpen(false)} 
                className="absolute top-4 right-4 text-[#133347] material-symbols-outlined hover:scale-125 transition-transform bg-[#fdc003] rounded-full p-2 border-2 border-[#133347]"
                data-icon="close"
            >
                close
            </button>
            <div className="text-center mt-6">
                <h2 className="font-headline font-black text-5xl md:text-6xl mb-6 text-[#133347] tracking-tight leading-none">
                    Let's calibrate <br/><span className="scribble-underline px-2">your baseline.</span>
                </h2>
                <p className="font-body text-xl text-[#133347]/80 font-medium max-w-md mx-auto mb-10">
                    Take a quick diagnostic test to generate your personalized roadmap.
                </p>
                
                <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
                    <button 
                        onClick={() => router.push('/hub/mock-test?auto=true')}
                        className="w-full py-5 bg-[#fdc003] text-[#133347] text-xl font-black font-headline rounded-2xl border-4 border-[#133347] hover:bg-[#ffcf33] transition-colors shadow-[6px_6px_0px_0px_rgba(19,51,71,1)] active:translate-y-2 active:shadow-none hover:-translate-y-1"
                    >
                        Select Difficulty
                    </button>
                    
                    <button 
                        onClick={() => router.push('/hub')}
                        className="font-['Space_Grotesk'] font-bold text-[#133347]/60 hover:text-[#133347] transition-colors underline decoration-2 underline-offset-4 decoration-[#133347]/20 hover:decoration-[#133347]"
                    >
                        Skip for now, take me to the hub
                    </button>
                </div>
            </div>
        </motion.div>
    </div>
)}
</AnimatePresence>

    </div>
  );
}
