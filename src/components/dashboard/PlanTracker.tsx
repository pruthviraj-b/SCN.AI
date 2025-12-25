
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Trash2, Calendar, Target, Award, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

type PlanTrackerProps = {
    planId: string;
    planData: any;
};

export default function PlanTracker({ planId, planData }: PlanTrackerProps) {
    const router = useRouter();
    const { analysis, tracking } = planData;
    const [completedSteps, setCompletedSteps] = useState<string[]>(tracking?.completedSteps || []);
    const [progress, setProgress] = useState(tracking?.progress || 0);
    const [isDeleting, setIsDeleting] = useState(false);

    const totalSteps = analysis.recommendedSteps.length;

    const toggleStep = async (step: string) => {
        let newCompleted = [];
        if (completedSteps.includes(step)) {
            newCompleted = completedSteps.filter((s: string) => s !== step);
        } else {
            newCompleted = [...completedSteps, step];
        }

        setCompletedSteps(newCompleted);

        // Optimistic update
        const newProgress = Math.round((newCompleted.length / totalSteps) * 100);
        setProgress(newProgress);

        try {
            await fetch(`/api/plans/${planId}/progress`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completedSteps: newCompleted })
            });
        } catch (error) {
            console.error("Failed to save progress", error);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this plan? This action cannot be undone.")) return;

        setIsDeleting(true);
        try {
            await fetch(`/api/plans/${planId}`, {
                method: 'DELETE'
            });
            router.push('/dashboard');
        } catch (error) {
            alert("Failed to delete plan");
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => router.push('/dashboard')}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs font-medium transition-colors"
                >
                    <Trash2 className="w-4 h-4" /> {isDeleting ? 'Deleting...' : 'Delete Plan'}
                </button>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground mb-2">{analysis.careerPath}</h1>
                        <p className="text-muted-foreground max-w-2xl">{analysis.explanation}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-xl border border-primary/20">
                        <Award className="w-6 h-6 text-primary" />
                        <div>
                            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Match Score</p>
                            <p className="text-xl font-bold text-primary">{analysis.matchScore}%</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-border">
                    <div>
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Target className="w-4 h-4" /> <span className="text-xs font-bold uppercase">Market Outlook</span>
                        </div>
                        <p className="font-semibold">{analysis.marketOutlook}</p>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Award className="w-4 h-4" /> <span className="text-xs font-bold uppercase">Salary Range</span>
                        </div>
                        <p className="font-semibold">{analysis.salaryRange}</p>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Calendar className="w-4 h-4" /> <span className="text-xs font-bold uppercase">Timeline</span>
                        </div>
                        <p className="font-semibold text-foreground">{analysis.estimatedTime || 'Self-paced'}</p>
                    </div>
                </div>
            </div>

            {/* Progress Section */}
            <div>
                <div className="flex justify-between items-end mb-4">
                    <h2 className="text-xl font-bold">Your Action Plan</h2>
                    <span className="text-sm font-medium text-primary">{progress}% Completed</span>
                </div>
                <div className="h-3 w-full bg-secondary rounded-full overflow-hidden mb-8">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                <div className="space-y-4">
                    {analysis.recommendedSteps.map((step: string, index: number) => {
                        const isCompleted = completedSteps.includes(step);
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => toggleStep(step)}
                                className={`
                                    group flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-200
                                    ${isCompleted
                                        ? 'bg-primary/5 border-primary/20 hover:bg-primary/10'
                                        : 'bg-card border-border hover:border-primary/50 hover:shadow-md'
                                    }
                                `}
                            >
                                <div className={`
                                    w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors mt-0.5
                                    ${isCompleted
                                        ? 'bg-primary border-primary text-primary-foreground'
                                        : 'border-muted-foreground/40 group-hover:border-primary'
                                    }
                                `}>
                                    {isCompleted && <Check className="w-3.5 h-3.5" />}
                                </div>
                                <div>
                                    <h3 className={`font-medium text-lg leading-snug transition-colors ${isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                                        {step}
                                    </h3>
                                    {!isCompleted && (
                                        <p className="text-sm text-primary/60 mt-1 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            Mark as complete <ArrowRight className="w-3 h-3" />
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
