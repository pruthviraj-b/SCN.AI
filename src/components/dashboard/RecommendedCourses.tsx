"use client";

import { useState } from 'react';
import { courses } from '@/data/courses';
import { Star, Clock, ExternalLink, Sparkles, Loader2, Bot } from 'lucide-react';

type RecommendedCoursesProps = {
    userSkills: string[];
    experienceLevel: string;
    aiSearchResults?: string[] | null;
    aiLoading?: boolean;
    aiSearchMessage?: string;
    onClearAiSearch?: () => void;
};

export default function RecommendedCourses({
    userSkills,
    experienceLevel,
    aiSearchResults = null,
    aiLoading = false,
    aiSearchMessage = '',
    onClearAiSearch
}: RecommendedCoursesProps) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedPlatform, setSelectedPlatform] = useState('All');

    // Map experience level to course difficulty
    const levelMapping: Record<string, string[]> = {
        'beginner': ['Beginner'],
        'intermediate': ['Beginner', 'Intermediate'],
        'advanced': ['Beginner', 'Intermediate', 'Advanced']
    };

    const allowedLevels = levelMapping[experienceLevel.toLowerCase()] || ['Beginner'];

    // Filter courses logic
    const displayedCourses = courses.filter(course => {
        // If AI recommendations exist, ONLY show those
        if (aiSearchResults) {
            return aiSearchResults.includes(course.id);
        }

        // Standard filtering

        // 1. Check Level
        if (!allowedLevels.includes(course.level)) return false;

        // 2. Filter by selected category
        if (selectedCategory !== 'All' && course.category !== selectedCategory) return false;

        // 3. Filter by selected platform
        if (selectedPlatform !== 'All' && course.platform !== selectedPlatform) return false;

        return true;
    }).slice(0, 12);

    const categories = ['All', ...Array.from(new Set(courses.map(c => c.category)))];

    return (
        <div className="glass-card p-6 rounded-2xl border border-white/10 relative overflow-hidden transition-all duration-300">
            {/* AI Background Accent - changes color if AI is active */}
            {aiSearchResults && (
                <div className="absolute top-0 right-0 w-full h-full bg-primary/5 rounded-2xl -z-10 pointer-events-none animate-in fade-in" />
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        {aiSearchResults ? (
                            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                        ) : null}
                        Recommended Courses
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-blue-200/60">
                            {aiSearchResults ? 'AI Curated Selection' : 'Based on your profile'}
                        </p>
                        {aiLoading && <Loader2 className="w-3 h-3 text-primary animate-spin" />}
                    </div>
                </div>
            </div>

            {/* AI Message Bubble */}
            {aiSearchMessage && (
                <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/10 flex gap-3 animate-in fade-in slide-in-from-top-2">
                    <Bot className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-sm text-blue-100/90">{aiSearchMessage}</p>
                    </div>
                    {onClearAiSearch && (
                        <button
                            onClick={onClearAiSearch}
                            className="text-xs text-blue-200/50 hover:text-white transition-colors self-start"
                        >
                            Clear
                        </button>
                    )}
                </div>
            )}

            {/* Filters - Only show if not in AI mode to keep UI clean */}
            {!aiSearchResults && !aiLoading && (
                <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex gap-2 flex-wrap">
                        {categories.slice(0, 6).map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${selectedCategory === category
                                    ? 'bg-primary/20 text-primary border border-primary'
                                    : 'bg-white/5 text-blue-200/60 border border-white/10 hover:bg-white/10'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Courses Grid */}
            {aiLoading ? (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                    <p className="text-blue-200/60">Curating the best courses for you...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {displayedCourses.map(course => (
                        <a
                            key={course.id}
                            href={`https://${course.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-4 rounded-xl border transition-all group relative overflow-hidden ${aiSearchResults?.includes(course.id)
                                    ? 'bg-primary/5 border-primary/30 hover:border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]'
                                    : 'bg-white/5 border-white/10 hover:border-primary/50'
                                }`}
                        >
                            {aiSearchResults?.includes(course.id) && (
                                <div className="absolute top-2 right-2 px-2 py-0.5 bg-primary/20 text-primary text-[10px] uppercase font-bold tracking-wider rounded-full border border-primary/20">
                                    AI Pick
                                </div>
                            )}

                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1 pr-6">
                                    <h4 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2">
                                        {course.title}
                                    </h4>
                                    <p className="text-xs text-blue-200/60">{course.platform}</p>
                                </div>
                                {!aiSearchResults?.includes(course.id) && (
                                    <ExternalLink className="w-4 h-4 text-blue-200/50 group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
                                )}
                            </div>

                            <div className="flex items-center gap-3 mb-3 text-xs">
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star className="w-3 h-3 fill-current" />
                                    <span>{course.rating}</span>
                                </div>
                                <div className="flex items-center gap-1 text-blue-200/60">
                                    <Clock className="w-3 h-3" />
                                    <span>{course.duration}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className={`text-xs px-2 py-1 rounded-full ${course.level === 'Beginner' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                                    course.level === 'Intermediate' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' :
                                        'bg-red-500/10 text-red-400 border border-red-500/30'
                                    }`}>
                                    {course.level}
                                </span>
                                <span className="text-xs font-semibold text-primary">{course.price}</span>
                            </div>
                        </a>
                    ))}
                </div>
            )}

            {displayedCourses.length === 0 && !aiLoading && (
                <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                    <p className="text-blue-200/60">No courses found matching your criteria</p>
                    <button
                        onClick={() => {
                            if (onClearAiSearch) onClearAiSearch();
                            setSelectedCategory('All');
                        }}
                        className="mt-2 text-sm text-primary hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}
