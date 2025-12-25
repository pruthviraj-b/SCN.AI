"use client";

import { TrendingUp, BookOpen, Target, FileText } from 'lucide-react';

interface StatsGridProps {
    stats: {
        plans: number;
        skills: number;
        courses: number;
        goal: string;
    };
}

export default function StatsGrid({ stats }: StatsGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
            {/* Card 1: New Students (Plans) */}
            <div className="bg-card p-5 rounded-[1.5rem] border border-border shadow-sm flex flex-col justify-between group hover:border-primary/20 transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-sm text-muted-foreground font-medium mb-1">Total Plans</p>
                        <h3 className="text-2xl font-bold text-foreground">{stats.plans}</h3>
                    </div>
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
                        <FileText className="w-5 h-5" />
                    </div>
                </div>
                <div className="w-full bg-muted/50 h-10 rounded-lg overflow-hidden relative">
                    {/* Mini Chart Decoration */}
                    <svg className="w-full h-full text-blue-500/20" preserveAspectRatio="none" viewBox="0 0 100 20">
                        <path d="M0 15 Q 10 5, 20 15 T 40 10 T 60 15 T 80 5 L 100 15 V 20 H 0 Z" fill="currentColor" />
                        <path d="M0 15 Q 10 5, 20 15 T 40 10 T 60 15 T 80 5 L 100 15" stroke="currentColor" strokeWidth="2" fill="none" className="text-blue-500/50" />
                    </svg>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">Active Career Paths</p>
            </div>

            {/* Card 2: Total Income (Skills) */}
            <div className="bg-card p-5 rounded-[1.5rem] border border-border shadow-sm flex flex-col justify-between group hover:border-primary/20 transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-sm text-muted-foreground font-medium mb-1">Skills Tracked</p>
                        <h3 className="text-2xl font-bold text-foreground">{stats.skills}</h3>
                    </div>
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-600 dark:text-purple-400">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                </div>
                <div className="w-full bg-muted/50 h-10 rounded-lg overflow-hidden relative">
                    {/* Mini Chart Decoration */}
                    <svg className="w-full h-full text-purple-500/20" preserveAspectRatio="none" viewBox="0 0 100 20">
                        <path d="M0 20 L 20 10 L 40 18 L 60 5 L 80 12 L 100 8 V 20 H 0 Z" fill="currentColor" />
                        <path d="M0 20 L 20 10 L 40 18 L 60 5 L 80 12 L 100 8" stroke="currentColor" strokeWidth="2" fill="none" className="text-purple-500/50" />
                    </svg>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">+12% from last month</p>
            </div>

            {/* Card 3: Total Students (Courses) */}
            <div className="bg-card p-5 rounded-[1.5rem] border border-border shadow-sm flex flex-col justify-between group hover:border-primary/20 transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-sm text-muted-foreground font-medium mb-1">Courses</p>
                        <h3 className="text-2xl font-bold text-foreground">{stats.courses}</h3>
                    </div>
                    <div className="p-2 bg-green-500/10 rounded-lg text-green-600 dark:text-green-400">
                        <BookOpen className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-3/4 rounded-full" />
                    </div>
                    <span className="text-xs font-semibold text-green-600">75%</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">Completion Rate</p>
            </div>

            {/* Card 4: Working Hours (Goal) */}
            <div className="bg-card p-5 rounded-[1.5rem] border border-border shadow-sm flex flex-col justify-between group hover:border-primary/20 transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-sm text-muted-foreground font-medium mb-1">Current Goal</p>
                        <h3 className="text-lg font-bold text-foreground truncate max-w-[120px]" title={stats.goal}>{stats.goal || 'Set Goal'}</h3>
                    </div>
                    <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-600 dark:text-yellow-400">
                        <Target className="w-5 h-5" />
                    </div>
                </div>
                <div className="w-full bg-muted/50 h-10 rounded-lg overflow-hidden relative">
                    {/* Mini Wave Decoration */}
                    <svg className="w-full h-full text-yellow-500/20" preserveAspectRatio="none" viewBox="0 0 100 20">
                        <path d="M0 10 Q 25 20 50 10 T 100 10 V 20 H 0 Z" fill="currentColor" />
                        <path d="M0 10 Q 25 20 50 10 T 100 10" stroke="currentColor" strokeWidth="2" fill="none" className="text-yellow-500/50" />
                    </svg>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">Target Date: Dec 2025</p>
            </div>
        </div>
    );
}
