"use client";

import { motion } from 'framer-motion';
import { Trophy, TrendingUp, ArrowRight } from 'lucide-react';
import type { MatchResult } from '@/lib/matching-algorithm';

interface DashboardHeroProps {
    topMatch?: MatchResult;
    userProfile: any;
}

export default function DashboardHero({ topMatch, userProfile }: DashboardHeroProps) {
    if (!topMatch) return null;

    return (
        <div className="relative overflow-hidden rounded-[2rem] bg-[#1a1b2e] dark:bg-[#1a1b2e] p-8 text-white h-full relative group">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 blur-[60px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium border border-white/10 backdrop-blur-sm">
                                Top Career Match
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold mb-1">{topMatch.career.title}</h2>
                        <p className="text-blue-200/70 text-sm max-w-sm line-clamp-2">
                            {topMatch.career.description}
                        </p>
                    </div>
                </div>

                <div className="flex items-end justify-between mt-8">
                    <div className="flex items-center gap-6">
                        <div className="relative w-20 h-20">
                            {/* Circular Progress (Simplified CSS) */}
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="36"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="transparent"
                                    className="text-white/10"
                                />
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="36"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray={226}
                                    strokeDashoffset={226 - (226 * topMatch.score) / 100}
                                    className="text-white transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-xl font-bold">{Math.round(topMatch.score)}%</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-blue-200/70 uppercase tracking-wider mb-1">Match Score</p>
                            <p className="font-medium text-sm">Excellent Fit</p>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/5 max-w-[200px]">
                        <p className="text-xs text-blue-200/70 mb-2">Growth Potential</p>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            <span className="font-bold text-lg">{topMatch.career.growthOutlook}</span>
                        </div>
                        <p className="text-[10px] text-blue-200/50 mt-1">
                            Avg. Salary: {topMatch.career.avgSalary}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
