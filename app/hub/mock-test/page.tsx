'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { getTestById, evaluateAndAnalyzeTest } from '@/lib/actions/mocktest.actions';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

function SketchedTestRunner({ test }: { test: any }) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { selectedOption: string; timeSpentSeconds: number }>>({});
  const [activeQuestionTime, setActiveQuestionTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuestionTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const flushTime = () => {
    const qId = test.questions[currentIndex]._id;
    setAnswers((prev) => {
      const existing = prev[qId] || { selectedOption: "", timeSpentSeconds: 0 };
      return {
        ...prev,
        [qId]: { ...existing, timeSpentSeconds: existing.timeSpentSeconds + activeQuestionTime },
      };
    });
    setActiveQuestionTime(0);
  };

  const handleNext = () => {
    if (currentIndex < test.questions.length - 1) {
      flushTime();
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      flushTime();
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleGridClick = (index: number) => {
    flushTime();
    setCurrentIndex(index);
  };

  const handleOptionSelect = (option: string) => {
    const qId = test.questions[currentIndex]._id;
    setAnswers((prev) => {
      const existing = prev[qId] || { timeSpentSeconds: 0 };
      return {
        ...prev,
        [qId]: { ...existing, selectedOption: option, timeSpentSeconds: existing.timeSpentSeconds + activeQuestionTime },
      };
    });
    setActiveQuestionTime(0);
  };
  
  const submitTest = async () => {
    flushTime();
    setIsSubmitting(true);
    
    const finalAnswersState = { ...answers };
    const currentQId = test.questions[currentIndex]._id;
    if (finalAnswersState[currentQId]) {
      finalAnswersState[currentQId].timeSpentSeconds += activeQuestionTime;
    } else {
      finalAnswersState[currentQId] = { selectedOption: "", timeSpentSeconds: activeQuestionTime };
    }

    const answersArray = Object.entries(finalAnswersState).map(([qId, data]) => ({
      questionId: qId,
      selectedOption: data.selectedOption,
      timeSpentSeconds: data.timeSpentSeconds,
    }));

    try {
      const res = await evaluateAndAnalyzeTest({ testId: test._id, answers: answersArray });
      if (res.success) {
        toast.success("Test submitted successfully!");
        router.push(`/hub/mock-test/analysis/${res.attemptId}`);
      } else {
        toast.error(res.message || "Failed to submit test");
      }
    } catch (error) {
       toast.error("Internal Error during submission");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQ = test.questions[currentIndex];
  const currentQTotalTime = (answers[currentQ._id]?.timeSpentSeconds || 0) + activeQuestionTime;
  
  // Format total test time
  const totalSeconds = Object.values(answers).reduce((acc: number, val: any) => acc + val.timeSpentSeconds, 0) + activeQuestionTime;
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return (
    <div className="w-full min-h-screen relative">
      <motion.main className="max-w-screen-2xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
        {/* Question Content Area */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-surface-container-lowest p-8 md:p-12 rotate-[-0.5deg] sketchy-border">
            <div className="mb-8">
              <span className="font-headline text-secondary font-bold text-sm uppercase tracking-widest mb-2 block">Question {currentIndex + 1}</span>
              <span className="font-headline text-primary/70 font-bold text-xs uppercase tracking-widest mb-4 block">[{currentQ.subject}] {currentQ.topic}</span>
              <h1 className="font-headline text-3xl md:text-3xl text-on-surface font-bold leading-tight">
                {currentQ.questionText}
              </h1>
            </div>
            
            <div className="space-y-4">
              {currentQ.options.map((option: string, i: number) => {
                const isSelected = answers[currentQ._id]?.selectedOption === option;
                return (
                  <label key={i} className={`group flex items-center p-5 cursor-pointer rounded-xl transition-all duration-200 ${isSelected ? 'bg-secondary-container/10 border-2 border-secondary shadow-[4px_4px_0px_0px_#fdc003]' : 'bg-surface border-2 border-transparent hover:border-primary/30'}`}>
                    <input 
                      checked={isSelected}
                      onChange={() => handleOptionSelect(option)}
                      className={`w-6 h-6 border-2 focus:ring-secondary ${isSelected ? 'border-secondary text-secondary' : 'border-primary text-primary'}`} 
                      name={`exam_option_${currentIndex}`} 
                      type="radio" 
                    />
                    <div className="ml-4">
                      <span className={`block font-headline font-bold ${isSelected ? 'text-secondary' : 'text-on-surface'}`}>Option {String.fromCharCode(65 + i)}</span>
                      <span className={`font-medium ${isSelected ? 'text-on-surface' : 'text-on-surface-variant'}`}>{option}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
          
          {/* Hand-drawn Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4">
            <button 
              onClick={handlePrev} 
              disabled={currentIndex === 0} 
              className={`w-full sm:w-auto px-10 py-4 font-headline font-black uppercase tracking-widest bg-surface-container-high transition-all ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:translate-x-1 hover:translate-y-1 hover:shadow-none sketchy-border text-[#133347]'}`}
            >
              Back
            </button>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={handleNext} 
                disabled={currentIndex === test.questions.length - 1} 
                className={`px-10 py-4 font-headline font-black uppercase tracking-widest transition-all ${currentIndex === test.questions.length - 1 ? 'opacity-50 cursor-not-allowed bg-surface-container-high' : 'bg-primary text-on-primary sketchy-border hover:translate-x-1 hover:translate-y-1 hover:shadow-none'}`}
              >
                Next Question
              </button>
              <button 
                onClick={submitTest}
                disabled={isSubmitting}
                className="px-10 py-4 font-headline font-black uppercase tracking-widest text-on-tertiary bg-tertiary sketchy-border-secondary hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2" 
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
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
                <span className="font-headline font-bold">{timeString}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-5 gap-3">
              {test.questions.map((q: any, idx: number) => {
                const isAnswered = !!answers[q._id]?.selectedOption;
                const isCurrent = idx === currentIndex;
                
                let btnClass = "aspect-square flex items-center justify-center font-headline font-bold rounded cursor-pointer transition-all ";
                if (isCurrent) {
                  btnClass += "bg-secondary-container text-on-secondary-container border-2 border-on-surface scale-110 shadow-sm";
                } else if (isAnswered) {
                  btnClass += "bg-primary text-on-primary border border-on-surface/20";
                } else {
                  btnClass += "bg-surface-container-lowest text-on-surface/50 border border-on-surface/10 hover:bg-surface-container-highest";
                }

                return (
                  <div key={q._id} onClick={() => handleGridClick(idx)} className={btnClass}>
                    {idx + 1}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 pt-6 border-t-2 border-on-surface/5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-primary rounded border border-on-surface/20"></div>
                <span className="text-xs font-headline font-bold uppercase tracking-wider text-on-surface-variant">Completed</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-secondary-container rounded-sm border-2 border-on-surface"></div>
                <span className="text-xs font-headline font-bold uppercase tracking-wider text-on-surface-variant">Current</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-surface-container-lowest rounded border border-on-surface/10"></div>
                <span className="text-xs font-headline font-bold uppercase tracking-wider text-on-surface-variant">Unattempted</span>
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

function TestLoader() {
  const searchParams = useSearchParams();
  const testId = searchParams.get('id');
  const router = useRouter();

  const [test, setTest] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!testId) {
      router.push('/hub/mock-test/setup');
      return;
    }
    const fetchTest = async () => {
      const res = await getTestById(testId);
      if (res.success) {
        setTest(res.test);
      } else {
        toast.error("Test not found");
        router.push('/hub/mock-test/setup');
      }
      setLoading(false);
    };
    fetchTest();
  }, [testId, router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
  if (!test) return null;

  return <SketchedTestRunner test={test} />;
}

export default function Page() {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>}>
        <TestLoader />
      </Suspense>
    );
}
