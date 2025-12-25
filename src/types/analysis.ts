// TypeScript types for analysis and AI responses

export interface SkillAnalysis {
    extractedSkills: string[];
    categories: {
        technical: string[];
        soft: string[];
        domain: string[];
    };
    suggestedSkills: string[];
    strengthScore: number;
    recommendations: string;
    relatedRoles?: string[];
}

export interface CareerAnalysis {
    careerPath: string;
    matchScore: number;
    strengths: string[];
    gaps: string[];
    recommendedSteps: string[];
    isFallback?: boolean;
    marketOutlook?: string;
    salaryRange?: string;
    estimatedTime?: string;
    confidenceScore?: number;
    resources?: { title: string; url: string }[];
    explanation?: string;
    startupIdeas?: { title: string; description: string }[];
    alternativePaths?: {
        id: string;
        title: string;
        match: number;
        description: string;
        timeframe: string;
    }[];
}

export interface UserProfile {
    name: string;
    skills: string[];
    experienceLevel: 'beginner' | 'intermediate' | 'advanced';
    goal: string;
    timeCommitment: string;
}
