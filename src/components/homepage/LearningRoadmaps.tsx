"use client";

import { roadmaps } from '@/data/roadmaps';
import { Map, Clock, Award, ChevronRight } from 'lucide-react';

export default function LearningRoadmaps() {
    const displayedRoadmaps = roadmaps.slice(0, 6); // Show 6 roadmaps

    return (
        <section className="py-20 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                        <Map className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-purple-400">Learning Paths</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-2">Learning Roadmaps</h2>
                    <p className="text-gray-400">{roadmaps.length}+ structured paths from beginner to expert</p>
                </div>

                {/* Roadmaps Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedRoadmaps.map((roadmap) => (
                        <div
                            key={roadmap.id}
                            className="glass-card p-6 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all group cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                    <Map className="w-6 h-6 text-purple-400" />
                                </div>
                                <div className="flex items-center gap-1 text-sm text-gray-400">
                                    <Clock className="w-4 h-4" />
                                    {roadmap.totalDuration}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                                {roadmap.title}
                            </h3>

                            <p className="text-sm text-gray-400 mb-4">
                                {roadmap.description}
                            </p>

                            <div className="space-y-3 mb-4">
                                {/* Beginner */}
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-bold text-green-400">B</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-400">{roadmap.beginner.length} steps</p>
                                        <div className="h-1 bg-white/10 rounded-full overflow-hidden mt-1">
                                            <div className="h-full bg-green-500 w-1/3"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Intermediate */}
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-bold text-yellow-400">I</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-400">{roadmap.intermediate.length} steps</p>
                                        <div className="h-1 bg-white/10 rounded-full overflow-hidden mt-1">
                                            <div className="h-full bg-yellow-500 w-2/3"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Advanced */}
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-bold text-red-400">A</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-400">{roadmap.advanced.length} steps</p>
                                        <div className="h-1 bg-white/10 rounded-full overflow-hidden mt-1">
                                            <div className="h-full bg-red-500 w-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400">
                                    {roadmap.category}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors border border-purple-500/50">
                        View All {roadmaps.length} Roadmaps
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}
