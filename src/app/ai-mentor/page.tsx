"use client";

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, User, Bot, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
};

const INITIAL_MESSAGE: Message = {
    id: '1',
    role: 'assistant',
    content: "Hi! I'm your AI Career Mentor. I can help you find the perfect career path, analyze your skills, or generate a learning roadmap. \n\nTell me a bit about yourself or try asking: \n\"How do I become a Data Scientist?\""
};

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg.content,
                    context: { name: 'Guest' }
                })
            });

            if (!response.ok) throw new Error('Failed to fetch');

            const data = await response.json();

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.response
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error(error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I'm having trouble connecting right now. Please try again in a moment."
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navigation />

            <div className="flex-1 container mx-auto px-4 pt-24 pb-6 flex flex-col max-w-4xl h-screen">
                <div className="flex items-center gap-4 mb-6">
                    <Link href="/" className="p-2 rounded-full hover:bg-muted transition-colors">
                        <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                            AI Career Mentor <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                        </h1>
                        <p className="text-sm text-muted-foreground">Powered by Advanced ML & Career Data</p>
                    </div>
                </div>

                <div className="flex-1 bg-card border border-border rounded-3xl flex flex-col overflow-hidden shadow-2xl">
                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                        <AnimatePresence initial={false}>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex items-start gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                                            }`}>
                                            {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                        </div>
                                        <div
                                            className={`p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${msg.role === 'user'
                                                    ? 'bg-primary text-primary-foreground rounded-tr-none'
                                                    : 'bg-muted text-foreground rounded-tl-none'
                                                }`}
                                        >
                                            <p className="whitespace-pre-wrap">{msg.content}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-start"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-1">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <div className="bg-muted p-4 rounded-2xl rounded-tl-none flex gap-1.5 items-center h-12">
                                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-background border-t border-border">
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            className="flex gap-3 relative"
                        >
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Ask anything..."
                                className="flex-1 bg-muted border border-border rounded-xl px-5 py-4 text-base focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground placeholder-muted-foreground"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isTyping}
                                className="px-6 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                            >
                                <Send className="w-5 h-5" />
                                <span className="hidden sm:inline">Send</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
