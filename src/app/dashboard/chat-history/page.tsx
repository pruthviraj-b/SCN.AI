import { MessageSquare, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ChatHistoryPage() {
    // Placeholder data
    const chats = [
        { id: 1, title: "Career Path Exploration", date: "2023-11-28", preview: "I'm interested in AI and Machine Learning..." },
        { id: 2, title: "Resume Review", date: "2023-11-25", preview: "Can you help me improve my resume for a backend role?" },
        { id: 3, title: "Interview Prep", date: "2023-11-20", preview: "What are common questions for a Junior Dev position?" },
    ];

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block">
                    &larr; Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold mb-2">Chat History</h1>
                <p className="text-muted-foreground">View your past conversations with the AI Career Coach.</p>
            </div>

            <div className="grid gap-4">
                {chats.map((chat) => (
                    <div key={chat.id} className="bg-card border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-4">
                                <div className="p-3 bg-primary/10 rounded-full h-fit">
                                    <MessageSquare className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{chat.title}</h3>
                                    <p className="text-muted-foreground text-sm mb-2">{chat.preview}</p>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Clock className="w-3 h-3" />
                                        {chat.date}
                                    </div>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
