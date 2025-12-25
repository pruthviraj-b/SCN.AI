"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="bg-background border-t border-border pt-20 pb-10 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">

                    {/* Project Title */}
                    <div className="mb-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 tracking-wide uppercase"
                        >
                            Smart Career Navigator
                        </motion.h2>
                    </div>

                    {/* Divider 1 */}
                    <div className="h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-6" />

                    {/* Guidance Section */}
                    <div className="mb-8">
                        <p className="text-muted-foreground text-[10px] mb-2 tracking-wider uppercase">Under the Guidance of</p>
                        <h3 className="text-base md:text-lg font-bold text-foreground mb-1">MR. SATHEESH CHANDRA REDDY</h3>
                        <p className="text-muted-foreground text-[10px]">Associate Professor, Dept. of ISE</p>
                        <p className="text-muted-foreground text-[10px]">SJC Institute of Technology</p>
                    </div>

                    {/* Divider 2 */}
                    <div className="h-px w-full max-w-sm mx-auto bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-8" />

                    {/* Institute Section - Text Revert */}
                    <div className="mb-10 flex justify-center">
                        <div className="flex items-center gap-3 text-sm md:text-base font-semibold text-foreground/80 tracking-wide opacity-90 transition-opacity hover:opacity-100">
                            <span className="text-lg md:text-xl font-bold">SJC</span>
                            <span className="h-4 w-px bg-border"></span>
                            <span>INSTITUTE OF TECHNOLOGY</span>
                        </div>
                    </div>

                    {/* Made By Section */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-3 bg-background text-[10px] text-primary font-medium tracking-widest uppercase">
                                Made By 400&apos;s
                            </span>
                        </div>
                    </div>

                    {/* Team Members List (No IDs) */}
                    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wider">
                        <span>Pruthviraj B</span>
                        <span className="hidden md:inline text-border mx-2">|</span>
                        <span>Praveen V</span>
                        <span className="hidden md:inline text-border mx-2">|</span>
                        <span>Prajwal N R</span>
                        <span className="hidden md:inline text-border mx-2">|</span>
                        <span>Narendra V</span>
                    </div>

                </div>
            </div>
        </footer>
    );
}
