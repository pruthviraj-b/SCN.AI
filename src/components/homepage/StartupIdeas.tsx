"use client";

import { startupIdeas } from '@/data/startups';
import { Lightbulb, TrendingUp, Users, ChevronRight } from 'lucide-react';

export default function StartupIdeas() {
    const displayedIdeas = startupIdeas.slice(0, 9); // Show 9 ideas

    const getPotentialColor = (potential: string) => {
        switch (potential) {
            case 'High': return 'bg-green-500/20 text-green-400 border-green-500/50';
            case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
            case 'Low': return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
        }
    };

    return (
        <section className="py-20 relative bg-white/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                        <Lightbulb className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-yellow-400">Entrepreneurship</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-2">Startup Ideas</h2>
                    <p className="text-gray-400">Explore {startupIdeas.length}+ innovative business opportunities</p>
                </div>

                {/* Ideas Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedIdeas.map((idea) => (
                        <div
                            key={idea.id}
                            className="glass-card p-6 rounded-xl border border-white/10 hover:border-yellow-500/50 transition-all group cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                                    <Lightbulb className="w-6 h-6 text-yellow-400" />
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs border ${getPotentialColor(idea.marketPotential)}`}>
                                    {idea.marketPotential} Potential
                                </span>
                            </div>

                            <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">
                                {idea.title}
                            </h3>

                            <p className="text-sm text-gray-400 mb-4">
                                {idea.description}
                            </p>

                            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                                <span className="px-2 py-1 rounded bg-white/5">{idea.category}</span>
                                <span>•</span>
                                <span>{idea.estimatedCost}</span>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <p className="text-xs text-gray-400 mb-2">Required Skills:</p>
                                <div className="flex flex-wrap gap-2">
                                    {idea.requiredSkills.map((skill, idx) => (
                                        <span key={idx} className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-colors border border-yellow-500/50">
                        View All {startupIdeas.length} Ideas
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}
