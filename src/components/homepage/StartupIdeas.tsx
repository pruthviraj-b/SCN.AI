"use client";

import { startupIdeas } from '@/data/startups';
import { Lightbulb, TrendingUp, Users, ChevronRight } from 'lucide-react';

export default function StartupIdeas() {
    const displayedIdeas = startupIdeas.slice(0, 9); // Show 9 ideas

    const getPotentialColor = (potential: string) => {
        switch (potential) {
            case 'High': return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
            case 'Medium': return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20';
            case 'Low': return 'bg-muted text-muted-foreground border-border';
            default: return 'bg-muted text-muted-foreground border-border';
        }
    };

    return (
        <section className="py-20 relative bg-muted/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                        <Lightbulb className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                        <span className="text-sm text-yellow-600 dark:text-yellow-400">Entrepreneurship</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-2 text-foreground">Startup Ideas</h2>
                    <p className="text-muted-foreground">Explore {startupIdeas.length}+ innovative business opportunities</p>
                </div>

                {/* Ideas Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedIdeas.map((idea) => (
                        <div
                            key={idea.id}
                            className="bg-card p-6 rounded-xl border border-border hover:border-yellow-500/50 transition-all group cursor-pointer shadow-sm"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                                    <Lightbulb className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs border ${getPotentialColor(idea.marketPotential)}`}>
                                    {idea.marketPotential} Potential
                                </span>
                            </div>

                            <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                                {idea.title}
                            </h3>

                            <p className="text-sm text-muted-foreground mb-4">
                                {idea.description}
                            </p>

                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                <span className="px-2 py-1 rounded bg-muted">{idea.category}</span>
                                <span>•</span>
                                <span>{idea.estimatedCost}</span>
                            </div>

                            <div className="pt-4 border-t border-border">
                                <p className="text-xs text-muted-foreground mb-2">Required Skills:</p>
                                <div className="flex flex-wrap gap-2">
                                    {idea.requiredSkills.map((skill, idx) => (
                                        <span key={idx} className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs border border-primary/10">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/20 transition-colors border border-yellow-500/20">
                        View All {startupIdeas.length} Ideas
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}
