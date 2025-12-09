"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { courses, platforms, courseCategories } from '@/data/courses';
import { BookOpen, Star, Clock, ExternalLink } from 'lucide-react';

export default function FeaturedCourses() {
    const { data: session, status } = useSession();
    const [selectedPlatform, setSelectedPlatform] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    let filteredCourses = courses;

    // Filter by Platform
    if (selectedPlatform !== 'All') {
        filteredCourses = filteredCourses.filter(c => c.platform === selectedPlatform);
    }

    // Filter by Category
    if (selectedCategory !== 'All') {
        filteredCourses = filteredCourses.filter(c => c.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredCourses = filteredCourses.filter(c =>
            c.title.toLowerCase().includes(query) ||
            c.platform.toLowerCase().includes(query) ||
            c.category.toLowerCase().includes(query)
        );
    }

    // Display Logic: Show 10 by default, or ALL if searching or expanded
    const shouldShowAll = searchQuery || isExpanded;
    const maxDisplay = shouldShowAll ? filteredCourses.length : 10;
    const displayedCourses = filteredCourses.slice(0, maxDisplay);

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Beginner': return 'bg-green-500/20 text-green-400';
            case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400';
            case 'Advanced': return 'bg-red-500/20 text-red-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };

    return (
        <section className="py-20 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-2">Featured Courses</h2>
                    <p className="text-gray-400">{courses.length}+ courses from top platforms</p>
                </div>

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 pl-12 focus:border-primary/50 focus:outline-none transition-all"
                        />
                        <BookOpen className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    </div>
                </div>

                {/* Platform Filters */}
                <div className="flex gap-3 mb-4 overflow-x-auto pb-4 scrollbar-hide justify-center">
                    {platforms.map((platform) => (
                        <button
                            key={platform}
                            onClick={() => setSelectedPlatform(platform)}
                            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${selectedPlatform === platform
                                ? 'bg-primary text-white'
                                : 'bg-white/5 hover:bg-white/10 text-gray-400'
                                }`}
                        >
                            {platform}
                        </button>
                    ))}
                </div>

                {/* Category Filters */}
                <div className="flex gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide justify-center">
                    {courseCategories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-1 rounded-full text-sm whitespace-nowrap transition-all ${selectedCategory === category
                                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                                : 'bg-white/5 hover:bg-white/10 text-gray-400 border border-white/10'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Courses Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedCourses.map((course) => (
                        <div
                            key={course.id}
                            className="glass-card p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                                    <BookOpen className="w-6 h-6 text-primary" />
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs ${getLevelColor(course.level)}`}>
                                    {course.level}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                {course.title}
                            </h3>

                            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                                <span className="px-2 py-1 rounded bg-white/5">{course.platform}</span>
                                <span>•</span>
                                <span>{course.category}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm mb-4">
                                <div className="flex items-center gap-1 text-yellow-400">
                                    <Star className="w-4 h-4 fill-current" />
                                    {course.rating}
                                </div>
                                <div className="flex items-center gap-1 text-gray-400">
                                    <Clock className="w-4 h-4" />
                                    {course.duration}
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                <span className="text-lg font-bold text-primary">{course.price}</span>
                                <a
                                    href={`https://${course.url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-sm text-primary hover:gap-2 transition-all"
                                >
                                    Learn More
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {displayedCourses.length === 0 && (
                    <div className="text-center text-gray-400 mt-8">
                        No courses found matching your criteria.
                    </div>
                )}

                {/* Explore More Button */}
                {!searchQuery && filteredCourses.length > 10 && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white font-medium"
                        >
                            {isExpanded ? 'Show Less' : 'Explore More Courses'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
