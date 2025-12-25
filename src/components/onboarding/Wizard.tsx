"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, ChevronLeft, User, Sparkles, Brain, Briefcase as BriefcaseIcon, Code, BookOpen, Target, Clock, AlertCircle, Users, Crown, TrendingUp, MapPin, DollarSign } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import DeepAnalysis from '@/components/DeepAnalysis';

// --- Types ---

type WizardData = {
    // Step 1: Profile
    fullName: string;
    email: string;
    educationLevel: string;
    fieldOfStudy: string;
    currentStatus: string;
    experienceLevel: string;

    // Step 2: Skills
    skills: string[];
    interests: string[];
    startingFresh: boolean;

    // Step 3: Goals
    primaryObjectives: string[];
    preferredDomains: string[];
    learningStyle: string;
    timeCommitment: string;

    // Step 3.5: Professional Details (NEW)
    yearsExperience: number;
    currentRole: string;
    targetIndustries: string[];
    salaryExpectation: { min: number; max: number; currency: string };
    geographicPreferences: string[];
    remotePreference: 'remote' | 'hybrid' | 'onsite' | 'flexible' | '';
    willingToRelocate: boolean;

    // Step 3.7: Career Timeline (NEW)
    careerTimeline: '6months' | '1year' | '2years' | '5years' | '';
    riskTolerance: 'low' | 'medium' | 'high' | '';
    workLifeBalancePriority: number;

    // Step 4: Personality (NEW)
    workStyle: 'independent' | 'collaborative' | 'leadership' | '';
    problemSolvingApproach: string;
    learningPace: 'fast' | 'moderate' | 'thorough' | '';
    leadershipAspirations: boolean;
};

const INITIAL_DATA: WizardData = {
    fullName: '',
    email: '',
    educationLevel: '',
    fieldOfStudy: '',
    currentStatus: '',
    experienceLevel: '',
    skills: [],
    interests: [],
    primaryObjectives: [],
    preferredDomains: [],
    learningStyle: '',
    timeCommitment: '',
    startingFresh: false,
    // New fields
    yearsExperience: 0,
    currentRole: '',
    targetIndustries: [],
    salaryExpectation: { min: 0, max: 0, currency: 'USD' },
    geographicPreferences: [],
    remotePreference: '',
    willingToRelocate: false,
    careerTimeline: '',
    riskTolerance: '',
    workLifeBalancePriority: 5,
    workStyle: '',
    problemSolvingApproach: '',
    learningPace: '',
    leadershipAspirations: false
};

// --- Constants & Options ---

const EDUCATION_LEVELS = [
    "High School", "Diploma", "Undergraduate", "Postgraduate", "Self-Taught / Bootcamp", "Other"
];

const FIELDS_OF_STUDY = [
    "Computer Science", "Engineering", "Business Administration", "Arts & Humanities",
    "Medicine & Health", "Social Sciences", "Natural Sciences", "Law", "Education", "Other"
];

const CURRENT_STATUSES = [
    "Student", "Fresher", "Working Professional", "Career Switcher", "Aspiring Entrepreneur"
];

const EXPERIENCE_LEVELS = [
    { value: 'beginner', label: 'Beginner', description: 'Starting fresh. Focus on foundations.' },
    { value: 'intermediate', label: 'Intermediate', description: 'Some experience. Deepen your knowledge.' },
    { value: 'advanced', label: 'Advanced', description: 'Expert level. Focus on leadership & mastery.' }
];

const SKILL_CATEGORIES = {
    "Programming": ["Python", "Java", "JavaScript", "React", "Node.js", "SQL", "C++", "Go"],
    "AI & Data": ["Data Analysis", "Machine Learning", "Deep Learning", "Statistics", "NLP", "Computer Vision"],
    "Product & Design": ["Product Management", "UX Design", "UI Design", "Figma", "User Research"],
    "Business": ["Digital Marketing", "SEO", "Business Strategy", "Sales", "Finance"],
    "Soft Skills": ["Problem Solving", "Communication", "Leadership", "Critical Thinking", "Agile"]
};

const CAREER_OBJECTIVES = [
    "High-paying job", "Career switch", "Skill mastery", "Startup / Entrepreneurship", "Freelancing", "Higher studies / Research"
];

const CAREER_DOMAINS = [
    "Software Development", "Data Science & AI", "Cyber Security", "Product Management",
    "Business & Management", "Design & Creative", "Marketing & Growth", "Startup & Innovation"
];

const LEARNING_STYLES = [
    "Structured roadmap", "Hands-on projects", "Video-based learning", "Mentorship-driven", "Self-paced exploration"
];

const TIME_COMMITMENTS = [
    "Less than 5 hours", "5–10 hours", "10–20 hours", "Full-time learning"
];

const INTERESTS_LIST = [
    "Coding", "Problem Solving", "Building Things", "Logic & Puzzles",
    "Math & Statistics", "Research", "Analyzing Data",
    "Design & Art", "Psychology", "Creativity", "User Empathy",
    "Leadership", "Business Strategy", "Innovation", "Working with People",
    "Writing", "Social Media", "Economics", "Stock Market",
    "Security", "Investigation", "Mechanics", "Physics"
];

// NEW CONSTANTS FOR ENHANCED PROFILING

