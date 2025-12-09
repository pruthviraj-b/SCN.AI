"use client";

import { roadmaps } from '@/data/roadmaps';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

type CareerRoadmapProps = {
    userGoal: string;
    experienceLevel: string;
};

export default function CareerRoadmap({ userGoal, experienceLevel }: CareerRoadmapProps) {
    // Find matching roadmap based on user's goal
    const matchingRoadmap = roadmaps.find(roadmap =>
        roadmap.title.toLowerCase().includes(userGoal.toLowerCase()) ||
        userGoal.toLowerCase().includes(roadmap.title.toLowerCase())
    ) || roadmaps[0]; // Default to first roadmap if no match

    const getCurrentPhase = () => {
        switch (experienceLevel.toLowerCase()) {
            case 'beginner': return 'beginner';
            case 'intermediate': return 'intermediate';
            case 'advanced': return 'advanced';
            default: return 'beginner';
        }
    };

    const currentPhase = getCurrentPhase();

    const phases = [
        { key: 'beginner', label: 'Beginner', steps: matchingRoadmap.beginner },
        { key: 'intermediate', label: 'Intermediate', steps: matchingRoadmap.intermediate },
        { key: 'advanced', label: 'Advanced', steps: matchingRoadmap.advanced }
    ];

    const getPhaseStatus = (phaseKey: string) => {
        const phaseIndex = phases.findIndex(p => p.key === phaseKey);
        const currentIndex = phases.findIndex(p => p.key === currentPhase);

        if (phaseIndex < currentIndex) return 'completed';
        if (phaseIndex === currentIndex) return 'current';
        return 'upcoming';
    };

    return (
        <div className="glass-card p-6 rounded-2xl border border-white/10">
            <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{matchingRoadmap.title} Roadmap</h3>
                <p className="text-sm text-gray-400 mb-2">{matchingRoadmap.description}</p>
                <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-gray-400">Total Duration: <span className="text-white font-semibold">{matchingRoadmap.totalDuration}</span></span>
                </div>
            </div>

            <div className="space-y-6">
                {phases.map((phase, phaseIndex) => {
                    const status = getPhaseStatus(phase.key);

                    return (
                        <div key={phase.key} className="relative">
                            {/* Phase Header */}
                            <div className={`flex items-center gap-3 mb-4 ${status === 'current' ? 'text-primary' :
                                    status === 'completed' ? 'text-green-500' :
                                        'text-gray-500'
                                }`}>
                                {status === 'completed' ? (
                                    <CheckCircle2 className="w-6 h-6" />
                                ) : status === 'current' ? (
                                    <div className="w-6 h-6 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    </div>
                                ) : (
                                    <Circle className="w-6 h-6" />
                                )}
                                <h4 className="font-bold text-lg">{phase.label} Phase</h4>
                                {status === 'current' && (
                                    <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary border border-primary">
                                        Current
                                    </span>
                                )}
                            </div>

                            {/* Steps */}
                            <div className="ml-9 space-y-3">
                                {phase.steps.map((step, stepIndex) => (
                                    <div
                                        key={stepIndex}
                                        className={`p-4 rounded-xl border transition-all ${status === 'current'
                                                ? 'bg-primary/5 border-primary/30 hover:border-primary/50'
                                                : status === 'completed'
                                                    ? 'bg-green-500/5 border-green-500/30'
                                                    : 'bg-white/5 border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h5 className="font-semibold text-sm">{step.title}</h5>
                                            <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                                                {step.duration}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {step.skills.map((skill, skillIndex) => (
                                                <span
                                                    key={skillIndex}
                                                    className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Connector Line */}
                            {phaseIndex < phases.length - 1 && (
                                <div className={`absolute left-3 top-12 w-0.5 h-full ${status === 'completed' ? 'bg-green-500/30' : 'bg-white/10'
                                    }`} />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
