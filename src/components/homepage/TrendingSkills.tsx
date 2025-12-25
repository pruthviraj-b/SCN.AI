"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { skills, skillCategories } from '@/data/skills';
import { Zap, TrendingUp } from 'lucide-react';

export default function TrendingSkills() {
    const { data: session, status } = useSession();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    let filteredSkills = skills;

    // Filter by Category
    if (selectedCategory !== 'All') {
        filteredSkills = filteredSkills.filter(s => s.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredSkills = filteredSkills.filter(s =>
            s.name.toLowerCase().includes(query) ||
            s.category.toLowerCase().includes(query)
        );
    }

    // Display Logic: Show 12 by default, or ALL if searching or expanded
    const shouldShowAll = searchQuery || isExpanded;
    const maxDisplay = shouldShowAll ? filteredSkills.length : 12;
    const displayedSkills = filteredSkills.slice(0, maxDisplay);

    const getDemandColor = (demand: string) => {
        switch (demand) {
            case 'High': return 'text-green-400 bg-green-500/20';
            case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
            case 'Low': return 'text-blue-200/60 bg-white/5';
            default: return 'text-blue-200/60 bg-white/5';
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Beginner': return 'text-blue-400';
            case 'Intermediate': return 'text-purple-400';
            case 'Advanced': return 'text-red-400';
            default: return 'text-blue-200/60';
        }
    };

    return (
        <section className="py-20 relative bg-white/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-2">Trending Skills</h2>
                    <p className="text-blue-200/60">Master {skills.length}+ in-demand skills</p>
                </div>

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search skills..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 pl-12 focus:border-primary/50 focus:outline-none transition-all"
                        />
                        <Zap className="w-5 h-5 text-blue-200/60 absolute left-4 top-1/2 -translate-y-1/2" />
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide justify-center">
                    {skillCategories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${selectedCategory === category
                                ? 'bg-primary text-white'
                                : 'bg-white/5 hover:bg-white/10 text-blue-200/60'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {displayedSkills.map((skill) => (
                        <div
                            key={skill.id}
                            className="glass-card p-4 rounded-xl border border-white/10 hover:border-primary/50 transition-all group cursor-pointer"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <Zap className="w-5 h-5 text-primary" />
                                {skill.trending && (
                                    <TrendingUp className="w-4 h-4 text-green-400" />
                                )}
                            </div>

                            <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                                {skill.name}
                            </h3>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-blue-200/60">Demand:</span>
                                    <span className={`px-2 py-1 rounded-full ${getDemandColor(skill.demand)}`}>
                                        {skill.demand}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-blue-200/60">Level:</span>
                                    <span className={getDifficultyColor(skill.difficulty)}>
                                        {skill.difficulty}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {displayedSkills.length === 0 && (
                    <div className="text-center text-blue-200/60 mt-8">
                        No skills found matching your criteria.
                    </div>
                )}

                {/* Explore More Button */}
                {!searchQuery && filteredSkills.length > 12 && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white font-medium"
                        >
                            {isExpanded ? 'Show Less' : 'Explore More Skills'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
