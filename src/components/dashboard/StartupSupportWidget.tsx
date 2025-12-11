"use client";

import { Sparkles, MessageSquare, ArrowRight } from "lucide-react";
import ChatModal from "../ChatModal";
import { useState } from "react";

export default function StartupSupportWidget() {
    return (
        <div className="bg-gradient-to-br from-primary/20 to-purple-600/10 p-6 rounded-2xl border border-primary/20 relative overflow-hidden group">
            <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 text-primary">
                    <Sparkles className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold mb-2">Startup Support</h3>
                <p className="text-muted-foreground mb-6 text-sm">
                    Have a business idea? Chat with our AI Business Consultant to validate your idea, build a business plan, or get market insights.
                </p>

                <button
                    onClick={() => document.getElementById('chat-trigger')?.click()}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                    Chat with AI Consultant
                    <MessageSquare className="w-4 h-4" />
                </button>
            </div>

            {/* Decorative background */}
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Sparkles className="w-32 h-32" />
            </div>

            {/* Hidden chat trigger to open global modal */}
            <div className="hidden">
                <ChatModal />
            </div>
        </div>
    );
}
