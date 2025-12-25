"use client";

import { useState } from 'react';
import Link from "next/link";
import { Plus, Search, Send, Bot, Loader2, Sparkles } from "lucide-react";

import DashboardSkills from "@/components/dashboard/DashboardSkills";
import RecommendedCourses from "@/components/dashboard/RecommendedCourses";
import CareerRoadmap from "@/components/dashboard/CareerRoadmap";
import ResourcesLibrary from "@/components/dashboard/ResourcesLibrary";
import StartupSupportWidget from "@/components/dashboard/StartupSupportWidget";
import ProfessionalHelpWidget from "@/components/dashboard/ProfessionalHelpWidget";
import DeepAnalysis from "@/components/DeepAnalysis";
import CareerRecommendations from "@/components/dashboard/CareerRecommendations";
import DashboardHero from "@/components/dashboard/DashboardHero";
import ProgressSnapshot from "@/components/dashboard/ProgressSnapshot";
import NextBestAction from "@/components/dashboard/NextBestAction";

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

    const topMatch = matches && matches.length > 0 ? matches[0] : null;

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* SECTION 1: ORIENTATION (Welcome + AI) */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">
                        Welcome back, {user.name?.split(' ')[0] || 'User'}
                    </h1>
                    <p className="text-muted-foreground mt-1">Here&apos;s your current career status</p>
                </div>

                {/* AI Input - Command Center */}
                <div className="w-full md:max-w-md relative">
                    <form onSubmit={handleAiSearch} className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            {isAiLoading ? (
                                <Loader2 className="w-4 h-4 text-primary animate-spin" />
                            ) : (
                                <Sparkles className="w-4 h-4 text-primary" />
                            )}
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Ask AI to plan your next step..."
                            className="w-full pl-10 pr-12 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm shadow-sm transition-all"
                        />
                        <button
                            type="submit"
                            disabled={isAiLoading || !searchQuery.trim()}
                            className="absolute inset-y-2 right-2 px-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center h-8 w-8"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>

            {/* AI Search Status / Message */}
            {aiMessage && (
                <div className="mt-4 p-4 rounded-xl bg-primary/10 border border-primary/20 flex gap-3 animate-in fade-in slide-in-from-top-2 mx-2">
                    <Bot className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-sm text-foreground/90 font-medium">{aiMessage}</p>
                    </div>
                </div>
            )}

            {/* MOBILE ORDER: Welcome -> NextAction -> Snapshot -> Courses */}
            {/* DESKTOP ORDER: 2 Cols. LEFT: Action -> Snapshot -> Content. RIGHT: Agenda -> Support */}

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

                {/* LEFT MAIN COLUMN (3 cols wide) */}
                <div className="xl:col-span-3 space-y-8 flex flex-col">

                    {/* SECTION 3: NEXT BEST ACTION (High Priority) - Moved up for mobile importance via order classes if needed, but flex-col handles natural flow */}
                    <div className="order-1">
                        <NextBestAction
                            userProfile={userProfile}
                            hasPlans={user.plans.length > 0}
                        />
                    </div>

                    {/* SECTION 2: PROGRESS SNAPSHOT */}
                    <div className="order-2">
                        <ProgressSnapshot
                            userProfile={userProfile}
                            stats={{
                                plans: user.plans.length,
                                skills: skillsCount,
                                courses: recommendedCoursesCount
                            }}
                        />
                    </div>

                    {/* Content: Hero / Roadmap / Skills */}
                    <div className="order-3 space-y-8">
                        {/* Only show Hero if we have a match */}
                        {topMatch && (
                            <div className="h-[350px]">
                                <DashboardHero topMatch={topMatch} userProfile={userProfile} />
                            </div>
                        )}

                        {/* Working Hours / Skills Chart */}
                        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-foreground">Skills Analysis</h3>
                            </div>
                            {skillsCount > 0 ? (
                                <DashboardSkills userSkills={userProfile.skills} />
                            ) : (
                                <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-xl">
                                    <p className="text-muted-foreground text-sm">No skills data available</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* SECTION 4: RECOMMENDED COURSES */}
                    <div className="order-4" id="recommended-courses-section">
                        <RecommendedCourses
                            userSkills={userProfile.skills}
                            experienceLevel={userProfile.experienceLevel}
                            aiSearchResults={aiRecommendedIds}
                            aiLoading={isAiLoading}
                            aiSearchMessage={aiMessage}
                            onClearAiSearch={clearAiSearch}
                        />
                    </div>

                    <div className="order-5">
                        <DeepAnalysis />
                    </div>
                </div>

                {/* RIGHT SIDEBAR - SECTION 5: SUPPORT & AGENDA */}
                <div className="xl:col-span-1 space-y-6 flex flex-col order-last">

                    {/* My Agenda */}
                    <div id="your-plans-section" className="bg-card p-5 rounded-2xl border border-border shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="font-bold text-foreground">My Agenda</h3>
                                <p className="text-[10px] text-muted-foreground">Today's Schedule</p>
                            </div>
                            <Link href="/get-started" className="p-1.5 bg-primary/10 rounded-full text-primary hover:bg-primary/20 transition-colors">
                                <Plus className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        <div className="space-y-3 relative">
                            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-muted z-0" />
                            {user.plans.length === 0 ? (
                                <div className="text-center py-6 bg-card relative z-10">
                                    <p className="text-xs text-muted-foreground mb-2">No active plans</p>
                                    <Link href="/get-started" className="text-xs text-primary hover:underline font-medium">
                                        + Add Plan
                                    </Link>
                                </div>
                            ) : (
                                user.plans.slice(0, 4).map((plan: any) => (
                                    <Link key={plan.id} href={`/dashboard/plans/${plan.id}`} className="block relative z-10 pl-6 group">
                                        <div className="absolute left-[0.35rem] top-3 w-2 h-2 rounded-full bg-primary border-2 border-card group-hover:scale-110 transition-transform"></div>
                                        <div className="p-2.5 rounded-lg bg-muted/30 border border-transparent hover:border-border hover:bg-muted/50 transition-all cursor-pointer">
                                            <h4 className="font-semibold text-xs text-foreground truncate">{plan.title}</h4>
                                            <p className="text-[10px] text-muted-foreground truncate">Next step pending</p>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Simplified Support Widgets */}
                    <div className="space-y-4">
                        <StartupSupportWidget />
                        <ProfessionalHelpWidget />
                        <ResourcesLibrary />
                    </div>
                </div>

            </div>
        </div>
    );
}
