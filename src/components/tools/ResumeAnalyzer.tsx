"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, CheckCircle, AlertTriangle, XCircle, RefreshCw, Wand2, Briefcase } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

type AnalysisResult = {
    overallScore: number;
    summary: string;
    metrics: {
        impact: number;
        keywords: number;
        formatting: number;
        brevity: number;
    };
    keyStrengths: string[];
    criticalIssues: string[];
    missingKeywords: string[];
    suggestedRewrites: {
        original: string;
        improved: string;
        reason: string;
    }[];
};

export default function ResumeAnalyzer() {
    const [resumeText, setResumeText] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);

    const handleAnalyze = async () => {
        if (!resumeText.trim()) return;
        setIsAnalyzing(true);
        try {
            const res = await fetch('/api/resume-analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resumeText, jobDescription })
            });
            const data = await res.json();
            if (res.ok) {
                setResult(data);
            } else {
                alert('Analysis failed: ' + data.error);
            }
        } catch (e) {
            alert('Failed to connect to server');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-500';
        if (score >= 60) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                    AI Resume Architect
                </h1>
                <p className="text-blue-100/80 max-w-2xl mx-auto">
                    Transform your resume into a top-1% profile. Our AI analyzes your CV against millions of data points and specific job descriptions to give you an unfair advantage.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* LEFT COLUMN: INPUTS */}
                <div className="space-y-6">
                    {/* Resume Input - Glass Card */}
                    <div className="glass-card p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-400" /> Resume Content
                            </h3>
                            <span className="text-xs text-blue-300 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">Required</span>
                        </div>
                        <textarea
                            value={resumeText}
                            onChange={(e) => setResumeText(e.target.value)}
                            className="w-full h-64 bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors resize-none placeholder-blue-300/30"
                            placeholder="Paste your plain text resume here (Ctrl+V)..."
                        />
                        <div className="mt-3 flex justify-between items-center text-xs text-blue-300/60">
                            <span>Supported: Pure Text</span>
                            <span>{resumeText.length} chars</span>
                        </div>
                    </div>

                    {/* Job Description Input - Glass Card */}
                    <div className="glass-card p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-purple-400" /> Target Job (Optional)
                            </h3>
                            <span className="text-xs text-purple-300 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">For Context</span>
                        </div>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            className="w-full h-32 bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors resize-none placeholder-blue-300/30"
                            placeholder="Paste Job Description (JD) here for context-aware scoring..."
                        />
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || !resumeText}
                        className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg
                            ${isAnalyzing || !resumeText
                                ? 'bg-white/5 text-blue-200/30 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-blue-500/25 hover:scale-[1.02]'}`}
                    >
                        {isAnalyzing ? (
                            <>
                                <RefreshCw className="w-5 h-5 animate-spin" /> Scanning Resume Vectors...
                            </>
                        ) : (
                            <>
                                <Wand2 className="w-5 h-5" /> Analyze Resume
                            </>
                        )}
                    </button>
                </div>

                {/* RIGHT COLUMN: RESULTS */}
                <div className="relative min-h-[600px]">
                    {!result && !isAnalyzing && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-blue-200/40 border-2 border-dashed border-white/5 rounded-3xl bg-white/5">
                            <Upload className="w-16 h-16 mb-4 opacity-20" />
                            <p className="text-lg">Ready to Launch Analysis</p>
                            <p className="text-sm opacity-50">Paste your details to begin</p>
                        </div>
                    )}

                    {result && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            {/* Score Card */}
                            <div className="glass-card p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-black/20">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-3xl font-bold mb-2">ATS Score</h2>
                                        <div className="flex items-center gap-2 text-sm text-blue-200/70">
                                            <span className={`text-xl font-bold ${getScoreColor(result.overallScore)}`}>
                                                {result.overallScore}/100
                                            </span>
                                            <span>• {result.overallScore > 75 ? 'Excellent' : result.overallScore > 50 ? 'Needs Work' : 'Critical'}</span>
                                        </div>
                                    </div>
                                    <div className="h-16 w-16 md:h-24 md:w-24">
                                        {/* Simple circular progress using conic-gradient */}
                                        <div className="w-full h-full rounded-full bg-white/10 relative flex items-center justify-center"
                                            style={{ background: `conic-gradient(var(--color-primary) ${result.overallScore}%, transparent 0)` }}>
                                            <div className="w-[85%] h-[85%] rounded-full bg-black flex items-center justify-center">
                                                <span className="font-bold text-xl">{result.overallScore}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Radar Chart for Metrics */}
                                <div className="h-64 mt-4 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                                            { subject: 'Impact', A: result.metrics.impact, fullMark: 100 },
                                            { subject: 'Keywords', A: result.metrics.keywords, fullMark: 100 },
                                            { subject: 'Format', A: result.metrics.formatting, fullMark: 100 },
                                            { subject: 'Brevity', A: result.metrics.brevity, fullMark: 100 },
                                        ]}>
                                            <PolarGrid stroke="#ffffff20" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                            <Radar name="My Resume" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                                            <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333' }} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Analysis Details */}
                            <div className="glass-card p-6 rounded-2xl border border-white/10 bg-black/40">
                                <h3 className="font-semibold text-lg mb-4 text-purple-300">Detailed Insights</h3>
                                <div className="space-y-4">
                                    {result.missingKeywords.length > 0 && (
                                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                                            <div className="flex items-center gap-2 mb-2 text-red-400 font-bold text-sm uppercase tracking-wider">
                                                <AlertTriangle className="w-4 h-4" /> Missing Keywords
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {result.missingKeywords.map(k => (
                                                    <span key={k} className="px-2 py-1 rounded bg-red-500/20 text-red-300 text-xs">{k}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {result.criticalIssues.length > 0 && (
                                        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                                            <div className="flex items-center gap-2 mb-2 text-yellow-400 font-bold text-sm uppercase tracking-wider">
                                                <XCircle className="w-4 h-4" /> Critical Fixes
                                            </div>
                                            <ul className="list-disc list-inside text-sm text-blue-100 space-y-1">
                                                {result.criticalIssues.map((issue, i) => (
                                                    <li key={i}>{issue}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                                        <div className="flex items-center gap-2 mb-2 text-green-400 font-bold text-sm uppercase tracking-wider">
                                            <CheckCircle className="w-4 h-4" /> Top Strengths
                                        </div>
                                        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                                            {result.keyStrengths.map((str, i) => (
                                                <li key={i}>{str}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Smart Rewrites */}
                            {result.suggestedRewrites && result.suggestedRewrites.length > 0 && (
                                <div className="glass-card p-6 rounded-2xl border border-white/10 bg-black/40">
                                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-blue-300">
                                        <Wand2 className="w-4 h-4" /> AI Smart Rewrites
                                    </h3>
                                    <div className="space-y-4">
                                        {result.suggestedRewrites.map((rewrite, i) => (
                                            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                                                <div className="mb-2">
                                                    <span className="text-xs text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded mr-2">Original</span>
                                                    <span className="text-sm text-gray-400 line-through">{rewrite.original}</span>
                                                </div>
                                                <div className="mb-2">
                                                    <span className="text-xs text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded mr-2">Better</span>
                                                    <span className="text-sm text-white">{rewrite.improved}</span>
                                                </div>
                                                <p className="text-xs text-blue-400 mt-2">💡 {rewrite.reason}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
