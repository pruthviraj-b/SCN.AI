
import { Activity, Users, Briefcase, Brain, Lightbulb, AlertTriangle, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold mb-2">System Overview</h1>
                    <p className="text-gray-400">Real-time platform monitoring and health status.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    System Operational
                </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    title="Total Users"
                    value="1,248"
                    trend="+12%"
                    icon={Users}
                    color="blue"
                />
                <MetricCard
                    title="Active Plans"
                    value="856"
                    trend="+8%"
                    icon={Briefcase}
                    color="purple"
                />
                <MetricCard
                    title="Skills Indexed"
                    value="14,032"
                    trend="+240"
                    icon={Brain}
                    color="orange"
                />
                <MetricCard
                    title="Startups Generated"
                    value="324"
                    trend="+15%"
                    icon={Lightbulb}
                    color="yellow"
                />
            </div>

            {/* Recent Activity & System Logs */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Activity Chart Area (Mock) */}
                <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-white/10 bg-white/5">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-gray-400" />
                        Recommendation Engine Load
                    </h3>
                    <div className="h-64 flex items-end gap-2 justify-between px-2">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 65].map((h, i) => (
                            <div key={i} className="w-full bg-white/10 hover:bg-white/20 rounded-t-sm transition-all relative group">
                                <div style={{ height: `${h}%` }} className={`w-full rounded-t-sm ${h > 75 ? 'bg-red-500/50' : 'bg-blue-500/50'}`}></div>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                                    {h}% Load
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-gray-500">
                        <span>00:00</span>
                        <span>12:00</span>
                        <span>24:00</span>
                    </div>
                </div>

                {/* Critical Alerts / Logs */}
                <div className="glass-card p-6 rounded-2xl border border-white/10 bg-white/5">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-green-400" />
                        Security & Audit
                    </h3>
                    <div className="space-y-4">
                        {[
                            { msg: 'New Admin Login detected (IP: 192.168.x.x)', time: '2m ago', type: 'warning' },
                            { msg: 'Skill Database re-indexed successfully', time: '1h ago', type: 'success' },
                            { msg: 'API Rate limit approaching (Gemini)', time: '3h ago', type: 'error' },
                            { msg: 'User #1024 requested Profile deletion', time: '5h ago', type: 'info' },
                            { msg: 'Backup completed', time: '1d ago', type: 'success' },
                        ].map((log, i) => (
                            <div key={i} className="flex gap-3 items-start p-3 rounded-lg bg-black/40 border border-white/5">
                                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 
                              ${log.type === 'error' ? 'bg-red-500' :
                                        log.type === 'warning' ? 'bg-yellow-500' :
                                            log.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}
                                />
                                <div>
                                    <p className="text-xs text-gray-300 leading-snug">{log.msg}</p>
                                    <p className="text-[10px] text-gray-600 mt-1">{log.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ title, value, trend, icon: Icon, color }: any) {
    const colorClasses: any = {
        blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
        purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
        orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
        yellow: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    };

    return (
        <div className="glass-card p-6 rounded-2xl border border-white/10 bg-white/5 relative overflow-hidden group hover:border-white/20 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl border ${colorClasses[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                    <ArrowUpRight className="w-3 h-3" />
                    {trend}
                </div>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
            <p className="text-3xl font-bold tracking-tight">{value}</p>

            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
        </div>
    );
}
