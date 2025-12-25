/**
 * Career Match Results Component
 * Displays ML-powered career recommendations with match percentages
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TrendingUp,
    IndianRupee,
    Building2,
    Star,
    ChevronDown,
    ChevronUp,
    Clock,
    Target,
    Sparkles,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';

interface CareerMatch {
    career: any;
    matchPercentage: number;
    breakdown: {
        contentBased: number;
        collaborative: number;
        hybrid: number;
    };
    requiredSkills: string[];
    missingSkills: string[];
    timeline: string;
    salaryRange: { min: number; max: number };
    targetCompanies: string[];
    growthPotential?: string;
    demandLevel?: string;
    placementProbability?: number;
}

interface CareerMatchResultsProps {
    matches: CareerMatch[];
    onSelectCareer: (career: any) => void;
    userSkills?: string[];
}

export default function CareerMatchResults({
    matches,
    onSelectCareer,
    userSkills = []
}: CareerMatchResultsProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                    Your Top Career Matches
                </h2>
                <p className="text-blue-200/70">
                    AI-powered recommendations based on your profile
                </p>
            </div>

            {/* Matches */}
            <div className="space-y-4">
                {matches.map((match, index) => {
                    const isExpanded = expandedId === match.career.id;
                    const matchColor = match.matchPercentage >= 80 ? 'text-green-400' :
                        match.matchPercentage >= 60 ? 'text-blue-400' :
                            'text-yellow-400';

                    return (
                        <motion.div
                            key={match.career.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all"
                        >
                            {/* Card Header */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-4xl font-bold text-primary">#{index + 1}</span>
                                            <div>
                                                <h3 className="text-xl font-bold text-white">{match.career.title}</h3>
                                                <p className="text-sm text-blue-200/60">{match.career.category}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-blue-200/70 line-clamp-2">{match.career.description}</p>
                                    </div>

                                    {/* Match Score */}
                                    <div className="text-center ml-4">
                                        <div className={`text-5xl font-bold ${matchColor} mb-1`}>
                                            {match.matchPercentage}%
                                        </div>
                                        <p className="text-xs text-blue-200/60">Match</p>
                                    </div>
                                </div>

                                {/* Key Metrics Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                    <MetricCard
                                        icon={<IndianRupee className="w-4 h-4 text-green-400" />}
                                        label="Salary"
                                        value={`₹${match.salaryRange.min / 1000}k-₹${match.salaryRange.max / 1000}k`}
                                    />
                                    <MetricCard
                                        icon={<Clock className="w-4 h-4 text-blue-400" />}
                                        label="Timeline"
                                        value={match.timeline}
                                    />
                                    <MetricCard
                                        icon={<TrendingUp className="w-4 h-4 text-purple-400" />}
                                        label="Demand"
                                        value={match.demandLevel || 'High'}
                                    />
                                    <MetricCard
                                        icon={<Star className="w-4 h-4 text-yellow-400" />}
                                        label="Growth"
                                        value={match.growthPotential || 'Fast'}
                                    />
                                </div>

                                {/* Skills Progress */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-white">Skills Match</span>
                                        <span className="text-xs text-blue-200/60">
                                            {match.requiredSkills.length - match.missingSkills.length}/{match.requiredSkills.length}
                                        </span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: `${((match.requiredSkills.length - match.missingSkills.length) / match.requiredSkills.length) * 100}%`
                                            }}
                                            transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => onSelectCareer(match.career)}
                                        className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-105 transition-transform shadow-lg shadow-blue-600/20"
                                    >
                                        <Sparkles className="w-4 h-4 inline mr-2" />
                                        Choose This Path
                                    </button>
                                    <button
                                        onClick={() => toggleExpand(match.career.id)}
                                        className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                                    >
                                        {isExpanded ? (
                                            <ChevronUp className="w-5 h-5" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Expanded Details */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="border-t border-white/10 bg-white/5"
                                    >
                                        <div className="p-6 space-y-6">
                                            {/* Missing Skills */}
                                            {match.missingSkills.length > 0 && (
                                                <div>
                                                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                        <AlertCircle className="w-4 h-4 text-yellow-400" />
                                                        Skills to Learn ({match.missingSkills.length})
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {match.missingSkills.map(skill => (
                                                            <span
                                                                key={skill}
                                                                className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-sm border border-red-500/30"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Existing Skills */}
                                            {userSkills.length > 0 && (
                                                <div>
                                                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                                                        Your Matching Skills
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {match.requiredSkills
                                                            .filter(skill => userSkills.some(us => us.toLowerCase() === skill.toLowerCase()))
                                                            .map(skill => (
                                                                <span
                                                                    key={skill}
                                                                    className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm border border-green-500/30"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Target Companies */}
                                            <div>
                                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                    <Building2 className="w-4 h-4 text-blue-400" />
                                                    Top Hiring Companies
                                                </h4>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                                    {match.targetCompanies.slice(0, 8).map(company => (
                                                        <div
                                                            key={company}
                                                            className="px-3 py-2 rounded-lg bg-white/5 text-sm text-center hover:bg-white/10 transition-colors"
                                                        >
                                                            {company}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Match Breakdown */}
                                            <div>
                                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                    <Target className="w-4 h-4 text-purple-400" />
                                                    Match Analysis
                                                </h4>
                                                <div className="space-y-2">
                                                    <ScoreBar
                                                        label="Content-Based Match"
                                                        score={match.breakdown.contentBased}
                                                        color="bg-blue-500"
                                                    />
                                                    <ScoreBar
                                                        label="Collaborative Match"
                                                        score={match.breakdown.collaborative}
                                                        color="bg-purple-500"
                                                    />
                                                    <ScoreBar
                                                        label="Overall Hybrid Score"
                                                        score={match.breakdown.hybrid}
                                                        color="bg-gradient-to-r from-blue-500 to-purple-600"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

// Helper Components
function MetricCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="bg-white/5 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
                {icon}
                <span className="text-xs text-blue-200/60">{label}</span>
            </div>
            <p className="text-sm font-bold text-white">{value}</p>
        </div>
    );
}

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className="text-blue-200/70">{label}</span>
                <span className="font-semibold text-white">{score.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    className={`h-full ${color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 0.8 }}
                />
            </div>
        </div>
    );
}
