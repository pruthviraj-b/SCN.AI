import { User, Bell, Shield, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Settings</h1>
                <p className="text-muted-foreground">Manage your account preferences and settings.</p>
            </div>

            <div className="space-y-6">
                {/* Profile Section */}
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <User className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">Profile Settings</h2>
                            <p className="text-sm text-muted-foreground">Update your personal information</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Full Name</label>
                                <input type="text" className="w-full p-2 rounded-md border bg-background" placeholder="Your Name" disabled />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <input type="email" className="w-full p-2 rounded-md border bg-background" placeholder="email@example.com" disabled />
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-yellow-500/10 rounded-full">
                            <Bell className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">Notifications</h2>
                            <p className="text-sm text-muted-foreground">Configure how you receive alerts</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                                <p className="font-medium">Email Notifications</p>
                                <p className="text-sm text-muted-foreground">Receive updates about your career plan</p>
                            </div>
                            <div className="h-6 w-11 bg-primary rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-red-500/10 rounded-full">
                            <Shield className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">Security</h2>
                            <p className="text-sm text-muted-foreground">Manage your password and security settings</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <button className="text-primary hover:underline text-sm">Change Password</button>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Link href="/api/auth/signout" className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </Link>
                </div>
            </div>
        </div>
    );
}
