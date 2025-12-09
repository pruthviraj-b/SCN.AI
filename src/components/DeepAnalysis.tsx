"use client";

import { useState } from 'react';
import { FileText, Download, Activity, CheckCircle, AlertCircle } from 'lucide-react';
import { CareerAnalysis } from '@/types/analysis';

export default function DeepAnalysis() {
    const [analyzing, setAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<CareerAnalysis | null>(null);

    const runAnalysis = async () => {
        setAnalyzing(true);
        try {
            const res = await fetch('/api/analysis', { method: 'POST' });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to generate analysis');
            }

            setAnalysis(data);
        } catch (error) {
            // Error handling - no console in production
            const errorMessage = error instanceof Error ? error.message : 'Failed to generate analysis';
            alert(errorMessage);
        } finally {
            setAnalyzing(false);
        }
    };

    const downloadReport = () => {
        if (!analysis) return;

        const reportContent = `
Smart Career Navigator - Deep Analysis Report
---------------------------------------------
Career Path: ${analysis.careerPath}
Match Score: ${analysis.matchScore}%

Strengths:
${analysis.strengths.map((s: string) => `- ${s}`).join('\n')}

Identified Gaps:
${analysis.gaps.map((g: string) => `- ${g}`).join('\n')}

Recommended Steps:
${analysis.recommendedSteps.map((s: string) => `- ${s}`).join('\n')}
        `;

        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'career-analysis-report.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="glass-card p-6 rounded-2xl border border-white/10 mt-8">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <Activity className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">Deep Career Analysis</h3>
                        <p className="text-sm text-gray-400">AI-powered insights for your career path</p>
                    </div>
                </div>
                {!analysis && (
                    <button
                        onClick={runAnalysis}
                        disabled={analyzing}
                        className="px-6 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {analyzing ? (
                            <>
                                <span className="animate-spin">⟳</span> Analyzing...
                            </>
                        ) : (
                            <>
                                <Activity className="w-4 h-4" /> Run Analysis
                            </>
                        )}
                    </button>
                )}
            </div>

            {analysis && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                            <h4 className="text-sm text-gray-400 mb-2">Recommended Path</h4>
                            <p className="text-2xl font-bold text-white">{analysis.careerPath}</p>
                            <div className="mt-4 flex items-center gap-2">
                                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-500 rounded-full transition-all duration-1000"
                                        style={{ width: `${analysis.matchScore}%` }}
                                    />
                                </div>
                                <span className="text-sm font-medium text-green-400">{analysis.matchScore}% Match</span>
                            </div>
                        </div>

                        {/* Fallback Mode Warning */}
                        {/* @ts-ignore - isFallback might not be in the type definition yet */}
                        {analysis.isFallback && (
                            <div className="md:col-span-2 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-yellow-500">Offline Fallback Mode</h4>
                                    <p className="text-sm text-yellow-200/80 mt-1">
                                        The AI service is currently unavailable, so you are seeing a generalized analysis based on your profile tags.
                                        Please check your internet connection or API keys.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                            <h4 className="text-sm text-gray-400 mb-3">Key Strengths</h4>
                            <ul className="space-y-2">
                                {analysis.strengths.map((strength: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                        <span>{strength}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                            <h4 className="text-sm text-gray-400 mb-3">Skill Gaps</h4>
                            <ul className="space-y-2">
                                {analysis.gaps.map((gap: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                        <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                                        <span>{gap}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                            <h4 className="text-sm text-gray-400 mb-3">Recommended Steps</h4>
                            <ul className="space-y-2">
                                {analysis.recommendedSteps.map((step: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                        <span>{step}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-white/10">
                        <button
                            onClick={downloadReport}
                            className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                        >
                            <Download className="w-4 h-4" />
                            Download Report
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
