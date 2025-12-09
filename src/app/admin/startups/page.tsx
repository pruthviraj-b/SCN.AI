import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Edit, Trash2, Lightbulb } from "lucide-react";

const startupIdeas = [
    { id: 1, title: "AI-Powered Resume Builder", category: "SaaS", difficulty: "Medium", market: "HR Tech" },
    { id: 2, title: "Eco-Friendly Delivery Service", category: "Logistics", difficulty: "High", market: "Green Tech" },
    { id: 3, title: "Online Tutoring Platform", category: "EdTech", difficulty: "Medium", market: "Education" },
    { id: 4, title: "Smart Home Automation", category: "IoT", difficulty: "High", market: "Smart Home" },
];

export default async function StartupsPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.email !== 'pruthviraj1984bc@gmail.com') {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Startup Ideas Management</h1>
                        <p className="text-gray-400">Manage entrepreneurial guidance and startup templates</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors">
                        <Plus className="w-5 h-5" />
                        Add Startup Idea
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {startupIdeas.map((idea) => (
                        <div key={idea.id} className="glass-card p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-colors">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                                    <Lightbulb className="w-6 h-6 text-yellow-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-2">{idea.title}</h3>
                                    <div className="flex flex-wrap gap-2 text-sm">
                                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
                                            {idea.category}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400">
                                            {idea.market}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full ${idea.difficulty === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                            {idea.difficulty}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 justify-end">
                                <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                    <Edit className="w-5 h-5" />
                                </button>
                                <button className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
