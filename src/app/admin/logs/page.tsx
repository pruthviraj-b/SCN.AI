import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Activity, AlertCircle, CheckCircle, Info } from "lucide-react";

const logs = [
    { id: 1, type: "info", action: "User Login", user: "admin@example.com", timestamp: "2024-11-27 08:30:15", details: "Successful login" },
    { id: 2, type: "success", action: "Career Path Created", user: "john@example.com", timestamp: "2024-11-27 08:25:42", details: "Created new career path" },
    { id: 3, type: "warning", action: "Failed Login Attempt", user: "unknown@example.com", timestamp: "2024-11-27 08:20:11", details: "Invalid credentials" },
    { id: 4, type: "error", action: "API Error", user: "system", timestamp: "2024-11-27 08:15:33", details: "Database connection timeout" },
    { id: 5, type: "info", action: "User Signup", user: "jane@example.com", timestamp: "2024-11-27 08:10:22", details: "New user registered" },
];

export default async function SystemLogsPage() {
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
                    <h1 className="text-4xl font-bold mb-2">System Logs</h1>
                    <p className="text-gray-400">Track admin activities, errors, and system events</p>
                </div>

                <div className="mb-6 flex gap-4">
                    <select className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 focus:border-primary/50 focus:outline-none">
                        <option>All Types</option>
                        <option>Info</option>
                        <option>Success</option>
                        <option>Warning</option>
                        <option>Error</option>
                    </select>
                    <input
                        type="date"
                        className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 focus:border-primary/50 focus:outline-none"
                    />
                </div>

                <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Timestamp</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            {log.type === 'info' && (
                                                <div className="flex items-center gap-2 text-blue-400">
                                                    <Info className="w-4 h-4" />
                                                    <span className="text-sm">Info</span>
                                                </div>
                                            )}
                                            {log.type === 'success' && (
                                                <div className="flex items-center gap-2 text-green-400">
                                                    <CheckCircle className="w-4 h-4" />
                                                    <span className="text-sm">Success</span>
                                                </div>
                                            )}
                                            {log.type === 'warning' && (
                                                <div className="flex items-center gap-2 text-yellow-400">
                                                    <AlertCircle className="w-4 h-4" />
                                                    <span className="text-sm">Warning</span>
                                                </div>
                                            )}
                                            {log.type === 'error' && (
                                                <div className="flex items-center gap-2 text-red-400">
                                                    <Activity className="w-4 h-4" />
                                                    <span className="text-sm">Error</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 font-medium">{log.action}</td>
                                        <td className="px-6 py-4 text-gray-400">{log.user}</td>
                                        <td className="px-6 py-4 text-gray-400 text-sm">{log.timestamp}</td>
                                        <td className="px-6 py-4 text-gray-400 text-sm">{log.details}</td>
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
