"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Users, Briefcase, Target } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AnalyticsPage() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalPlans: 0,
        growthRate: 0,
        avgPlansPerUser: 0
    });

    const [userGrowthData, setUserGrowthData] = useState<any[]>([]);
    const [careerPathData, setCareerPathData] = useState<any[]>([]);
    const [skillCategoryData, setSkillCategoryData] = useState<any[]>([]);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            // Fetch users
            const usersRes = await fetch('/api/admin/users');
            const users = usersRes.ok ? await usersRes.json() : [];

            // Fetch career paths
            const careersRes = await fetch('/api/admin/career-paths');
            const careers = careersRes.ok ? await careersRes.json() : [];

            // Fetch skills
            const skillsRes = await fetch('/api/admin/skills');
            const skills = skillsRes.ok ? await skillsRes.json() : [];

            // Calculate stats
            const totalUsers = users.length || 0;
            const totalPlans = users.reduce((acc: number, u: any) => acc + (u.plans?.length || 0), 0);
            const avgPlansPerUser = totalUsers > 0 ? (totalPlans / totalUsers).toFixed(1) : 0;

            setStats({
                totalUsers,
                totalPlans,
                growthRate: 24, // Mock growth rate
                avgPlansPerUser: Number(avgPlansPerUser)
            });

            // User growth data (mock monthly data)
            setUserGrowthData([
                { month: 'Jan', users: Math.max(0, totalUsers - 50) },
                { month: 'Feb', users: Math.max(0, totalUsers - 40) },
                { month: 'Mar', users: Math.max(0, totalUsers - 30) },
                { month: 'Apr', users: Math.max(0, totalUsers - 20) },
                { month: 'May', users: Math.max(0, totalUsers - 10) },
                { month: 'Jun', users: totalUsers }
            ]);

            // Career path popularity
            const careerCounts: any = {};
            careers.forEach((career: any) => {
                const category = career.category || 'Other';
                careerCounts[category] = (careerCounts[category] || 0) + 1;
            });

            const careerData = Object.entries(careerCounts).map(([name, value]) => ({
                name,
                value
            }));
            setCareerPathData(careerData);

            // Skill categories
            const skillCounts: any = {};
            skills.forEach((skill: any) => {
                const category = skill.category || 'Other';
                skillCounts[category] = (skillCounts[category] || 0) + 1;
            });

            const skillData = Object.entries(skillCounts).map(([category, count]) => ({
                category,
                count
            }));
            setSkillCategoryData(skillData);

        } catch (error) {
            console.error('Failed to fetch analytics:', error);
        }
    };

    const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>

                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Reports & Analytics</h1>
                    <p className="text-gray-400">View charts for active users, career trends, and skill gaps</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="glass-card p-6 rounded-xl border border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                <Users className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Total Users</p>
                                <p className="text-3xl font-bold">{stats.totalUsers}</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-xl border border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                                <Briefcase className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Total Plans</p>
                                <p className="text-3xl font-bold">{stats.totalPlans}</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-xl border border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Growth Rate</p>
                                <p className="text-3xl font-bold">+{stats.growthRate}%</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-xl border border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                                <Target className="w-6 h-6 text-orange-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Avg Plans/User</p>
                                <p className="text-3xl font-bold">{stats.avgPlansPerUser}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* User Growth Chart */}
                    <div className="glass-card p-6 rounded-xl border border-white/10">
                        <h3 className="text-xl font-bold mb-4">User Growth Trend</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={userGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                <XAxis dataKey="month" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1f2937',
                                        border: '1px solid #374151',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Career Categories Pie Chart */}
                    <div className="glass-card p-6 rounded-xl border border-white/10">
                        <h3 className="text-xl font-bold mb-4">Career Path Categories</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={careerPathData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(props: any) => `${props.name} ${((props.percent || 0) * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {careerPathData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1f2937',
                                        border: '1px solid #374151',
                                        borderRadius: '8px'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Skill Categories Bar Chart */}
                <div className="glass-card p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold mb-4">Skills by Category</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={skillCategoryData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                            <XAxis dataKey="category" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: '1px solid #374151',
                                    borderRadius: '8px'
                                }}
                            />
                            <Legend />
                            <Bar dataKey="count" fill="#8b5cf6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
