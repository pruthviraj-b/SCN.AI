import React from 'react';
import Link from 'next/link';
import {
    Users,
    Briefcase,
    Database,
    Lightbulb,
    BookOpen,
    Cpu,
    BarChart3,
    ShieldAlert,
    FileClock,
    Bell,
    ArrowRight
} from 'lucide-react';

const adminCards = [
    {
        title: "User Management",
        description: "View, edit, verify, and deactivate user accounts.",
        icon: Users,
        color: "bg-blue-500",
        link: "/admin/users"
    },
    {
        title: "Career Path Management",
        description: "Add, edit, or delete career paths and detailed roadmaps.",
        icon: Briefcase,
        color: "bg-indigo-500",
        link: "/admin/careers"
    },
    {
        title: "Skill Database",
        description: "Maintain skills, categories, and proficiency mappings.",
        icon: Database,
        color: "bg-purple-500",
        link: "/admin/skills"
    },
    {
        title: "Startup Ideas",
        description: "Manage entrepreneurial guidance and startup templates.",
        icon: Lightbulb,
        color: "bg-yellow-500",
        link: "/admin/startups"
    },
    {
        title: "Learning Resources",
        description: "Review and update external course links and materials.",
        icon: BookOpen,
        color: "bg-green-500",
        link: "/admin/resources"
    },
    {
        title: "AI Engine Settings",
        description: "Monitor model scoring, update parameters and prompts.",
        icon: Cpu,
        color: "bg-red-500",
        link: "/admin/ai-settings"
    },
    {
        title: "Reports & Analytics",
        description: "View charts for active users, career trends, and skill gaps.",
        icon: BarChart3,
        color: "bg-orange-500",
        link: "/admin/analytics"
    },
    {
        title: "Content Moderation",
        description: "Review user-submitted interests, goals, and feedback.",
        icon: ShieldAlert,
        color: "bg-rose-500",
        link: "/admin/moderation"
    },
    {
        title: "System Logs",
        description: "Track admin activities, errors, and system events.",
        icon: FileClock,
        color: "bg-gray-500",
        link: "/admin/logs"
    },
    {
        title: "Notifications & Alerts",
        description: "Send announcements or system updates to users.",
        icon: Bell,
        color: "bg-teal-500",
        link: "/admin/notifications"
    }
];

export default function AdminDashboard() {
    return (
        <div className="w-full">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h2>
                <p className="text-gray-400">Manage your application, users, and content from a central hub.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {adminCards.map((card, index) => (
                    <Link
                        key={index}
                        href={card.link}
                        className="group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
                    >
                        <div className={`absolute top-0 right-0 w-24 h-24 ${card.color} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150`} />

                        <div className="relative z-10">
                            <div className={`w-12 h-12 ${card.color} bg-opacity-10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <card.icon className={`w-6 h-6 ${card.color.replace('bg-', 'text-')}`} />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {card.title}
                            </h3>

                            <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                                {card.description}
                            </p>

                            <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:translate-x-2 transition-transform">
                                Manage
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
