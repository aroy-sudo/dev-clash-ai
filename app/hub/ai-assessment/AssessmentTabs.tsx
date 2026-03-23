'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AssessmentTabs({ attempts }: { attempts: any[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!attempts || attempts.length === 0) {
    return (
      <div className="p-12 text-center text-on-surface-variant font-headline">
        <span className="material-symbols-outlined text-6xl opacity-40 mb-4 block">folder_off</span>
        <h2 className="text-2xl font-bold">No tests found</h2>
        <p>Your assessment history will appear here once you take a test.</p>
      </div>
    );
  }

  const currentAttempt = attempts[selectedIndex];
  const test = currentAttempt.testId;

  // Stats calculation
  let correctCount = 0;
  let incorrectCount = 0;
  let attemptedCount = 0;
  const totalQuestions = currentAttempt.totalQuestions || (test ? test.questions?.length : 0);
  
  const responseGrid: { id: string, status: 'correct' | 'incorrect' | 'unattempted', index: number }[] = [];

  if (test && test.questions) {
    test.questions.forEach((q: any, i: number) => {
      const userAnswer = currentAttempt.answers?.find((a: any) => a.questionId === q._id?.toString() || a.questionId === q._id);
      if (userAnswer && userAnswer.selectedOption) {
        attemptedCount++;
        if (userAnswer.selectedOption === q.correctAnswer) {
          correctCount++;
          responseGrid.push({ id: q._id?.toString() || `q-${i}`, status: 'correct', index: i + 1 });
        } else {
          incorrectCount++;
          responseGrid.push({ id: q._id?.toString() || `q-${i}`, status: 'incorrect', index: i + 1 });
        }
      } else {
        responseGrid.push({ id: q._id?.toString() || `q-${i}`, status: 'unattempted', index: i + 1 });
      }
    });
  }

  const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
  const timeSec = currentAttempt.timeTaken || 0;
  const timeString = `${Math.floor(timeSec / 60)}m ${timeSec % 60}s`;

  return (
    <div className="min-h-screen pb-32">
      <style dangerouslySetInnerHTML={{__html: `
        .scribble-bg {
            background-image: radial-gradient(#001e2e 0.5px, transparent 0.5px);
            background-size: 14px 14px;
            opacity: 0.03;
        }
        .marker-circle {
            border: 4px solid #ac332a;
            border-radius: 48% 52% 55% 45% / 42% 48% 52% 58%;
            transform: rotate(-3deg);
        }
        .sketchy-border {
            border: 2.5px solid #133347;
            border-radius: 4px 12px 6px 14px;
        }
        .asymmetric-tilt {
            transform: rotate(0.8deg);
        }
        .highlighter-stroke {
            box-shadow: inset 0 -12px 0 0 #fdc003;
        }
      `}} />
      <div className="fixed inset-0 pointer-events-none scribble-bg z-0"></div>

      <div className="relative z-10 px-6 py-6 overflow-x-auto flex gap-4 no-scrollbar">
        {attempts.map((attempt, idx) => {
          const isSelected = idx === selectedIndex;
          const dateStr = new Date(attempt.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
          const title = attempt.topicsCovered && attempt.topicsCovered.length > 0
            ? attempt.topicsCovered[0]
            : attempt.testType;
          
          return (
            <button
              key={attempt._id?.toString() || idx}
              onClick={() => setSelectedIndex(idx)}
              className={`flex-shrink-0 px-6 py-3 font-headline border-2 transition-all duration-300 ease-out focus:outline-none ${
                isSelected 
                  ? 'bg-primary-container text-on-primary-container font-black border-on-primary-container rotate-[-1.5deg] shadow-[4px_4px_0_0_#133347]' 
                  : 'bg-surface-container text-on-surface font-bold border-outline-variant rotate-[1deg] opacity-70 hover:opacity-100 hover:shadow-sm'
              }`}
            >
              {title} <span className="text-xs opacity-60 ml-2 font-body font-normal">{dateStr}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentAttempt._id?.toString()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          {/* Scoring Section */}
          <section className="px-6 py-8 flex flex-col items-center">
            <div className="relative inline-block px-12 py-10">
              <div className="absolute inset-0 marker-circle border-[6px] opacity-80 z-0"></div>
              <div className="relative z-10 text-center">
                <span className="text-7xl font-headline font-black tracking-tighter text-on-background">
                  {currentAttempt.overallScore}
                </span>
                <p className="font-label text-xs uppercase tracking-widest font-bold opacity-60 mt-1">Total Score</p>
              </div>
            </div>
            
            <div className="mt-8 flex gap-8 items-center font-headline font-bold text-2xl italic">
              <span className="text-primary">+4 <span className="text-xs not-italic font-body uppercase tracking-tighter block text-on-surface-variant">Correct</span></span>
              <div className="h-8 w-px bg-outline-variant rotate-12"></div>
              <span className="text-tertiary">-1 <span className="text-xs not-italic font-body uppercase tracking-tighter block text-on-surface-variant">Incorrect</span></span>
            </div>
          </section>

          {/* Stats Grid */}
          <section className="px-6 grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            <div className="bg-surface-container-low p-6 sketchy-border asymmetric-tilt flex justify-between items-center shadow-[6px_6px_0_0_rgba(0,107,92,0.05)]">
              <div>
                <h3 className="font-label text-xs font-bold uppercase text-on-surface-variant mb-1">Accuracy</h3>
                <p className="font-headline text-3xl font-bold text-primary">{accuracy}%</p>
              </div>
              <span className="material-symbols-outlined text-4xl opacity-20" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>target</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-6 sketchy-border flex flex-col shadow-[4px_4px_0_0_rgba(120,89,0,0.05)] rotate-[-1deg]">
                <h3 className="font-label text-xs font-bold uppercase text-on-surface-variant mb-1">Time Taken</h3>
                <p className="font-headline text-xl font-bold">{timeString}</p>
              </div>
              <div className="bg-surface-container-low p-6 sketchy-border flex flex-col shadow-[4px_4px_0_0_rgba(0,30,46,0.05)] rotate-[0.5deg]">
                <h3 className="font-label text-xs font-bold uppercase text-on-surface-variant mb-1">Attempted</h3>
                <p className="font-headline text-xl font-bold">{attemptedCount}/{totalQuestions}</p>
              </div>
            </div>
          </section>

          {/* Response Grid */}
          {responseGrid.length > 0 && (
            <section className="px-6 py-12 max-w-4xl mx-auto">
              <h2 className="font-headline text-xl font-bold mb-6 flex items-center gap-2">
                <span className="highlighter-stroke">Response Grid</span>
              </h2>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                {responseGrid.map((item, idx) => {
                  const rotateDeg = (Math.random() * 4 - 2).toFixed(1);
                  
                  if (item.status === 'correct') {
                    return (
                      <div key={item.id} className="aspect-square bg-primary-container/20 border-2 border-primary rounded-md flex items-center justify-center shadow-sm" style={{ transform: `rotate(${rotateDeg}deg)` }}>
                        <span className="material-symbols-outlined text-primary font-bold text-xl md:text-2xl" style={{ fontVariationSettings: "'wght' 700" }}>check</span>
                      </div>
                    );
                  } else if (item.status === 'incorrect') {
                    return (
                      <div key={item.id} className="aspect-square bg-tertiary-container/20 border-2 border-tertiary rounded-md flex items-center justify-center shadow-sm" style={{ transform: `rotate(${rotateDeg}deg)` }}>
                        <span className="material-symbols-outlined text-tertiary font-bold text-xl md:text-2xl" style={{ fontVariationSettings: "'wght' 700" }}>close</span>
                      </div>
                    );
                  } else {
                    return (
                      <div key={item.id} className="aspect-square bg-outline-variant/10 border-2 border-outline-variant border-dashed rounded-md flex items-center justify-center" style={{ transform: `rotate(${rotateDeg}deg)` }}>
                        <span className="text-[10px] md:text-xs font-bold opacity-40">{item.index}</span>
                      </div>
                    );
                  }
                })}
              </div>
            </section>
          )}

          {/* AI Feedback Card */}
          <section className="px-6 py-4 max-w-4xl mx-auto mb-16">
            <div className="bg-surface-container-highest p-8 sketchy-border rotate-[-0.5deg] relative shadow-[8px_8px_0_0_#fdc003]">
              <div className="absolute -top-4 -right-2 bg-secondary text-on-secondary px-4 py-1 font-headline font-bold text-sm rotate-[12deg] shadow-sm">
                Tutor's Note
              </div>
              <h3 className="font-headline text-lg font-bold mb-4 italic text-on-primary-container">
                Assessment Feedback
              </h3>
              <div className="font-body text-sm leading-relaxed text-on-surface-variant mb-4 space-y-4">
                {currentAttempt.performanceAnalysis ? (
                  <>
                    {currentAttempt.performanceAnalysis.strengths?.length > 0 && (
                      <div>
                        <span className="font-bold text-primary">Strengths:</span>
                        <ul className="list-disc pl-5 mt-1">
                          {currentAttempt.performanceAnalysis.strengths.map((s: string, i: number) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {currentAttempt.performanceAnalysis.recommendedTopics?.length > 0 && (
                      <div>
                        <span className="font-bold text-secondary">Suggested Focus:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {currentAttempt.performanceAnalysis.recommendedTopics.map((topic: string, i: number) => (
                            <span key={i} className="text-xs uppercase font-bold text-on-secondary-container bg-secondary-container/20 px-2 py-1 rounded">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentAttempt.performanceAnalysis.learningPath?.length > 0 && (
                      <div className="pt-2 border-t-2 border-dashed border-outline-variant/30">
                        <span className="font-bold text-on-surface">Next Steps:</span>
                        <ul className="mt-2 space-y-2">
                          {currentAttempt.performanceAnalysis.learningPath.map((step: any, i: number) => (
                            <li key={i} className="flex gap-2 text-xs">
                              <span className="font-bold text-primary">{step.step}.</span>
                              <span>{step.task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <p>{currentAttempt.detailedFeedback || "Analysis not available."}</p>
                )}
              </div>
              
              <div className="mt-8 flex justify-end">
                <span className="font-headline font-bold text-xs opacity-30">— AI Tutor v2.4</span>
              </div>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
