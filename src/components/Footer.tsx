"use client";

import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black/40 border-t border-white/10 backdrop-blur-xl mt-20">
            <div className="container mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
                    {/* About Section */}
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
                            Smart Career Navigator
                        </h3>
                        <p className="text-gray-400 text-sm mb-6 max-w-md leading-relaxed">
                            Empowering professionals to navigate their career journey with AI-powered insights,
                            personalized roadmaps, and comprehensive learning resources. Your success is our mission.
                        </p>
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-white mb-2">ISE DEPARTMENT SJCIT</h4>
                            <a href="https://sjcit.ac.in/register/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-primary transition-colors">
                                SJC Institute of Technology
                            </a>
                        </div>
                        <div className="flex gap-4">
                            <a href="https://github.com/pruthviraj-b" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="https://linkedin.com/in/pruthvirajbc" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="https://instagram.com/pruthviraj1984bc" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                                <span className="sr-only">Instagram</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Team Section */}
                    <div>
                        <h4 className="font-semibold mb-4 text-primary">Project Team</h4>
                        <div className="space-y-4 text-sm">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Team Leader</p>
                                <Link href="/team/pruthviraj" className="text-white font-medium hover:text-primary transition-colors">
                                    Pruthviraj B
                                </Link>
                                <p className="text-xs text-gray-400">1SJ23IS404</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Team Members</p>
                                <ul className="space-y-2">
                                    <li>
                                        <p className="text-white">Narendra V</p>
                                        <p className="text-xs text-gray-400">1SJ23IS401</p>
                                    </li>
                                    <li>
                                        <p className="text-white">Prajwal N R</p>
                                        <p className="text-xs text-gray-400">1SJ23IS402</p>
                                    </li>
                                    <li>
                                        <p className="text-white">Praveen V</p>
                                        <p className="text-xs text-gray-400">1SJ23IS403</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Contact Section (New) */}
                    <div>
                        <h4 className="font-semibold mb-4 text-primary">Contact Us</h4>
                        <div className="space-y-3 text-sm">
                            <a href="https://wa.me/919740634537" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors">
                                <span className="font-medium">WhatsApp</span>
                            </a>
                            <a href="https://instagram.com/pruthviraj1984bc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-pink-400 transition-colors">
                                <span className="font-medium">Instagram DM</span>
                            </a>
                            <a href="mailto:pruthviraj1984bc@gmail.com" className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors">
                                <span className="font-medium">Email Support</span>
                            </a>
                        </div>
                    </div>

                    {/* Guidance Section */}
                    <div>
                        <h4 className="font-semibold mb-4 text-primary">Under the Guidance of</h4>
                        <div className="text-sm">
                            <a href="https://ise.sjcit.ac.in/satheesh-chandra-reddy/" target="_blank" rel="noopener noreferrer" className="text-white font-medium text-lg mb-1 hover:text-primary transition-colors block">
                                Mr. Satheesh Chandra Reddy
                            </a>
                            <p className="text-gray-400">Associate Professor</p>
                            <p className="text-gray-400">Dept. of ISE</p>
                            <a href="https://sjcit.ac.in/register/" target="_blank" rel="noopener noreferrer" className="text-gray-400 mt-1 hover:text-primary transition-colors block">
                                SJC Institute of Technology
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-400">
                            © {currentYear} Smart Career Navigator. All rights reserved.
                        </p>
                        <p className="text-sm text-gray-400 flex items-center gap-1">
                            Made BY 400&apos;S <Heart className="w-4 h-4 text-red-500 fill-current" /> IN A DESIGN FOR your career success
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