const INDUSTRIES = [
    "Technology & Software",
    "Finance & Banking",
    "Healthcare & Biotech",
    "E-commerce & Retail",
    "Education & EdTech",
    "Media & Entertainment",
    "Consulting",
    "Manufacturing",
    "Telecommunications",
    "Government & Public Sector"
];

const GEOGRAPHIC_REGIONS = [
    "North America",
    "Europe",
    "Asia-Pacific",
    "Middle East",
    "Latin America",
    "Africa",
    "Remote (Global)"
];

const WORK_STYLES = [
    { value: 'independent', label: 'Independent Worker', description: 'I work best alone', icon: User },
    { value: 'collaborative', label: 'Team Player', description: 'I thrive in teams', icon: Users },
    { value: 'leadership', label: 'Team Leader', description: 'I lead and mentor', icon: Crown }
];

const PROBLEM_SOLVING_APPROACHES = [
    'Analytical & Data-Driven',
    'Creative & Innovative',
    'Systematic & Process-Oriented',
    'Experimental & Iterative',
    'Collaborative & Discussion-Based'
];

const LEARNING_PACES = [
    { value: 'fast', label: 'Fast Learner', description: 'I grasp concepts quickly' },
    { value: 'moderate', label: 'Steady Pace', description: 'I learn at a comfortable pace' },
    { value: 'thorough', label: 'Deep Learner', description: 'I take time to master deeply' }
];

// --- Component ---

