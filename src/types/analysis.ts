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
}

export interface UserProfile {
    name: string;
    skills: string[];
    experienceLevel: 'beginner' | 'intermediate' | 'advanced';
    goal: string;
    timeCommitment: string;
}
