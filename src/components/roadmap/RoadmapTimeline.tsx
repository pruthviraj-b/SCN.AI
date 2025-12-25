/**
 * Interactive Roadmap Timeline Component
 * Visualizes learning roadmap with milestones and progress tracking
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Check,
    Clock,
    BookOpen,
    Target,
    ChevronRight,
    ExternalLink,
    Award,
    TrendingUp
} from 'lucide-react';
import type { Roadmap, Milestone } from '@/lib/roadmap-generator';

interface RoadmapTimelineProps {
    roadmap: Roadmap;
    onMilestoneComplete?: (milestoneId: string) => void;
    completedMilestones?: Set<string>;
}

export default function RoadmapTimeline({
    roadmap,
    onMilestoneComplete,
    completedMilestones = new Set()
}: RoadmapTimelineProps) {
    const [localCompleted, setLocalCompleted] = useState<Set<string>>(completedMilestones);
    const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null);

    const toggleMilestone = (id: string) => {
        const newCompleted = new Set(localCompleted);
        if (newCompleted.has(id)) {
            newCompleted.delete(id);
        } else {
            newCompleted.add(id);
            onMilestoneComplete?.(id);
        }
        setLocalCompleted(newCompleted);
    };

    const progress = (localCompleted.size / roadmap.milestones.length) * 100;
    const currentMilestoneIndex = localCompleted.size;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="glass-card p-6 rounded-2xl border border-white/10">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">{roadmap.careerPath} Roadmap</h2>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200/70">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{roadmap.totalDuration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                <span>Target: {roadmap.estimatedPlacementDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" />
                                <span className={`px-2 py-0.5 rounded-full text-xs ${roadmap.difficultyLevel === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                                        roadmap.difficultyLevel === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                                            'bg-red-500/20 text-red-300'
                                    }`}>
                                    {roadmap.difficultyLevel}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Overall Progress</span>
                        <span className="text-blue-200/70">
                            {localCompleted.size} / {roadmap.milestones.length} milestones
                        </span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                    </div>
                    <p className="text-xs text-blue-200/60 mt-1 text-right">{Math.round(progress)}% Complete</p>
                </div>
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30" />

                {/* Milestones */}
                <div className="space-y-6">
                    {roadmap.milestones.map((milestone, index) => {
                        const isCompleted = localCompleted.has(milestone.id);
                        const isCurrent = index === currentMilestoneIndex && !isCompleted;
                        const isExpanded = expandedMilestone === milestone.id;
                        const isLocked = index > currentMilestoneIndex && !isCompleted;

                        return (
                            <motion.div
                                key={milestone.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative pl-16"
                            >
                                {/* Timeline Dot */}
                                <button
                                    onClick={() => !isLocked && toggleMilestone(milestone.id)}
                                    disabled={isLocked}
                                    className={`absolute left-3 top-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all z-10 ${isCompleted
                                            ? 'bg-green-500 border-green-500 shadow-lg shadow-green-500/50'
                                            : isCurrent
                                                ? 'bg-primary border-primary animate-pulse shadow-lg shadow-primary/50'
                                                : isLocked
                                                    ? 'bg-white/5 border-white/10 cursor-not-allowed'
                                                    : 'bg-white/10 border-white/30 hover:border-primary cursor-pointer'
                                        }`}
                                >
                                    {isCompleted && <Check className="w-4 h-4 text-white" />}
                                    {isCurrent && <div className="w-2 h-2 bg-white rounded-full" />}
                                </button>

                                {/* Milestone Card */}
                                <div
                                    className={`glass-card rounded-xl border transition-all ${isCompleted
                                            ? 'border-green-500/30 bg-green-500/5'
                                            : isCurrent
                                                ? 'border-primary/50 bg-primary/5 shadow-lg shadow-primary/10'
                                                : isLocked
                                                    ? 'border-white/5 bg-white/5 opacity-60'
                                                    : 'border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <div className="p-5">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-bold text-lg text-white">{milestone.title}</h3>
                                                    {isCompleted && (
                                                        <Award className="w-4 h-4 text-green-400" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-blue-200/70">{milestone.description}</p>
                                            </div>
                                            <div className="flex items-center gap-2 ml-4">
                                                <span className="text-xs bg-white/10 px-3 py-1 rounded-full whitespace-nowrap">
                                                    {milestone.duration}
                                                </span>
                                                <button
                                                    onClick={() => setExpandedMilestone(isExpanded ? null : milestone.id)}
                                                    className="p-1 hover:bg-white/10 rounded transition-colors"
                                                >
                                                    <motion.div
                                                        animate={{ rotate: isExpanded ? 90 : 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <ChevronRight className="w-4 h-4" />
                                                    </motion.div>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Skills Pills */}
                                        <div className="mb-3">
                                            <p className="text-xs text-blue-200/60 mb-2">Skills:</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {milestone.skills.map(skill => (
                                                    <span
                                                        key={skill}
                                                        className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/30"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Expanded Content */}
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="space-y-4 pt-4 border-t border-white/10"
                                                >
                                                    {/* Resources */}
                                                    <div>
                                                        <p className="text-xs text-blue-200/60 mb-2 flex items-center gap-2">
                                                            <BookOpen className="w-3 h-3" />
                                                            Learning Resources:
                                                        </p>
                                                        <div className="space-y-2">
                                                            {milestone.resources.map((resource, i) => (
                                                                <a
                                                                    key={i}
                                                                    href={resource.url || '#'}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <BookOpen className="w-3 h-3 text-blue-400" />
                                                                        <span className="text-sm">{resource.title}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-xs text-blue-200/60">{resource.type}</span>
                                                                        {resource.url && (
                                                                            <ExternalLink className="w-3 h-3 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                        )}
                                                                    </div>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Completion Criteria */}
                                                    <div>
                                                        <p className="text-xs text-blue-200/60 mb-2 flex items-center gap-2">
                                                            <Target className="w-3 h-3" />
                                                            Completion Criteria:
                                                        </p>
                                                        <ul className="space-y-1.5">
                                                            {milestone.completionCriteria.map((criteria, i) => (
                                                                <li key={i} className="flex items-start gap-2 text-sm">
                                                                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${isCompleted ? 'bg-green-500' : 'bg-white/30'
                                                                        }`} />
                                                                    <span className={isCompleted ? 'text-green-300' : 'text-blue-200/70'}>
                                                                        {criteria}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Completion Message */}
            {progress === 100 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-6 rounded-2xl border-2 border-green-500/50 bg-green-500/10 text-center"
                >
                    <Award className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-green-300 mb-2">
                        🎉 Roadmap Complete!
                    </h3>
                    <p className="text-blue-200/70">
                        Congratulations! You've completed all milestones. You're ready to start applying!
                    </p>
                </motion.div>
            )}
        </div>
    );
}
