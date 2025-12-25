export interface CareerPath {
    id: string;
    title: string;
    category: string;
    demand: string;
    avgSalary: string;
    description: string;
    requiredEducation: {
        level: string;
        fields: string[];
    };
    requiredSkills: string[];
    relatedInterests: string[];
    growthOutlook: string;
    learningResourceIds: string[];
}

export interface UserProfile {
    educationLevel: string;
    fieldOfStudy: string;
    skills: string[];
    interests: string[];
}

export interface MatchResult {
    career: CareerPath;
    score: number;
    breakdown: {
        educationScore: number;
        fieldScore: number;
        skillsScore: number;
        interestsScore: number;
    };
    matchingSkills: string[];
    missingSkills: string[];
}

// Weights
const WEIGHTS_STANDARD = {
    EDUCATION: 0.25,
    FIELD: 0.20,
    SKILLS: 0.30,
    INTERESTS: 0.25
};

const WEIGHTS_FRESH_START = {
    EDUCATION: 0.25,
    FIELD: 0.25,
    SKILLS: 0.0, // Ignore skills
    INTERESTS: 0.50 // Heavy focus on interests
};

export function calculateCareerMatch(userProfile: UserProfile, career: CareerPath, startingFresh: boolean = false): MatchResult {
    const weights = startingFresh ? WEIGHTS_FRESH_START : WEIGHTS_STANDARD;

    // 1. Education Match
    let educationScore = 0;
    const userLevel = userProfile.educationLevel?.toLowerCase() || "";
    // Safety check: requiredEducation might be missing in some data
    const requiredLevel = career.requiredEducation?.level?.toLowerCase() || "high school"; // Default to lowest if missing

    // Simple hierarchy check (can be expanded)
    const levels = ["high school", "associate", "bachelor's", "master's", "phd"];
    const userLevelIndex = levels.findIndex(l => l.includes(userLevel) || userLevel.includes(l));
    const reqLevelIndex = levels.findIndex(l => l.includes(requiredLevel) || requiredLevel.includes(l));

    if (userLevelIndex >= reqLevelIndex) {
        educationScore = 100;
    } else if (userLevelIndex >= reqLevelIndex - 1) {
        educationScore = 50; // One level below
    } else {
        educationScore = 0;
    }

    // 2. Field Match
    let fieldScore = 0;
    const userField = userProfile.fieldOfStudy?.toLowerCase() || "";

    // Safety check for requiredEducation and fields
    if (career.requiredEducation?.fields?.some(f => userField.includes(f.toLowerCase()) || f.toLowerCase().includes(userField))) {
        fieldScore = 100;
    } else if (userField) {
        // Slight point for having any field if it's not a complete mismatch (simplified)
        fieldScore = 20;
    }

    // 3. Skills Match (Skipped if startingFresh)
    let skillsScore = 0;
    const careerSkills = (career.requiredSkills || []).map(s => s.toLowerCase());
    const userSkills = (userProfile.skills || []).map(s => s.toLowerCase());

    // Even if starting fresh, if they HAVE skills that match, give them credit?
    // No, strictly follow weights. If weights.SKILLS is 0, score doesn't matter for the final sum, 
    // but useful for display.
    const matchingSkills = userSkills.filter(s => careerSkills.includes(s)); // Simplified filter

    if (careerSkills.length > 0) {
        skillsScore = (matchingSkills.length / careerSkills.length) * 100;
    }

    // 4. Interests Match
    const careerInterests = (career.relatedInterests || []).map(i => i.toLowerCase());
    const userInterests = (userProfile.interests || []).map(i => i.toLowerCase());
    const matchingInterests = userInterests.filter(i => careerInterests.includes(i));

    let interestsScore = 0;
    if (careerInterests.length > 0) {
        interestsScore = (matchingInterests.length / careerInterests.length) * 100;
    }

    // Calculate Final Weighted Score
    const totalScore = (
        (educationScore * weights.EDUCATION) +
        (fieldScore * weights.FIELD) +
        (skillsScore * weights.SKILLS) +
        (interestsScore * weights.INTERESTS)
    );

    return {
        career,
        score: Math.round(totalScore),
        breakdown: {
            educationScore,
            fieldScore,
            skillsScore,
            interestsScore
        },
        matchingSkills,
        missingSkills: (career.requiredSkills || []).filter(s => !(userSkills.includes(s.toLowerCase())))
    };
}
