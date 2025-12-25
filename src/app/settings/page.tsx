
"use client";

import Navigation from '@/components/Navigation';
import { Trash2, AlertTriangle, Save, UserX } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm("CRITICAL WARNING: This action is irreversible. All your career plans, skills data, and account information will be permanently erased. Are you sure?");

        if (!confirmed) return;

        setIsDeleting(true);
        try {
            // Simulate API call for demo (In real app: await fetch('/api/user/delete', { method: 'DELETE' }))
            await new Promise(r => setTimeout(r, 1500));
            await signOut({ callbackUrl: '/' });
        } catch (error) {
            alert("Failed to delete account");
        } finally {
            setIsDeleting(false);
        }
    };

    if (!session) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p>Please log in to manage settings.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Navigation />

            <main className="container mx-auto max-w-2xl px-4 py-24">
                <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

                {/* Profile Section */}
                <div className="glass-card p-6 rounded-2xl border border-white/10 bg-white/5 mb-8">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <Save className="w-5 h-5 text-green-400" />
                        Profile Data
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-blue-200/60 mb-1">Full Name</label>
                            <input type="text" value={session.user?.name || ''} disabled className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-blue-100 cursor-not-allowed" />
                        </div>
                        <div>
                            <label className="block text-sm text-blue-200/60 mb-1">Email Address</label>
                            <input type="text" value={session.user?.email || ''} disabled className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-blue-100 cursor-not-allowed" />
                        </div>
                        <p className="text-xs text-blue-200/50 mt-2">To update basic details, please contact support or re-run the Career Wizard.</p>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="glass-card p-6 rounded-2xl border border-red-500/30 bg-red-900/5">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-red-500">
                        <AlertTriangle className="w-5 h-5" />
                        Danger Zone
                    </h2>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-red-500/10 pt-4">
                        <div>
                            <h3 className="font-medium text-white">Delete Account</h3>
                            <p className="text-sm text-blue-200/60">Permanently remove your Personal Profile and all generated plans.</p>
                        </div>
                        <button
                            onClick={handleDeleteAccount}
                            disabled={isDeleting}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all text-sm font-semibold disabled:opacity-50"
                        >
                            {isDeleting ? 'Erasing...' : <><Trash2 className="w-4 h-4" /> Delete Account</>}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
