/**
 * Roadmap Generation Service
 * Generates personalized learning roadmaps based on career goals
 */

export interface Milestone {
    id: string;
    title: string;
    description: string;
    duration: string;
    skills: string[];
    resources: Array<{
        title: string;
        type: string;
        url?: string;
    }>;
    completionCriteria: string[];
    order: number;
}

export interface Roadmap {
    careerPath: string;
    totalDuration: string;
    estimatedMonths: number;
    milestones: Milestone[];
    estimatedPlacementDate: string;
    difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface UserProfile {
    experienceLevel: string;
    skills: string[];
    timeCommitment: string;
    learningPace?: string;
    careerTimeline?: string;
}

export function generateRoadmap(
    userProfile: UserProfile,
    targetCareer: any,
    missingSkills: string[]
): Roadmap {
    const milestones: Milestone[] = [];
    let totalWeeks = 0;
    let order = 1;

    // Phase 1: Foundation (if beginner)
    if (userProfile.experienceLevel === 'beginner' || userProfile.skills.length < 3) {
        const foundationWeeks = 4;
        milestones.push({
            id: 'foundation',
            title: 'Build Strong Foundation',
            description: 'Master the fundamentals and core concepts',
            duration: `${foundationWeeks} weeks`,
            skills: ['Programming Basics', 'Problem Solving', 'Git Basics'],
            resources: [
                { title: 'CS50 Introduction to Computer Science', type: 'Free Course', url: 'https://cs50.harvard.edu' },
                { title: 'FreeCodeCamp', type: 'Free Platform', url: 'https://www.freecodecamp.org' },
                { title: 'Git & GitHub Crash Course', type: 'YouTube', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk' }
            ],
            completionCriteria: [
                'Complete 20+ coding problems on LeetCode/HackerRank',
                'Build 2 basic projects',
                'Understand Git workflow and version control'
            ],
            order: order++
        });
        totalWeeks += foundationWeeks;
    }

    // Phase 2: Core Skills (missing skills in groups of 2-3)
    const skillGroups = chunkArray(missingSkills.slice(0, 6), 2);
    skillGroups.forEach((skillGroup, index) => {
        const duration = calculateSkillDuration(skillGroup, userProfile);
        milestones.push({
            id: `core-skills-${index + 1}`,
            title: `Master ${skillGroup.join(' & ')}`,
            description: `Deep dive into ${skillGroup.join(' and ')}`,
            duration: `${duration} weeks`,
            skills: skillGroup,
            resources: getResourcesForSkills(skillGroup, targetCareer),
            completionCriteria: [
                `Complete comprehensive course on ${skillGroup[0]}`,
                `Build 1-2 projects using ${skillGroup.join(' and ')}`,
                'Pass skill assessment or complete certification'
            ],
            order: order++
        });
        totalWeeks += duration;
    });

    // Phase 3: Advanced Skills & Specialization
    if (missingSkills.length > 6) {
        const advancedSkills = missingSkills.slice(6);
        const advancedWeeks = 6;
        milestones.push({
            id: 'advanced-specialization',
            title: 'Advanced Specialization',
            description: 'Master advanced concepts and specialized skills',
            duration: `${advancedWeeks} weeks`,
            skills: advancedSkills,
            resources: [
                { title: 'Advanced course in your specialization', type: 'Online Course' },
                { title: 'Industry-specific certifications', type: 'Certification' },
                { title: 'Open source contributions', type: 'Practical' }
            ],
            completionCriteria: [
                'Complete advanced project showcasing expertise',
                'Contribute to 2-3 open source projects',
                'Build impressive portfolio piece'
            ],
            order: order++
        });
        totalWeeks += advancedWeeks;
    }

    // Phase 4: Real-World Projects
    const projectWeeks = 4;
    milestones.push({
        id: 'real-world-projects',
        title: 'Build Real-World Projects',
        description: 'Apply your skills to create portfolio-worthy projects',
        duration: `${projectWeeks} weeks`,
        skills: ['Full Stack Development', 'Project Management', 'Best Practices'],
        resources: [
            { title: 'Project ideas for your domain', type: 'Guide' },
            { title: 'GitHub for portfolio', type: 'Platform', url: 'https://github.com' },
            { title: 'Deploy on Vercel/Netlify', type: 'Platform' }
        ],
        completionCriteria: [
            'Complete 2-3 production-ready projects',
            'Deploy projects with live demos',
            'Write comprehensive documentation',
            'Create professional GitHub profile'
        ],
        order: order++
    });
    totalWeeks += projectWeeks;

    // Phase 5: Interview Preparation
    const interviewWeeks = 4;
    milestones.push({
        id: 'interview-prep',
        title: 'Interview Preparation',
        description: 'Prepare for technical interviews and job applications',
        duration: `${interviewWeeks} weeks`,
        skills: ['DSA', 'System Design', 'Behavioral Interview', 'Resume Building'],
        resources: [
            { title: 'LeetCode Premium', type: 'Platform', url: 'https://leetcode.com' },
            { title: 'System Design Primer', type: 'GitHub', url: 'https://github.com/donnemartin/system-design-primer' },
            { title: 'Pramp - Mock Interviews', type: 'Platform', url: 'https://www.pramp.com' },
            { title: 'Resume templates', type: 'Resource' }
        ],
        completionCriteria: [
            'Solve 100+ DSA problems (Easy: 40, Medium: 50, Hard: 10)',
            'Complete 5+ mock interviews',
            'Master 10+ system design patterns',
            'Create ATS-friendly resume',
            'Build LinkedIn profile'
        ],
        order: order++
    });
    totalWeeks += interviewWeeks;

    // Calculate total duration with adjustments
    totalWeeks = adjustForUserFactors(totalWeeks, userProfile);
    const totalMonths = Math.ceil(totalWeeks / 4);

    // Calculate placement date
    const startDate = new Date();
    const placementDate = new Date(startDate);
    placementDate.setDate(placementDate.getDate() + (totalWeeks * 7));

    return {
        careerPath: targetCareer.title,
        totalDuration: formatDuration(totalWeeks),
        estimatedMonths: totalMonths,
        milestones,
        estimatedPlacementDate: placementDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        difficultyLevel: getDifficultyLevel(userProfile, missingSkills.length)
    };
}

function calculateSkillDuration(skills: string[], profile: UserProfile): number {
    let weeks = 3; // Base duration per skill group

    // Adjust for experience level
    if (profile.experienceLevel === 'beginner') weeks += 1;
    if (profile.experienceLevel === 'advanced') weeks -= 1;

    // Adjust for time commitment
    const timeMultipliers: Record<string, number> = {
        'Less than 5 hours': 1.5,
        '5–10 hours': 1.2,
        '10–20 hours': 1.0,
        'Full-time learning': 0.7
    };
    weeks *= timeMultipliers[profile.timeCommitment] || 1.0;

    // Adjust for learning pace
    if (profile.learningPace === 'fast') weeks *= 0.8;
    if (profile.learningPace === 'thorough') weeks *= 1.2;

    return Math.ceil(weeks);
}

function adjustForUserFactors(weeks: number, profile: UserProfile): number {
    let adjusted = weeks;

    // Career timeline pressure
    if (profile.careerTimeline === '6months') {
        adjusted = Math.ceil(weeks * 0.75); // Accelerated
    } else if (profile.careerTimeline === '5years') {
        adjusted = Math.ceil(weeks * 1.2); // Relaxed pace
    }

    // Clamp between reasonable bounds
    return Math.max(12, Math.min(adjusted, 96)); // 3-24 months
}

function formatDuration(weeks: number): string {
    const months = Math.ceil(weeks / 4);
    if (months <= 3) {
        return `${weeks} weeks`;
    } else if (months < 12) {
        return `${months} months (${weeks} weeks)`;
    } else {
        const years = (months / 12).toFixed(1);
        return `${years} years (${months} months)`;
    }
}

function getDifficultyLevel(profile: UserProfile, missingSkillsCount: number): 'Beginner' | 'Intermediate' | 'Advanced' {
    if (profile.experienceLevel === 'beginner' || missingSkillsCount > 8) {
        return 'Beginner';
    } else if (profile.experienceLevel === 'advanced' && missingSkillsCount < 4) {
        return 'Advanced';
    }
    return 'Intermediate';
}

function chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

function getResourcesForSkills(skills: string[], career: any): Array<{ title: string; type: string; url?: string }> {
    const resources: Array<{ title: string; type: string; url?: string }> = [];

    // Use career-specific resources if available
    if (career.learningResources) {
        resources.push(...career.learningResources.slice(0, 2));
    }

    // Add skill-specific resources
    skills.forEach(skill => {
        const skillResources = getSkillResource(skill);
        if (skillResources) {
            resources.push(skillResources);
        }
    });

    return resources.slice(0, 3); // Limit to 3 resources per milestone
}

function getSkillResource(skill: string): { title: string; type: string; url?: string } | null {
    const resourceMap: Record<string, { title: string; type: string; url?: string }> = {
        'React': { title: 'React Official Documentation', type: 'Documentation', url: 'https://react.dev' },
        'Python': { title: 'Python for Everybody', type: 'Coursera', url: 'https://www.coursera.org/specializations/python' },
        'Node.js': { title: 'Node.js Complete Guide', type: 'Udemy' },
        'SQL': { title: 'SQL for Data Science', type: 'Coursera' },
        'Machine Learning': { title: 'Andrew Ng ML Course', type: 'Coursera', url: 'https://www.coursera.org/learn/machine-learning' },
        'Docker': { title: 'Docker Mastery', type: 'Udemy' },
        'AWS': { title: 'AWS Certified Solutions Architect', type: 'Certification', url: 'https://aws.amazon.com/certification' },
        'Figma': { title: 'Figma Tutorial for Beginners', type: 'YouTube' }
    };

    return resourceMap[skill] || null;
}
