
"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, ShieldCheck, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";

type StartupCardProps = {
    idea: {
        id: string;
        title: string;
        problem_statement: string;
        solution_summary: string;
        industry: string;
        difficulty_level: string;
        validation_score: number;
        risk_level: string;
        market_size_estimate: string;
        revenue_model: string[];
    };
};

export default function StartupCard({ idea }: StartupCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group flex flex-col justify-between bg-card hover:bg-card/80 border border-border hover:border-yellow-500/50 rounded-2xl p-6 transition-all duration-300"
        >
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                        <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground border border-border">
                            {idea.industry}
                        </span>
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${idea.risk_level === 'High' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                            idea.risk_level === 'Medium' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' :
                                'bg-green-500/10 border-green-500/20 text-green-500'
                            }`}>
                            {idea.risk_level} Risk
                        </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                        <ShieldCheck className="w-3 h-3" />
                        {idea.validation_score}% Validated
                    </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-yellow-500 transition-colors">
                    {idea.title}
                </h3>

                <div className="mb-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Problem</p>
                    <p className="text-sm text-foreground/80 line-clamp-2 mb-3">
                        {idea.problem_statement}
                    </p>

                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Solution</p>
                    <p className="text-sm text-foreground/80 line-clamp-2 mb-4">
                        {idea.solution_summary}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/50 border border-border text-[10px] font-medium text-muted-foreground">
                            <Target className="w-3 h-3" />
                            {idea.market_size_estimate}
                        </span>
                        {(idea.revenue_model as any[]).slice(0, 2).map((model: string) => (
                            <span key={model} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/50 border border-border text-[10px] font-medium text-muted-foreground">
                                <TrendingUp className="w-3 h-3" />
                                {model}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-border flex items-center justify-between mt-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                    <Zap className="w-3 h-3" />
                    {idea.difficulty_level} Build
                </div>

                <Link
                    href={`/startups/${idea.id}`}
                    className="flex items-center gap-1 text-sm font-semibold text-foreground hover:text-yellow-500 transition-colors"
                >
                    View Plan <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
    );
}
