
"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowRight, Lightbulb, Rocket, Bot } from "lucide-react";

export default function StartupHero() {
    const { status } = useSession();
    const isLoggedIn = status === "authenticated";

    return (
        <div className="relative py-20 overflow-hidden">
            {/* Background Blooms */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] -z-10" />

            <div className="text-center max-w-4xl mx-auto px-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-medium mb-6 animate-fade-in">
                    <Rocket className="w-3 h-3" />
                    <span>Launch Your Next Big Thing</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-600 tracking-tight">
                    Build What the <span className="text-foreground">Market Needs.</span>
                </h1>

                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                    Don't guess. Use our AI-validated startup concepts, complete with market analysis, revenue models, and execution roadmaps.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => {
                            const element = document.getElementById('startup-grid');
                            element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-4 rounded-xl bg-card hover:bg-card/80 border border-border text-foreground font-semibold transition-all hover:scale-105"
                    >
                        Explore Ideas
                    </button>

                    <Link
                        href={isLoggedIn ? "/dashboard" : "/login?redirect=/startups"}
                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all hover:scale-105 flex items-center gap-2"
                    >
                        <Bot className="w-5 h-5" />
                        Generate AI Idea
                    </Link>
                </div>
            </div>
        </div>
    );
}
