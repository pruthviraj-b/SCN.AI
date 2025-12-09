import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";

export default async function NotificationsPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.email !== 'pruthviraj1984bc@gmail.com') {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>

                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Notifications & Alerts</h1>
                    <p className="text-gray-400">Send announcements or system updates to users</p>
                </div>

                <div className="glass-card p-8 rounded-2xl border border-white/10">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Notification Title</label>
                            <input
                                type="text"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none"
                                placeholder="Enter notification title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Message</label>
                            <textarea
                                rows={6}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none resize-none"
                                placeholder="Enter your message here..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Target Audience</label>
                            <select className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none">
                                <option>All Users</option>
                                <option>Active Users Only</option>
                                <option>New Users (Last 30 days)</option>
                                <option>Users with Plans</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Priority</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="priority" value="low" className="text-primary" />
                                    <span>Low</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="priority" value="medium" className="text-primary" defaultChecked />
                                    <span>Medium</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="priority" value="high" className="text-primary" />
                                    <span>High</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                        >
                            <Send className="w-5 h-5" />
                            Send Notification
                        </button>
                    </form>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Recent Notifications</h2>
                    <div className="space-y-4">
                        <div className="glass-card p-4 rounded-xl border border-white/10">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold">System Maintenance Notice</h3>
                                <span className="text-xs text-gray-400">2 days ago</span>
                            </div>
                            <p className="text-sm text-gray-400">Scheduled maintenance on Dec 1st from 2-4 AM EST</p>
                            <div className="mt-2 text-xs text-green-400">Sent to: All Users (156)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
