import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, Trash2, CheckCircle, XCircle } from "lucide-react";

export default async function UserManagementPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.email !== 'pruthviraj1984bc@gmail.com') {
        redirect("/dashboard");
    }

    // Refactored to Supabase
    const allUsers = await db.user.getAll(); // This is a Server Component, so await works fine
    // const allUsers = db.read().users;

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-blue-200/70 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>

                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">User Management</h1>
                    <p className="text-blue-200/60">View, edit, verify, and manage user accounts</p>
                </div>

                <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Plans</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Joined</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {allUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                                                    {user.name?.[0] || 'U'}
                                                </div>
                                                <span className="font-medium">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-blue-200/60">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                                                {user.plans.length} plans
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-blue-200/60">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm flex items-center gap-1 w-fit">
                                                <CheckCircle className="w-3 h-3" />
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button className="p-2 rounded-lg hover:bg-white/10 text-blue-200/60 hover:text-white transition-colors">
                                                    View
                                                </button>
                                                <button className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-6 flex justify-between items-center text-sm text-blue-200/60">
                    <p>Total Users: {allUsers.length}</p>
                    <p>Active Users: {allUsers.length}</p>
                </div>
            </div>
        </div>
    );
}
