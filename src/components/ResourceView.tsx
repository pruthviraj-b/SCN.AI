"use client";

import { useState } from "react";
import { ArrowLeft, BookOpen, Clock, Star, Users, ExternalLink, CheckCircle, Monitor } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type LearningResource = {
    id: string;
    title: string;
    platform: string;
    category: string;
    url: string;
    status: string;
};

export default function ResourceView({ resource }: { resource: LearningResource }) {
    const [activeTab, setActiveTab] = useState<'details' | 'curriculum' | 'reviews'>('details');

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Header */}
            <div className="bg-gradient-to-b from-green-900/20 to-background border-b border-white/5 pt-24 pb-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <Link href="/resources" className="inline-flex items-center gap-2 text-blue-200/70 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Resources
                    </Link>

                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        <div>
                            <div className="flex gap-2 mb-4">
                                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">{resource.category}</span>
                                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">{resource.platform}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{resource.title}</h1>
                            <div className="flex items-center gap-4 text-blue-200/70">
                                <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-current" /> 4.8 (1.2k reviews)</span>
                                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 15k+ Students</span>
                                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> ~25 Hours</span>
                            </div>
                        </div>
                        <div>
                            <a
                                href={`https://${resource.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors text-lg font-semibold shadow-lg shadow-green-500/25"
                            >
                                Start Learning
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 mt-8">
                {/* Tabs */}
                <div className="flex flex-wrap gap-4 border-b border-white/10 mb-8 overflow-x-auto">
                    {[
                        { id: 'details', label: 'Course Details', icon: BookOpen },
                        { id: 'curriculum', label: 'Curriculum', icon: Monitor },
                        { id: 'reviews', label: 'Student Reviews', icon: Star },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                ? 'border-green-500 text-green-400'
                                : 'border-transparent text-blue-200/60 hover:text-white'
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
                        {activeTab === 'details' && (
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-8">
                                    <section className="glass-card p-8 rounded-2xl border border-white/10">
                                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                            <BookOpen className="w-5 h-5 text-green-400" />
                                            What You'll Learn
                                        </h3>
                                        <p className="text-blue-100/80 leading-relaxed text-lg mb-6">
                                            This comprehensive course on {resource.title} is designed to take you from basics to advanced concepts.
                                            Hosted on {resource.platform}, it offers a structured learning path for anyone looking to master {resource.category}.
                                        </p>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {['Master core concepts and tools', 'Build real-world projects', 'Understand industry best practices', 'Earn a certificate of completion'].map((item, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                                    <span className="text-blue-100/90">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>

                                <div className="space-y-8">
                                    <section className="glass-card p-6 rounded-2xl border border-white/10">
                                        <h3 className="font-bold mb-4">Course Features</h3>
                                        <ul className="space-y-3">
                                            <li className="flex justify-between text-sm text-blue-200/70 border-b border-white/5 pb-2">
                                                <span>Skill Level</span>
                                                <span className="text-white">Intermediate</span>
                                            </li>
                                            <li className="flex justify-between text-sm text-blue-200/70 border-b border-white/5 pb-2">
                                                <span>Language</span>
                                                <span className="text-white">English</span>
                                            </li>
                                            <li className="flex justify-between text-sm text-blue-200/70 border-b border-white/5 pb-2">
                                                <span>Certificate</span>
                                                <span className="text-green-400">Included</span>
                                            </li>
                                            <li className="flex justify-between text-sm text-blue-200/70">
                                                <span>Access</span>
                                                <span className="text-white">Lifetime</span>
                                            </li>
                                        </ul>
                                    </section>
                                </div>
                            </div>
                        )}

                        {activeTab === 'curriculum' && (
                            <div className="glass-card p-8 rounded-2xl border border-white/10">
                                <h3 className="text-2xl font-bold mb-8">Course Modules</h3>
                                <div className="space-y-4">
                                    {[
                                        { title: 'Introduction & Setup', duration: '1h 30m' },
                                        { title: 'Core Concepts Deep Dive', duration: '4h 15m' },
                                        { title: 'Practical Application & Projects', duration: '8h 45m' },
                                        { title: 'Advanced Techniques', duration: '6h 20m' },
                                        { title: 'Final Assessment & Capstone', duration: '4h 10m' }
                                    ].map((module, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-blue-200/60">
                                                    {i + 1}
                                                </div>
                                                <span className="font-medium text-lg">{module.title}</span>
                                            </div>
                                            <span className="text-sm text-blue-200/60">{module.duration}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="glass-card p-8 rounded-2xl border border-white/10">
                                <h3 className="text-2xl font-bold mb-8">Student Reviews</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        { name: 'Sarah J.', rating: 5, comment: "This course completely changed my career path. The practical examples were incredibly helpful!" },
                                        { name: 'Mike T.', rating: 5, comment: "Best resource I've found on this topic. Clear, concise, and very up-to-date." },
                                        { name: 'David L.', rating: 4, comment: "Great content, though the advanced section gets tricky quickly. Highly recommend!" },
                                        { name: 'Emily R.', rating: 5, comment: "The instructor explains complex concepts so well. I finally understand the 'why' behind the 'how'." }
                                    ].map((review, i) => (
                                        <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10">
                                            <div className="flex items-center gap-2 mb-3">
                                                {[...Array(5)].map((_, starI) => (
                                                    <Star key={starI} className={`w-4 h-4 ${starI < review.rating ? 'text-yellow-400 fill-current' : 'text-blue-900'}`} />
                                                ))}
                                            </div>
                                            <p className="text-blue-100/80 mb-4 italic">"{review.comment}"</p>
                                            <div className="text-sm text-blue-300 font-bold">- {review.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
