"use client";

import { Sparkles, MessageSquare, ArrowRight } from "lucide-react";

import { useState } from "react";

export default function StartupSupportWidget() {
    return (
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm relative overflow-hidden group hover:border-primary/20 transition-all">
            <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <Sparkles className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold mb-2 text-foreground">Explore Startup Ideas</h3>
                <p className="text-muted-foreground mb-4 text-xs">
                    Validate your idea, build a business plan, or get market insights.
                </p>

                <button
                    onClick={() => document.getElementById('chat-trigger')?.click()}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors w-full justify-center"
                >
                    Chat with AI Consultant
                    <MessageSquare className="w-4 h-4" />
                </button>
            </div>

            {/* Decorative background */}
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Sparkles className="w-32 h-32" />
            </div>
        </div>
    );
}
