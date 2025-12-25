"use client";

import Link from 'next/link';

export default function CallToAction() {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto bg-muted/50 rounded-[2.5rem] p-12 md:p-20 text-center border border-border relative overflow-hidden">
                    {/* Decorative background blur */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-lg bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

                    <div className="relative z-10">
                        <h2 className="text-[2.25rem] md:text-[3rem] font-bold mb-6 text-foreground tracking-tight leading-[1.2]">
                            Ready to accelerate<br className="hidden md:block" /> your career?
                        </h2>
                        <p className="text-[1.125rem] md:text-[1.25rem] text-muted-foreground mb-10 max-w-2xl mx-auto leading-[1.6]">
                            Join thousands of learners building their future today. Get your personalized roadmap now.
                        </p>
                        <Link
                            href="/get-started"
                            className="inline-block px-10 py-5 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 transition-all"
                        >
                            Create Your Free Profile
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
