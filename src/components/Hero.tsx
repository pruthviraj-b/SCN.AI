"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {

  return (
    <section className="relative flex flex-col items-center justify-center pt-32 pb-24 px-4 bg-background overflow-hidden">

      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto text-center z-10">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[3.5rem] md:text-[5rem] font-bold mb-8 text-foreground tracking-tight leading-[1.1]"
        >
          Build your future with <br className="hidden md:block" /> <span className="text-primary">AI-powered</span> career precision.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Master the skills you need. Get personalized career roadmaps, real-time market insights, and job matching—all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/get-started"
            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/25 min-w-[200px]"
          >
            Get Started
          </Link>
          <Link
            href="/careers"
            className="px-8 py-4 rounded-full bg-background text-foreground border-2 border-border font-semibold text-lg hover:border-primary/50 hover:bg-muted/50 transition-all min-w-[200px]"
          >
            Explore Careers
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
