/**
 * Placement Probability Dashboard Component
 * Displays ML-predicted placement probability with insights and improvements
 */

'use client';

import { motion } from 'framer-motion';
import {
    TrendingUp,
    AlertCircle,
    CheckCircle2,
    Target,
    Sparkles,
    ArrowRight,
    Award
} from 'lucide-react';

interface PlacementPrediction {
    probability: number;
    confidence: 'low' | 'medium' | 'high';
    insights: string[];
    improvementAreas: Array<{
        area: string;
        current?: string;
        target?: string;
        suggestion: string;
        impact: string;
        priority: 'Critical' | 'High' | 'Medium' | 'Low';
    }>;
    profileStrength?: {
        skills: number;
        experience: number;
        projects: number;
        certifications: number;
    };
}

interface PlacementDashboardProps {
    prediction: PlacementPrediction;
    onImprove?: (area: string) => void;
}

export default function PlacementDashboard({ prediction, onImprove }: PlacementDashboardProps) {
    const probabilityColor =
        prediction.probability >= 75 ? 'text-green-400' :
            prediction.probability >= 50 ? 'text-yellow-400' :
                'text-red-400';

    const probabilityBg =
        prediction.probability >= 75 ? 'from-green-500 to-emerald-600' :
            prediction.probability >= 50 ? 'from-yellow-500 to-orange-600' :
                'from-red-500 to-pink-600';

    return (
        <div className="space-y-6">
            {/* Main Probability Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 rounded-2xl border border-white/10 text-center relative overflow-hidden"
            >
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${probabilityBg} opacity-5`} />

                <div className="relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <TrendingUp className="w-6 h-6 text-primary" />
                        <h2 className="text-xl font-bold">Placement Probability</h2>
                    </div>

                    {/* Probability Circle */}
                    <div className="relative w-48 h-48 mx-auto mb-6">
                        <svg className="w-full h-full transform -rotate-90">
                            {/* Background Circle */}
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                fill="none"
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="12"
                            />
                            {/* Progress Circle */}
                            <motion.circle
                                cx="96"
                                cy="96"
                                r="88"
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="12"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 88}`}
                                initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                                animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - prediction.probability / 100) }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#8b5cf6" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Percentage Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className={`text-5xl font-bold ${probabilityColor}`}
                            >
                                {prediction.probability}%
                            </motion.div>
                            <p className="text-sm text-blue-200/60 mt-1">Success Rate</p>
                        </div>
                    </div>

                    {/* Confidence Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium capitalize">{prediction.confidence} Confidence</span>
                    </div>
                </div>
            </motion.div>

            {/* Profile Strength */}
            {prediction.profileStrength && (
                <div className="glass-card p-6 rounded-2xl border border-white/10">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-400" />
                        Profile Strength
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StrengthMetric label="Skills" value={prediction.profileStrength.skills} max={10} />
                        <StrengthMetric label="Experience" value={prediction.profileStrength.experience} max={10} suffix=" yrs" />
                        <StrengthMetric label="Projects" value={prediction.profileStrength.projects} max={10} />
                        <StrengthMetric label="Certifications" value={prediction.profileStrength.certifications} max={5} />
                    </div>
                </div>
            )}

            {/* Insights */}
            <div className="glass-card p-6 rounded-2xl border border-white/10">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    Key Insights
                </h3>
                <div className="space-y-3">
                    {prediction.insights.map((insight, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 p-3 rounded-lg bg-white/5"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                            <p className="text-sm text-blue-200/90">{insight}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Improvement Areas */}
            <div className="glass-card p-6 rounded-2xl border border-white/10">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-400" />
                    Improvement Opportunities
                </h3>
                <div className="space-y-3">
                    {prediction.improvementAreas.map((improvement, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 rounded-xl border ${improvement.priority === 'Critical' ? 'border-red-500/30 bg-red-500/5' :
                                    improvement.priority === 'High' ? 'border-yellow-500/30 bg-yellow-500/5' :
                                        'border-blue-500/30 bg-blue-500/5'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className={`w-4 h-4 ${improvement.priority === 'Critical' ? 'text-red-400' :
                                            improvement.priority === 'High' ? 'text-yellow-400' :
                                                'text-blue-400'
                                        }`} />
                                    <h4 className="font-semibold">{improvement.area}</h4>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${improvement.priority === 'Critical' ? 'bg-red-500/20 text-red-300' :
                                        improvement.priority === 'High' ? 'bg-yellow-500/20 text-yellow-300' :
                                            'bg-blue-500/20 text-blue-300'
                                    }`}>
                                    {improvement.priority}
                                </span>
                            </div>

                            {improvement.current && improvement.target && (
                                <div className="flex items-center gap-2 mb-2 text-sm text-blue-200/70">
                                    <span>{improvement.current}</span>
                                    <ArrowRight className="w-3 h-3" />
                                    <span className="text-green-300">{improvement.target}</span>
                                </div>
                            )}

                            <p className="text-sm text-blue-200/90 mb-3">{improvement.suggestion}</p>

                            <div className="flex items-center justify-between">
                                <span className="text-xs text-green-300 font-medium">{improvement.impact}</span>
                                {onImprove && (
                                    <button
                                        onClick={() => onImprove(improvement.area)}
                                        className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                                    >
                                        Take Action
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StrengthMetric({ label, value, max, suffix = '' }: { label: string; value: number; max: number; suffix?: string }) {
    const percentage = (value / max) * 100;

    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className="text-blue-200/70">{label}</span>
                <span className="font-semibold">{value}{suffix}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8 }}
                />
            </div>
        </div>
    );
}
