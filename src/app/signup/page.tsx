
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import Footer from '@/components/Footer';

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateSignup = () => {
        const newErrors: { [key: string]: string } = {};

        // Username validation
        if (!name.trim()) {
            newErrors.name = 'Username is required';
        } else if (name.length < 2 || name.length > 20) {
            newErrors.name = 'Username must be between 2 and 20 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(name)) {
            newErrors.name = 'Username can only contain letters, numbers, and underscores';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        } else if (password === name || password === email) {
            newErrors.password = 'Password cannot be the same as username or email';
        }

        // Confirm Password validation
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Terms validation
        if (!termsAccepted) {
            newErrors.terms = 'You must accept the Terms & Conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateSignup()) {
            return;
        }

        setLoading(true);
        setErrors({}); // Clear previous errors

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Redirect to login page after successful signup
                window.location.href = '/login';
            } else {
                setErrors({ submit: data.error || 'Signup failed' });
            }
        } catch (error) {
            setErrors({ submit: 'An error occurred. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 container mx-auto px-4">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
            </Link>

            <div className="max-w-md mx-auto glass-card p-8 rounded-2xl">
                <h1 className="text-3xl font-bold mb-2 text-center">Create Account</h1>
                <p className="text-gray-400 text-center mb-8">Start your career journey today</p>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Username</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full bg-black/20 border rounded-lg px-4 py-3 focus:outline-none ${errors.name ? 'border-red-500' : 'border-white/10 focus:border-primary/50'}`}
                            placeholder="username_123"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full bg-black/20 border rounded-lg px-4 py-3 focus:outline-none ${errors.email ? 'border-red-500' : 'border-white/10 focus:border-primary/50'}`}
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full bg-black/20 border rounded-lg px-4 py-3 focus:outline-none ${errors.password ? 'border-red-500' : 'border-white/10 focus:border-primary/50'}`}
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full bg-black/20 border rounded-lg px-4 py-3 focus:outline-none ${errors.confirmPassword ? 'border-red-500' : 'border-white/10 focus:border-primary/50'}`}
                            placeholder="••••••••"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            className="rounded border-white/10 bg-black/20 text-primary focus:ring-primary"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-400">
                            I accept the <Link href="/terms" className="text-primary hover:underline">Terms & Conditions</Link>
                        </label>
                    </div>
                    {errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}
                    {errors.submit && <p className="text-red-500 text-sm text-center mt-2">{errors.submit}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-background text-gray-400">Or continue with</span>
                    </div>
                </div>

                {/* Google OAuth Button */}
                <button
                    onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                    className="w-full py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center gap-3 text-white"
                >
                    <FcGoogle className="w-5 h-5" />
                    Continue with Google
                </button>

                <p className="text-center text-gray-400 mt-6">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
            <Footer />
        </div>
    );
}
