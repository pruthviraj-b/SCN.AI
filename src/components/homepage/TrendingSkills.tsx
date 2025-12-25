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
            case 'High': return 'text-green-600 dark:text-green-400 bg-green-500/10';
            case 'Medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-500/10';
            case 'Low': return 'text-muted-foreground bg-muted';
            default: return 'text-muted-foreground bg-muted';
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

    return (
        <section className="py-20 relative bg-muted/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-2 text-foreground">Trending Skills</h2>
                    <p className="text-muted-foreground">Master {skills.length}+ in-demand skills</p>
                </div>

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search skills..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-muted/50 border border-border rounded-full px-6 py-3 pl-12 focus:border-primary focus:outline-none transition-all text-foreground placeholder:text-muted-foreground"
                        />
                        <Zap className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide justify-center">
                    {skillCategories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${selectedCategory === category
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted/50 hover:bg-muted text-muted-foreground'
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
                            className="bg-card p-4 rounded-xl border border-border hover:border-primary/50 transition-all group cursor-pointer shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <Zap className="w-5 h-5 text-primary" />
                                {skill.trending && (
                                    <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                                )}
                            </div>

                            <h3 className="font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                                {skill.name}
                            </h3>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">Demand:</span>
                                    <span className={`px-2 py-1 rounded-full ${getDemandColor(skill.demand)}`}>
                                        {skill.demand}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">Level:</span>
                                    <span className={getDifficultyColor(skill.difficulty)}>
                                        {skill.difficulty}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {displayedSkills.length === 0 && (
                    <div className="text-center text-muted-foreground mt-8">
                        No skills found matching your criteria.
                    </div>
                )}

                {/* Explore More Button */}
                {!searchQuery && filteredSkills.length > 12 && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="px-8 py-3 rounded-full bg-muted border border-border hover:bg-muted/80 transition-all text-foreground font-medium"
                        >
                            {isExpanded ? 'Show Less' : 'Explore More Skills'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
