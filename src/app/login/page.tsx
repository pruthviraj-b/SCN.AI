"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setFieldErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setFieldErrors({});

        // Validate before submitting
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid email or password');
            } else {
                router.push('/dashboard');
                router.refresh();
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-10 flex items-center justify-center px-4 bg-background relative">
            <div className="absolute top-4 right-4 z-50">
                <ThemeToggle />
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-card border border-border p-8 rounded-2xl shadow-lg"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-muted-foreground">Sign in to continue your journey</p>
                </div>

                {error && (
                    <div className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-lg flex items-center gap-2 mb-6">
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-sm">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-foreground/80 mb-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className={`w-full bg-muted/50 border ${fieldErrors.email ? 'border-destructive' : 'border-input'} rounded-lg py-3 pl-10 pr-4 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors text-foreground placeholder-muted-foreground/50`}
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                        {fieldErrors.email && <p className="text-destructive text-xs mt-1">{fieldErrors.email}</p>}
                    </div>

                    <div>
                        <div className="flex justify-between mb-1">
                            <label className="block text-sm text-foreground/80">Password</label>
                            <Link href="/forgot-password" prefetch={true} className="text-sm text-primary hover:text-primary/80 transition-colors">
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                className={`w-full bg-muted/50 border ${fieldErrors.password ? 'border-destructive' : 'border-input'} rounded-lg py-3 pl-10 pr-12 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors text-foreground placeholder-muted-foreground/50`}
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {fieldErrors.password && <p className="text-destructive text-xs mt-1">{fieldErrors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 shadow-md shadow-primary/20"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        ) : (
                            <>
                                Log In <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="text-primary hover:text-primary/80 font-medium transition-colors">
                        Create Account
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
