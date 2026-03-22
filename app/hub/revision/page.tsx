"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { generateTopicReview } from '@/lib/actions/retention.actions';


/**
 * Hardcoded Mock Data for Spaced Repetition
 */
const mockRetentionData = [
  { subject: "Physics", topicName: "Rotational Motion", retentionLevel: 0, lastReviewedAt: "2026-03-20T21:04:56.047Z", nextReviewAt: "2026-03-21T21:04:56.047Z" },
  { subject: "Chemistry", topicName: "Coordination Compounds", retentionLevel: 1, lastReviewedAt: "2026-03-20T21:04:56.047Z", nextReviewAt: "2026-03-21T21:04:56.047Z" },
  { subject: "Mathematics", topicName: "Complex Numbers", retentionLevel: 2, lastReviewedAt: "2026-03-20T21:04:56.047Z", nextReviewAt: "2026-03-21T21:04:56.047Z" },
  { subject: "Physics", topicName: "Ray Optics", retentionLevel: 0, lastReviewedAt: "2026-03-21T21:04:56.047Z", nextReviewAt: "2026-03-22T21:04:51.047Z" },
  { subject: "Mathematics", topicName: "Matrices and Determinants", retentionLevel: 4, lastReviewedAt: "2026-03-21T21:04:56.047Z", nextReviewAt: "2026-03-29T21:04:56.047Z" },
  { subject: "Chemistry", topicName: "Thermodynamics", retentionLevel: 2, lastReviewedAt: "2026-03-22T21:04:56.047Z", nextReviewAt: "2026-03-23T21:04:56.047Z" },
  { subject: "Physics", topicName: "Electrostatics", retentionLevel: 3, lastReviewedAt: "2026-03-21T21:04:56.047Z", nextReviewAt: "2026-03-25T21:04:56.047Z" }
];

/**
 * Synthetic Ebbinghaus Curve Data for visualization
 */
const curveData = [
  { day: 0, level0: 100, level2: 100, level4: 100 },
  { day: 1, level0: 60, level2: 85, level4: 98 },
  { day: 2, level0: 45, level2: 72, level4: 95 },
  { day: 3, level0: 33, level2: 60, level4: 90 },
  { day: 4, level0: 25, level2: 52, level4: 87 },
  { day: 5, level0: 20, level2: 45, level4: 85 },
];

