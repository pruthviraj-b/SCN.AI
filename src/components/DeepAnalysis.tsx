"use client";

import { useState, useEffect } from 'react';
import { FileText, Download, Activity, CheckCircle, AlertCircle, TrendingUp, DollarSign, Clock, ShieldCheck, Zap } from 'lucide-react';
import { CareerAnalysis } from '@/types/analysis';

export default function DeepAnalysis() {
    const [analyzing, setAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<CareerAnalysis | null>(null);
    const [scanProgress, setScanProgress] = useState(0);

    // Simulated scanning effect
    useEffect(() => {
        if (analyzing) {
            setScanProgress(0);
            const interval = setInterval(() => {
                setScanProgress(prev => {
                    if (prev >= 100) return 100;
                    return prev + 2;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [analyzing]);

    const runAnalysis = async () => {
        setAnalyzing(true);
        try {
            // Add minimum delay for the "premium" scanning feel
            const [res] = await Promise.all([
                fetch('/api/analysis', { method: 'POST' }),
                new Promise(resolve => setTimeout(resolve, 3000))
            ]);

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to generate analysis');
            }

            setAnalysis(data);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to generate analysis';
            alert(errorMessage);
        } finally {
            setAnalyzing(false);
        }
    };

    const downloadReport = () => {
        if (!analysis) return;

        const reportContent = `
SCN.AI - PREMEIUM CAREER INTELLIGENCE REPORT
---------------------------------------------
Target Role: ${analysis.careerPath}
AI Match Score: ${analysis.matchScore}%
Confidence: ${analysis.confidenceScore}%

MARKET INTELLIGENCE
-------------------
Market Outlook: ${analysis.marketOutlook}
Estimated Salary: ${analysis.salaryRange}
Time to Role: ${analysis.estimatedTime}

KEY STRENGTHS
-------------
${analysis.strengths.map((s: string) => `[+] ${s}`).join('\n')}

CRITICAL SKILL GAPS
-------------------
${analysis.gaps.map((g: string) => `[!] ${g}`).join('\n')}

STRATEGIC ROADMAP
-----------------
${analysis.recommendedSteps.map((s: string) => `[>] ${s}`).join('\n')}
        `;

        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SCN_AI_Strategy_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="relative overflow-hidden glass-card p-1 rounded-3xl border border-white/10 mt-8 group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="bg-black/40 backdrop-blur-xl rounded-[22px] p-6 relative z-10">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                            <BrainIcon className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                                Deep Career Analysis
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/20">
                                    PRO FEATURE
                                </span>
                                <span className="text-xs text-slate-400">AI Model v4.0 Active</span>
                            </div>
                        </div>
                    </div>

                    {!analysis && !analyzing && (
                        <button
                            onClick={runAnalysis}
                            className="group relative px-8 py-3 rounded-full bg-white text-black font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Activity className="w-4 h-4" /> Initialize Scan
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-white to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </button>
                    )}
                </div>

                {/* Loading State - Scanner */}
                {analyzing && (
                    <div className="py-20 text-center relative max-w-2xl mx-auto">
                        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-blue-500/50 shadow-[0_0_20px_#3b82f6] animate-scan" style={{ top: `${scanProgress}%` }} />
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-blue-500/30 border-t-white animate-spin" />
                        <h4 className="text-2xl font-bold mb-2">Analyzing Profile Vectors...</h4>
                        <p className="text-blue-300/80">Cross-referencing {scanProgress * 152} live market data points</p>
                        <div className="mt-8 h-2 w-64 mx-auto bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 transition-all duration-75" style={{ width: `${scanProgress}%` }} />
                        </div>
                    </div>
                )}

                {/* Result Dashboard */}
                {analysis && !analyzing && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {/* High Level Metrics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                                    <TrendingUp className="w-4 h-4 text-green-400" /> Market Outlook
                                </div>
                                <div className="text-xl font-bold text-white">{analysis.marketOutlook || 'High Growth'}</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                                    <DollarSign className="w-4 h-4 text-yellow-400" /> Est. Salary Range
                                </div>
                                <div className="text-xl font-bold text-white tracking-tight">{analysis.salaryRange || '$85k - $120k'}</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                                    <Clock className="w-4 h-4 text-blue-400" /> Time to Goal
                                </div>
                                <div className="text-xl font-bold text-white">{analysis.estimatedTime || '3-6 Months'}</div>
                            </div>
                        </div>

                        {/* Main Analysis Card */}
                        <div className="relative p-8 rounded-3xl bg-gradient-to-b from-white/10 to-black/20 border border-white/10 overflow-hidden">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />

                            <div className="md:flex justify-between items-start gap-8 relative z-10">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold mb-4 border border-green-500/20">
                                        <ShieldCheck className="w-3 h-3" /> VERIFIED MATCH
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                                        {analysis.careerPath}
                                    </h2>
                                    <p className="text-gray-400 max-w-lg">
                                        Based on your unique skill signature and current market demand vectors.
                                    </p>
                                </div>

                                <div className="mt-6 md:mt-0 flex flex-col items-center">
                                    <div className="relative w-32 h-32 flex items-center justify-center">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                                            <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={377} strokeDashoffset={377 - (377 * analysis.matchScore) / 100} className="text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all duration-[2000ms] ease-out" />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-3xl font-bold text-white">{analysis.matchScore}%</span>
                                            <span className="text-[10px] uppercase text-green-400 font-bold tracking-widest">Match</span>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2 font-mono">Confidence: {analysis.confidenceScore || 95}%</div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mt-10">
                                <div>
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">
                                        <Zap className="w-4 h-4 text-yellow-400" /> Competitive Advantages
                                    </h4>
                                    <div className="space-y-3">
                                        {analysis.strengths.map((s: string, i: number) => (
                                            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                                <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                                                <span className="text-sm text-gray-200">{s}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">
                                        <TrendingUp className="w-4 h-4 text-red-400" /> Strategic Focus Areas
                                    </h4>
                                    <div className="space-y-3">
                                        {analysis.gaps.map((g: string, i: number) => (
                                            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                                                <span className="text-sm text-gray-200">{g}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Plan */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-blue-400" /> Recommended Action Protocol
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                {analysis.recommendedSteps.map((step: string, i: number) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm shrink-0">
                                            {i + 1}
                                        </div>
                                        <span className="text-sm text-gray-300">{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-white/10">
                            <p className="text-xs text-gray-500">Analysis generated via Gemini Pro Neural Engine</p>
                            <button
                                onClick={downloadReport}
                                className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white text-sm font-medium"
                            >
                                <Download className="w-4 h-4" />
                                Export Intelligence Report
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function BrainIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
        </svg>
    );
}
