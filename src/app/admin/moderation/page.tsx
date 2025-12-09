import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, Flag } from "lucide-react";

const submissions = [
    { id: 1, user: "John Doe", type: "Interest", content: "Machine Learning and AI", status: "pending", date: "2024-11-25" },
    { id: 2, user: "Jane Smith", type: "Goal", content: "Become a Senior Software Engineer", status: "approved", date: "2024-11-24" },
    { id: 3, user: "Mike Johnson", type: "Interest", content: "Blockchain Development", status: "pending", date: "2024-11-23" },
    { id: 4, user: "Sarah Williams", type: "Goal", content: "Start my own tech company", status: "flagged", date: "2024-11-22" },
];

export default async function ModerationPage() {
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

                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Content Moderation</h1>
                    <p className="text-gray-400">Review user-submitted interests, goals, and feedback</p>
                </div>

                <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Content</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {submissions.map((submission) => (
                                    <tr key={submission.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 font-medium">{submission.user}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                                                {submission.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 max-w-md truncate">{submission.content}</td>
                                        <td className="px-6 py-4 text-gray-400">{new Date(submission.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            {submission.status === 'approved' && (
                                                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm flex items-center gap-1 w-fit">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Approved
                                                </span>
                                            )}
                                            {submission.status === 'pending' && (
                                                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm">
                                                    Pending
                                                </span>
                                            )}
                                            {submission.status === 'flagged' && (
                                                <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm flex items-center gap-1 w-fit">
                                                    <Flag className="w-3 h-3" />
                                                    Flagged
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button className="p-2 rounded-lg hover:bg-green-500/20 text-green-400 hover:text-green-300 transition-colors">
                                                    <CheckCircle className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors">
                                                    <XCircle className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
