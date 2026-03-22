"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { 
  getDueTopics, 
  generateRetentionTest, 
  evaluateAndUpdateRetention 
} from '@/lib/actions/retention.actions';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type LoadingState = 'fetching_topics' | 'generating_test' | 'ready' | 'testing' | 'submitting' | 'done';

export default function RetentionTestPage() {
  const router = useRouter();
  const { userId } = useAuth();
  
  const [loadingState, setLoadingState] = useState<LoadingState>('fetching_topics');
  const [dueTopics, setDueTopics] = useState<string[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

  // 1. Fetch due topics on mount
  useEffect(() => {
    async function loadTopics() {
      if (!userId) return;
      try {
        const topics = await getDueTopics(userId);
        const topicNames = topics.map((t: any) => t.topicName);
        setDueTopics(topicNames);
        
        if (topicNames.length === 0) {
          toast.info("No topics due for review right now!");
          router.push('/hub');
        } else {
          setLoadingState('ready');
        }
      } catch (error) {
        console.error("Failed to load due topics:", error);
        toast.error("Error loading retention data.");
      }
    }
    loadTopics();
  }, [userId, router]);

  // 2. Start Test: Generate questions via AI
  const handleStartTest = async () => {
    try {
      setLoadingState('generating_test');
      const res = await generateRetentionTest(dueTopics, 'Medium');
      
      if (res.success && res.questions) {
        setQuestions(res.questions);
        setLoadingState('testing');
      } else {
        throw new Error(res.message || "AI failed to generate test.");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to generate test.");
      setLoadingState('ready');
    }
  };

  // 3. Submit Test: Evaluate and update curve
  const handleSubmit = async () => {
    if (!userId) return;
    
    try {
      setLoadingState('submitting');
      
      const results = questions.map((q, index) => ({
        topicName: q.topic,
        isCorrect: userAnswers[index] === q.correctAnswer
      }));

      const res = await evaluateAndUpdateRetention(userId, results);
      
      if (res.success) {
        setLoadingState('done');
        toast.success("Retention metrics updated!");
      } else {
        throw new Error(res.message || "Failed to update retention curve.");
      }
    } catch (error: any) {
      toast.error(error.message || "Error submitting test.");
      setLoadingState('ready');
    }
  };

  // Render Helpers
  if (loadingState === 'fetching_topics' || loadingState === 'generating_test' || loadingState === 'submitting') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="text-2xl font-black font-headline uppercase tracking-tighter">
          {loadingState === 'fetching_topics' ? 'Scanning Synapses...' : 
           loadingState === 'generating_test' ? 'Calibrating Retention Curve...' : 
           'Finalizing Neural Updates...'}
        </h2>
        <p className="text-muted-foreground font-medium">Please wait, the Architect is processing your progress.</p>
      </div>
    );
  }

  if (loadingState === 'ready') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-black font-headline tracking-tighter uppercase leading-none">Knowledge Reinforcement</h1>
          <p className="text-xl text-muted-foreground font-medium italic">
            "We do not learn from experience. We learn from reflecting on experience." — John Dewey
          </p>
        </div>
        
        <div className="w-full bg-secondary-container p-8 rounded-2xl border-4 border-black shadow-[12px_12px_0px_0px_#785900] text-left">
          <h3 className="font-headline font-black text-2xl uppercase mb-4">Focus Topics:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {dueTopics.map(topic => (
              <li key={topic} className="flex items-center gap-2 font-bold text-lg">
                <span className="w-3 h-3 bg-primary rounded-full border border-black"></span>
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <Button 
          onClick={handleStartTest}
          size="lg"
          className="px-12 py-8 text-2xl font-headline font-black uppercase rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all w-full md:w-auto"
        >
          Start 5-Question Test
        </Button>
      </div>
    );
  }

  if (loadingState === 'testing') {
    return (
      <div className="min-h-screen pt-28 pb-20 px-6 max-w-3xl mx-auto space-y-12">
        <div className="flex justify-between items-end border-b-4 border-black pb-4">
          <h2 className="text-4xl font-headline font-black uppercase tracking-tighter">Retention Test</h2>
          <span className="font-bold text-lg bg-black text-white px-4 py-1 rounded-full uppercase tracking-widest">
            {Object.keys(userAnswers).length} / 5 Answered
          </span>
        </div>

        <div className="space-y-16">
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="space-y-6">
              <div className="flex gap-4 items-start">
                <span className="w-10 h-10 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center font-black flex-shrink-0 border-2 border-black">
                  {qIndex + 1}
                </span>
                <h3 className="text-2xl font-bold leading-tight pt-1">{q.questionText}</h3>
              </div>

              <div className="grid grid-cols-1 gap-4 pl-14">
                {q.options.map((option: string, oIndex: number) => (
                  <button
                    key={oIndex}
                    onClick={() => setUserAnswers(prev => ({ ...prev, [qIndex]: option }))}
                    className={`p-5 text-left rounded-xl border-4 transition-all flex items-center gap-4 group ${
                      userAnswers[qIndex] === option 
                      ? 'bg-primary border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                      : 'bg-surface-container border-transparent hover:border-black/20'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0 ${
                      userAnswers[qIndex] === option ? 'bg-white' : 'bg-transparent'
                    }`}>
                      {userAnswers[qIndex] === option && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                    </div>
                    <span className={`font-bold text-lg ${userAnswers[qIndex] === option ? 'text-on-primary' : 'text-primary'}`}>
                      {option}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Button 
          disabled={Object.keys(userAnswers).length < 5}
          onClick={handleSubmit} 
          className="w-full py-10 text-3xl font-headline font-black uppercase border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-30 disabled:grayscale"
        >
          Submit to Neural Engine
        </Button>
      </div>
    );
  }

  if (loadingState === 'done') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-10">
        <div className="relative">
          <div className="absolute -inset-8 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="w-32 h-32 bg-primary rounded-3xl border-4 border-black rotate-12 flex items-center justify-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative z-10">
            <span className="material-symbols-outlined text-white text-7xl" data-icon="auto_awesome">auto_awesome</span>
          </div>
        </div>
        
        <div className="space-y-4 max-w-xl relative z-10">
          <h2 className="text-6xl font-black font-headline uppercase leading-none tracking-tighter">Curve Flattened! 🎉</h2>
          <p className="text-2xl font-bold text-muted-foreground leading-tight">
            Memory mastery achieved. Your next review cycles have been mathematically optimized for long-term retention.
          </p>
        </div>

        <Button 
          onClick={() => router.push('/hub')}
          size="lg"
          className="px-12 py-8 text-2xl font-headline font-black uppercase border-4 border-black shadow-[8px_8px_0px_0px_#001e2e] active:translate-y-1 active:shadow-none"
        >
          Return to Hub
        </Button>
      </div>
    );
  }

  return null;
}
