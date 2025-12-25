"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { careers, categories } from '@/data/careers';
import { Briefcase, TrendingUp, IndianRupee } from 'lucide-react';

export default function PopularCareers() {
    const { data: session, status } = useSession();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    let filteredCareers = careers;

    // Filter by Category
    if (selectedCategory !== 'All') {
        filteredCareers = filteredCareers.filter(c => c.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredCareers = filteredCareers.filter(c =>
            c.title.toLowerCase().includes(query) ||
            c.category.toLowerCase().includes(query) ||
            c.skills.some(s => s.toLowerCase().includes(query))
        );
    }

    // Display Logic: Show 10 by default, or ALL if searching or expanded
    const shouldShowAll = searchQuery || isExpanded;
    const maxDisplay = shouldShowAll ? filteredCareers.length : 10;
    const displayedCareers = filteredCareers.slice(0, maxDisplay);

    return (
        <section className="py-20 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-2 text-foreground">Popular Career Paths</h2>
                    <p className="text-muted-foreground">Explore 105+ career opportunities across industries and Trending Skills</p>
                </div>

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search careers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-muted/50 border border-border rounded-full px-6 py-3 pl-12 focus:border-primary focus:outline-none transition-all text-foreground placeholder:text-muted-foreground"
                        />
                        <Briefcase className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide justify-center">
                    {categories.map((category) => (
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

                {/* Careers Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayedCareers.map((career) => (
                        <div
                            key={career.id}
                            className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-all group cursor-pointer shadow-sm"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Briefcase className="w-6 h-6 text-primary" />
                                </div>
                                {career.trending && (
                                    <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3" />
                                        Trending
                                    </span>
                                )}
                            </div>

                            <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                                {career.title}
                            </h3>

                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                {career.description}
                            </p>

                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                    <IndianRupee className="w-4 h-4" />
                                    {career.salary}
                                </div>
                                <div className="text-primary">
                                    {career.growth} growth
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-4">
                                {career.skills.slice(0, 2).map((skill, idx) => (
                                    <span key={idx} className="px-2 py-1 rounded-full bg-muted text-xs text-muted-foreground">
                                        {skill}
                                    </span>
                                ))}
                                {career.skills.length > 2 && (
                                    <span className="px-2 py-1 rounded-full bg-muted text-xs text-muted-foreground">
                                        +{career.skills.length - 2}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {displayedCareers.length === 0 && (
                    <div className="text-center text-muted-foreground mt-8">
                        No careers found matching your criteria.
                    </div>
                )}

                {/* Explore More Button */}
                {!searchQuery && filteredCareers.length > 10 && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="px-8 py-3 rounded-full bg-muted border border-border hover:bg-muted/80 transition-all text-foreground font-medium"
                        >
                            {isExpanded ? 'Show Less' : 'Explore More Careers'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
