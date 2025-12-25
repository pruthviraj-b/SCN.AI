"use client";

import { useState } from "react";
import { ArrowLeft, DollarSign, Target, Megaphone, HelpCircle, FileText, Zap } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Matches db.ts type
type StartupIdea = {
    id: string;
    title: string;
    problem_statement: string;
    solution_summary: string;
    target_users: string;
    industry: string;
    difficulty_level: string;
    required_skills: string[];
    market_size_estimate: string;
    revenue_model: string[];
    validation_score: number;
    risk_level: string;
    execution_steps: string[];
    status: string;
};

export default function StartupView({ idea }: { idea: StartupIdea }) {
    const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'marketing' | 'support'>('overview');

    // --- Data Transformation & Adapters ---
    // We derive the rich UI structure from our flat DB data.

    const businessPlan = {
        executiveSummary: `${idea.problem_statement} \n\n${idea.solution_summary}`,
        targetAudience: idea.target_users.split(',').map(s => s.trim()),
        revenueModel: idea.revenue_model,
        // Use execution steps as strategy if marketing is missing
        marketingStrategy: idea.execution_steps,
        // Mocking financials based on market size for UI demo purposes
        financialProjections: [
            { year: "Year 1", revenue: "$50K", expenses: "$30K", profit: "$20K" },
            { year: "Year 2", revenue: "$150K", expenses: "$80K", profit: "$70K" },
            { year: "Year 3", revenue: "$400K", expenses: "$150K", profit: "$250K" },
        ]
    };

    const faqs = [
        { question: "How much capital is needed?", answer: `Given the ${idea.difficulty_level} difficulty, we estimate an initial bootstrap budget of $5k-$15k.` },
        { question: "Is this idea validated?", answer: `This concept has a validation score of ${idea.validation_score}/100, indicating strong market signal.` }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Header */}
            <div className="bg-gradient-to-b from-primary/10 to-background border-b border-white/5 pt-24 pb-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <Link href="/startups" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Ideas
                    </Link>

                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        <div>
                            <div className="flex gap-2 mb-4">
                                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">{idea.industry}</span>
                                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium border border-purple-500/20">{idea.market_size_estimate} Market</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{idea.title}</h1>
                            <p className="text-xl text-muted-foreground max-w-2xl">{idea.solution_summary}</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-card border border-border backdrop-blur-sm min-w-[200px]">
                            <div className="text-sm text-muted-foreground mb-1">Difficulty Level</div>
                            <div className={`text-2xl font-bold ${idea.difficulty_level === 'High' || idea.difficulty_level === 'Advanced' ? 'text-red-400' :
                                idea.difficulty_level === 'Medium' || idea.difficulty_level === 'Intermediate' ? 'text-yellow-400' : 'text-green-400'
                                }`}>
                                {idea.difficulty_level}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 mt-8">
                {/* Tabs */}
                <div className="flex flex-wrap gap-4 border-b border-border/40 mb-8 overflow-x-auto">
                    {[
                        { id: 'overview', label: 'Executive Overview', icon: FileText },
                        { id: 'marketing', label: 'Execution Strategy', icon: Target },
                        { id: 'financials', label: 'Projected Financials', icon: DollarSign },
                        { id: 'support', label: 'Support & FAQs', icon: HelpCircle },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                ? 'border-primary text-primary'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
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
                                    <section className="bg-card p-8 rounded-2xl border border-border">
                                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                            <FileText className="w-5 h-5 text-blue-400" />
                                            Executive Summary
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-semibold text-foreground">The Problem</h4>
                                                <p className="text-muted-foreground leading-relaxed text-lg">
                                                    {idea.problem_statement}
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-foreground">The Solution</h4>
                                                <p className="text-muted-foreground leading-relaxed text-lg">
                                                    {idea.solution_summary}
                                                </p>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="bg-card p-8 rounded-2xl border border-border">
                                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                            <Target className="w-5 h-5 text-purple-400" />
                                            Target Audience
                                        </h3>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {businessPlan.targetAudience.map((audience, i) => (
                                                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/50">
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
                                    <section className="bg-card p-6 rounded-2xl border border-border bg-gradient-to-br from-green-900/10 to-transparent">
                                        <h3 className="font-bold mb-4 text-green-400">Profit Potential</h3>
                                        <div className="text-4xl font-bold mb-2">{businessPlan.financialProjections[2].profit}</div>
                                        <div className="text-sm text-muted-foreground">Projected Year 3 Profit</div>
                                    </section>

                                    <section className="bg-card p-6 rounded-2xl border border-border">
                                        <h3 className="font-bold mb-4">Revenue Streams</h3>
                                        <ul className="space-y-3">
                                            {idea.revenue_model.map((item, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    <section className="bg-card p-6 rounded-2xl border border-border">
                                        <h3 className="font-bold mb-4">Required Skills</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {idea.required_skills.map((skill, i) => (
                                                <span key={i} className="px-2 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            </div>
                        )}

                        {activeTab === 'marketing' && (
                            <div className="grid md:grid-cols-2 gap-8">
                                <section className="bg-card p-8 rounded-2xl border border-border">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                        <Megaphone className="w-5 h-5 text-pink-400" />
                                        Execution Plan & Strategy
                                    </h3>
                                    <div className="space-y-4">
                                        {businessPlan.marketingStrategy.map((step, i) => (
                                            <div key={i} className="flex gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors border border-border/50">
                                                <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center flex-shrink-0 font-bold">
                                                    {i + 1}
                                                </div>
                                                <div className="pt-1">{step}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === 'financials' && (
                            <div className="bg-card p-8 rounded-2xl border border-border overflow-hidden">
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                                    <DollarSign className="w-5 h-5 text-green-400" />
                                    Financial Projections (Estimated)
                                </h3>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {businessPlan.financialProjections.map((year, i) => (
                                        <div key={i} className="relative p-6 rounded-xl bg-gradient-to-br from-muted/20 to-transparent border border-border">
                                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                                <DollarSign className="w-24 h-24" />
                                            </div>
                                            <h4 className="text-lg font-bold mb-6 text-primary">{year.year}</h4>

                                            <div className="space-y-4">
                                                <div>
                                                    <div className="text-sm text-muted-foreground mb-1">Revenue</div>
                                                    <div className="text-2xl font-bold">{year.revenue}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-muted-foreground mb-1">Expenses</div>
                                                    <div className="text-lg text-red-400">{year.expenses}</div>
                                                </div>
                                                <div className="pt-4 border-t border-border">
                                                    <div className="text-sm text-muted-foreground mb-1">Net Profit</div>
                                                    <div className="text-xl font-bold text-green-400">{year.profit}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-8 text-sm text-muted-foreground italic">
                                    * These figures are rough estimates based on industry averages for {idea.industry} startups. Actual results may vary.
                                </p>
                            </div>
                        )}

                        {activeTab === 'support' && (
                            <div className="grid md:grid-cols-2 gap-8">
                                <section className="bg-card p-8 rounded-2xl border border-border">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                        <HelpCircle className="w-5 h-5 text-blue-400" />
                                        Frequently Asked Questions
                                    </h3>
                                    <div className="space-y-6">
                                        {faqs.map((faq, i) => (
                                            <div key={i}>
                                                <h4 className="font-semibold text-lg mb-2 text-foreground">{faq.question}</h4>
                                                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-600/10 border border-primary/20 text-center">
                                    <h3 className="text-2xl font-bold mb-4">Need Personalized Help?</h3>
                                    <p className="text-muted-foreground mb-8">
                                        Our AI Business Consultant can help you refine this business plan specifically for your location and budget.
                                    </p>
                                    <Link href="/ai-mentor" className="inline-block px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/25">
                                        Chat with AI Consultant
                                    </Link>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
