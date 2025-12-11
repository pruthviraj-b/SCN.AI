import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, FileText, MessageSquare, Settings, LogOut, User, TrendingUp, BookOpen, Target } from "lucide-react";
import DeepAnalysis from "@/components/DeepAnalysis";
import AdminDashboard from "@/components/admin/AdminDashboard";
import DashboardSkills from "@/components/dashboard/DashboardSkills";
import RecommendedCourses from "@/components/dashboard/RecommendedCourses";
import CareerRoadmap from "@/components/dashboard/CareerRoadmap";
import ResourcesLibrary from "@/components/dashboard/ResourcesLibrary";
import StartupSupportWidget from "@/components/dashboard/StartupSupportWidget";
import ProfessionalHelpWidget from "@/components/dashboard/ProfessionalHelpWidget";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const user = await db.user.findUnique({
        where: { email: session.user?.email! }
    });

    if (!user) {
        return <div>User not found</div>;
    }

    const isAdmin = session.user?.email === 'pruthviraj1984bc@gmail.com';

    // Extract user profile data from the most recent plan
    let userProfile = {
        skills: [] as string[],
        experienceLevel: 'beginner',
        goal: '',
        timeCommitment: '5-10'
    };

    if (user.plans.length > 0) {
        try {
            const latestPlan = user.plans[user.plans.length - 1];
            const planData = JSON.parse(latestPlan.data);
            userProfile = {
                skills: planData.skills || [],
                experienceLevel: planData.experienceLevel || 'beginner',
                goal: planData.goal || '',
                timeCommitment: planData.timeCommitment || '5-10'
            };
        } catch (error) {
            console.error('Error parsing plan data:', error);
        }
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
                    <Link href="/dashboard/chat-history" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                        <MessageSquare className="w-5 h-5" />
                        Chat History
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

                            {/* Recommended Courses */}
                            <RecommendedCourses
                                userSkills={userProfile.skills}
                                experienceLevel={userProfile.experienceLevel}
                            />

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
                            <div className="bg-card p-6 rounded-2xl border shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-foreground">Your Plans</h3>
                                    <Link href="/onboarding" className="text-primary hover:underline text-xs">
                                        + New
                                    </Link>
                                </div>

                                <div className="grid gap-3">
                                    {user.plans.length === 0 ? (
                                        <div className="text-center py-8 border border-dashed border-border rounded-xl">
                                            <p className="text-xs text-muted-foreground mb-3">No plans yet</p>
                                            <Link href="/onboarding" className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs hover:bg-primary/90 transition-colors inline-block">
                                                Create
                                            </Link>
                                        </div>
                                    ) : (
                                        user.plans.map((plan: any) => (
                                            <div key={plan.id} className="p-3 rounded-xl bg-muted/50 border border-border hover:border-primary/50 transition-colors cursor-pointer group">
                                                <div className="flex justify-between items-start">
                                                    <div className="min-w-0">
                                                        <h4 className="font-semibold mb-1 text-sm group-hover:text-primary transition-colors text-foreground truncate">{plan.title}</h4>
                                                        <p className="text-xs text-muted-foreground">Updated {new Date(plan.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
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