export default function RevisionHubPage() {
  const router = useRouter();
  const { userId } = useAuth();
  const [loadingTopic, setLoadingTopic] = useState<string | null>(null);

  // Utility to determine if a topic is overdue
  const isOverdue = (nextReviewAt: string) => new Date(nextReviewAt) < new Date();

  const handleReview = async (subject: string, topicName: string) => {
    if (!userId) return;
    setLoadingTopic(topicName);
    const res = await generateTopicReview(userId, subject, topicName);
    if (res.success) {
      router.push('/hub/mock-test/' + res.testId);
    }
    setLoadingTopic(null);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl md:text-6xl font-black font-headline uppercase tracking-tighter leading-none">Revision Hub</h1>
        <p className="text-xl text-muted-foreground font-medium italic border-l-4 border-primary pl-4">
          AI-Optimized Spaced Repetition System
        </p>
      </div>

      {/* Forgetting Curve Chart Card */}
      <Card className="border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden">
        <CardHeader className="border-b-4 border-black bg-secondary/5">
          <CardTitle className="text-2xl md:text-3xl font-black uppercase tracking-tight flex items-center gap-3">
             <span className="material-symbols-outlined text-4xl" data-icon="insights">insights</span>
             Your Memory Decay Curves
          </CardTitle>
          <CardDescription className="text-lg font-bold">
            Simulated Ebbinghaus Curves based on your current mastery levels.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-10 h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={curveData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis 
                dataKey="day" 
                label={{ value: 'Days Elapsed Since Review', position: 'insideBottom', offset: -10, fontStyle: 'italic', fontWeight: 'bold' }} 
              />
              <YAxis 
                label={{ value: 'Retention Strength %', angle: -90, position: 'insideLeft', fontStyle: 'italic', fontWeight: 'bold' }} 
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: '4px solid black', 
                  boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)',
                  fontWeight: 'black',
                  textTransform: 'uppercase'
                }} 
              />
              <Legend verticalAlign="top" height={40} iconType="circle" />
              <Line 
                name="Level 0 (Early Decay)" 
                type="monotone" 
                dataKey="level0" 
                stroke="#ef4444" 
                strokeWidth={5} 
                dot={{ r: 8, strokeWidth: 2, stroke: 'black' }} 
                activeDot={{ r: 10 }} 
              />
              <Line 
                name="Level 2 (In-Progress)" 
                type="monotone" 
                dataKey="level2" 
                stroke="#eab308" 
                strokeWidth={5} 
                dot={{ r: 8, strokeWidth: 2, stroke: 'black' }} 
                activeDot={{ r: 10 }} 
              />
              <Line 
                name="Level 4 (Mastered)" 
                type="monotone" 
                dataKey="level4" 
                stroke="#22c55e" 
                strokeWidth={5} 
                dot={{ r: 8, strokeWidth: 2, stroke: 'black' }} 
                activeDot={{ r: 10 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Mastery Grid Section */}
      <div className="space-y-8">
        <h2 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4">
          <span className="material-symbols-outlined text-4xl" data-icon="grid_view">grid_view</span>
          Topic Mastery Grid
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockRetentionData.map((item, index) => {
            const overdue = isOverdue(item.nextReviewAt);
            const stars = Array(5).fill(0).map((_, i) => i <= item.retentionLevel ? "★" : "☆").join(" ");
            
            return (
              <Card 
                key={index} 
                className="flex flex-col border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-default bg-white group"
              >
                <CardHeader className="pb-4 border-b-2 border-black/5 bg-secondary/5">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`px-4 py-1 text-xs font-black uppercase border-4 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                      item.subject === "Mathematics" ? "bg-blue-100 text-blue-800" :
                      item.subject === "Physics" ? "bg-purple-100 text-purple-800" :
                      "bg-orange-100 text-orange-800"
                    }`}>
                      {item.subject}
                    </div>
                    {overdue ? (
                      <div className="bg-red-500 text-white px-3 py-1 flex items-center gap-1 rounded-lg font-black text-xs uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce">
                        Overdue 🚨
                      </div>
                    ) : (
                      <div className="bg-green-500 text-white px-3 py-1 flex items-center gap-1 rounded-lg font-black text-xs uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        Safe ✅
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-2xl font-black leading-none">{item.topicName}</CardTitle>
                </CardHeader>

                <CardContent className="flex-grow pt-6 space-y-6">
                  {/* Mastery Indicator */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-black uppercase opacity-60">
                      <span>Neural Mastery</span>
                      <span>LVL {item.retentionLevel + 1}</span>
                    </div>
                    <div className="text-3xl font-bold tracking-widest text-[#fdc003] drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
                       {stars}
                    </div>
                  </div>

                  {/* Date details */}
                  <div className="p-4 bg-muted/30 rounded-xl border-2 border-dashed border-black/20 text-sm font-bold space-y-2 italic opacity-80">
                    <div className="flex justify-between">
                      <span>Review Cycle:</span>
                      <span className={overdue ? "text-red-600" : "text-green-600"}>
                        {new Date(item.nextReviewAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Activity:</span>
                      <span>
                        {new Date(item.lastReviewedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 p-6">
                  <button 
                    onClick={() => handleReview(item.subject, item.topicName)}
                    disabled={loadingTopic !== null}
                    className={`w-full py-5 font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all rounded-2xl text-xl tracking-tight disabled:opacity-50 disabled:cursor-not-allowed group-hover:bg-primary group-hover:text-white ${
                    overdue ? 'bg-red-500 text-white' : 'bg-white text-black'
                  }`}>
                    {loadingTopic === item.topicName ? 'Generating...' : (overdue ? 'Initiate Review' : 'Practice Session')}
                  </button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Decorative Footer */}
      <div className="text-center py-12 border-t-4 border-dashed border-black/10">
        <p className="font-headline font-black uppercase text-2xl text-primary opacity-30 tracking-widest">
           Building Future Architects of Knowledge
        </p>
      </div>
    </div>
  );
}
