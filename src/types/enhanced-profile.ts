// Enhanced User Profile Types for ML Recommendation Engine

export interface SalaryExpectation {
    min: number;
    max: number;
    currency: string;
}

export interface SkillProficiency {
    skill: string;
    level: 1 | 2 | 3 | 4 | 5; // 1=Beginner, 5=Expert
}

export interface EnhancedUserProfile {
    // ===== Existing Fields =====
    fullName: string;
    email: string;
    educationLevel: string;
    fieldOfStudy: string;
    currentStatus: string;
    experienceLevel: string;
    skills: string[];
    interests: string[];
    primaryObjectives: string[];
    preferredDomains: string[];
    learningStyle: string;
    timeCommitment: string;
    startingFresh: boolean;

    // ===== New Fields - Professional Details =====
    yearsExperience: number;
    currentRole?: string;
    currentCompany?: string;
    targetIndustries: string[];
    geographicPreferences: string[];
    salaryExpectation: SalaryExpectation;

    // ===== New Fields - Skills & Achievements =====
    skillProficiency: SkillProficiency[];
    certifications: string[];
    projectsCompleted: number;
    portfolioUrl?: string;
    githubUrl?: string;
    linkedinUrl?: string;

    // ===== New Fields - Career Goals =====
    careerTimeline: '6months' | '1year' | '2years' | '5years';
    riskTolerance: 'low' | 'medium' | 'high';
    workLifeBalancePriority: number; // 1-10 scale
    remotePreference: 'remote' | 'hybrid' | 'onsite' | 'flexible';
    willingToRelocate: boolean;

    // ===== New Fields - Personality & Work Style =====
    workStyle: 'independent' | 'collaborative' | 'leadership';
    problemSolvingApproach: string;
    learningPace: 'fast' | 'moderate' | 'thorough';
    leadershipAspirations: boolean;
    preferredTeamSize: 'small' | 'medium' | 'large' | 'any';
    communicationStyle: 'direct' | 'diplomatic' | 'analytical' | 'creative';

    // ===== Metadata =====
    createdAt?: Date;
    updatedAt?: Date;
    completionPercentage?: number;
}

// For backward compatibility
export interface UserProfile {
    educationLevel: string;
    fieldOfStudy: string;
    skills: string[];
    interests: string[];
}

// Wizard data type (used during onboarding)
export interface WizardData extends Omit<EnhancedUserProfile, 'createdAt' | 'updatedAt' | 'completionPercentage'> {
    // Additional wizard-specific fields if needed
}

// API Response types
export interface ProfileUpdateResponse {
    success: boolean;
    profile?: EnhancedUserProfile;
    error?: string;
}

export interface ProfileValidationError {
    field: keyof EnhancedUserProfile;
    message: string;
}
