
"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen } from "lucide-react";

export default function ResourceHero() {
    const { status } = useSession();
    const isLoggedIn = status === "authenticated";

    return (
        <div className="relative py-20 overflow-hidden">
            {/* Background Blooms */}
            <div className="absolute top-10 left-10 w-64 h-64 bg-green-500/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -z-10" />

            <div className="text-center max-w-4xl mx-auto px-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
                    <BookOpen className="w-3 h-3" />
                    <span>Curated Learning Hub</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 tracking-tight">
                    Learn the Right Skills, <span className="text-primary">The Right Way.</span>
                </h1>

                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                    Stop wasting time searching. Access high-quality, AI-verified resources tailored to your career path and current skill level.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => {
                            const element = document.getElementById('resource-grid');
                            element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-4 rounded-xl bg-card hover:bg-card/80 border border-border text-foreground font-semibold transition-all hover:scale-105"
                    >
                        View Resources
                    </button>

                    <Link
                        href={isLoggedIn ? "/dashboard" : "/login?redirect=/dashboard"}
                        className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105 flex items-center gap-2"
                    >
                        <Sparkles className="w-5 h-5" />
                        Get Personalized Resources
                    </Link>
                </div>
            </div>
        </div>
    );
}
