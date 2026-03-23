'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Send, Loader2 } from 'lucide-react';
import useVapi from '@/hooks/useVapi';
import { sampleBooks } from '@/lib/constants';
import { IBook } from '@/types';
import { askDoubtText } from '@/lib/actions/book.actions';

export default function DoubtSolverPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { status, isActive, messages: vapiMessages, currentMessage, currentUserMessage, start, stop } = useVapi(sampleBooks[0] as unknown as IBook);
  
  const [textInput, setTextInput] = useState('');
  const [textMessages, setTextMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "Hello, Architect! I've got my markers ready. What's puzzling you today? Let's draft a solution." }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Combine vapiMessages and textMessages for a single cohesive thread
  const allMessages = [...textMessages, ...vapiMessages];

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [allMessages, currentMessage, currentUserMessage, isTyping]);

  const handleSendText = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!textInput.trim() || isTyping) return;
    
    const query = textInput.trim();
    setTextInput('');
    setTextMessages(prev => [...prev, { role: 'user', content: query }]);
    
    setIsTyping(true);
    const res = await askDoubtText(query);
    setIsTyping(false);
    
    if (res.success && res.text) {
        setTextMessages(prev => [...prev, { role: 'assistant', content: res.text as string }]);
    } else {
        setTextMessages(prev => [...prev, { role: 'assistant', content: "Sorry, my whiteboard markers dried out. Could you try asking that again?" }]);
    }
  };

  const getStatusDisplay = () => {
    switch (status) {
        case 'connecting': return 'Connecting...';
        case 'starting': return 'Starting...';
        case 'listening': return 'Listening...';
        case 'thinking': return 'Thinking...';
        case 'speaking': return 'Speaking...';
        default: return 'Voice Mode Ready';
    }
  };

  return (
    <div className="w-full min-h-screen relative">
      <motion.main className="pt-20 h-screen flex flex-col relative bg-surface overflow-hidden pb-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
        
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
        
        <div className="flex-1 flex flex-col max-w-4xl mx-auto px-4 sm:px-6 w-full relative z-10 h-full">
            {/* Header Section */}
            <div className="py-4 flex flex-col items-center shrink-0">
                <h1 className="font-headline text-4xl sm:text-5xl font-black text-primary italic tracking-tight mb-2 marker-underline">
                    Doubt Solver
                </h1>
                <p className="font-body text-secondary font-bold text-center">Ask anything via Text or Voice, I'll sketch the answer.</p>
            </div>
            
            {/* Chat Interface */}
            <div className="flex-1 bg-surface-container-low sketched-border shadow-2xl mb-4 flex flex-col overflow-hidden relative rotate-[0.5deg]">
                
                {/* Voice Status Banner */}
                {isActive && (
                    <div className="bg-secondary/10 border-b-2 border-secondary p-2 flex justify-center items-center gap-2 font-headline font-bold text-secondary text-sm">
                       <span className={`w-2 h-2 rounded-full ${status === 'speaking' || status === 'thinking' ? 'bg-tertiary animate-pulse' : 'bg-primary'}`}></span>
                       {getStatusDisplay()}
                    </div>
                )}
                
                {/* Chat Feed */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 scroll-smooth pb-10">
                    
                    {allMessages.map((msg, i) => (
                        <div key={i} className={`flex gap-3 sm:gap-4 max-w-[90%] sm:max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 border-2 border-black flex items-center justify-center ${msg.role === 'user' ? 'bg-secondary-container rotate-6 rounded-sm' : 'bg-primary-container -rotate-3 rounded-lg overflow-hidden'}`}>
                                <span className={`material-symbols-outlined text-sm sm:text-base ${msg.role === 'user' ? 'text-on-secondary-container' : 'text-on-primary-container'}`}>
                                    {msg.role === 'user' ? 'person' : 'smart_toy'}
                                </span>
                            </div>
                            <div className={`sketched-border p-4 sm:p-5 relative ${msg.role === 'user' ? 'bg-surface-container chat-bubble-user -rotate-1' : 'bg-surface-container-highest chat-bubble-ai rotate-[0.5deg]'}`}>
                                <div className="font-headline text-base sm:text-lg leading-relaxed text-on-surface whitespace-pre-wrap">
                                    {msg.content}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Live Vapi Status Transcripts */}
                    {currentUserMessage && (
                        <div className="flex gap-4 max-w-[85%] ml-auto flex-row-reverse opacity-70">
                            <div className="w-10 h-10 shrink-0 bg-secondary-container border-2 border-black rounded-sm flex items-center justify-center rotate-6">
                                <span className="material-symbols-outlined">person</span>
                            </div>
                            <div className="bg-surface-container/50 sketched-border p-5 chat-bubble-user relative -rotate-1">
                                <p className="font-headline text-lg leading-relaxed text-on-surface">
                                    {currentUserMessage}...
                                </p>
                            </div>
                        </div>
                    )}
                    
                    {currentMessage && (
                        <div className="flex gap-4 max-w-[85%] opacity-70">
                            <div className="w-10 h-10 shrink-0 bg-primary-container border-2 border-black rounded-sm flex items-center justify-center -rotate-3">
                                <span className="material-symbols-outlined">smart_toy</span>
                            </div>
                            <div className="bg-surface-container-highest/50 sketched-border p-5 chat-bubble-ai relative rotate-[0.5deg]">
                                <p className="font-headline text-lg leading-relaxed text-on-surface">
                                    {currentMessage}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Live Text Typing Loader */}
                    {isTyping && (
                         <div className="flex gap-4 max-w-[85%]">
                            <div className="w-10 h-10 shrink-0 bg-primary-container border-2 border-black rounded-sm flex items-center justify-center -rotate-3">
                                <span className="material-symbols-outlined text-on-primary-container">smart_toy</span>
                            </div>
                            <div className="bg-surface-container-highest sketched-border p-5 chat-bubble-ai relative rotate-[0.5deg] flex items-center justify-center">
                                <Loader2 className="w-6 h-6 animate-spin text-tertiary" />
                            </div>
                        </div>
                    )}

                </div>
                
                {/* Input Area */}
                <div className="p-4 sm:p-6 bg-surface-container-high border-t-2 border-dashed border-primary/20 shrink-0">
                    <form onSubmit={handleSendText} className="flex items-end gap-2 sm:gap-4">
                        
                        {/* Voice Mic Button */}
                        <button
                            type="button"
                            onClick={isActive ? stop : start}
                            disabled={status === 'connecting'}
                            className={`shrink-0 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full border-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all z-10 ${isActive ? 'bg-tertiary border-tertiary text-on-tertiary animate-pulse' : 'bg-surface-container-highest border-primary text-primary hover:bg-primary/10'}`}
                        >
                            {isActive ? <Mic className="w-6 h-6 sm:w-8 sm:h-8" /> : <MicOff className="w-6 h-6 sm:w-8 sm:h-8" />}
                        </button>
                        
                        {/* Text Input */}
                        <div className="flex-1 bg-surface-container-lowest sketched-border min-h-[56px] sm:min-h-[64px] flex items-center px-4 -rotate-[0.2deg] shadow-inner relative group focus-within:ring-2 focus-within:ring-primary focus-within:rotate-0 transition-transform">
                            <input
                                type="text"
                                value={textInput}
                                onChange={(e) => setTextInput(e.target.value)}
                                disabled={isTyping || isActive}
                                placeholder={isActive ? "Voice mode active..." : "Type your question here..."}
                                className="w-full bg-transparent border-none outline-none font-headline text-lg sm:text-xl text-on-surface placeholder:text-on-surface-variant/50"
                            />
                        </div>
                        
                        {/* Send Text Button */}
                        <button
                            type="submit"
                            disabled={!textInput.trim() || isTyping || isActive}
                            className="bg-primary disabled:opacity-50 text-on-primary font-headline font-black text-lg sm:text-xl px-4 sm:px-8 h-14 sm:h-16 sketched-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:transform-none hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2 uppercase italic rotate-2"
                        >
                             <span className="hidden sm:inline">Send</span>
                            <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </form>
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
