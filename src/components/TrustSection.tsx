"use client";

import { Building2, GraduationCap, Globe2, Award, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrustSection() {
    const brands = [
        { icon: Building2, name: "TechCorps" },
        { icon: GraduationCap, name: "UniGlobal" },
        { icon: Globe2, name: "FutureWorks" },
        { icon: Award, name: "SkillCert" },
        { icon: Briefcase, name: "JobStack" },
    ];

    return (
        <section className="py-10 border-b border-border/40 bg-background">
            <div className="container mx-auto px-4">
                <p className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-wider">
                    Trusted by learners from
                </p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
                    {brands.map((Brand, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-2 group cursor-default grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                        >
                            <Brand.icon className="w-6 h-6 text-foreground" />
                            <span className="text-lg font-semibold text-foreground">
                                {Brand.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
