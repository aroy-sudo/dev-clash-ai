import { connectToDatabase } from "@/database/mongoose";
import TestAttempt from "@/database/models/test-attempt.model";
import JeeTest from "@/database/models/jee-test.model";
import { notFound } from "next/navigation";
import { CheckCircle2, Info, Sparkles, Timer, Target, ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";

export default async function AnalysisDashboardPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params;
  
  await connectToDatabase();

  let attempt;
  try {
    attempt = await TestAttempt.findById(attemptId).populate('testId').lean();
  } catch (error) {
    console.error("Error fetching attempt:", error);
    notFound();
  }

  if (!attempt) notFound();

  const test = attempt.testId as any;
  const analysis = attempt.performanceAnalysis;

  // Calculate stats
  const totalQuestions = test?.questions?.length || 0;
  let correctCount = 0;
  let totalTime = 0;

  attempt.answers.forEach((ans: any) => {
    totalTime += ans.timeSpentSeconds;
    const q = test?.questions?.find((q: any) => q._id.toString() === ans.questionId);
    if (q && q.correctAnswer === ans.selectedOption) {
      correctCount++;
    }
  });

  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const timeMins = Math.floor(totalTime / 60);
  const timeSecs = totalTime % 60;

  // Mock Grade based on score
  const maxScore = totalQuestions * 4;
  const scorePercent = (attempt.overallScore / maxScore) * 100;
  let grade = "C";
  if (scorePercent >= 80) grade = "A+";
  else if (scorePercent >= 60) grade = "B";
  else if (scorePercent >= 40) grade = "C+";

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20 lg:px-12">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16 border-b-2 border-dashed border-zinc-200 pb-12">
          <div className="relative">
            {/* Grade Stamp */}
            <div className="absolute -top-10 -left-6 transform -rotate-12 select-none">
              <span className="font-['Caveat'] text-6xl font-bold text-red-500 opacity-80 border-4 border-red-500 rounded-xl px-4 py-1 inline-block">
                {grade}
              </span>
              <div className="absolute inset-0 border-t-2 border-red-500 translate-y-8 opacity-40"></div>
            </div>

            <div className="mt-8">
              <h1 className="text-5xl font-black uppercase tracking-tight text-zinc-900 mb-2">Assessment Result</h1>
              <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">
                COURSE: {test?.examType === 'Mains' ? 'JEE MAINS FOCUS' : 'ADVANCED DYNAMICS'} / ID: #{attemptId.slice(-8).toUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex gap-12 text-right">
            <div>
              <p className="text-zinc-400 font-bold uppercase text-xs tracking-widest mb-1">Accuracy</p>
              <div className="relative inline-block">
                <span className="text-5xl font-black text-red-500 tracking-tighter">{accuracy}%</span>
                <div className="h-1.5 bg-red-500/20 mt-1 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${accuracy}%` }}></div>
                </div>
                {accuracy > 80 && (
                   <span className="absolute -bottom-6 right-0 font-['Caveat'] text-red-400 text-lg whitespace-nowrap">Excllent precision!</span>
                )}
              </div>
            </div>
            <div>
              <p className="text-zinc-400 font-bold uppercase text-xs tracking-widest mb-1">Time Taken</p>
              <div className="relative inline-block">
                <span className="text-5xl font-black text-red-500 tracking-tighter">{timeMins}m {timeSecs}s</span>
                <p className="font-['Caveat'] text-red-400 text-lg text-right mt-1">A bit rushed in sections!</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-7 space-y-12">
            {/* AI Tutor Review Panel */}
            <section className="bg-white p-8 rounded-3xl shadow-soft border border-zinc-100 relative overflow-hidden group">
               <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-zinc-100 rounded-lg">
                   <Target className="w-6 h-6 text-zinc-800" />
                 </div>
                 <h2 className="text-2xl font-black uppercase tracking-tight">Tutor&apos;s Review</h2>
               </div>
               
               <div className="space-y-4 text-zinc-600 leading-relaxed text-lg">
                 <p>
                    Overall, a solid performance in <span className="relative inline-block font-bold text-zinc-900">
                      {test?.difficulty} level reasoning
                      <svg className="absolute -bottom-1 left-0 w-full h-1 text-zinc-300" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </span>. 
                    You clearly understand the <span className="underline decoration-zinc-300 underline-offset-4 decoration-wavy">fundamental constraints</span> of the questions.
                 </p>
                 <p>
                    However, your speed in <span className="italic font-medium">{test?.subjects?.join(', ')}</span> remains inconsistent. 
                    Look at the questions with <span className="text-red-500 font-bold">high weightage</span> — you almost had them, then missed the final calculation!
                 </p>
                 <div className="pt-4 flex items-start gap-4">
                    <span className="font-['Caveat'] text-2xl text-red-400 transform -rotate-1 shrink-0 mt-1">Note:</span>
                    <p className="font-['Caveat'] text-2xl text-red-400 leading-tight">
                      Re-check Question 4 & 7 specifically. You overshot the vector sums in both cases. Focus on non-linear force distribution next.
                    </p>
                 </div>
               </div>
               
               {/* Decorative Arrow */}
               <div className="absolute top-10 right-10 opacity-10 scale-150 rotate-12 pointer-events-none">
                 <Target className="w-24 h-24" />
               </div>
            </section>

            {/* Key Learnings - Strengths & Areas */}
            <div className="space-y-6">
               <h3 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400">Key Learnings</h3>
               
               <div className="grid grid-cols-1 gap-6">
                 {/* Strength Card */}
                 <div className="flex gap-4 p-6 bg-zinc-50 rounded-2xl border-l-4 border-emerald-500 shadow-sm transition-transform hover:-translate-y-1">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 uppercase tracking-tight mb-1">Concept Mastery</h4>
                      <p className="text-zinc-600 text-sm">Excellent grasp of {analysis?.strengths?.[0] || 'core concepts'}. Your reasoning here was flawless.</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {analysis?.strengths?.map((str: string, i: number) => (
                           <li key={i} className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{str}</li>
                        ))}
                      </ul>
                    </div>
                 </div>

                 {/* Improvement Card */}
                 <div className="flex gap-4 p-6 bg-zinc-50 rounded-2xl border-l-4 border-red-500 shadow-sm transition-transform hover:-translate-y-1">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                      <Info className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 uppercase tracking-tight mb-1">Optimization Required</h4>
                      <p className="text-zinc-600 text-sm">Defaulting to linear models for {analysis?.areasForImprovement?.[0] || 'complex problems'}. Resulted in avoidable errors.</p>
                       <ul className="mt-3 flex flex-wrap gap-2">
                        {analysis?.areasForImprovement?.map((area: string, i: number) => (
                           <li key={i} className="text-[10px] font-bold uppercase bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{area}</li>
                        ))}
                      </ul>
                    </div>
                 </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-12">
            {/* Technical Diagram Mockup */}
            <div className="bg-zinc-50 p-8 rounded-3xl border-2 border-dashed border-zinc-200 flex flex-col items-center">
              <div className="w-full aspect-square relative flex items-center justify-center">
                {/* SVG Technical Diagram */}
                <svg className="w-full h-full text-zinc-400" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                  <path d="M100 20 L180 160 L20 160 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
                  <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.5" />
                  
                  {/* Annotations */}
                  <g className="font-sans text-[6px] fill-zinc-500 uppercase font-bold">
                    <text x="110" y="40">Perfect Slant</text>
                    <text x="140" y="110" className="fill-red-400">Re-Calculate Radius!</text>
                    <text x="30" y="150">Load Dist: 0.82</text>
                  </g>
                  {/* Arrow to radius */}
                  <path d="M135 105 L110 90" stroke="#f87171" strokeWidth="1" markerEnd="url(#arrowhead)" />
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#f87171" />
                    </marker>
                  </defs>
                </svg>
                
                {/* Hand-drawn note overlay on diagram */}
                <div className="absolute top-1/4 right-4 font-['Caveat'] text-red-400 text-xl rotate-12">
                  Target: 0.95
                </div>
              </div>
              <p className="mt-4 text-[10px] font-bold uppercase text-zinc-400 tracking-widest text-center">
                Figure 1.2: Geometric Tension Map (Calculated vs Expected)
              </p>
            </div>

            {/* Recommended Topics Panel */}
            <div className="bg-white p-8 rounded-3xl shadow-soft border border-zinc-100">
               <div className="flex items-center gap-3 mb-6">
                 <h2 className="text-xl font-black uppercase tracking-tight">Recommended Topics</h2>
               </div>
               <div className="space-y-3">
                 {analysis?.recommendedTopics?.map((topic: string, i: number) => (
                   <div key={i} className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl group cursor-default">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform"></span>
                     <span className="font-bold text-zinc-800 text-sm tracking-tight">{topic}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Learning Path Bar */}
        <div className="bg-zinc-900 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="flex items-center gap-6">
             <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-400 to-yellow-200 flex items-center justify-center shrink-0">
               <Sparkles className="w-8 h-8 text-orange-900" />
             </div>
             <div>
               <h4 className="text-white font-black uppercase text-lg tracking-tight">AI Learning Path Generated</h4>
               <p className="text-zinc-400 text-xs">Based on this attempt, focusing on &quot;{analysis?.learningPath?.[0]?.task || 'Advanced Calculation'}&quot; next.</p>
             </div>
          </div>

          <div className="flex gap-4">
            <Link href={`/hub/mock-test`}>
              <button className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-black uppercase text-xs tracking-widest rounded-2xl border border-zinc-700 transition-all flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> Review Questions
              </button>
            </Link>
            <Link href="/hub">
              <button className="px-8 py-4 bg-secondary-container hover:bg-secondary-container/90 text-on-secondary-container font-black uppercase text-xs tracking-widest rounded-2xl shadow-[4px_4px_0px_0px_#785900] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2">
                Next Test <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* Actionable Steps Grid (Subtle) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60 hover:opacity-100 transition-opacity">
           {analysis?.learningPath?.slice(0, 3).map((step: any, i: number) => (
             <div key={i} className="p-4 border border-dashed border-zinc-200 rounded-2xl flex gap-3 items-center">
                <span className="text-zinc-300 font-black text-2xl italic">0{step.step}</span>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-tight leading-tight">{step.task}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
