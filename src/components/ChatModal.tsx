"use client";

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
};

const INITIAL_MESSAGE: Message = {
    id: '1',
    role: 'assistant',
    content: "Hi! I'm your AI Career Navigator. Tell me about your skills and goals, and I'll create a personalized plan for you. Try saying: \"I want to be a Data Scientist in 6 months.\""
};

export default function ChatModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

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
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            {/* Floating Action Button */}
            <button
                id="chat-trigger"
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform z-[100] ${isOpen ? 'hidden' : 'flex'}`}
            >
                <MessageSquare className="w-6 h-6" />
            </button>

            {/* Chat Modal */}
            {
                isOpen && (
                    <div className="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col z-[100] animate-in slide-in-from-bottom-10 fade-in duration-300">
                        {/* Header */}
                        <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30 rounded-t-2xl">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm text-foreground">Career Assistant</h3>
                                    <span className="text-xs text-green-500 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        Online
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-muted rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-br-none'
                                            : 'bg-muted text-foreground rounded-bl-none'
                                            }`}
                                    >
                                        <p className="whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-muted p-3 rounded-2xl rounded-bl-none flex gap-1">
                                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-100" />
                                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-200" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-border bg-muted/10 rounded-b-2xl">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask for career advice..."
                                    className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isTyping}
                                    className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
}
