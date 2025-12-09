"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, ChevronLeft } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { skills } from '@/data/skills';

type WizardData = {
    name: string;
    experienceLevel: string;
    skills: string[];
    goal: string;
    timeCommitment: string;
};

type Recommendation = {
    id: string;
    title: string;
    match: number;
    description: string;
    timeframe: string;
};

const INITIAL_DATA: WizardData = {
    name: '',
    experienceLevel: 'beginner',
    skills: [],
    goal: '',
    timeCommitment: '5-10'
};

const SKILLS_LIST = [
    "Python", "JavaScript", "React", "Node.js", "SQL",
    "Data Analysis", "Machine Learning", "Product Management",
    "UX Design", "Digital Marketing"
];

export default function Wizard() {
    const { data: session } = useSession();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [data, setData] = useState<WizardData>(INITIAL_DATA);
    const [errors, setErrors] = useState<Partial<Record<keyof WizardData, string>>>({});
    const [isGenerating, setIsGenerating] = useState(false);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [authData, setAuthData] = useState({ email: '', password: '', confirmPassword: '' });
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [signupErrors, setSignupErrors] = useState<{ [key: string]: string }>({});
    const [skillsInput, setSkillsInput] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiAnalysis, setAiAnalysis] = useState<any>(null);

    // Load data from localStorage on mount
    useState(() => {
        if (typeof window !== 'undefined') {
            const savedData = localStorage.getItem('wizardData');
            if (savedData) {
                try {
                    const parsed = JSON.parse(savedData);
                    setData(prev => ({ ...prev, ...parsed }));
                } catch (e) {
                    console.error('Failed to parse wizard data', e);
                }
            }

            const savedStep = localStorage.getItem('wizardStep');
            if (savedStep) {
                setStep(parseInt(savedStep));
            }
        }
    });

    // Save data to localStorage on change
    const updateData = (key: keyof WizardData, value: string | string[]) => {
        const newData = { ...data, [key]: value };
        setData(newData);
        if (typeof window !== 'undefined') {
            localStorage.setItem('wizardData', JSON.stringify(newData));
        }

        if (errors[key]) {
            setErrors(prev => ({ ...prev, [key]: undefined }));
        }
    };

    // Save step to localStorage
    const setStepWithStorage = (newStep: number | ((prev: number) => number)) => {
        setStep(prev => {
            const val = typeof newStep === 'function' ? newStep(prev) : newStep;
            if (typeof window !== 'undefined') {
                localStorage.setItem('wizardStep', val.toString());
            }
            return val;
        });
    };

    const validateStep = (currentStep: number): boolean => {
        const newErrors: Partial<Record<keyof WizardData, string>> = {};
        let isValid = true;

        if (currentStep === 1) {
            if (!data.name.trim()) {
                newErrors.name = 'Name is required';
                isValid = false;
            }
        } else if (currentStep === 2) {
            if (data.skills.length === 0) {
                newErrors.skills = 'Please select at least one skill';
                isValid = false;
            }
        } else if (currentStep === 3) {
            if (!data.goal.trim()) {
                newErrors.goal = 'Target role is required';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            if (step < 4) {
                setStepWithStorage(prev => prev + 1);
            } else if (step === 4) {
                setStepWithStorage(5);
            }
        }
    };

    const handleBack = () => {
        if (step > 1) setStepWithStorage(prev => prev - 1);
    };

    const performLocalAnalysis = (text: string) => {
        const skillKeywords = {
            'python': 'Python', 'javascript': 'JavaScript', 'java': 'Java', 'react': 'React',
            'node': 'Node.js', 'sql': 'SQL', 'data': 'Data Analysis', 'machine learning': 'Machine Learning',
            'ml': 'Machine Learning', 'ai': 'Machine Learning', 'design': 'UX Design',
            'marketing': 'Digital Marketing', 'product': 'Product Management', 'typescript': 'TypeScript',
            'css': 'CSS', 'html': 'HTML', 'git': 'Git', 'docker': 'Docker', 'aws': 'AWS',
            'cloud': 'Cloud Computing', 'api': 'API Development', 'database': 'Database Management',
            'frontend': 'Frontend Development', 'backend': 'Backend Development', 'fullstack': 'Full Stack Development',
            'agile': 'Agile', 'scrum': 'Scrum', 'leadership': 'Leadership', 'communication': 'Communication'
        };

        const lowerText = text.toLowerCase();
        const extractedSkills: string[] = [];

        Object.entries(skillKeywords).forEach(([keyword, skill]) => {
            if (lowerText.includes(keyword) && !extractedSkills.includes(skill)) {
                extractedSkills.push(skill);
            }
        });

        const suggestedSkills: string[] = [];
        if (extractedSkills.some(s => ['Python', 'JavaScript', 'Java'].includes(s))) {
            suggestedSkills.push('Git', 'API Development');
        }
        if (extractedSkills.includes('React')) {
            suggestedSkills.push('TypeScript', 'CSS');
        }
        if (extractedSkills.includes('Data Analysis')) {
            suggestedSkills.push('SQL', 'Python');
        }

        const strengthScore = Math.min(10, Math.max(3, extractedSkills.length + 2));

        return {
            extractedSkills,
            suggestedSkills: suggestedSkills.filter(s => !extractedSkills.includes(s)).slice(0, 5),
            strengthScore,
            recommendations: `Great start! You have ${extractedSkills.length} identifiable skills.`,
            categories: {
                technical: extractedSkills.filter(s => !['Leadership', 'Communication', 'Agile', 'Scrum'].includes(s)),
                soft: extractedSkills.filter(s => ['Leadership', 'Communication', 'Agile', 'Scrum'].includes(s)),
                domain: []
            }
        };
    };

    const handleAnalyzeSkills = async () => {
        if (!skillsInput.trim()) {
            setErrors({ skills: 'Please enter your skills first' });
            return;
        }

        setIsAnalyzing(true);
        setErrors({});

        try {
            const response = await fetch('/api/analyze-skills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ skillsText: skillsInput }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.details || data.error || 'Failed to analyze skills');
            }

            setAiAnalysis(data);

            if (data.extractedSkills) {
                const uniqueSkills = Array.from(new Set([...data.skills, ...data.extractedSkills]));
                updateData('skills', uniqueSkills);
            }
        } catch (error) {
            const localAnalysis = performLocalAnalysis(skillsInput);
            setAiAnalysis(localAnalysis);

            if (localAnalysis.extractedSkills && localAnalysis.extractedSkills.length > 0) {
                const uniqueSkills = Array.from(new Set([...data.skills, ...localAnalysis.extractedSkills]));
                updateData('skills', uniqueSkills);
            }

            setErrors({});
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleGenerate = async () => {
        if (!validateStep(step)) return;

        setIsGenerating(true);
        try {
            const response = await fetch('/api/recommendations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('Failed to fetch');

            const result = await response.json();
            setRecommendations(result.recommendations);
            setStepWithStorage(4);
        } catch (error) {
            // Error handled
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSavePlan = async () => {
        setIsSaving(true);
        try {
            const response = await fetch('/api/plans', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: `Career Plan - ${data.goal}`,
                    data: JSON.stringify(data)
                })
            });

            if (!response.ok) throw new Error('Failed to save plan');

            if (typeof window !== 'undefined') {
                localStorage.removeItem('wizardData');
                localStorage.removeItem('wizardStep');
            }
            router.push('/dashboard');
        } catch (error) {
            alert('Failed to save plan. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const validateSignup = () => {
        const newErrors: { [key: string]: string } = {};

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(authData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (authData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_\-])/.test(authData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
        } else if (authData.password === data.name || authData.password === authData.email) {
            newErrors.password = 'Password cannot be the same as username or email';
        }

        // Confirm Password validation
        if (authData.password !== authData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Terms validation
        if (!termsAccepted) {
            newErrors.terms = 'You must accept the Terms & Conditions';
        }

        setSignupErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async () => {
        if (!validateSignup()) return;

        setIsSigningUp(true);
        try {
            // Create account
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: authData.email,
                    password: authData.password,
                    name: data.name,
                    data: data
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Signup failed');
            }

            // Auto-login after signup using next-auth signIn
            const { signIn } = await import('next-auth/react');
            const result = await signIn('credentials', {
                email: authData.email,
                password: authData.password,
                redirect: false
            });

            if (result?.error) {
                throw new Error('Account created but login failed. Please login manually.');
            }

            setSignupSuccess(true);

            if (typeof window !== 'undefined') {
                localStorage.removeItem('wizardData');
                localStorage.removeItem('wizardStep');
            }

            // Redirect to dashboard after a short delay
            setTimeout(() => {
                router.push('/dashboard');
            }, 1500);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to create account. Please try again.';
            alert(errorMessage);
        } finally {
            setIsSigningUp(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={5}>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span className={step >= 1 ? 'text-primary font-medium' : ''}>Profile</span>
                    <span className={step >= 2 ? 'text-primary font-medium' : ''}>Skills</span>
                    <span className={step >= 3 ? 'text-primary font-medium' : ''}>Goals</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: "0%" }}
                        animate={{ width: `${((step - 1) / 4) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            <div className="glass-card p-8 rounded-2xl min-h-[400px] relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl font-bold">Let&apos;s get to know you</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm text-gray-400 mb-1">What&apos;s your name?</label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => updateData('name', e.target.value)}
                                        className={`w-full bg-black/20 border rounded-lg px-4 py-3 focus:outline-none transition-colors ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary/50'}`}
                                        placeholder="e.g. Alex"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Current Experience Level</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                                            <button
                                                key={level}
                                                onClick={() => updateData('experienceLevel', level.toLowerCase())}
                                                className={`p-3 rounded-lg border text-sm transition-colors ${data.experienceLevel === level.toLowerCase()
                                                    ? 'bg-primary/20 border-primary text-primary'
                                                    : 'bg-black/20 border-white/10 hover:bg-white/5'
                                                    }`}
                                            >
                                                {level}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl font-bold">What are your skills?</h2>

                            {/* AI-Powered Skills Input */}
                            <div className="space-y-3">
                                <label className="block text-sm text-gray-400">
                                    Describe your skills (AI will analyze and suggest)
                                </label>
                                <textarea
                                    value={skillsInput}
                                    onChange={(e) => setSkillsInput(e.target.value)}
                                    placeholder="e.g., I know Python, worked with data analysis, some SQL, good at problem solving..."
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none min-h-[100px] resize-none"
                                />
                                <button
                                    onClick={handleAnalyzeSkills}
                                    disabled={isAnalyzing || !skillsInput.trim()}
                                    className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Analyzing with AI...
                                        </>
                                    ) : (
                                        <>
                                            ✨ Analyze with AI
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* AI Analysis Results */}
                            {aiAnalysis && (
                                <div className="glass-card p-4 rounded-lg border border-primary/30 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-primary">AI Analysis Results</h3>
                                        <span className="text-sm px-3 py-1 rounded-full bg-primary/20 text-primary">
                                            Score: {aiAnalysis.strengthScore}/10
                                        </span>
                                    </div>

                                    {aiAnalysis.recommendations && (
                                        <p className="text-sm text-gray-300">{aiAnalysis.recommendations}</p>
                                    )}

                                    {aiAnalysis.suggestedSkills && aiAnalysis.suggestedSkills.length > 0 && (
                                        <div>
                                            <p className="text-xs text-gray-400 mb-2">Suggested skills to add:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {aiAnalysis.suggestedSkills.map((skill: string) => (
                                                    <button
                                                        key={skill}
                                                        onClick={() => {
                                                            if (!data.skills.includes(skill)) {
                                                                updateData('skills', [...data.skills, skill]);
                                                            }
                                                        }}
                                                        className={`px-3 py-1 rounded-full text-xs transition-colors ${data.skills.includes(skill)
                                                            ? 'bg-primary/20 text-primary border border-primary'
                                                            : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
                                                            }`}
                                                    >
                                                        {data.skills.includes(skill) ? '✓ ' : '+ '}{skill}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Quick Select Buttons */}
                            <div className="space-y-2">
                                <p className="text-sm text-gray-400">Or quick-select from common skills:</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {SKILLS_LIST.map((skill) => (
                                        <button
                                            key={skill}
                                            onClick={() => {
                                                const newSkills = data.skills.includes(skill)
                                                    ? data.skills.filter(s => s !== skill)
                                                    : [...data.skills, skill];
                                                updateData('skills', newSkills);
                                            }}
                                            className={`p-3 rounded-lg border text-sm text-left transition-colors flex items-center justify-between ${data.skills.includes(skill)
                                                ? 'bg-primary/20 border-primary text-primary'
                                                : 'bg-black/20 border-white/10 hover:bg-white/5'
                                                }`}
                                        >
                                            {skill}
                                            {data.skills.includes(skill) && <Check className="w-4 h-4" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Selected Skills Display */}
                            {data.skills.length > 0 && (
                                <div className="glass-card p-4 rounded-lg">
                                    <p className="text-sm text-gray-400 mb-2">Selected skills ({data.skills.length}):</p>
                                    <div className="flex flex-wrap gap-2">
                                        {data.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm flex items-center gap-2"
                                            >
                                                {skill}
                                                <button
                                                    onClick={() => updateData('skills', data.skills.filter(s => s !== skill))}
                                                    className="hover:text-red-400 transition-colors"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {errors.skills && (
                                <p className="text-red-500 text-sm">{errors.skills}</p>
                            )}
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl font-bold">What&apos;s your goal?</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="goal" className="block text-sm text-gray-400 mb-1">Target Role</label>
                                    <input
                                        id="goal"
                                        type="text"
                                        value={data.goal}
                                        onChange={(e) => updateData('goal', e.target.value)}
                                        className={`w-full bg-black/20 border rounded-lg px-4 py-3 focus:outline-none transition-colors ${errors.goal ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary/50'}`}
                                        placeholder="e.g. Full Stack Developer"
                                    />
                                    {errors.goal && (
                                        <p className="text-red-500 text-sm mt-1">{errors.goal}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="timeCommitment" className="block text-sm text-gray-400 mb-1">Weekly Time Commitment</label>
                                    <select
                                        id="timeCommitment"
                                        value={data.timeCommitment}
                                        onChange={(e) => updateData('timeCommitment', e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none appearance-none"
                                    >
                                        <option value="5-10">5-10 hours</option>
                                        <option value="10-20">10-20 hours</option>
                                        <option value="20+">20+ hours</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Check className="w-8 h-8 text-green-500" />
                                </div>
                                <h2 className="text-3xl font-bold mb-2">Plan Ready!</h2>
                                <p className="text-gray-400 mb-8">
                                    We&apos;ve generated a personalized roadmap for you based on your profile.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {step === 5 && (
                        <motion.div
                            key="step5"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            {signupSuccess ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Check className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h2 className="text-3xl font-bold mb-2">Account Created!</h2>
                                    <p className="text-gray-400 mb-8">
                                        Your profile and roadmap have been saved successfully.
                                        <br />
                                        <span className="text-primary animate-pulse">Redirecting to dashboard...</span>
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="text-center mb-8">
                                        <h2 className="text-2xl font-bold mb-2">Save Your Progress</h2>
                                        <p className="text-gray-400">
                                            Create an account to save your personalized roadmap and track your progress.
                                        </p>
                                    </div>

                                    <div className="space-y-4 max-w-sm mx-auto">
                                        <div>
                                            <label htmlFor="email" className="block text-sm text-gray-400 mb-1">Email</label>
                                            <input
                                                id="email"
                                                type="email"
                                                value={authData.email}
                                                onChange={(e) => setAuthData(prev => ({ ...prev, email: e.target.value }))}
                                                className={`w-full bg-black/20 border rounded-lg px-4 py-3 focus:outline-none ${signupErrors.email ? 'border-red-500' : 'border-white/10 focus:border-primary/50'}`}
                                                placeholder="you@example.com"
                                            />
                                            {signupErrors.email && <p className="text-red-500 text-xs mt-1">{signupErrors.email}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block text-sm text-gray-400 mb-1">Password</label>
                                            <input
                                                id="password"
                                                type="password"
                                                value={authData.password}
                                                onChange={(e) => setAuthData(prev => ({ ...prev, password: e.target.value }))}
                                                className={`w-full bg-black/20 border rounded-lg px-4 py-3 focus:outline-none ${signupErrors.password ? 'border-red-500' : 'border-white/10 focus:border-primary/50'}`}
                                                placeholder="••••••••"
                                            />
                                            {signupErrors.password && <p className="text-red-500 text-xs mt-1">{signupErrors.password}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="confirmPassword" className="block text-sm text-gray-400 mb-1">Confirm Password</label>
                                            <input
                                                id="confirmPassword"
                                                type="password"
                                                value={authData.confirmPassword}
                                                onChange={(e) => setAuthData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                                className={`w-full bg-black/20 border rounded-lg px-4 py-3 focus:outline-none ${signupErrors.confirmPassword ? 'border-red-500' : 'border-white/10 focus:border-primary/50'}`}
                                                placeholder="••••••••"
                                            />
                                            {signupErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{signupErrors.confirmPassword}</p>}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id="wizard-terms"
                                                checked={termsAccepted}
                                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                                className="rounded border-white/10 bg-black/20 text-primary focus:ring-primary"
                                            />
                                            <label htmlFor="wizard-terms" className="text-sm text-gray-400">
                                                I accept the <a href="/terms" target="_blank" className="text-primary hover:underline">Terms & Conditions</a>
                                            </label>
                                        </div>
                                        {signupErrors.terms && <p className="text-red-500 text-xs">{signupErrors.terms}</p>}
                                        <button
                                            onClick={handleSignup}
                                            disabled={!authData.email || !authData.password || isSigningUp}
                                            className="w-full py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                        >
                                            {isSigningUp ? 'Creating Account...' : 'Create Account'}
                                        </button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {step < 5 && !signupSuccess && (
                    <div className="flex justify-between mt-8 pt-8 border-t border-white/10">
                        <button
                            onClick={handleBack}
                            disabled={step === 1}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Back
                        </button>

                        {step === 3 ? (
                            <button
                                onClick={handleGenerate}
                                className="flex items-center gap-2 px-6 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                            >
                                {isGenerating ? (
                                    <span className="animate-pulse">Generating...</span>
                                ) : (
                                    <>
                                        Generate Plan
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        ) : step === 4 ? (
                            <button
                                onClick={() => session ? handleSavePlan() : setStepWithStorage(5)}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-6 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
                            >
                                {isSaving ? 'Saving...' : (session ? 'Save to Dashboard' : 'Save Profile')}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="flex items-center gap-2 px-6 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                            >
                                Next
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

