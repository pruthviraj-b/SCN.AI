"use client";

import { useState } from 'react';
import Link from "next/link";
import { Plus, FileText, TrendingUp, BookOpen, Target, Search, Sparkles, Send, Bot, Loader2 } from "lucide-react";

import DashboardSkills from "@/components/dashboard/DashboardSkills";
import RecommendedCourses from "@/components/dashboard/RecommendedCourses";
import CareerRoadmap from "@/components/dashboard/CareerRoadmap";
import ResourcesLibrary from "@/components/dashboard/ResourcesLibrary";
import StartupSupportWidget from "@/components/dashboard/StartupSupportWidget";
import ProfessionalHelpWidget from "@/components/dashboard/ProfessionalHelpWidget";
import DeepAnalysis from "@/components/DeepAnalysis";
import CareerRecommendations from "@/components/dashboard/CareerRecommendations";

type DashboardContentProps = {
    user: any;
    userProfile: {
        skills: string[];
        experienceLevel: string;
        goal: string;
        timeCommitment: string;
    };
    skillsCount: number;
    recommendedCoursesCount: number;
    matches?: any[]; // Passed from server
};

export default function DashboardContent({ user, userProfile, skillsCount, recommendedCoursesCount, matches = [] }: DashboardContentProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [aiMessage, setAiMessage] = useState('');
    const [aiRecommendedIds, setAiRecommendedIds] = useState<string[] | null>(null);

    const handleAiSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsAiLoading(true);
        setAiRecommendedIds(null);
        setAiMessage('');

        console.log("Starting AI Search:", searchQuery);

        try {
            const response = await fetch('/api/recommend-courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: searchQuery,
                    userSkills: userProfile.skills
                })
            });

            if (!response.ok) throw new Error('Failed to fetch');

            const data = await response.json();
            setAiRecommendedIds(data.courseIds);
            setAiMessage(data.message);
        } catch (error) {
            console.error('AI Search Error:', error);
            setAiRecommendedIds(null);
            setAiMessage('Unable to connect to AI. Showing standard courses.');
        } finally {
            setIsAiLoading(false);
        }
    };

    const clearAiSearch = () => {
        setSearchQuery('');
        setAiRecommendedIds(null);
        setAiMessage('');
    };

    // Scroll to courses when search completes
    const scrollToCourses = () => {
        const coursesSection = document.getElementById('recommended-courses-section');
        if (coursesSection) {
            coursesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (aiRecommendedIds && !isAiLoading) {
        // Maybe scroll automatically? 
        // scrollToCourses(); 
    }

    return (
        <div className="space-y-8">
            {/* Global AI Search Bar */}
            <div className="relative w-full max-w-3xl mx-auto mb-10">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative">
                    <form onSubmit={handleAiSearch} className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            {isAiLoading ? (
                                <Loader2 className="w-5 h-5 text-primary animate-spin" />
                            ) : (
                                <Sparkles className="w-5 h-5 text-primary" />
                            )}
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="What do you want to learn today? (e.g. 'Advanced AI courses' or 'Web dev for beginners')"
                            className="w-full pl-12 pr-14 py-4 bg-card border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground shadow-lg text-lg transition-all"
                        />
                        <button
                            type="submit"
                            disabled={isAiLoading || !searchQuery.trim()}
                            className="absolute inset-y-2 right-2 px-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform active:scale-95"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
                {/* Search Status / Message */}
                {aiMessage && (
                    <div className="mt-4 p-4 rounded-xl bg-primary/10 border border-primary/20 flex gap-3 animate-in fade-in slide-in-from-top-2 mx-2">
                        <Bot className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm text-foreground/90 font-medium">{aiMessage}</p>
                        </div>
                        <button
                            onClick={clearAiSearch}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors self-start underline"
                        >
                            Clear Results
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-card p-6 rounded-2xl border shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-blue-500/10">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                </div>
                                <h3 className="text-muted-foreground text-sm">Career Plans</h3>
                            </div>
                            <p className="text-3xl font-bold text-foreground">{user.plans.length}</p>
                        </div>
                        <div className="bg-card p-6 rounded-2xl border shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-green-500/10">
                                    <TrendingUp className="w-5 h-5 text-green-600" />
                                </div>
                                <h3 className="text-muted-foreground text-sm">Skills Tracked</h3>
                            </div>
                            <p className="text-3xl font-bold text-foreground">{skillsCount}</p>
                        </div>
                        <div className="bg-card p-6 rounded-2xl border shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-purple-500/10">
                                    <BookOpen className="w-5 h-5 text-purple-600" />
                                </div>
                                <h3 className="text-muted-foreground text-sm">Recommended Courses</h3>
                            </div>
                            <p className="text-3xl font-bold text-foreground">{recommendedCoursesCount}</p>
                        </div>
                        <div className="bg-card p-6 rounded-2xl border shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-yellow-500/10">
                                    <Target className="w-5 h-5 text-yellow-600" />
                                </div>
                                <h3 className="text-muted-foreground text-sm">Current Goal</h3>
                            </div>
                            <p className="text-lg font-bold truncate text-foreground">{userProfile.goal || 'Not set'}</p>
                        </div>
                    </div>

                    {/* NEW: Smart Career Recommendations */}
                    {matches && matches.length > 0 && (
                        <CareerRecommendations matches={matches} />
                    )}

                    {/* Skills Section */}
                    {skillsCount > 0 && (
                        <DashboardSkills userSkills={userProfile.skills} />
                    )}

                    {/* Career Roadmap */}
                    {userProfile.goal && (
                        <CareerRoadmap
                            userGoal={userProfile.goal}
                            experienceLevel={userProfile.experienceLevel}
                        />
                    )}

                    {/* Recommended Courses - ID for scrolling */}
                    <div id="recommended-courses-section">
                        <RecommendedCourses
                            userSkills={userProfile.skills}
                            experienceLevel={userProfile.experienceLevel}
                            aiSearchResults={aiRecommendedIds}
                            aiLoading={isAiLoading}
                            aiSearchMessage={aiMessage}
                            onClearAiSearch={clearAiSearch}
                        />
                    </div>

                    {/* Resources Library */}
                    <ResourcesLibrary />

                    {/* Deep Analysis */}
                    <DeepAnalysis />
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <StartupSupportWidget />
                    <ProfessionalHelpWidget />

                    {/* Career Plans List */}
                    <div id="your-plans-section" className="bg-card p-6 rounded-2xl border shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-foreground">Your Plans</h3>
                            <Link href="/get-started" className="text-primary hover:underline text-xs">
                                + New
                            </Link>
                        </div>

                        <div className="grid gap-3">
                            {user.plans.length === 0 ? (
                                <div className="text-center py-8 border border-dashed border-border rounded-xl">
                                    <p className="text-xs text-muted-foreground mb-3">No plans yet</p>
                                    <Link href="/get-started" className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs hover:bg-primary/90 transition-colors inline-block">
                                        Create
                                    </Link>
                                </div>
                            ) : (
                                user.plans.map((plan: any) => (
                                    <Link key={plan.id} href={`/dashboard/plans/${plan.id}`}>
                                        <div className="p-3 rounded-xl bg-muted/50 border border-border hover:border-primary/50 transition-colors cursor-pointer group">
                                            <div className="flex justify-between items-start">
                                                <div className="min-w-0">
                                                    <h4 className="font-semibold mb-1 text-sm group-hover:text-primary transition-colors text-foreground truncate">{plan.title}</h4>
                                                    <p className="text-xs text-muted-foreground">Updated {new Date(plan.createdAt).toLocaleDateString()}</p>
                                                </div>
                                                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
