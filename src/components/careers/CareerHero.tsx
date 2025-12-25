
"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowRight, Target, Sparkles } from "lucide-react";

export default function CareerHero() {
    const { status } = useSession();
    const isLoggedIn = status === "authenticated";

    return (
        <div className="relative py-20 overflow-hidden">
            {/* Background Blooms */}
            <div className="absolute top-10 right-10 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] -z-10" />

            <div className="text-center max-w-4xl mx-auto px-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
                    <Sparkles className="w-3 h-3" />
                    <span>AI-Powered Career Discovery</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 tracking-tight">
                    Your Career, <span className="text-primary">Clearly Mapped.</span>
                </h1>

                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                    Stop guessing. Use AI to analyze your skills and find the perfect role that matches your ambition and market reality.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => {
                            const element = document.getElementById('career-grid');
                            element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-4 rounded-xl bg-card hover:bg-card/80 border border-border text-foreground font-semibold transition-all hover:scale-105"
                    >
                        Explore Career Paths
                    </button>

                    <Link
                        href={isLoggedIn ? "/get-started" : "/login?redirect=/get-started"}
                        className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105 flex items-center gap-2"
                    >
                        <Target className="w-5 h-5" />
                        Take Career Scan
                    </Link>
                </div>
            </div>
        </div>
    );
}
