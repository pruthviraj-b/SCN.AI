"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { ThemeToggle } from "./ThemeToggle";


export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { data: session, status } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/careers', label: 'Careers' },
        { href: '/resources', label: 'Resources' },
        { href: '/startups', label: 'Startups' },
        { href: '/ai-mentor', label: 'AI Mentor' },
        { href: '/get-started', label: 'Get Started' },
    ];

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };
    const isLoggedIn = status === 'authenticated';

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent border-transparent'
            }`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" prefetch={true} className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        SCN.AI
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                prefetch={true}
                                className={`text-sm font-medium transition-colors ${isActive(link.href)
                                    ? 'text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons & Theme Toggle */}
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        {!isLoggedIn ? (
                            <>
                                <Link
                                    href="/login"
                                    prefetch={true}
                                    className="px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors text-sm font-medium text-foreground"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/signup"
                                    prefetch={true}
                                    className="px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                                >
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/dashboard"
                                    prefetch={true}
                                    className="px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors text-sm font-medium text-muted-foreground hover:text-foreground"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="px-4 py-2 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm font-medium"
                                >
                                    Sign Out
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors text-foreground"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border bg-background absolute left-0 right-0 top-16 shadow-xl">
                        <div className="flex flex-col gap-4 px-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    prefetch={true}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`text-sm font-medium transition-colors px-4 py-2 rounded-lg ${isActive(link.href)
                                        ? 'text-primary bg-primary/10'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-2 pt-4 border-t border-border">
                                <div className="px-4 py-2 flex items-center justify-between">
                                    <span className="text-sm font-medium text-foreground">Theme</span>
                                    <ThemeToggle />
                                </div>
                                {!isLoggedIn ? (
                                    <>
                                        <Link
                                            href="/login"
                                            prefetch={true}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors text-sm font-medium text-center text-foreground"
                                        >
                                            Log In
                                        </Link>
                                        <Link
                                            href="/signup"
                                            prefetch={true}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium text-center"
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/dashboard"
                                            prefetch={true}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors text-sm font-medium text-muted-foreground hover:text-foreground text-center"
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setMobileMenuOpen(false);
                                                signOut({ callbackUrl: '/' });
                                            }}
                                            className="px-4 py-2 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm font-medium text-center w-full"
                                        >
                                            Sign Out
                                        </button>
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
