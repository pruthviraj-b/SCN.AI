"use client";

import { useState } from 'react';
import { courses } from '@/data/courses';
import { Star, Clock, ExternalLink } from 'lucide-react';

type RecommendedCoursesProps = {
    userSkills: string[];
    experienceLevel: string;
};

export default function RecommendedCourses({ userSkills, experienceLevel }: RecommendedCoursesProps) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedPlatform, setSelectedPlatform] = useState('All');

    // Map experience level to course difficulty
    const levelMapping: Record<string, string[]> = {
        'beginner': ['Beginner'],
        'intermediate': ['Beginner', 'Intermediate'],
        'advanced': ['Beginner', 'Intermediate', 'Advanced']
    };

    const allowedLevels = levelMapping[experienceLevel.toLowerCase()] || ['Beginner'];

    // Filter courses based on user's skills and experience level
    const recommendedCourses = courses.filter(course => {
        // Check if course level matches user's experience
        if (!allowedLevels.includes(course.level)) return false;

        // Filter by selected category
        if (selectedCategory !== 'All' && course.category !== selectedCategory) return false;

        // Filter by selected platform
        if (selectedPlatform !== 'All' && course.platform !== selectedPlatform) return false;

        return true;
    }).slice(0, 12); // Limit to 12 courses

    const categories = ['All', ...Array.from(new Set(courses.map(c => c.category)))];
    const platforms = ['All', 'Coursera', 'Udemy', 'LinkedIn Learning', 'edX'];

    return (
        <div className="glass-card p-6 rounded-2xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Recommended Courses</h3>
                <span className="text-sm text-gray-400">{recommendedCourses.length} courses</span>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex gap-2 flex-wrap">
                    {categories.slice(0, 6).map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${selectedCategory === category
                                    ? 'bg-primary/20 text-primary border border-primary'
                                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedCourses.map(course => (
                    <a
                        key={course.id}
                        href={`https://${course.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all group"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <h4 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2">
                                    {course.title}
                                </h4>
                                <p className="text-xs text-gray-400">{course.platform}</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
                        </div>

                        <div className="flex items-center gap-3 mb-3 text-xs">
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="w-3 h-3 fill-current" />
                                <span>{course.rating}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-400">
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

            {recommendedCourses.length === 0 && (
                <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                    <p className="text-gray-400">No courses found for the selected filters</p>
                </div>
            )}
        </div>
    );
}
