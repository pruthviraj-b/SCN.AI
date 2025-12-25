"use client";

import { Target, TrendingUp, BookOpen, ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface ProgressSnapshotProps {
    userProfile: {
        skills: string[];
        experienceLevel: string;
        goal: string;
    };
    stats: {
        plans: number;
        skills: number;
        courses: number;
    };
}

export default function ProgressSnapshot({ userProfile, stats }: ProgressSnapshotProps) {
    const hasGoal = !!userProfile.goal;
    const hasSkills = stats.skills > 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Career Progress */}
            <div className={`p-5 rounded-2xl border transition-all relative overflow-hidden group ${hasGoal
                    ? 'bg-card border-border hover:border-primary/20'
                    : 'bg-primary/5 border-primary/20'
                }`}>
                <div className="flex justify-between items-start mb-3">
                    <div className={`p-2 rounded-lg ${hasGoal ? 'bg-primary/10 text-primary' : 'bg-primary/20 text-primary'}`}>
                        <Target className="w-5 h-5" />
                    </div>
                </div>

                <h3 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-1">Career Goal</h3>

                {hasGoal ? (
                    <div>
                        <p className="text-lg font-bold text-foreground truncate" title={userProfile.goal}>{userProfile.goal}</p>
                        <p className="text-xs text-muted-foreground mt-1">{stats.plans} active plans</p>
                    </div>
                ) : (
                    <div>
                        <p className="text-sm font-medium text-foreground mb-3">Not set yet</p>
                        <Link href="/get-started" className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                            Set your goal <ChevronRight className="w-3 h-3" />
                        </Link>
                    </div>
                )}
            </div>

            {/* Card 2: Skills Progress */}
            <div className={`p-5 rounded-2xl border transition-all relative overflow-hidden group ${hasSkills
                    ? 'bg-card border-border hover:border-primary/20'
                    : 'bg-muted/30 border-dashed border-border'
                }`}>
                <div className="flex justify-between items-start mb-3">
                    <div className="p-2 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                </div>

                <h3 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-1">Skills Tracked</h3>

                {hasSkills ? (
                    <div>
                        <p className="text-2xl font-bold text-foreground">{stats.skills}</p>
                        <p className="text-xs text-muted-foreground mt-1">skills added to profile</p>
                    </div>
                ) : (
                    <div>
                        <p className="text-sm font-medium text-foreground mb-3">No skills added</p>
                        <Link href="/get-started" className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                            Start assessment <ChevronRight className="w-3 h-3" />
                        </Link>
                    </div>
                )}
            </div>

            {/* Card 3: Learning Status */}
            <div className="bg-card p-5 rounded-2xl border border-border hover:border-primary/20 transition-all relative overflow-hidden group">
                <div className="flex justify-between items-start mb-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                        <BookOpen className="w-5 h-5" />
                    </div>
                </div>

                <h3 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-1">Learning Path</h3>

                <div>
                    <p className="text-2xl font-bold text-foreground">{stats.courses}</p>
                    <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-muted-foreground">Recommended courses</p>
                        <Link href="#recommended-courses-section" className="text-[10px] px-2 py-1 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors">
                            View
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
