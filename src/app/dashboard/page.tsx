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

    if (!session) {
        redirect("/login");
    }

    const user = await db.user.findUnique({
        where: { email: session.user.email }
    });

    if (!user) {
        return <div>User not found</div>;
    }

    const isAdmin = session.user?.email === 'pruthviraj1984bc@gmail.com';

    // Extract user profile data from the most recent plan
    let userProfile = {
        educationLevel: '',
        fieldOfStudy: '',
        skills: [] as string[],
        interests: [] as string[],
        experienceLevel: 'beginner',
        goal: '',
        timeCommitment: '5-10'
    };

    if (user.plans.length > 0) {
        try {
            const latestPlan = user.plans[user.plans.length - 1];
            const planData = JSON.parse(latestPlan.data);

            // Handle nested JSON if present (legacy issue seen in data.json logs)
            let actualData = planData;
            if (typeof planData.data === 'string') {
                try { actualData = JSON.parse(planData.data); } catch (e) { }
            }

            userProfile = {
                educationLevel: actualData.educationLevel || '',
                fieldOfStudy: actualData.fieldOfStudy || '',
                skills: actualData.skills || [],
                interests: actualData.interests || [],
                experienceLevel: actualData.experienceLevel || 'beginner',
                goal: actualData.goal || '',
                timeCommitment: actualData.timeCommitment || '5-10'
            };
        } catch (error) {
            console.error('Error parsing plan data:', error);
        }
    }

    // --- Smart Matching ---
    const dataFilePath = path.join(process.cwd(), 'data.json');
    let matches: any[] = [];

    try {
        const fileContents = fs.readFileSync(dataFilePath, 'utf8');
        const jsonData = JSON.parse(fileContents);
        const careerPaths: CareerPath[] = jsonData.careerPaths;

        const profileForMatching: UserProfile = {
            educationLevel: userProfile.educationLevel,
            fieldOfStudy: userProfile.fieldOfStudy,
            skills: userProfile.skills,
            interests: userProfile.interests
        };

        matches = careerPaths.map(career => calculateCareerMatch(profileForMatching, career));
        matches.sort((a, b) => b.score - a.score);
    } catch (error) {
        console.error("Error calculating matches:", error);
    }

    const skillsCount = userProfile.skills.length;
    const recommendedCoursesCount = 12; // Based on filter in component

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Sidebar / Navigation */}
            <nav className="fixed left-0 top-0 h-full w-64 border-r bg-card p-6 hidden md:block">
                <div className="mb-12">
                    <h1 className="text-2xl font-bold text-primary">
                        SCN.AI
                    </h1>
                    <p className="text-[10px] text-muted-foreground mt-1 font-bold tracking-tighter leading-tight">
                        SMART_CAREER_NAVIGATOR_<br />AI_POWERED_PERSONALIZED_<br />CAREER_GUIDANCE_SYSTEM
                    </p>
                </div>

                <div className="space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium">
                        <FileText className="w-5 h-5" />
                        Overview
                    </Link>
                    {!isAdmin && (
                        <Link href="/onboarding" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                            <Plus className="w-5 h-5" />
                            New Plan
                        </Link>
                    )}
                    <Link href="/dashboard#your-plans-section" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                        <Target className="w-5 h-5" />
                        My Plans
                    </Link>
                    <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                        <User className="w-5 h-5" />
                        Profile
                    </Link>
                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                        <Settings className="w-5 h-5" />
                        Settings
                    </Link>
                    <Link href="/api/auth/signout" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors">
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </Link>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted border border-border">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                            {user.name?.[0] || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate text-foreground">{user.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="md:ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold mb-2 text-foreground">Welcome back, {user.name?.split(' ')[0]}</h2>
                        <p className="text-muted-foreground">
                            {isAdmin ? "Admin Control Center" : "Here's an overview of your career journey."}
                        </p>
                    </div>
                    <Link href="/api/auth/signout" className="md:hidden px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-sm">
                        Sign Out
                    </Link>
                </header>

                {isAdmin ? (
                    <AdminDashboard />
                ) : (
                    <DashboardContent
                        user={user}
                        userProfile={userProfile}
                        skillsCount={skillsCount}
                        recommendedCoursesCount={recommendedCoursesCount}
                        matches={matches}
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
