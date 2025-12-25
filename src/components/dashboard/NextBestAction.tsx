"use client";

import Link from 'next/link';
import { ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

interface NextBestActionProps {
    userProfile: {
        skills: string[];
        experienceLevel: string;
        goal: string;
    };
    hasPlans: boolean;
}

export default function NextBestAction({ userProfile, hasPlans }: NextBestActionProps) {
    // Logic to determine the NEXT BEST ACTION
    let content = {
        title: "Ready to accelerate your career?",
        description: "Explore our advanced career planning tools to get started.",
        cta: "Explore Plans",
        href: "/dashboard",
        icon: <Sparkles className="w-5 h-5" />,
        variant: 'default'
    };

    if (!userProfile.goal) {
        content = {
            title: "Set your Career Goal",
            description: "You haven't set a main career goal yet. Defining this will help us personalize your roadmap.",
            cta: "Set Goal Now",
            href: "/get-started",
            icon: <AlertCircle className="w-5 h-5" />,
            variant: 'urgent'
        };
    } else if (userProfile.skills.length === 0) {
        content = {
            title: "Assess your Skills",
            description: "Add your current skills to generate a gap analysis and personalized learning path.",
            cta: "Start Skill Assessment",
            href: "/get-started",
            icon: <Sparkles className="w-5 h-5" />,
            variant: 'urgent'
        };
    } else if (!hasPlans) {
        content = {
            title: "Create your First Plan",
            description: "You have a goal and skills. Now, let's build a concrete plan to get you there.",
            cta: "Create Plan",
            href: "/get-started",
            icon: <ArrowRight className="w-5 h-5" />,
            variant: 'primary'
        };
    }

    return (
        <div className={`
            w-full p-6 rounded-[1.5rem] relative overflow-hidden transition-all
            ${content.variant === 'urgent'
                ? 'bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20'
                : 'bg-card border border-border shadow-sm'
            }
        `}>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Sparkles className="w-48 h-48" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${content.variant === 'urgent' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                            }`}>
                            Your Next Step
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{content.title}</h3>
                    <p className="text-muted-foreground text-sm max-w-xl">{content.description}</p>
                </div>

                <Link
                    href={content.href}
                    className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                    {content.cta}
                    {content.icon}
                </Link>
            </div>
        </div>
    );
}
