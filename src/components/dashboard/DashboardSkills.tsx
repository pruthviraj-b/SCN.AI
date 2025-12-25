"use client";

import { skills as allSkills } from '@/data/skills';
import { TrendingUp } from 'lucide-react';

type DashboardSkillsProps = {
    userSkills: string[];
};

export default function DashboardSkills({ userSkills }: DashboardSkillsProps) {
    // Filter to get full skill data for user's skills
    const userSkillsData = allSkills.filter(skill =>
        userSkills.some(userSkill =>
            userSkill.toLowerCase() === skill.name.toLowerCase()
        )
    );

    // Group skills by category
    const skillsByCategory = userSkillsData.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, typeof userSkillsData>);

    const getDemandColor = (demand: string) => {
        switch (demand) {
            case 'High': return 'text-green-600 dark:text-green-400 bg-green-500/10 border-green-500/30';
            case 'Medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
            case 'Low': return 'text-muted-foreground bg-muted/20 border-border';
            default: return 'text-muted-foreground bg-muted/20 border-border';
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Beginner': return 'text-blue-600 dark:text-blue-400';
            case 'Intermediate': return 'text-purple-600 dark:text-purple-400';
            case 'Advanced': return 'text-red-600 dark:text-red-400';
            default: return 'text-muted-foreground';
        }
    };

    if (userSkillsData.length === 0) {
        return (
            <div className="bg-card p-6 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-4 text-foreground">Your Skills</h3>
                <div className="text-center py-8 border border-dashed border-border rounded-xl">
                    <p className="text-muted-foreground mb-4">No skills tracked yet</p>
                    <p className="text-sm text-muted-foreground/70">Complete the onboarding wizard to add your skills</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-2">
                {/* Header moved to parent or removed */}
            </div>

            <div className="space-y-6">
                {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                    <div key={category}>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{category}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {categorySkills.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="relative p-3 rounded-xl bg-muted/30 border border-border hover:border-primary/50 transition-all group cursor-pointer"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h5 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                                            {skill.name}
                                        </h5>
                                        {skill.trending && (
                                            <div className="flex items-center gap-1 text-xs text-primary">
                                                <TrendingUp className="w-3 h-3" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getDemandColor(skill.demand)}`}>
                                            {skill.demand}
                                        </span>
                                        <span className={`text-[10px] ${getDifficultyColor(skill.difficulty)}`}>
                                            {skill.difficulty}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
