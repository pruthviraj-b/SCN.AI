
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Briefcase,
    Brain,
    Lightbulb,
    Settings,
    Users,
    Activity,
    ShieldAlert,
    LogOut
} from 'lucide-react';

const MENU_ITEMS = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Career Management', href: '/admin/careers', icon: Briefcase },
    { name: 'Skill Matrix', href: '/admin/skills', icon: Brain },
    { name: 'Startup Ideas', href: '/admin/startups', icon: Lightbulb },
    { name: 'User Monitoring', href: '/admin/users', icon: Users },
    { name: 'System Health', href: '/admin/analytics', icon: Activity },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="h-full flex flex-col p-4">
            <div className="mb-8 px-2 flex items-center gap-2">
                <ShieldAlert className="w-8 h-8 text-red-500" />
                <div>
                    <h1 className="font-bold text-lg tracking-tight">SCN Admin</h1>
                    <p className="text-[10px] text-blue-300 uppercase tracking-wider">Enterprise Mode</p>
                </div>
            </div>

            <nav className="flex-1 space-y-1">
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                                ${isActive
                                    ? 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-lg shadow-red-500/10'
                                    : 'text-blue-200/70 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon className={`w-4 h-4 ${isActive ? 'text-red-400' : 'text-blue-300/70'}`} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="pt-4 border-t border-white/10 mt-auto">
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-blue-200/70 hover:text-white hover:bg-white/5 w-full transition-colors">
                    <LogOut className="w-4 h-4" />
                    Secure Logout
                </button>
                <div className="mt-4 text-[10px] text-center text-blue-200/40">
                    v2.4.0 (Enterprise) <br />
                    Security: High
                </div>
            </div>
        </div>
    );
}
