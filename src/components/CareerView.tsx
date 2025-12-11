"use client";

import { useState } from "react";
import { ArrowLeft, DollarSign, TrendingUp, BookOpen, Users, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type CareerPath = {
    id: string;
    title: string;
    category: string;
    demand: string;
    avgSalary: string;
    description?: string;
};

export default function CareerView({ career }: { career: CareerPath }) {
    const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'outlook'>('overview');

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Header */}
            <div className="bg-gradient-to-b from-blue-900/20 to-background border-b border-white/5 pt-24 pb-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <Link href="/careers" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Careers
                    </Link>

                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        <div>
                            <div className="flex gap-2 mb-4">
                                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium">{career.category}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{career.title}</h1>
                            <p className="text-xl text-gray-400 max-w-2xl">{career.description}</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm min-w-[150px]">
                                <div className="text-sm text-gray-400 mb-1">Avg. Salary</div>
                                <div className="text-2xl font-bold text-green-400">
                                    {career.avgSalary}
                                </div>
                            </div>
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm min-w-[150px]">
                                <div className="text-sm text-gray-400 mb-1">Demand</div>
                                <div className={`text-2xl font-bold ${career.demand === 'High' || career.demand === 'Very High' ? 'text-green-400' : 'text-yellow-400'}`}>
                                    {career.demand}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 mt-8">
                {/* Tabs */}
                <div className="flex flex-wrap gap-4 border-b border-white/10 mb-8 overflow-x-auto">
                    {[
                        { id: 'overview', label: 'Role Overview', icon: Briefcase },
                        { id: 'skills', label: 'Skills & Requirements', icon: BookOpen },
                        { id: 'outlook', label: 'Career Outlook', icon: TrendingUp },
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
                                            <Briefcase className="w-5 h-5 text-blue-400" />
                                            About This Role
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed text-lg">
                                            As a {career.title}, you will play a crucial role in {career.category === 'Technology' ? 'building and maintaining cutting-edge software solutions' :
                                                career.category === 'Business' ? 'driving business growth and strategy' :
                                                    career.category === 'Design' ? 'creating intuitive and engaging user experiences' :
                                                        career.category === 'Marketing' ? 'growing brand presence and engaging customers' :
                                                            'analyzing complex datasets to drive decision making'}.
                                            This role offers a dynamic environment with opportunities for continuous learning and career advancement.
                                        </p>
                                    </section>

                                    <section className="glass-card p-8 rounded-2xl border border-white/10">
                                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                            <Users className="w-5 h-5 text-purple-400" />
                                            Typical Responsibilities
                                        </h3>
                                        <ul className="space-y-4">
                                            {[
                                                'Collaborate with cross-functional teams',
                                                'Solve complex problems using creative solutions',
                                                'Stay updated with industry trends and technologies',
                                                'Mentor junior team members',
                                                'Contribute to strategic planning and execution'
                                            ].map((item, i) => (
                                                <li key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                                    <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 text-xs">
                                                        {i + 1}
                                                    </div>
                                                    <span className="text-gray-300">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                </div>

                                <div className="space-y-8">
                                    <section className="glass-card p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-blue-900/10 to-transparent">
                                        <h3 className="font-bold mb-4 text-blue-400">Why Choose This Path?</h3>
                                        <p className="text-sm text-gray-300 mb-4">
                                            This career path offers high growth potential, competitive salaries, and the chance to make a significant impact in the {career.category} industry.
                                        </p>
                                    </section>

                                    <section className="glass-card p-6 rounded-2xl border border-white/10">
                                        <h3 className="font-bold mb-4">Quick Stats</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="text-sm text-gray-400">Work-Life Balance</div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                                                        <div className="h-full bg-green-400 w-[80%]" />
                                                    </div>
                                                    <span className="text-sm font-bold">8/10</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-400">Job Satisfaction</div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                                                        <div className="h-full bg-primary w-[90%]" />
                                                    </div>
                                                    <span className="text-sm font-bold">9/10</span>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        )}

                        {activeTab === 'skills' && (
                            <div className="grid md:grid-cols-2 gap-8">
                                <section className="glass-card p-8 rounded-2xl border border-white/10">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-pink-400" />
                                        Core Competencies
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['Problem Solving', 'Critical Thinking', 'Communication', 'Teamwork', 'Adaptability', 'Technical Proficiency', 'Project Management'].map((skill) => (
                                            <span key={skill} className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 text-sm">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-8">
                                        <h4 className="font-semibold text-lg mb-4">Recommended Education</h4>
                                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
                                            <GraduationCap className="w-6 h-6 text-pink-400 mt-1" />
                                            <div>
                                                <div className="font-bold">Bachelor's Degree</div>
                                                <div className="text-sm text-gray-400">Computer Science, Business, or related field</div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === 'outlook' && (
                            <div className="glass-card p-8 rounded-2xl border border-white/10">
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-green-400" />
                                    Future Outlook
                                </h3>
                                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                    The demand for {career.title}s is expected to {career.demand === 'High' ? 'grow rapidly' : 'remain steady'} over the next decade.
                                    As industries continue to digitize and evolve, professionals in this field will find abundant opportunities for innovation and leadership.
                                </p>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
                                        <div className="text-3xl font-bold text-primary mb-2">+22%</div>
                                        <div className="text-sm text-gray-400">Job Growth (10 Yrs)</div>
                                    </div>
                                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
                                        <div className="text-3xl font-bold text-green-400 mb-2">150k+</div>
                                        <div className="text-sm text-gray-400">Open Positions</div>
                                    </div>
                                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
                                        <div className="text-3xl font-bold text-purple-400 mb-2">Global</div>
                                        <div className="text-sm text-gray-400">Opportunities</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                <div className="text-center mt-12 pb-12">
                    <Link
                        href="/onboarding"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors text-lg font-semibold shadow-lg shadow-primary/25"
                    >
                        Create My Career Plan
                        <TrendingUp className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
