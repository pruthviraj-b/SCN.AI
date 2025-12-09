import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { User, Mail, Calendar, Briefcase, ArrowLeft } from "lucide-react";

export default async function ProfilePage() {
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

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <div className="container mx-auto px-4 py-20 pt-32 max-w-4xl">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>

                <div className="glass-card p-8 rounded-2xl border border-white/10">
                    {/* Profile Header */}
                    <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold">
                            {user.name?.[0] || 'U'}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                            <p className="text-gray-400">{user.email}</p>
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-4">Profile Information</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm text-gray-400">
                                    <User className="w-4 h-4" />
                                    Full Name
                                </label>
                                <div className="bg-black/20 border border-white/10 rounded-lg px-4 py-3">
                                    {user.name}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm text-gray-400">
                                    <Mail className="w-4 h-4" />
                                    Email Address
                                </label>
                                <div className="bg-black/20 border border-white/10 rounded-lg px-4 py-3">
                                    {user.email}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm text-gray-400">
                                    <Calendar className="w-4 h-4" />
                                    Member Since
                                </label>
                                <div className="bg-black/20 border border-white/10 rounded-lg px-4 py-3">
                                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm text-gray-400">
                                    <Briefcase className="w-4 h-4" />
                                    Career Plans
                                </label>
                                <div className="bg-black/20 border border-white/10 rounded-lg px-4 py-3">
                                    {user.plans.length} {user.plans.length === 1 ? 'plan' : 'plans'}
                                </div>
                            </div>
                        </div>

                        {/* Career Plans Section */}
                        {user.plans.length > 0 && (
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <h3 className="text-xl font-bold mb-4">Your Career Plans</h3>
                                <div className="space-y-3">
                                    {user.plans.map((plan) => (
                                        <div key={plan.id} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-primary/50 transition-colors">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-semibold mb-1">{plan.title}</h4>
                                                    <p className="text-sm text-gray-400">
                                                        Created on {new Date(plan.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
                                                    Active
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-4 pt-6">
                            <Link
                                href="/onboarding"
                                className="flex-1 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors text-center"
                            >
                                Create New Plan
                            </Link>
                            <Link
                                href="/dashboard"
                                className="flex-1 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-center"
                            >
                                View Dashboard
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="glass-card p-6 rounded-xl border border-white/10 text-center">
                        <p className="text-3xl font-bold text-primary mb-2">{user.plans.length}</p>
                        <p className="text-sm text-gray-400">Career Plans</p>
                    </div>
                    <div className="glass-card p-6 rounded-xl border border-white/10 text-center">
                        <p className="text-3xl font-bold text-green-400 mb-2">
                            {Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
                        </p>
                        <p className="text-sm text-gray-400">Days as Member</p>
                    </div>
                    <div className="glass-card p-6 rounded-xl border border-white/10 text-center">
                        <p className="text-3xl font-bold text-purple-400 mb-2">0</p>
                        <p className="text-sm text-gray-400">Skills Tracked</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
