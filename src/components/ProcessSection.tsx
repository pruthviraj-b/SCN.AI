"use client";

import { motion } from 'framer-motion';
import { UserCheck, Sparkles, Rocket } from 'lucide-react';

export default function ProcessSection() {
    const steps = [
        {
            icon: UserCheck,
            title: "Profile Assessment",
            description: "We analyze your skills, interests, and educational background to understand your unique professional profile."
        },
        {
            icon: Sparkles,
            title: "AI Strategy Generation",
            description: "Our advanced AI identifies gaps and generates a personalized learning roadmap tailored to your goals."
        },
        {
            icon: Rocket,
            title: "Launch career",
            description: "Follow your roadmap, track progress, and land your dream role with confidence."
        }
    ];

    return (
        <section className="py-24 bg-background border-t border-border/40">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-[2.25rem] md:text-[3rem] font-bold mb-6 text-foreground leading-[1.2]">
                        How It <span className="text-primary">Works</span>
                    </h2>
                    <p className="text-[1.125rem] md:text-[1.25rem] text-muted-foreground leading-[1.6]">
                        Your journey to career success in three simple steps.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[2.5rem] left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-background via-border to-background z-0" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="relative z-10 flex flex-col items-center text-center group"
                        >
                            <div className="w-20 h-20 rounded-2xl bg-card border border-border group-hover:border-primary/50 flex items-center justify-center mb-8 shadow-sm group-hover:shadow-lg transition-all duration-300">
                                <step.icon className="w-10 h-10 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-4">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
