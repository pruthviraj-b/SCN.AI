"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Award, BookOpen, Briefcase, Code, Database, Terminal, Download, Sparkles } from 'lucide-react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';
import MatrixRain from '@/components/effects/MatrixRain';
import HackerText from '@/components/effects/HackerText';

export default function PruthvirajProfile() {
    const contentRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async () => {
        if (!contentRef.current) return;

        const content = contentRef.current;

        try {
            const dataUrl = await toPng(content, { quality: 0.95, backgroundColor: '#0f172a' }); // Dark background for capture

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [content.scrollWidth, content.scrollHeight]
            });

            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('Pruthviraj_B_Resume.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 max-w-5xl relative z-10">

                {/* Content Wrapper for PDF Capture */}
                <div ref={contentRef} className="glass-card p-4 md:p-8 rounded-3xl relative overflow-hidden border border-white/10 shadow-2xl">

                    {/* Header / Hero Section */}
                    <div className="relative rounded-2xl p-8 mb-8 overflow-hidden bg-white/5 border border-white/10">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/10 to-purple-600/10 opacity-50"></div>

                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
                            <div className="relative w-48 h-48 shrink-0 group">
                                {/* Rotating Rings */}
                                <motion.div
                                    className="absolute inset-0 rounded-full border-2 border-dashed border-primary/50"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.div
                                    className="absolute -inset-2 rounded-full border border-dashed border-purple-500/50"
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.div
                                    className="absolute -inset-4 rounded-full border border-white/10"
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                />

                                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-2xl relative z-10">
                                    <Image
                                        src="/team/pruthviraj.jpg"
                                        alt="Pruthviraj B"
                                        width={192}
                                        height={192}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-4xl md:text-5xl font-bold mb-2 font-mono bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        Pruthviraj B
                                    </motion.span>
                                    <motion.span
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                        className="inline-block w-3 h-8 bg-primary ml-2 align-middle"
                                    />
                                </h1>
                                <p className="text-xl text-primary mb-4 font-light tracking-wide">Information Science Student & Full-Stack Developer</p>

                                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-400 text-sm mb-6">
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                        <MapPin className="w-4 h-4 text-purple-400" />
                                        Chikkaballapur, Karnataka, India
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                        <Phone className="w-4 h-4 text-green-400" />
                                        +91 97406 34537
                                    </div>
                                    <a href="mailto:thepruthviraj1984bc@gmail.com" className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/50 transition-all">
                                        <Mail className="w-4 h-4 text-blue-400" />
                                        thepruthviraj1984bc@gmail.com
                                    </a>
                                </div>

                                <div className="flex justify-center md:justify-start gap-4" data-html2canvas-ignore>
                                    <a
                                        href="https://linkedin.com/in/pruthvirajbc"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-2 rounded-full bg-[#0077b5]/20 text-[#0077b5] border border-[#0077b5]/30 hover:bg-[#0077b5]/40 transition-all flex items-center gap-2 hover:scale-105"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                        LinkedIn
                                    </a>
                                    <a
                                        href="https://github.com/pruthviraj-b"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-2 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2 hover:scale-105"
                                    >
                                        <Github className="w-5 h-5" />
                                        GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="md:col-span-2 space-y-8">
                            {/* Summary */}
                            <section className="glass-card p-8 rounded-2xl border border-white/10 relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary relative">
                                    <div className="p-2 rounded-lg bg-primary/20">
                                        <BookOpen className="w-5 h-5" />
                                    </div>
                                    <HackerText text="Professional Summary" />
                                </h2>
                                <p className="text-gray-300 leading-relaxed relative">
                                    Information Science student with skills in backend and full-stack development. Experienced in Python and MySQL, with interest in cloud computing and scalable software systems. Currently upskilling in full-stack Python development (Flask/Django, REST APIs, SQL, HTML/CSS). Focused on building efficient, user-centric applications and contributing to real-world development projects.
                                </p>
                            </section>

                            {/* Projects */}
                            <section className="glass-card p-8 rounded-2xl border border-white/10 relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary relative">
                                    <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                                        <Briefcase className="w-5 h-5" />
                                    </div>
                                    <HackerText text="Projects" />
                                </h2>
                                <div className="space-y-6 relative">
                                    <div className="group/item hover:bg-white/5 p-4 rounded-xl transition-colors border border-transparent hover:border-white/5">
                                        <h3 className="text-xl font-semibold text-white group-hover/item:text-primary transition-colors flex items-center justify-between">
                                            Online E‑commerce Platform
                                            <ExternalLink className="w-4 h-4 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                        </h3>
                                        <p className="text-sm text-blue-400 mb-2 font-mono">Django • MySQL • Responsive UI</p>
                                        <p className="text-gray-400">Developed an online bookstore using Django and MySQL with responsive UI and backend APIs for browsing and purchases.</p>
                                    </div>

                                    <div className="group/item hover:bg-white/5 p-4 rounded-xl transition-colors border border-transparent hover:border-white/5">
                                        <h3 className="text-xl font-semibold text-white group-hover/item:text-primary transition-colors flex items-center justify-between">
                                            Student Performance Dashboard
                                            <ExternalLink className="w-4 h-4 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                        </h3>
                                        <p className="text-sm text-blue-400 mb-2 font-mono">Flask • Chart.js</p>
                                        <p className="text-gray-400">Designed a data visualization dashboard to display grades and attendance trends.</p>
                                    </div>

                                    <div className="group/item hover:bg-white/5 p-4 rounded-xl transition-colors border border-transparent hover:border-white/5">
                                        <h3 className="text-xl font-semibold text-white group-hover/item:text-primary transition-colors flex items-center justify-between">
                                            AI Career Guided Navigator
                                            <Sparkles className="w-4 h-4 text-yellow-400" />
                                        </h3>
                                        <p className="text-sm text-blue-400 mb-2 font-mono">Prototype • Analytics • AI</p>
                                        <p className="text-gray-400">Built a prototype recommending personalized career paths using user profiling and analytics.</p>
                                    </div>
                                </div>
                            </section>

                            {/* Education */}
                            <section className="glass-card p-8 rounded-2xl border border-white/10 relative">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
                                    <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400">
                                        <Award className="w-5 h-5" />
                                    </div>
                                    <HackerText text="Education" />
                                </h2>
                                <div className="space-y-6">
                                    <div className="relative pl-6 border-l-2 border-primary/30">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary" />
                                        <h3 className="text-lg font-semibold text-white">B.E. in Information Science and Engineering</h3>
                                        <p className="text-primary">SJCIT, Chikkaballapur</p>
                                        <p className="text-sm text-gray-500">Expected 2026</p>
                                    </div>
                                    <div className="relative pl-6 border-l-2 border-white/10">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-gray-600" />
                                        <h3 className="text-lg font-semibold text-white">Diploma in Computer Science</h3>
                                        <p className="text-primary">Government Polytechnic, Chintamani</p>
                                        <p className="text-sm text-gray-500">2023 | CGPA: 8.5</p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8">
                            {/* Technical Skills */}
                            <section className="glass-card p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition-colors">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary">
                                    <div className="p-2 rounded-lg bg-red-500/20 text-red-400">
                                        <Code className="w-5 h-5" />
                                    </div>
                                    <HackerText text="Technical Skills" />
                                </h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                            <Terminal className="w-4 h-4" /> Programming
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {['Python', 'Django', 'Flask', 'REST APIs', 'HTML/CSS'].map(skill => (
                                                <span key={skill} className="px-3 py-1 rounded-full bg-white/5 text-sm text-gray-300 border border-white/10 hover:border-primary/50 hover:bg-primary/10 hover:text-white transition-all cursor-default">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                            <Database className="w-4 h-4" /> Databases
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {['MySQL', 'SQL'].map(skill => (
                                                <span key={skill} className="px-3 py-1 rounded-full bg-white/5 text-sm text-gray-300 border border-white/10 hover:border-primary/50 hover:bg-primary/10 hover:text-white transition-all cursor-default">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                            <Briefcase className="w-4 h-4" /> Core Areas
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {['Backend Dev', 'Cloud Fundamentals', 'Software Engineering'].map(skill => (
                                                <span key={skill} className="px-3 py-1 rounded-full bg-white/5 text-sm text-gray-300 border border-white/10 hover:border-primary/50 hover:bg-primary/10 hover:text-white transition-all cursor-default">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Certifications */}
                            <section className="glass-card p-6 rounded-2xl border border-white/10">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary">
                                    <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                                        <Award className="w-5 h-5" />
                                    </div>
                                    <HackerText text="Certifications" />
                                </h2>
                                <ul className="space-y-4">
                                    {[
                                        { title: "Python Essentials 1 & 2", issuer: "Cisco Networking Academy" },
                                        { title: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy" },
                                        { title: "AI & Cloud Fundamentals", issuer: "Workshop" },
                                        { title: "Software Development Training", issuer: "BIZOITC" }
                                    ].map((cert, i) => (
                                        <li key={i} className="flex gap-3 items-start group">
                                            <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                            <div>
                                                <p className="text-white font-medium group-hover:text-primary transition-colors">{cert.title}</p>
                                                <p className="text-xs text-gray-500">{cert.issuer}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>

                {/* Download Button */}
                <div className="text-center mt-12 mb-20">
                    <button
                        onClick={handleDownloadPDF}
                        className="px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto shadow-lg shadow-primary/25 hover:scale-105 hover:shadow-primary/50 ring-4 ring-primary/10"
                    >
                        <Download className="w-5 h-5" />
                        Download Resume (PDF)
                    </button>
                </div>
            </div>
        </div>
    );
}
