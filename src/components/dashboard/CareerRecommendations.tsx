"use client";

import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Trophy, Star, BookOpen, TrendingUp, DollarSign, Check, X } from 'lucide-react';
import { useState } from 'react';
import type { MatchResult } from '@/lib/matching-algorithm';

interface CareerRecommendationsProps {
    matches: MatchResult[];
}

export default function CareerRecommendations({ matches }: CareerRecommendationsProps) {
    const [expandedId, setExpandedId] = useState<string | null>(matches[0]?.career.id || null);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Trophy className="w-6 h-6 text-yellow-400" /> Top Career Matches
            </h2>

            <div className="space-y-4">
                {matches.map((match, index) => {
                    const isExpanded = expandedId === match.career.id;
                    const isTopMatch = index === 0;

                    return (
                        <motion.div
                            key={match.career.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`rounded-xl border transition-all duration-300 overflow-hidden ${isTopMatch
                                ? 'bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/30 shadow-lg shadow-primary/10'
                                : 'bg-card border-border hover:border-primary/30'
                                }`}
                        >
                            {/* Header */}
                            <div
                                onClick={() => toggleExpand(match.career.id)}
                                className="p-5 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${match.score >= 80 ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                                        match.score >= 60 ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' :
                                            'bg-red-500/10 text-red-600 dark:text-red-400'
                                        }`}>
                                        {match.score}%
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg flex items-center gap-2 text-foreground">
                                            {match.career.title}
                                            {isTopMatch && <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full border border-primary/30 uppercase tracking-wide">Best Match</span>}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-1">{match.career.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="hidden md:flex flex-col items-end text-xs text-muted-foreground">
                                        <span>Avg. Salary</span>
                                        <span className="text-foreground font-medium">{match.career.avgSalary}</span>
                                    </div>
                                    {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                                </div>
                            </div>

                            {/* Expanded Details */}
                            <motion.div
                                initial={false}
                                animate={{ height: isExpanded ? 'auto' : 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-5 pt-0 border-t border-border bg-muted/20">
                                    {/* Match Breakdown */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 mt-4">
                                        <ScoreCard label="Education" score={match.breakdown.educationScore} />
                                        <ScoreCard label="Field" score={match.breakdown.fieldScore} />
                                        <ScoreCard label="Skills" score={match.breakdown.skillsScore} />
                                        <ScoreCard label="Interests" score={match.breakdown.interestsScore} />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Left Column */}
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 mt-1" />
                                                <div>
                                                    <h4 className="font-semibold text-sm mb-1 text-foreground">Growth Outlook</h4>
                                                    <p className="text-sm text-muted-foreground">{match.career.growthOutlook}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <DollarSign className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-1" />
                                                <div>
                                                    <h4 className="font-semibold text-sm mb-1 text-foreground">Salary Potential</h4>
                                                    <p className="text-sm text-muted-foreground">{match.career.avgSalary}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Column: Skills Gap */}
                                        <div className="bg-card rounded-lg p-4 border border-border">
                                            <h4 className="font-semibold text-sm mb-3 text-foreground">Skills Analysis</h4>

                                            <div className="space-y-2">
                                                <div className="flex flex-wrap gap-2">
                                                    {match.matchingSkills.map(skill => (
                                                        <span key={skill} className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 flex items-center gap-1">
                                                            <Check className="w-3 h-3" /> {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                                {match.missingSkills.length > 0 && (
                                                    <div className="mt-2 pt-2 border-t border-border">
                                                        <p className="text-xs text-red-500 dark:text-red-400 mb-2">Recommended to learn:</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {match.missingSkills.map(skill => (
                                                                <span key={skill} className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 flex items-center gap-1">
                                                                    <BookOpen className="w-3 h-3" /> {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

function ScoreCard({ label, score }: { label: string, score: number }) {
    return (
        <div className="bg-card border border-border p-3 rounded-lg text-center shadow-sm">
            <div className="text-xs text-muted-foreground mb-1">{label}</div>
            <div className={`font-bold text-lg ${score === 100 ? 'text-green-600 dark:text-green-400' : score > 50 ? 'text-blue-600 dark:text-blue-400' : 'text-muted-foreground'}`}>
                {Math.round(score)}%
            </div>
        </div>
    );
}
