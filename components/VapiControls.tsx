'use client';

import {Mic, MicOff, Send, Loader2} from "lucide-react";
import useVapi from "@/hooks/useVapi";
import {IBook} from "@/types";
import Image from "next/image";
import Transcript from "@/components/Transcript";
import {toast} from "sonner";
import {askDoubtText} from "@/lib/actions/book.actions";

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

const VapiControls = ({ book }: { book: IBook }) => {
    const { status, isActive, messages, currentMessage, currentUserMessage, duration, start, stop, clearError, limitError, isBillingError, maxDurationSeconds } = useVapi(book)
    const router = useRouter();

    const [textInput, setTextInput] = useState('');
    const [textMessages, setTextMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (limitError) {
            toast.error(limitError);
            router.push("/");
            clearError();
        }
    }, [limitError, router, clearError]);

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSendText = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!textInput.trim() || isTyping) return;
        
        const query = textInput.trim();
        setTextInput('');
        setTextMessages(prev => [...prev, { role: 'user', content: query }]);
        
        setIsTyping(true);
        const res = await askDoubtText(query, book._id);
        setIsTyping(false);
        
        if (res.success && res.text) {
            setTextMessages(prev => [...prev, { role: 'assistant', content: res.text as string }]);
        } else {
            setTextMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I couldn't process that. Could you try asking that again?" }]);
        }
    };

    const getStatusDisplay = () => {
        switch (status) {
            case 'connecting': return { label: 'Connecting...', color: 'vapi-status-dot-connecting' };
            case 'starting': return { label: 'Starting...', color: 'vapi-status-dot-starting' };
            case 'listening': return { label: 'Listening', color: 'vapi-status-dot-listening' };
            case 'thinking': return { label: 'Thinking...', color: 'vapi-status-dot-thinking' };
            case 'speaking': return { label: 'Speaking', color: 'vapi-status-dot-speaking' };
            default: return { label: 'Ready', color: 'vapi-status-dot-ready' };
        }
    };

    const statusDisplay = getStatusDisplay();
    const allMessages = [...textMessages, ...messages];

    return (
        <>
            <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-10">
                {/* Header Card */}
                <div className="vapi-header-card">
                    <div className="vapi-cover-wrapper">
                        <Image
                            src={book.coverURL || "/images/book-placeholder.png"}
                            alt={book.title}
                            width={120}
                            height={180}
                            className="vapi-cover-image !w-[120px] !h-auto"
                            priority
                        />
                        <div className="vapi-mic-wrapper relative">
                            {isActive && (status === 'speaking' || status === 'thinking') && (
                                <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
                            )}
                            <button
                                onClick={isActive ? stop : start}
                                disabled={status === 'connecting'}
                                className={`vapi-mic-btn shadow-md !w-[60px] !h-[60px] z-10 ${isActive ? 'vapi-mic-btn-active' : 'vapi-mic-btn-inactive'}`}
                            >
                                {isActive ? (
                                    <Mic className="size-7 text-white" />
                                ) : (
                                    <MicOff className="size-7 text-[#212a3b]" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 flex-1">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#212a3b] mb-1">
                                {book.title}
                            </h1>
                            <p className="text-[#3d485e] font-medium">by {book.author}</p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <div className="vapi-status-indicator">
                                <span className={`vapi-status-dot ${statusDisplay.color}`} />
                                <span className="vapi-status-text">{statusDisplay.label}</span>
                            </div>

                            <div className="vapi-status-indicator">
                                <span className="vapi-status-text">Voice: {book.persona || "Daniel"}</span>
                            </div>

                            <div className="vapi-status-indicator">
                                <span className="vapi-status-text">
                                    {formatDuration(duration)}/{formatDuration(maxDurationSeconds)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="vapi-transcript-wrapper flex flex-col pt-1">
                    <div className="transcript-container min-h-[400px]">
                        <Transcript
                            messages={allMessages}
                            currentMessage={currentMessage}
                            currentUserMessage={currentUserMessage}
                        />

                        {isTyping && (
                            <div className="flex gap-4 max-w-[85%] mt-4 ml-6 mb-4">
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
                    <div className="p-4 sm:p-6 bg-surface-container-high border-t-2 border-dashed border-primary/20 shrink-0 mt-2 rounded-b-xl max-w-4xl mx-auto w-full">
                        <form onSubmit={handleSendText} className="flex items-end gap-2 sm:gap-4">
                            
                            {/* Text Input */}
                            <div className="flex-1 bg-surface-container-lowest sketched-border min-h-[56px] sm:min-h-[64px] flex items-center px-4 -rotate-[0.2deg] shadow-inner relative group focus-within:ring-2 focus-within:ring-primary focus-within:rotate-0 transition-transform">
                                <input
                                    type="text"
                                    value={textInput}
                                    onChange={(e) => setTextInput(e.target.value)}
                                    disabled={isTyping || isActive}
                                    placeholder={isActive ? "Voice mode active..." : "Type your question about this book here..."}
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
        </>
    )
}
export default VapiControls
