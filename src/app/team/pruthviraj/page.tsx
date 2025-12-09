"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Award, BookOpen, Briefcase, Code, Database, Terminal, Download } from 'lucide-react';
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
            const dataUrl = await toPng(content, { quality: 0.95, backgroundColor: '#ffffff' });

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
        <div className="min-h-screen bg-white text-gray-900 pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-5xl relative z-10">

                {/* Content Wrapper for PDF Capture */}
                <div ref={contentRef} className="bg-white p-4 md:p-8 rounded-2xl relative overflow-hidden shadow-sm">

                    {/* Header / Hero Section */}
                    <div className="bg-gray-50 rounded-2xl p-8 mb-8 border border-gray-200 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/10 to-purple-600/10 blur-3xl"></div>
                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
                            <div className="relative w-48 h-48 shrink-0">
                                {/* Rotating Rings */}
                                <motion.div
                                    className="absolute inset-0 rounded-full border-2 border-dashed"
                                    animate={{
                                        rotate: 360,
                                        borderColor: ['#000000', '#ffffff', '#000000']
                                    }}
                                    transition={{
                                        rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                                        borderColor: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                />
                                <motion.div
                                    className="absolute -inset-2 rounded-full border border-dashed"
                                    animate={{
                                        rotate: -360,
                                        borderColor: ['#ffffff', '#000000', '#ffffff']
                                    }}
                                    transition={{
                                        rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                                        borderColor: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                />
                                <motion.div
                                    className="absolute -inset-4 rounded-full border"
                                    animate={{
                                        scale: [1, 1.05, 1],
                                        borderColor: ['#000000', '#ffffff', '#000000']
                                    }}
                                    transition={{
                                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                                        borderColor: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                />

                                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10">
                                    <Image
                                        src="/team/pruthviraj.jpg"
                                        alt="Pruthviraj B"
                                        width={192}
                                        height={192}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900 font-mono">
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
                                <p className="text-xl text-primary mb-4">Information Science Student & Full-Stack Developer</p>

                                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-600 text-sm mb-6">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        Chikkaballapur, Karnataka, India
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        +91 97406 34537
                                    </div>
                                    <a href="mailto:thepruthviraj1984bc@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                                        <Mail className="w-4 h-4" />
                                        thepruthviraj1984bc@gmail.com
                                    </a>
                                </div>

                                <div className="flex justify-center md:justify-start gap-4" data-html2canvas-ignore>
                                    <a
                                        href="https://linkedin.com/in/pruthvirajbc"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-2 rounded-full bg-[#0077b5]/10 text-[#0077b5] border border-[#0077b5]/30 hover:bg-[#0077b5]/20 transition-all flex items-center gap-2"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                        LinkedIn
                                    </a>
                                    <a
                                        href="https://github.com/pruthviraj-b"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-2 rounded-full bg-gray-100 text-gray-900 border border-gray-300 hover:bg-gray-200 transition-all flex items-center gap-2"
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
                            <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary">
                                    <BookOpen className="w-6 h-6" />
                                    <HackerText text="Professional Summary" />
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Information Science student with skills in backend and full-stack development. Experienced in Python and MySQL, with interest in cloud computing and scalable software systems. Currently upskilling in full-stack Python development (Flask/Django, REST APIs, SQL, HTML/CSS). Focused on building efficient, user-centric applications and contributing to real-world development projects.
                                </p>
                            </section>

                            {/* Projects */}
                            <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
                                    <Briefcase className="w-6 h-6" />
                                    <HackerText text="Projects" />
                                </h2>
                                <div className="space-y-6">
                                    <div className="group">
                                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">Online E‑commerce Platform</h3>
                                        <p className="text-sm text-gray-500 mb-2">Django, MySQL, Responsive UI</p>
                                        <p className="text-gray-700">Developed an online bookstore using Django and MySQL with responsive UI and backend APIs for browsing and purchases.</p>
                                    </div>
                                    <div className="h-px bg-gray-200"></div>
                                    <div className="group">
                                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">Student Performance Dashboard</h3>
                                        <p className="text-sm text-gray-500 mb-2">Flask, Chart.js</p>
                                        <p className="text-gray-700">Designed a data visualization dashboard to display grades and attendance trends.</p>
                                    </div>
                                    <div className="h-px bg-gray-200"></div>
                                    <div className="group">
                                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">AI Career Guided Navigator</h3>
                                        <p className="text-sm text-gray-500 mb-2">Prototype, Analytics</p>
                                        <p className="text-gray-700">Built a prototype recommending personalized career paths using user profiling and analytics.</p>
                                    </div>
                                </div>
                            </section>

                            {/* Education */}
                            <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
                                    <Award className="w-6 h-6" />
                                    <HackerText text="Education" />
                                </h2>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">B.E. in Information Science and Engineering</h3>
                                        <p className="text-primary">SJCIT, Chikkaballapur</p>
                                        <p className="text-sm text-gray-500">Expected 2026</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Diploma in Computer Science</h3>
                                        <p className="text-primary">Government Polytechnic, Chintamani</p>
                                        <p className="text-sm text-gray-500">2023 | CGPA: 8.5</p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8">
                            {/* Technical Skills */}
                            <section className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary">
                                    <Code className="w-5 h-5" />
                                    <HackerText text="Technical Skills" />
                                </h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                            <Terminal className="w-4 h-4" /> Programming
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {['Python', 'Django', 'Flask', 'REST APIs', 'HTML/CSS'].map(skill => (
                                                <span key={skill} className="px-3 py-1 rounded-full bg-white text-sm text-gray-700 border border-gray-200 shadow-sm">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                            <Database className="w-4 h-4" /> Databases
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {['MySQL', 'SQL'].map(skill => (
                                                <span key={skill} className="px-3 py-1 rounded-full bg-white text-sm text-gray-700 border border-gray-200 shadow-sm">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                            <Award className="w-4 h-4" /> Core Areas
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {['Backend Dev', 'Cloud Fundamentals', 'Software Engineering'].map(skill => (
                                                <span key={skill} className="px-3 py-1 rounded-full bg-white text-sm text-gray-700 border border-gray-200 shadow-sm">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Certifications */}
                            <section className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary">
                                    <Award className="w-5 h-5" />
                                    <HackerText text="Certifications" />
                                </h2>
                                <ul className="space-y-4">
                                    <li className="flex gap-3">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
                                        <div>
                                            <p className="text-gray-900 font-medium">Python Essentials 1 & 2</p>
                                            <p className="text-xs text-gray-500">Cisco Networking Academy</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
                                        <div>
                                            <p className="text-gray-900 font-medium">Introduction to Cybersecurity</p>
                                            <p className="text-xs text-gray-500">Cisco Networking Academy</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
                                        <div>
                                            <p className="text-gray-900 font-medium">AI & Cloud Fundamentals</p>
                                            <p className="text-xs text-gray-500">Workshop</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
                                        <div>
                                            <p className="text-gray-900 font-medium">Software Development Training</p>
                                            <p className="text-xs text-gray-500">BIZOITC</p>
                                        </div>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>

                {/* Download Button */}
                <div className="text-center mt-12">
                    <button
                        onClick={handleDownloadPDF}
                        className="px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto shadow-lg shadow-primary/25"
                    >
                        <Download className="w-5 h-5" />
                        Download Resume (PDF)
                    </button>
                </div>
            </div>
        </div>
    );
}