export default function Wizard() {
    const { data: session } = useSession();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [data, setData] = useState<WizardData>(INITIAL_DATA);
    const [errors, setErrors] = useState<Partial<Record<keyof WizardData, string>>>({});
    const [skillsInput, setSkillsInput] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiAnalysisResult, setAiAnalysisResult] = useState<{ extracted: string[], score: number } | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false); // For final confirmation
    const [deepAnalysisData, setDeepAnalysisData] = useState<any>(null); // For Step 5 display
    const [savedPlanId, setSavedPlanId] = useState<string | null>(null);

    // Pre-fill Name/Email if logged in
    useState(() => {
        if (session?.user) {
            setData(prev => ({
                ...prev,
                fullName: session.user?.name || '',
                email: session.user?.email || ''
            }));
        }
    });

    const updateData = (key: keyof WizardData, value: any) => {
        setData(prev => ({ ...prev, [key]: value }));
        // Clear error on change
        if (errors[key]) {
            setErrors(prev => ({ ...prev, [key]: undefined }));
        }
    };

    const toggleSelection = (key: keyof WizardData, value: string) => {
        const currentArr = (data[key] as string[]) || [];
        const newArr = currentArr.includes(value)
            ? currentArr.filter(item => item !== value)
            : [...currentArr, value];
        updateData(key, newArr);
    };

    // --- Validation ---

    const validateStep = (currentStep: number): boolean => {
        const newErrors: Partial<Record<keyof WizardData, string>> = {};
        let isValid = true;

        if (currentStep === 1) {
            if (!data.fullName.trim() || data.fullName.length < 2) newErrors.fullName = 'Full Name must be at least 2 characters';

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!session) {
                if (!data.email.trim()) newErrors.email = 'Email is required';
                else if (!emailRegex.test(data.email)) newErrors.email = 'Please enter a valid email address';
            }

            if (!data.educationLevel) newErrors.educationLevel = 'Education level is required';

            if (!data.fieldOfStudy.trim() || data.fieldOfStudy.length < 2) newErrors.fieldOfStudy = 'Field of study is required (min 2 chars)';

            if (!data.currentStatus) newErrors.currentStatus = 'Current status is required';
            if (!data.experienceLevel) newErrors.experienceLevel = 'Experience level is required';
        }
        else if (currentStep === 2) {
            // Updated Validation: If startingFresh is true, skip skill validation
            if (!data.startingFresh) {
                if (data.skills.length === 0) {
                    newErrors.skills = 'Please add at least one skill or select "Starting Fresh"';
                    isValid = false;
                }
            } else {
                if (data.interests.length === 0) {
                    newErrors.interests = 'Please select at least one interest to help us guide you';
                    isValid = false;
                }
            }
            // Always require interests? Yes, seems fair for both.
            if (isValid && data.interests.length === 0) {
                newErrors.interests = 'Please select at least one interest';
                isValid = false;
            }
        }
        else if (currentStep === 3) {
            if (data.primaryObjectives.length === 0) newErrors.primaryObjectives = 'Select at least one objective';
            if (data.preferredDomains.length === 0) newErrors.preferredDomains = 'Select at least one career domain';
            if (!data.learningStyle) newErrors.learningStyle = 'Learning style is required';
            if (!data.timeCommitment) newErrors.timeCommitment = 'Time commitment is required';
        }
        else if (currentStep === 4) {
            // Professional Details - Optional but validate if provided
            if (data.targetIndustries.length === 0) {
                newErrors.targetIndustries = 'Select at least one target industry';
                isValid = false;
            }
            if (!data.remotePreference) {
                newErrors.remotePreference = 'Remote work preference is required';
                isValid = false;
            }
        }
        else if (currentStep === 5) {
            // Career Timeline
            if (!data.careerTimeline) {
                newErrors.careerTimeline = 'Career timeline is required';
                isValid = false;
            }
            if (!data.riskTolerance) {
                newErrors.riskTolerance = 'Risk tolerance is required';
                isValid = false;
            }
        }
        else if (currentStep === 6) {
            // Personality
            if (!data.workStyle) {
                newErrors.workStyle = 'Work style is required';
                isValid = false;
            }
            if (!data.problemSolvingApproach) {
                newErrors.problemSolvingApproach = 'Problem-solving approach is required';
                isValid = false;
            }
            if (!data.learningPace) {
                newErrors.learningPace = 'Learning pace is required';
                isValid = false;
            }
        }
        else if (currentStep === 7) {
            // Review step
            if (!termsAccepted) {
                isValid = false;
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            isValid = false;
        }

        return isValid;
    };

    // --- Actions ---

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    // Enhanced AI Analysis Mock with Inference
    const handleAnalyzeSkills = async () => {
        if (!skillsInput.trim() || skillsInput.length < 5) {
            alert("Please provide more detail for accurate skill analysis (min 5 characters).");
            return;
        }
        setIsAnalyzing(true);

        // Simulate API delay - REMOVED for performance
        // await new Promise(resolve => setTimeout(resolve, 1500));

        // 1. Basic Extraction
        const lowerInput = skillsInput.toLowerCase();
        const keywords = Object.values(SKILL_CATEGORIES).flat().map(s => s.toLowerCase());
        const extracted = keywords.filter(k => lowerInput.includes(k));

        // 2. Inference Logic (Advanced Level simulation)
        const inferred: string[] = [];
        if (lowerInput.includes('react') || lowerInput.includes('javascript')) inferred.push('Frontend Development', 'Web Development');
        if (lowerInput.includes('python') || lowerInput.includes('data')) inferred.push('Data Science', 'Problem Solving');
        if (lowerInput.includes('node') || lowerInput.includes('sql')) inferred.push('Backend Development', 'Database Management');
        if (lowerInput.includes('design') || lowerInput.includes('figma')) inferred.push('User Experience', 'Prototyping');

        // Combine and dedup
        const allFound = Array.from(new Set([...extracted, ...inferred]));

        // Map back to proper casing
        const properCasedExtracted = allFound.map(e => {
            const match = Object.values(SKILL_CATEGORIES).flat().find(s => s.toLowerCase() === e);
            // Capitalize inferred if not in list
            if (!match) return e.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            return match;
        });

        // Add to main state
        const newSkills = Array.from(new Set([...data.skills, ...properCasedExtracted]));

        setData(prev => ({ ...prev, skills: newSkills }));
        setAiAnalysisResult({
            extracted: properCasedExtracted,
            score: Math.min(10, properCasedExtracted.length * 2 + 4) // Boost score for "Advanced" feel
        });
        setIsAnalyzing(false);
    };

    const handleGeneratePlan = async () => {
        if (!termsAccepted) {
            alert("Please confirm your details to proceed.");
            return;
        }

        setIsGenerating(true);

        try {
            // 1. Fetch Recommendations First
            const response = await fetch('/api/recommendations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.fullName,
                    educationLevel: data.educationLevel,
                    fieldOfStudy: data.fieldOfStudy,
                    experienceLevel: data.experienceLevel,
                    skills: data.skills,
                    interests: data.interests,
                    goal: data.preferredDomains[0], // Broad domain hint
                    timeCommitment: data.timeCommitment,
                    startingFresh: data.startingFresh // Passing the flag
                })
            });

            const recData = response.ok ? await response.json() : { recommendations: [] };

            // INTELLIGENT CHAINING: Use the top recommended specific role as the goal for Deep Analysis
            // This ensures the analysis is "100% accurate" to the specific path, not just the broad domain.
            const topRole = recData.recommendations?.[0]?.title || data.preferredDomains[0] || "General Career";

            // 2. Fetch Deep Analysis for the SPECIFIC Top Role
            const analysisPayload = {
                ...data,
                goal: topRole // NOW SPECIFIC!
            };

            const analysisResponse = await fetch('/api/analysis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userProfile: analysisPayload })
            });

            // 3. Auto-Save to Database (New Request)
            if (session?.user?.email) {
                const saveResponse = await fetch('/api/save-plan', { // We will create this or use existing /api/plans
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        profile: analysisPayload,
                        recommendations: recData,
                        analysis: analysisResponse.ok ? await analysisResponse.clone().json() : null
                    })
                });

                if (saveResponse.ok) {
                    const saveData = await saveResponse.json();
                    if (saveData.planId) {
                        setSavedPlanId(saveData.planId);
                    }
                }
            }

            if (analysisResponse.ok) {
                const analysisResult = await analysisResponse.json();

                // Inject the recommendations from the previous call into the analysis result
                if (recData && recData.recommendations) {
                    analysisResult.alternativePaths = recData.recommendations;
                }

                setDeepAnalysisData(analysisResult);
            }

            // Move to Final "Plan Ready" view
            setStep(5);
        } catch (error) {
            console.error("Generation failed", error);
            alert("Failed to generate plan. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    // --- Render Helpers ---

    const renderProgressBar = () => (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-3 px-2 text-xs font-medium text-blue-200 uppercase tracking-wider">
                <span className={step >= 1 ? "text-primary transition-colors" : ""}>Profile</span>
                <span className={step >= 2 ? "text-primary transition-colors" : ""}>Skills</span>
                <span className={step >= 3 ? "text-primary transition-colors" : ""}>Goals</span>
                <span className={step >= 4 ? "text-primary transition-colors" : ""}>Career</span>
                <span className={step >= 5 ? "text-primary transition-colors" : ""}>Timeline</span>
                <span className={step >= 6 ? "text-primary transition-colors" : ""}>Personality</span>
                <span className={step >= 7 ? "text-primary transition-colors" : ""}>Review</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(step / 7) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>
        </div>
    );

    // --- Steps ---

    if (step === 5) {
        // Final Success View
        return (
            <div className="max-w-3xl mx-auto glass-card p-8 rounded-2xl animate-in fade-in duration-700">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-8 h-8 text-green-400" />
                    </div>
                    <h2 className="text-3xl font-bold mb-3">Plan Generated!</h2>
                    <p className="text-blue-100/80 max-w-lg mx-auto">
                        Your personalized career roadmap has been generated using AI-driven analysis based on your profile, skills, and goals.
                    </p>
                </div>

                {deepAnalysisData && (
                    <div className="space-y-8">
                        <DeepAnalysis initialData={deepAnalysisData} />
                    </div>
                )}

                <div className="mt-10 flex justify-center gap-4">
                    <button onClick={() => router.push('/dashboard')} className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-all text-sm">
                        View Dashboard
                    </button>
                    <button
                        onClick={() => savedPlanId ? router.push(`/dashboard/plans/${savedPlanId}`) : router.push('/dashboard')}
                        className="px-6 py-2.5 rounded-full bg-primary text-white font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all text-sm flex items-center gap-2"
                    >
                        Start Learning Path <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto min-h-[500px] flex flex-col">
            {/* Header */}
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold mb-2">Build Your Career Profile</h1>
                <p className="text-sm text-blue-100/80">Personalized career and learning roadmap using AI.</p>
            </div>

            {renderProgressBar()}

            <div className="glass-card p-6 md:p-8 rounded-2xl flex-1 relative overflow-visible shadow-xl border border-white/5 bg-black/40 backdrop-blur-xl">
                <AnimatePresence mode="wait">

                    {/* STEP 1: PROFILE */}
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-400" /> Basic Profile
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">Full Name</label>
                                    <input
                                        type="text"
                                        value={data.fullName}
                                        onChange={e => updateData('fullName', e.target.value)}
                                        className={`input-field ${errors.fullName ? 'border-red-500' : ''}`}
                                        placeholder="e.g. Alex Johnson"
                                    />
                                    {errors.fullName && <p className="text-error">{errors.fullName}</p>}
                                </div>
                                <div>
                                    <label className="label">Email Address {session && <span className="text-xs text-blue-300">(Logged In)</span>}</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => updateData('email', e.target.value)}
                                        disabled={!!session}
                                        className={`input-field ${errors.email ? 'border-red-500' : ''} disabled:opacity-50`}
                                        placeholder="alex@example.com"
                                    />
                                    {errors.email && <p className="text-error">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">Highest Education</label>
                                    <select
                                        value={data.educationLevel}
                                        onChange={e => updateData('educationLevel', e.target.value)}
                                        className={`input-field appearance-none bg-black/20 ${errors.educationLevel ? 'border-red-500' : ''}`}
                                    >
                                        <option value="" className="bg-gray-900 text-gray-400">Select Level</option>
                                        {EDUCATION_LEVELS.map(l => <option key={l} value={l} className="bg-gray-900">{l}</option>)}
                                    </select>
                                    {errors.educationLevel && <p className="text-error">{errors.educationLevel}</p>}
                                </div>
                                <div>
                                    <label className="label">Field of Study</label>
                                    <select
                                        value={data.fieldOfStudy}
                                        onChange={e => updateData('fieldOfStudy', e.target.value)}
                                        className={`input-field appearance-none bg-black/20 ${errors.fieldOfStudy ? 'border-red-500' : ''}`}
                                    >
                                        <option value="" className="bg-gray-900 text-gray-400">Select Field</option>
                                        {FIELDS_OF_STUDY.map(f => <option key={f} value={f} className="bg-gray-900">{f}</option>)}
                                    </select>
                                    {errors.fieldOfStudy && <p className="text-error">{errors.fieldOfStudy}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="label">Current Status</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {CURRENT_STATUSES.map(status => (
                                        <button
                                            key={status}
                                            onClick={() => updateData('currentStatus', status)}
                                            className={`p-2.5 rounded-lg border text-xs font-medium transition-all ${data.currentStatus === status ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                                {errors.currentStatus && <p className="text-error mt-2">{errors.currentStatus}</p>}
                            </div>

                            <div>
                                <label className="label">Experience Level</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {EXPERIENCE_LEVELS.map(level => (
                                        <button
                                            key={level.value}
                                            onClick={() => updateData('experienceLevel', level.value)}
                                            className={`p-3 rounded-lg border text-left transition-all group ${data.experienceLevel === level.value ? 'bg-primary/20 border-primary shadow-glow' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                        >
                                            <h3 className={`font-semibold text-sm mb-0.5 ${data.experienceLevel === level.value ? 'text-primary' : 'text-gray-200'}`}>{level.label}</h3>
                                            <p className="text-[10px] text-blue-200/70">{level.description}</p>
                                        </button>
                                    ))}
                                </div>
                                {errors.experienceLevel && <p className="text-error mt-2">{errors.experienceLevel}</p>}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: SKILLS */}
                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Brain className="w-5 h-5 text-purple-400" /> Skills Analysis
                            </h2>

                            {/* Starting Fresh Toggle */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold text-white">Starting Fresh?</h3>
                                    <p className="text-xs text-blue-200/60">Select this if you have no prior professional experience.</p>
                                </div>
                                <button
                                    onClick={() => {
                                        const newVal = !data.startingFresh;
                                        updateData('startingFresh', newVal);
                                        if (newVal) updateData('skills', []); // Clear skills if fresh
                                    }}
                                    className={`relative w-11 h-6 rounded-full transition-colors ${data.startingFresh ? 'bg-green-500' : 'bg-white/10'}`}
                                >
                                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${data.startingFresh ? 'translate-x-5' : 'translate-x-0'}`} />
                                </button>
                            </div>

                            {/* Mode A: AI Text Analysis (Hidden if Fresh Start) */}
                            {!data.startingFresh && (
                                <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                                    <label className="label flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-yellow-400" />
                                        Describe your skills (AI Enhanced)
                                    </label>
                                    <textarea
                                        value={skillsInput}
                                        onChange={e => setSkillsInput(e.target.value)}
                                        placeholder="e.g. I use Python for data analysis, have experience with React..."
                                        className="input-field min-h-[80px] mb-3 text-sm"
                                    />
                                    <div className="flex items-center justify-between">
                                        <button
                                            onClick={handleAnalyzeSkills}
                                            disabled={isAnalyzing || !skillsInput.trim()}
                                            className="btn-primary flex items-center gap-2 text-xs"
                                        >
                                            {isAnalyzing ? <span className="animate-pulse">Analyzing...</span> : <> <Sparkles className="w-3 h-3" /> Analyze with AI </>}
                                        </button>
                                        {aiAnalysisResult && (
                                            <span className="text-green-400 text-xs font-medium animate-in fade-in bg-green-500/10 px-2 py-1 rounded">
                                                ✓ {aiAnalysisResult.extracted.length} skills found (+Inference)
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Mode B: Categorized Selection (Hidden if Fresh Start) */}
                            {!data.startingFresh && (
                                <>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                            <label className="label mb-0">Quick Select</label>
                                        </div>

                                        <div className="h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                                            {Object.entries(SKILL_CATEGORIES).map(([category, catSkills]) => (
                                                <div key={category} className="mb-4">
                                                    <h3 className="text-xs font-semibold text-blue-300 mb-2 uppercase tracking-wider">{category}</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {catSkills.map(skill => (
                                                            <button
                                                                key={skill}
                                                                onClick={() => toggleSelection('skills', skill)}
                                                                className={`px-2.5 py-1 rounded-full text-xs border transition-all ${data.skills.includes(skill) ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'bg-white/5 border-white/10 hover:border-white/30 text-blue-200/70'}`}
                                                            >
                                                                {skill}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Selected Summary */}
                                    <div className="border-t border-white/10 pt-4">
                                        <p className="text-xs text-blue-200 mb-2">Selected ({data.skills.length})</p>
                                        <div className="flex flex-wrap gap-2 max-h-[60px] overflow-y-auto">
                                            {data.skills.map(skill => (
                                                <span key={skill} className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs border border-green-500/30 flex items-center gap-1">
                                                    {skill}
                                                    <button onClick={() => toggleSelection('skills', skill)} className="hover:text-white">×</button>
                                                </span>
                                            ))}
                                        </div>
                                        {errors.skills && <p className="text-error mt-2">{errors.skills}</p>}
                                    </div>
                                </>
                            )}

                            {/* Interests Selection */}
                            <div className="space-y-4 pt-4 border-t border-white/5">
                                <div className="flex justify-between items-end">
                                    <label className="label mb-0">Interests & Passions</label>
                                    <span className="text-xs text-blue-200/50">What excites you?</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {INTERESTS_LIST.map(interest => (
                                        <button
                                            key={interest}
                                            onClick={() => toggleSelection('interests', interest)}
                                            className={`px-3 py-1.5 rounded-full text-xs border transition-all ${data.interests.includes(interest) ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'bg-white/5 border-white/10 hover:border-white/30 text-blue-200/70'}`}
                                        >
                                            {interest}
                                        </button>
                                    ))}
                                </div>
                                {errors.interests && <p className="text-error mt-2">{errors.interests}</p>}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: GOALS */}
                    {
                        step === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Target className="w-5 h-5 text-red-400" /> Career Goals
                                </h2>

                                <div className="space-y-3">
                                    <label className="label">Primary Objectives</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {CAREER_OBJECTIVES.map(obj => (
                                            <button
                                                key={obj}
                                                onClick={() => toggleSelection('primaryObjectives', obj)}
                                                className={`p-2.5 rounded-lg border text-xs text-left transition-all ${data.primaryObjectives.includes(obj) ? 'bg-red-500/20 border-red-500 text-white' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                            >
                                                {obj}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.primaryObjectives && <p className="text-error">{errors.primaryObjectives}</p>}
                                </div>

                                <div className="space-y-3">
                                    <label className="label">Preferred Domains</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {CAREER_DOMAINS.map(domain => (
                                            <button
                                                key={domain}
                                                onClick={() => toggleSelection('preferredDomains', domain)}
                                                className={`p-2.5 rounded-lg border text-xs text-center transition-all ${data.preferredDomains.includes(domain) ? 'bg-secondary border-secondary text-white' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                            >
                                                {domain}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.preferredDomains && <p className="text-error">{errors.preferredDomains}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="label text-xs">Learning Style</label>
                                        <select
                                            value={data.learningStyle}
                                            onChange={e => updateData('learningStyle', e.target.value)}
                                            className={`input-field appearance-none bg-black/20 text-sm py-2 ${errors.learningStyle ? 'border-red-500' : ''}`}
                                        >
                                            <option value="" className="bg-gray-900 text-gray-400">Select Style</option>
                                            {LEARNING_STYLES.map(style => <option key={style} value={style} className="bg-gray-900">{style}</option>)}
                                        </select>
                                        {errors.learningStyle && <p className="text-error">{errors.learningStyle}</p>}
                                    </div>
                                    <div>
                                        <label className="label text-xs">Weekly Hours</label>
                                        <select
                                            value={data.timeCommitment}
                                            onChange={e => updateData('timeCommitment', e.target.value)}
                                            className={`input-field appearance-none bg-black/20 text-sm py-2 ${errors.timeCommitment ? 'border-red-500' : ''}`}
                                        >
                                            <option value="" className="bg-gray-900 text-gray-400">Select Hours</option>
                                            {TIME_COMMITMENTS.map(time => <option key={time} value={time} className="bg-gray-900">{time}</option>)}
                                        </select>
                                        {errors.timeCommitment && <p className="text-error">{errors.timeCommitment}</p>}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    }

                    {/* STEP 4: PROFESSIONAL DETAILS */}
                    {step === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <BriefcaseIcon className="w-5 h-5 text-green-400" /> Professional Profile
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">Years of Experience</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="50"
                                        value={data.yearsExperience}
                                        onChange={e => updateData('yearsExperience', parseInt(e.target.value) || 0)}
                                        className="input-field"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="label">Current Role (Optional)</label>
                                    <input
                                        type="text"
                                        value={data.currentRole}
                                        onChange={e => updateData('currentRole', e.target.value)}
                                        className="input-field"
                                        placeholder="e.g. Software Engineer"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="label">Target Industries</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {INDUSTRIES.map(industry => (
                                        <button
                                            key={industry}
                                            onClick={() => toggleSelection('targetIndustries', industry)}
                                            className={`p-2.5 rounded-lg border text-xs text-left transition-all ${data.targetIndustries.includes(industry) ? 'bg-green-500/20 border-green-500 text-white' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                        >
                                            {industry}
                                        </button>
                                    ))}
                                </div>
                                {errors.targetIndustries && <p className="text-error">{errors.targetIndustries}</p>}
                            </div>

                            <div>
                                <label className="label">Salary Expectations (Annual, USD)</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="number"
                                        value={data.salaryExpectation.min || ''}
                                        onChange={e => updateData('salaryExpectation', { ...data.salaryExpectation, min: parseInt(e.target.value) || 0 })}
                                        className="input-field text-sm"
                                        placeholder="Min (e.g. 50000)"
                                    />
                                    <input
                                        type="number"
                                        value={data.salaryExpectation.max || ''}
                                        onChange={e => updateData('salaryExpectation', { ...data.salaryExpectation, max: parseInt(e.target.value) || 0 })}
                                        className="input-field text-sm"
                                        placeholder="Max (e.g. 100000)"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="label">Work Location Preference</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    {['remote', 'hybrid', 'onsite', 'flexible'].map(pref => (
                                        <button
                                            key={pref}
                                            onClick={() => updateData('remotePreference', pref)}
                                            className={`p-2.5 rounded-lg border text-xs capitalize transition-all ${data.remotePreference === pref ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                        >
                                            {pref}
                                        </button>
                                    ))}
                                </div>
                                {errors.remotePreference && <p className="text-error">{errors.remotePreference}</p>}
                            </div>

                            <div>
                                <label className="label text-xs">Geographic Preferences</label>
                                <div className="flex flex-wrap gap-2">
                                    {GEOGRAPHIC_REGIONS.map(region => (
                                        <button
                                            key={region}
                                            onClick={() => toggleSelection('geographicPreferences', region)}
                                            className={`px-3 py-1.5 rounded-full text-xs border transition-all ${data.geographicPreferences.includes(region) ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
                                        >
                                            {region}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl">
                                <input
                                    type="checkbox"
                                    id="relocate"
                                    checked={data.willingToRelocate}
                                    onChange={e => updateData('willingToRelocate', e.target.checked)}
                                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary"
                                />
                                <label htmlFor="relocate" className="text-sm cursor-pointer">
                                    I'm willing to relocate for the right opportunity
                                </label>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 5: CAREER TIMELINE */}
                    {step === 5 && (
                        <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-400" /> Career Timeline & Goals
                            </h2>

                            <div>
                                <label className="label">When do you want to achieve your career goal?</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {[
                                        { value: '6months', label: '6 Months', desc: 'Urgent transition' },
                                        { value: '1year', label: '1 Year', desc: 'Focused growth' },
                                        { value: '2years', label: '2 Years', desc: 'Steady progress' },
                                        { value: '5years', label: '5+ Years', desc: 'Long-term vision' }
                                    ].map(timeline => (
                                        <button
                                            key={timeline.value}
                                            onClick={() => updateData('careerTimeline', timeline.value)}
                                            className={`p-3 rounded-lg border text-left transition-all ${data.careerTimeline === timeline.value ? 'bg-blue-500/20 border-blue-500 shadow-glow' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                        >
                                            <h3 className={`font-semibold text-sm mb-0.5 ${data.careerTimeline === timeline.value ? 'text-blue-300' : 'text-gray-200'}`}>
                                                {timeline.label}
                                            </h3>
                                            <p className="text-[10px] text-blue-200/70">{timeline.desc}</p>
                                        </button>
                                    ))}
                                </div>
                                {errors.careerTimeline && <p className="text-error">{errors.careerTimeline}</p>}
                            </div>

                            <div>
                                <label className="label">Career Risk Tolerance</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { value: 'low', label: 'Low Risk', desc: 'Stable companies', icon: '🛡️' },
                                        { value: 'medium', label: 'Medium Risk', desc: 'Mix of stability & growth', icon: '⚖️' },
                                        { value: 'high', label: 'High Risk', desc: 'Startups, high growth', icon: '🚀' }
                                    ].map(risk => (
                                        <button
                                            key={risk.value}
                                            onClick={() => updateData('riskTolerance', risk.value)}
                                            className={`p-4 rounded-lg border text-center transition-all ${data.riskTolerance === risk.value ? 'bg-purple-500/20 border-purple-500 shadow-glow' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                        >
                                            <div className="text-2xl mb-2">{risk.icon}</div>
                                            <h3 className={`font-semibold text-sm mb-1 ${data.riskTolerance === risk.value ? 'text-purple-300' : 'text-gray-200'}`}>
                                                {risk.label}
                                            </h3>
                                            <p className="text-[10px] text-blue-200/70">{risk.desc}</p>
                                        </button>
                                    ))}
                                </div>
                                {errors.riskTolerance && <p className="text-error">{errors.riskTolerance}</p>}
                            </div>

                            <div>
                                <label className="label">Work-Life Balance Priority</label>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-blue-200/70">
                                        <span>Less Important</span>
                                        <span className="font-bold text-primary">{data.workLifeBalancePriority}/10</span>
                                        <span>Very Important</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={data.workLifeBalancePriority}
                                        onChange={e => updateData('workLifeBalancePriority', parseInt(e.target.value))}
                                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 6: PERSONALITY & WORK STYLE */}
                    {step === 6 && (
                        <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Brain className="w-5 h-5 text-purple-400" /> Work Personality
                            </h2>

                            <div>
                                <label className="label">Work Style</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {WORK_STYLES.map(style => {
                                        const Icon = style.icon;
                                        return (
                                            <button
                                                key={style.value}
                                                onClick={() => updateData('workStyle', style.value)}
                                                className={`p-4 rounded-lg border text-left transition-all group ${data.workStyle === style.value ? 'bg-primary/20 border-primary shadow-glow' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                            >
                                                <Icon className={`w-6 h-6 mb-2 ${data.workStyle === style.value ? 'text-primary' : 'text-gray-400'}`} />
                                                <h3 className={`font-semibold text-sm mb-0.5 ${data.workStyle === style.value ? 'text-primary' : 'text-gray-200'}`}>
                                                    {style.label}
                                                </h3>
                                                <p className="text-[10px] text-blue-200/70">{style.description}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                                {errors.workStyle && <p className="text-error">{errors.workStyle}</p>}
                            </div>

                            <div>
                                <label className="label">Problem-Solving Approach</label>
                                <select
                                    value={data.problemSolvingApproach}
                                    onChange={e => updateData('problemSolvingApproach', e.target.value)}
                                    className={`input-field appearance-none bg-black/20 ${errors.problemSolvingApproach ? 'border-red-500' : ''}`}
                                >
                                    <option value="" className="bg-gray-900 text-gray-400">Select your approach</option>
                                    {PROBLEM_SOLVING_APPROACHES.map(approach => (
                                        <option key={approach} value={approach} className="bg-gray-900">{approach}</option>
                                    ))}
                                </select>
                                {errors.problemSolvingApproach && <p className="text-error">{errors.problemSolvingApproach}</p>}
                            </div>

                            <div>
                                <label className="label">Learning Pace</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {LEARNING_PACES.map(pace => (
                                        <button
                                            key={pace.value}
                                            onClick={() => updateData('learningPace', pace.value)}
                                            className={`p-3 rounded-lg border text-left transition-all ${data.learningPace === pace.value ? 'bg-green-500/20 border-green-500 shadow-glow' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                        >
                                            <h3 className={`font-semibold text-sm mb-0.5 ${data.learningPace === pace.value ? 'text-green-300' : 'text-gray-200'}`}>
                                                {pace.label}
                                            </h3>
                                            <p className="text-[10px] text-blue-200/70">{pace.description}</p>
                                        </button>
                                    ))}
                                </div>
                                {errors.learningPace && <p className="text-error">{errors.learningPace}</p>}
                            </div>

                            <div className="bg-white/5 p-4 rounded-xl flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold text-white">Leadership Aspirations</h3>
                                    <p className="text-xs text-blue-200/60">Do you see yourself in a leadership role?</p>
                                </div>
                                <button
                                    onClick={() => updateData('leadershipAspirations', !data.leadershipAspirations)}
                                    className={`relative w-11 h-6 rounded-full transition-colors ${data.leadershipAspirations ? 'bg-green-500' : 'bg-white/10'}`}
                                >
                                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${data.leadershipAspirations ? 'translate-x-5' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 7: REVIEW */}
                    {
                        step === 7 && (
                            <motion.div key="step7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Check className="w-5 h-5 text-green-400" /> Review & Confirm
                                </h2>

                                <div className="space-y-4">
                                    <ReviewSection title="Profile Overview" editStep={1}>
                                        <p><span className="text-blue-200/60">Name:</span> {data.fullName}</p>
                                        <p><span className="text-blue-200/60">Education:</span> {data.educationLevel} ({data.fieldOfStudy})</p>
                                        <p><span className="text-blue-200/60">Status:</span> {data.currentStatus} ({data.startingFresh ? 'Starting Fresh' : data.experienceLevel})</p>
                                    </ReviewSection>

                                    <ReviewSection title="Skills" editStep={2}>
                                        <div className="flex flex-wrap gap-1 mb-2">
                                            {data.skills.map(skill => (
                                                <span key={skill} className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-blue-100/90">{skill}</span>
                                            ))}
                                        </div>
                                        <p className="text-xs text-blue-200/60 mt-1">Interests:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {data.interests.map(interest => (
                                                <span key={interest} className="bg-purple-500/10 border border-purple-500/20 px-1.5 py-0.5 rounded text-[10px] text-purple-200/90">{interest}</span>
                                            ))}
                                        </div>
                                    </ReviewSection>

                                    <ReviewSection title="Goals" editStep={3}>
                                        <p><span className="text-blue-200/60">Target:</span> {data.preferredDomains.join(", ")}</p>
                                        <p><span className="text-blue-200/60">Objectives:</span> {data.primaryObjectives.join(", ")}</p>
                                        <p><span className="text-blue-200/60">Commitment:</span> {data.timeCommitment}/week</p>
                                    </ReviewSection>
                                </div>

                                <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl flex items-start gap-3">
                                    <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                    <div className="text-xs text-blue-100/80">
                                        <p className="font-semibold text-blue-400 mb-0.5">Ready to Generate?</p>
                                        Our AI will analyze these details to create a tailored roadmap including course recommendations.
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                    <input
                                        type="checkbox"
                                        id="confirm"
                                        checked={termsAccepted}
                                        onChange={e => setTermsAccepted(e.target.checked)}
                                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary"
                                    />
                                    <label htmlFor="confirm" className="text-xs text-blue-200 select-none cursor-pointer">
                                        I confirm the above details are correct.
                                    </label>
                                </div>
                            </motion.div>
                        )
                    }

                </AnimatePresence >

                {/* Footer Controls */}
                < div className="flex justify-between mt-8 pt-4 border-t border-white/10" >
                    <button
                        onClick={handleBack}
                        disabled={step === 1}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-medium transition-all text-sm ${step === 1 ? 'opacity-0 pointer-events-none' : 'hover:bg-white/10 text-blue-200 hover:text-white'}`}
                    >
                        <ChevronLeft className="w-3 h-3" /> Back
                    </button>

                    {
                        step < 7 ? (
                            <button
                                onClick={handleNext}
                                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full font-semibold shadow-lg shadow-primary/25 transition-all flex items-center gap-2 text-sm"
                            >
                                Next <ArrowRight className="w-3 h-3" />
                            </button>
                        ) : (
                            <button
                                onClick={handleGeneratePlan}
                                disabled={!termsAccepted || isGenerating}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-bold shadow-xl shadow-blue-600/20 hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100 text-sm"
                            >
                                {isGenerating ? <><span className="animate-spin w-3 h-3 border-2 border-white/30 border-t-white rounded-full"></span> Processing...</> : <>🚀 Generate Plan</>}
                            </button>
                        )
                    }
                </div >
            </div >
        </div >
    );

    function ReviewSection({ title, children, editStep }: { title: string, children: React.ReactNode, editStep: number }) {
        return (
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-white">{title}</h3>
                    <button onClick={() => setStep(editStep)} className="text-xs text-primary hover:underline">Edit</button>
                </div>
                <div className="text-sm space-y-1">
                    {children}
                </div>
            </div>
        );
    }
}

// Additional Global Styles needed for this component would be in globals.css (input-field, label, etc.)
// For now, using Tailwind utility classes directly or standard ones.
