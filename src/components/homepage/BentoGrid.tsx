"use client";

import { motion } from 'framer-motion';
import {
    Briefcase, Code, Rocket, BookOpen,
    Bot, ArrowRight, TrendingUp, Globe,
    Cpu, Layers, Target, Users
} from 'lucide-react';
import Link from 'next/link';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function BentoGrid() {
    const cards = [
        {
            title: "AI Career Mentor",
            description: "Chat with our advanced AI to get instant career advice, roadmap adjustments, and skill gap analysis.",
            icon: Bot,
            href: "/ai-mentor",
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20",
            cols: "md:col-span-2",
            cta: "Start Chatting"
        },
        {
            title: "Career Explorer",
            description: "Browse 10,000+ roles with real-time market data.",
            icon: Briefcase,
            href: "/careers",
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
            cols: "md:col-span-1",
            cta: "Explore"
        },
        {
            title: "Skill Assessment",
            description: "Test your skills with AI-generated quizzes.",
            icon: Code,
            href: "/get-started",
            color: "text-green-400",
            bg: "bg-green-500/10",
            border: "border-green-500/20",
            cols: "md:col-span-1",
            cta: "Take Test"
        },
        {
            title: "Startup Generator",
            description: "Turn your skills into a business execution plan.",
            icon: Rocket,
            href: "/startups",
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
            border: "border-yellow-500/20",
            cols: "md:col-span-2",
            cta: "Generate Ideas"
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-background relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute top-1/2 right-0 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-[2.25rem] md:text-[3rem] font-bold mb-6 text-foreground leading-[1.2]">
                            Everything You Need <br /> To <span className="text-primary">Succeed</span>
                        </h2>
                        <p className="text-[1.125rem] md:text-[1.25rem] text-muted-foreground leading-[1.6]">
                            A complete toolkit for your professional journey, powered by artificial intelligence.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
                    {cards.map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`${card.cols} group relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-border bg-card p-6 md:p-8 flex flex-col justify-between transition-all hover:border-primary/50 shadow-sm hover:shadow-lg hover:-translate-y-1 cursor-pointer`}
                        >
                            <Link href={card.href} className="absolute inset-0 z-20" aria-label={card.title} />

                            <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <card.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                                </div>
                                <h3 className="text-[1.25rem] md:text-[1.5rem] font-semibold text-foreground mb-3">{card.title}</h3>
                                <p className="text-muted-foreground leading-[1.6] mb-8 text-base">
                                    {card.description}
                                </p>
                            </div>

                            <div
                                className="inline-flex items-center gap-2 text-foreground font-semibold group/link relative z-10 text-base md:text-lg"
                            >
                                <span className="border-b-2 border-muted-foreground/20 pb-0.5 group-hover:border-primary transition-colors">
                                    {card.cta}
                                </span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
