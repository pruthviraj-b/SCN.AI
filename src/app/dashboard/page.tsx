import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, FileText, MessageSquare, Settings, LogOut, User, Target } from "lucide-react";

import AdminDashboard from "@/components/admin/AdminDashboard";
import DashboardContent from "@/components/dashboard/DashboardContent";

import fs from 'fs';
import path from 'path';
import { calculateCareerMatch, CareerPath, UserProfile } from '@/lib/matching-algorithm';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        redirect("/login");
    }

    // 1. Get User ID
    const userId = await db.user.getIdByEmail(session.user.email);
    if (!userId) {
        redirect("/login");
    }

    // 2. Fetch Full Profile (Real Data)
    const user = await db.user.getProfile(userId);

    // 3. Enforce Onboarding
    // If user has no profile goal, they must complete onboarding
    if (!user || !user.career_goal) {
        redirect("/get-started");
    }

    const isAdmin = session.user?.email === 'pruthviraj1984bc@gmail.com';

    // 4. Map DB Data to Dashboard Format
    const userProfile = {
        educationLevel: user.highest_education || 'Not specified',
        fieldOfStudy: user.field_of_study || 'General',
        skills: user.skills.map(s => s.skill_name),
        interests: [], // If stored in Supabase we can fetch, otherwise default or add to schema
        experienceLevel: user.experience_level?.toLowerCase() || 'beginner',
        goal: user.career_goal || 'General Career',
        timeCommitment: '5-10 hours' // Can add to DB if needed
    };

    const skillsCount = user.skills.length;

    // Get latest AI recommendations
    const latestRec = user.recommendations.find(r => r.type === 'career_analysis');
    const matches = latestRec ? latestRec.payload.recommendations : []; // Assuming payload structure
    // If no matches yet but profile exists, maybe trigger calc or show empty state. 
    // For now getting from recommendations is "Real Persistence".

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Sidebar / Navigation (Same as before) */}
            <nav className="fixed left-0 top-0 h-full w-64 border-r bg-card p-6 hidden md:block">
                <div className="mb-12">
                    <h1 className="text-2xl font-bold text-primary">SCN.AI</h1>
                    <p className="text-[10px] text-muted-foreground mt-1 font-bold tracking-tighter leading-tight">
                        SMART_CAREER_NAVIGATOR_<br />AI_POWERED_PERSONALIZED_<br />CAREER_GUIDANCE_SYSTEM
                    </p>
                </div>

                <div className="space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium">
                        <FileText className="w-5 h-5" /> Overview
                    </Link>
                    {!isAdmin && (
                        <Link href="/onboarding" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                            <Plus className="w-5 h-5" /> New Plan
                        </Link>
                    )}
                    <Link href="/dashboard#your-plans-section" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                        <Target className="w-5 h-5" /> My Plans
                    </Link>
                    <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                        <User className="w-5 h-5" /> Profile
                    </Link>
                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                        <Settings className="w-5 h-5" /> Settings
                    </Link>
                    <Link href="/api/auth/signout" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors">
                        <LogOut className="w-5 h-5" /> Sign Out
                    </Link>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted border border-border">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                            {(user.full_name || user.email)?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate text-foreground">{user.full_name || 'User'}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="md:ml-64 p-8">
                {isAdmin ? (
                    <AdminDashboard />
                ) : (
                    <DashboardContent
                        user={{ ...user, name: user.full_name }} // Adapt to expected prop
                        userProfile={userProfile}
                        skillsCount={skillsCount}
                        recommendedCoursesCount={12} // Can fetch real count later
                        matches={matches || []}
                    />
                )}
            </main>
        </div>
    );
}


function ArrowRight({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}
