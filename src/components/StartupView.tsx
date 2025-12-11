"use client";

import { useState } from "react";
import { ArrowLeft, DollarSign, Target, Megaphone, HelpCircle, FileText } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type StartupIdea = {
    id: string;
    title: string;
    category: string;
    difficulty: string;
    market: string;
    description?: string;
    businessPlan?: {
        executiveSummary: string;
        targetAudience: string[];
        revenueModel: string[];
        marketingStrategy: string[];
        financialProjections: { year: string; revenue: string; expenses: string; profit: string }[];
    };
    faqs?: { question: string; answer: string }[];
};

export default function StartupView({ idea }: { idea: StartupIdea }) {
    const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'marketing' | 'support'>('overview');

    if (!idea.businessPlan) {
        return <div className="p-8 text-center text-gray-400">Business plan data not available.</div>;
    }

    const { businessPlan, faqs } = idea;

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Header */}
            <div className="bg-gradient-to-b from-primary/10 to-background border-b border-white/5 pt-24 pb-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <Link href="/startup-ideas" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Ideas
                    </Link>

                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        <div>
                            <div className="flex gap-2 mb-4">
                                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium">{idea.category}</span>
                                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">{idea.market}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{idea.title}</h1>
                            <p className="text-xl text-gray-400 max-w-2xl">{idea.description}</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm min-w-[200px]">
                            <div className="text-sm text-gray-400 mb-1">Difficulty Level</div>
                            <div className={`text-2xl font-bold ${idea.difficulty === 'High' ? 'text-red-400' :
                                    idea.difficulty === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                                }`}>
                                {idea.difficulty}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 mt-8">
                {/* Tabs */}
                <div className="flex flex-wrap gap-4 border-b border-white/10 mb-8 overflow-x-auto">
                    {[
                        { id: 'overview', label: 'Executive Overview', icon: FileText },
                        { id: 'marketing', label: 'Market & Strategy', icon: Target },
                        { id: 'financials', label: 'Financial Projections', icon: DollarSign },
                        { id: 'support', label: 'Support & FAQs', icon: HelpCircle },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-400 hover:text-white'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'overview' && (
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-8">
                                    <section className="glass-card p-8 rounded-2xl border border-white/10">
                                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                            <FileText className="w-5 h-5 text-blue-400" />
                                            Executive Summary
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed text-lg">
                                            {businessPlan.executiveSummary}
                                        </p>
                                    </section>

                                    <section className="glass-card p-8 rounded-2xl border border-white/10">
                                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                            <Target className="w-5 h-5 text-purple-400" />
                                            Target Audience
                                        </h3>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {businessPlan.targetAudience.map((audience, i) => (
                                                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/5">
                                                    <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 text-sm">
                                                        {i + 1}
                                                    </div>
                                                    <span>{audience}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>

                                <div className="space-y-8">
                                    <section className="glass-card p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-green-900/10 to-transparent">
                                        <h3 className="font-bold mb-4 text-green-400">Profit Potential</h3>
                                        <div className="text-4xl font-bold mb-2">{businessPlan.financialProjections[2].profit}</div>
                                        <div className="text-sm text-gray-400">Projected Year 3 Profit</div>
                                    </section>

                                    <section className="glass-card p-6 rounded-2xl border border-white/10">
                                        <h3 className="font-bold mb-4">Revenue Streams</h3>
                                        <ul className="space-y-3">
                                            {businessPlan.revenueModel.map((item, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                </div>
                            </div>
                        )}

                        {activeTab === 'marketing' && (
                            <div className="grid md:grid-cols-2 gap-8">
                                <section className="glass-card p-8 rounded-2xl border border-white/10">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                        <Megaphone className="w-5 h-5 text-pink-400" />
                                        Marketing Strategy
                                    </h3>
                                    <div className="space-y-4">
                                        {businessPlan.marketingStrategy.map((strategy, i) => (
                                            <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                                <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center flex-shrink-0 font-bold">
                                                    {i + 1}
                                                </div>
                                                <div className="pt-1">{strategy}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === 'financials' && (
                            <div className="glass-card p-8 rounded-2xl border border-white/10 overflow-hidden">
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                                    <DollarSign className="w-5 h-5 text-green-400" />
                                    Financial Projections (3 Years)
                                </h3>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {businessPlan.financialProjections.map((year, i) => (
                                        <div key={i} className="relative p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
                                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                                <DollarSign className="w-24 h-24" />
                                            </div>
                                            <h4 className="text-lg font-bold mb-6 text-primary">{year.year}</h4>

                                            <div className="space-y-4">
                                                <div>
                                                    <div className="text-sm text-gray-400 mb-1">Revenue</div>
                                                    <div className="text-2xl font-bold">{year.revenue}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-400 mb-1">Expenses</div>
                                                    <div className="text-lg text-red-400">{year.expenses}</div>
                                                </div>
                                                <div className="pt-4 border-t border-white/10">
                                                    <div className="text-sm text-gray-400 mb-1">Net Profit</div>
                                                    <div className="text-xl font-bold text-green-400">{year.profit}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'support' && (
                            <div className="grid md:grid-cols-2 gap-8">
                                <section className="glass-card p-8 rounded-2xl border border-white/10">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                        <HelpCircle className="w-5 h-5 text-blue-400" />
                                        Frequently Asked Questions
                                    </h3>
                                    <div className="space-y-6">
                                        {faqs?.map((faq, i) => (
                                            <div key={i}>
                                                <h4 className="font-semibold text-lg mb-2 text-blue-100">{faq.question}</h4>
                                                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-600/20 border border-primary/20 text-center">
                                    <h3 className="text-2xl font-bold mb-4">Need Personalized Help?</h3>
                                    <p className="text-gray-300 mb-8">
                                        Our AI Business Consultant can help you refine this business plan specifically for your location and budget.
                                    </p>
                                    <button className="px-8 py-4 rounded-full bg-primary text-white font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/25">
                                        Chat with AI Consultant
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
