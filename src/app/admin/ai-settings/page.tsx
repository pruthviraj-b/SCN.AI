import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Settings, Save } from "lucide-react";

export default async function AISettingsPage() {
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
                    <h1 className="text-4xl font-bold mb-2">AI Engine Settings</h1>
                    <p className="text-gray-400">Monitor model scoring, update parameters and prompts</p>
                </div>

                <div className="space-y-6">
                    <div className="glass-card p-6 rounded-xl border border-white/10">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Settings className="w-5 h-5" />
                            Model Configuration
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">AI Model</label>
                                <select className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none">
                                    <option>GPT-4</option>
                                    <option>GPT-3.5 Turbo</option>
                                    <option>Claude 3</option>
                                    <option>Gemini Pro</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Temperature (Creativity)</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    defaultValue="0.7"
                                    className="w-full"
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <span>Precise (0)</span>
                                    <span>Balanced (0.7)</span>
                                    <span>Creative (1)</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Max Tokens</label>
                                <input
                                    type="number"
                                    defaultValue="2000"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-xl border border-white/10">
                        <h2 className="text-xl font-bold mb-4">System Prompts</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Career Recommendation Prompt</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none resize-none"
                                    defaultValue="You are a career advisor helping users find their ideal career path based on their skills, interests, and goals..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Chat Assistant Prompt</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none resize-none"
                                    defaultValue="You are a helpful career guidance assistant. Provide actionable advice and support..."
                                />
                            </div>
                        </div>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors">
                        <Save className="w-5 h-5" />
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
}
