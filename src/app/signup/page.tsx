"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Check, AlertCircle, ArrowRight, Eye, EyeOff, X } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    // Calculate password strength
    useEffect(() => {
        if (!formData.password) {
            setPasswordStrength(0);
            return;
        }

        let strength = 0;
        if (formData.password.length >= 8) strength += 25;
        if (formData.password.length >= 12) strength += 15;
        if (/[a-z]/.test(formData.password)) strength += 15;
        if (/[A-Z]/.test(formData.password)) strength += 15;
        if (/[0-9]/.test(formData.password)) strength += 15;
        if (/[^a-zA-Z0-9]/.test(formData.password)) strength += 15;

        setPasswordStrength(strength);
    }, [formData.password]);

    // Real-time validation
    const validateField = (field: string, value: string) => {
        const newErrors = { ...errors };

        switch (field) {
            case 'username':
                if (value.length > 0 && value.length < 2) {
                    newErrors.username = "Username must be at least 2 characters";
                } else {
                    delete newErrors.username;
                }
                break;
            case 'email':
                if (value.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    newErrors.email = "Please enter a valid email address";
                } else {
                    delete newErrors.email;
                }
                break;
            case 'password':
                if (value.length > 0 && value.length < 8) {
                    newErrors.password = "Password must be at least 8 characters";
                } else if (value.length >= 8 && !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(value)) {
                    newErrors.password = "Password must contain uppercase, lowercase & number";
                } else {
                    delete newErrors.password;
                }
                break;
            case 'confirmPassword':
                if (value.length > 0 && formData.password !== value) {
                    newErrors.confirmPassword = "Passwords do not match";
                } else {
                    delete newErrors.confirmPassword;
                }
                break;
        }

        setErrors(newErrors);
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (formData.username.length < 2) newErrors.username = "Username must be at least 2 characters";

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(formData.password)) {
            newErrors.password = "Password must contain uppercase, lowercase & number";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFieldChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
        if (touched[field]) {
            validateField(field, value);
        }
    };

    const handleBlur = (field: string) => {
        setTouched({ ...touched, [field]: true });
        validateField(field, formData[field as keyof typeof formData]);
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength < 40) return 'bg-red-500';
        if (passwordStrength < 70) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength < 40) return 'Weak';
        if (passwordStrength < 70) return 'Medium';
        return 'Strong';
    };

    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage('');

        if (!validate()) return;

        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.username,
                    email: formData.email,
                    password: formData.password
                }),
            });

            let data;
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await res.json();
            } else {
                // Handle non-JSON response (e.g. 404 or 500 HTML)
                const text = await res.text();
                throw new Error(res.ok ? "Success but invalid response" : text || `Server error: ${res.status}`);
            }

            if (!res.ok) {
                throw new Error(data.error || "Signup failed");
            }

            setSuccessMessage("Account created successfully! Logging you in...");

            // Auto-login after successful signup
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                // If auto-login fails, redirect to login page manually
                setSuccessMessage("Account created! Redirecting to login...");
                setTimeout(() => router.push('/login'), 1500);
            } else {
                // Success - redirect to dashboard
                router.refresh(); // Ensure session is updated
                router.push('/dashboard');
            }
        } catch (error: any) {
            console.error("Signup error:", error);
            setErrors({ submit: error.message || "An unexpected error occurred. Please try again." });
            setSuccessMessage('');
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
                        Create Account
                    </h1>
                    <p className="text-muted-foreground">Join our community today</p>
                </div>

                {successMessage && (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-3 rounded-lg flex items-center gap-2 mb-6">
                        <Check className="w-5 h-5" />
                        <span className="text-sm">{successMessage}</span>
                    </div>
                )}

                {errors.submit && (
                    <div className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-lg flex items-center gap-2 mb-6">
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-sm">{errors.submit}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                        <label className="block text-sm text-muted-foreground mb-1">Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                value={formData.username}
                                onChange={e => handleFieldChange('username', e.target.value)}
                                onBlur={() => handleBlur('username')}
                                className={`w-full bg-muted/50 border ${errors.username && touched.username ? 'border-destructive' : 'border-input'} rounded-lg py-3 pl-10 pr-4 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors text-foreground`}
                                placeholder="johndoe"
                            />
                            {!errors.username && touched.username && formData.username && (
                                <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                            )}
                        </div>
                        {errors.username && touched.username && <p className="text-destructive text-xs mt-1 flex items-center gap-1"><X className="w-3 h-3" />{errors.username}</p>}
                    </div>

                    <div>
                        <label className="block text-sm text-muted-foreground mb-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={e => handleFieldChange('email', e.target.value)}
                                onBlur={() => handleBlur('email')}
                                className={`w-full bg-muted/50 border ${errors.email && touched.email ? 'border-destructive' : 'border-input'} rounded-lg py-3 pl-10 pr-4 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors text-foreground`}
                                placeholder="john@example.com"
                            />
                            {!errors.email && touched.email && formData.email && (
                                <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                            )}
                        </div>
                        {errors.email && touched.email && <p className="text-destructive text-xs mt-1 flex items-center gap-1"><X className="w-3 h-3" />{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm text-muted-foreground mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={e => handleFieldChange('password', e.target.value)}
                                onBlur={() => handleBlur('password')}
                                className={`w-full bg-muted/50 border ${errors.password && touched.password ? 'border-destructive' : 'border-input'} rounded-lg py-3 pl-10 pr-12 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors text-foreground`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {formData.password && (
                            <div className="mt-2">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs text-muted-foreground">Password Strength</span>
                                    <span className={`text-xs font-medium ${passwordStrength < 40 ? 'text-destructive' : passwordStrength < 70 ? 'text-yellow-500' : 'text-green-500'}`}>
                                        {getPasswordStrengthText()}
                                    </span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                        style={{ width: `${passwordStrength}%` }}
                                    />
                                </div>
                            </div>
                        )}
                        {errors.password && touched.password && <p className="text-destructive text-xs mt-1 flex items-center gap-1"><X className="w-3 h-3" />{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block text-sm text-muted-foreground mb-1">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={formData.confirmPassword}
                                onChange={e => handleFieldChange('confirmPassword', e.target.value)}
                                onBlur={() => handleBlur('confirmPassword')}
                                className={`w-full bg-muted/50 border ${errors.confirmPassword && touched.confirmPassword ? 'border-destructive' : 'border-input'} rounded-lg py-3 pl-10 pr-12 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors text-foreground`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                            {!errors.confirmPassword && touched.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword && (
                                <Check className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                            )}
                        </div>
                        {errors.confirmPassword && touched.confirmPassword && <p className="text-destructive text-xs mt-1 flex items-center gap-1"><X className="w-3 h-3" />{errors.confirmPassword}</p>}
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
                                Create Account <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                        Log In
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
