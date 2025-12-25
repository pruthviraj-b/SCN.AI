"use client";

import Link from "next/link";
import { ArrowRight, Briefcase, CheckCircle2, TrendingUp, Clock, IndianRupee, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

// Matches DB schema roughly
type CareerCardProps = {
    career: {
        id: string;
        title: string;
        category: string;
        description: string;
        difficulty_level: string;
        growth_score: number;
        avgSalary: string;
        learning_duration_months: number;
        demand: string;
        tags?: string[]; // Optional extra badges
    };
    isSelected: boolean;
    onToggleCompare: (id: string) => void;
};

export default function CareerCard({ career, isSelected, onToggleCompare }: CareerCardProps) {
    const isHighGrowth = career.growth_score > 90;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`group relative flex flex-col justify-between bg-card hover:bg-card/80 border ${isSelected ? 'border-primary ring-1 ring-primary' : 'border-border'} hover:border-primary/50 rounded-2xl p-6 transition-all duration-300`}
        >
            {/* Header */}
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                        <Briefcase className="w-6 h-6" />
                    </div>
                    {/* Compare Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onToggleCompare(career.id);
                        }}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors ${isSelected
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                            }`}
                    >
                        {isSelected ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        {isSelected ? 'Selected' : 'Compare'}
                    </button>
                </div>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {career.category}
                        </span>
                        {isHighGrowth && (
                            <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">
                                <TrendingUp className="w-3 h-3" /> HIGH GROWTH
                            </span>
                        )}
                    </div>

                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {career.title}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {career.description}
                    </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-background/50 border border-border/50">
                        <IndianRupee className="w-4 h-4 text-emerald-400" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground font-medium">Avg Salary</span>
                            <span className="text-xs font-semibold text-foreground">{career.avgSalary}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-background/50 border border-border/50">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground font-medium">Timeline</span>
                            <span className="text-xs font-semibold text-foreground">{career.learning_duration_months} Months</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer / CTA */}
            <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${career.difficulty_level === 'Beginner' ? 'bg-green-500' :
                            career.difficulty_level === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                    <span className="text-xs text-muted-foreground font-medium">
                        {career.difficulty_level}
                    </span>
                </div>

                <Link
                    href={`/careers/${career.id}`}
                    className="flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                >
                    View Roadmap <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
    );
}
