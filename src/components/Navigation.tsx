"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { data: session, status } = useSession();

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/careers', label: 'Careers' },
        { href: '/resources', label: 'Resources' },
        { href: '/startup-ideas', label: 'Startups' },
        { href: '/onboarding', label: 'Get Started' },
    ];

    const isActive = (href: string) => pathname === href;
    const isLoggedIn = status === 'authenticated';

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        SCN.AI
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors ${isActive(link.href)
                                    ? 'text-primary'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {!isLoggedIn ? (
                            <>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium"
                                >
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium text-gray-400 hover:text-white"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/api/auth/signout"
                                    className="px-4 py-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-sm font-medium"
                                >
                                    Sign Out
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-white/10">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`text-sm font-medium transition-colors px-4 py-2 rounded-lg ${isActive(link.href)
                                        ? 'text-primary bg-primary/10'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-2 px-4 pt-4 border-t border-white/10">
                                {!isLoggedIn ? (
                                    <>
                                        <Link
                                            href="/login"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium text-center"
                                        >
                                            Log In
                                        </Link>
                                        <Link
                                            href="/signup"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium text-center"
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium text-gray-400 hover:text-white text-center"
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/api/auth/signout"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="px-4 py-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-sm font-medium text-center"
                                        >
                                            Sign Out
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
