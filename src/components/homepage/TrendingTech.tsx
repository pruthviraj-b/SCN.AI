"use client";

import { technologies } from '@/data/technologies';
import { Zap, TrendingUp, ChevronRight } from 'lucide-react';

export default function TrendingTech() {
    const displayedTech = technologies.slice(0, 12); // Show 12 technologies

    return (
        <section className="py-20 relative bg-white/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
                        <Zap className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-cyan-400">Emerging Tech</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-2">Trending Technologies</h2>
                    <p className="text-blue-200/60">{technologies.length}+ technologies shaping the future</p>
                </div>

                {/* Technologies Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayedTech.map((tech) => (
                        <div
                            key={tech.id}
                            className="glass-card p-6 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all group cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                                    <Zap className="w-6 h-6 text-cyan-400" />
                                </div>
                                {tech.trending && (
                                    <div className="flex items-center gap-1 text-xs text-green-400">
                                        <TrendingUp className="w-3 h-3" />
                                        {tech.growth}
                                    </div>
                                )}
                            </div>

                            <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                                {tech.name}
                            </h3>

                            <p className="text-sm text-blue-200/70 mb-4 line-clamp-2">
                                {tech.description}
                            </p>

                            <div className="mb-4">
                                <p className="text-xs text-blue-200/60 mb-2">Use Cases:</p>
                                <div className="flex flex-wrap gap-2">
                                    {tech.useCases.slice(0, 3).map((useCase, idx) => (
                                        <span key={idx} className="px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs">
                                            {useCase}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-blue-200/60">
                                    {tech.category}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors border border-cyan-500/50">
                        Explore All {technologies.length} Technologies
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}
