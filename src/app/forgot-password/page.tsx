"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, KeyRound, CheckCircle2, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Email, 2: OTP, 3: New Password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Step 1: Send OTP
    const handleRequestOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            setStep(2);
            setMessage({ type: 'success', text: 'OTP sent to your email.' });
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || 'Failed to send OTP' });
        } finally {
            setIsLoading(false);
        }
    };

    // Step 2 & 3: Verify & Reset is combined in one Final API call usually, 
    // but here let's stick to the flow: User enters OTP and New Password together.
    // Or we can verify OTP first. Let's do it all in final step for simplicity or standard flow.
    // Let's just create a UI that takes OTP + New Password in Step 2? 
    // Or strictly 3 steps. Let's do 3 steps for better UX.

    // Actually, usually you verify OTP first to confirm validity, then show password field.
    // But since our API `reset-password` takes both at once, let's make Step 2 take OTP,
    // and passing it to Step 3 which takes Password, then submit BOTH.

    const handleVerifyOTPLocal = (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 6) {
            setMessage({ type: 'error', text: 'OTP must be 6 digits' });
            return;
        }
        setStep(3);
        setMessage({ type: '', text: '' });
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword }),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            setMessage({ type: 'success', text: 'Password reset successfully! Redirecting...' });
            setTimeout(() => router.push('/login'), 2000);
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || 'Reset failed' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-10 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md glass-card p-8 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 shadow-xl"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                        {step === 1 && <Mail className="w-8 h-8" />}
                        {step === 2 && <KeyRound className="w-8 h-8" />}
                        {step === 3 && <Lock className="w-8 h-8" />}
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">
                        {step === 1 && "Forgot Password?"}
                        {step === 2 && "Enter OTP"}
                        {step === 3 && "Reset Password"}
                    </h1>
                    <p className="text-blue-200 text-sm">
                        {step === 1 && "Enter your email to receive a reset code."}
                        {step === 2 && `Code sent to ${email}`}
                        {step === 3 && "Create a new strong password."}
                    </p>
                </div>

                {message.text && (
                    <div className={`p-3 rounded-lg flex items-center gap-2 mb-6 text-sm ${message.type === 'error'
                        ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20'
                        : 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/20'
                        }`}>
                        {message.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                        <span>{message.text}</span>
                    </div>
                )}

                {/* STEP 1: REQUEST OTP */}
                {step === 1 && (
                    <form onSubmit={handleRequestOTP} className="space-y-4">
                        <div>
                            <label className="block text-sm text-blue-200 mb-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full input-field bg-white/5 text-white border border-white/10 placeholder-blue-200/30"
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary bg-primary text-white py-3 rounded-lg flex items-center justify-center gap-2"
                        >
                            {isLoading ? "Sending..." : <>Send OTP <ArrowRight className="w-4 h-4" /></>}
                        </button>
                    </form>
                )}

                {/* STEP 2: ENTER OTP */}
                {step === 2 && (
                    <form onSubmit={handleVerifyOTPLocal} className="space-y-4">
                        <div>
                            <label className="block text-sm text-blue-200 mb-1">6-Digit Code</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                className="w-full input-field text-center text-2xl tracking-[0.5em] font-mono bg-white/5 text-white border border-white/10 placeholder-blue-200/30"
                                placeholder="000000"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full btn-primary bg-primary text-white py-3 rounded-lg flex items-center justify-center gap-2"
                        >
                            Verify Code <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => { setStep(1); setMessage({ type: '', text: '' }); }}
                            className="w-full text-sm text-blue-300 hover:text-white mt-2"
                        >
                            Use a different email
                        </button>
                    </form>
                )}

                {/* STEP 3: RESET PASSWORD */}
                {step === 3 && (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <div>
                            <label className="block text-sm text-blue-200 mb-1">New Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                    className="w-full input-field bg-white/5 text-white border border-white/10 placeholder-blue-200/30"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary bg-primary text-white py-3 rounded-lg flex items-center justify-center gap-2"
                        >
                            {isLoading ? "Resetting..." : <>Reset Password <CheckCircle2 className="w-4 h-4" /></>}
                        </button>
                    </form>
                )}

                <div className="mt-8 text-center">
                    <Link href="/login" className="text-sm text-blue-300 hover:text-white flex items-center justify-center gap-2">
                        ← Back to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
