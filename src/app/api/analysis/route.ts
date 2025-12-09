import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { logger } from '@/lib/logger';

export async function POST(req: Request) {
    try {
        // Get authenticated user
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get user data with plans
        const user = await db.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user || user.plans.length === 0) {
            return NextResponse.json({
                error: 'No career plan found. Please complete the onboarding wizard first.'
            }, { status: 404 });
        }

        // Extract user profile from latest plan
        const latestPlan = user.plans[user.plans.length - 1];
        const planData = JSON.parse(latestPlan.data);

        const userProfile = {
            name: user.name || 'User',
            skills: planData.skills || [],
            experienceLevel: planData.experienceLevel || 'beginner',
            goal: planData.goal || '',
            timeCommitment: planData.timeCommitment || '5-10'
        };

        // Check if Gemini API key exists
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            // Fallback to intelligent mock data based on user profile
            return NextResponse.json(generateFallbackAnalysis(userProfile));
        }

        // Use Gemini AI for real analysis
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `You are a career counselor AI. Analyze this user's profile and provide a detailed career analysis.

User Profile:
- Name: ${userProfile.name}
- Current Skills: ${userProfile.skills.join(', ')}
- Experience Level: ${userProfile.experienceLevel}
- Career Goal: ${userProfile.goal}
- Weekly Time Commitment: ${userProfile.timeCommitment} hours

Provide a JSON response with:
1. careerPath: A specific recommended career path title (based on their goal and skills)
2. matchScore: A number from 1-100 indicating how well their current skills match their goal
3. strengths: Array of 3-4 specific strengths based on their skills
4. gaps: Array of 2-3 specific skill gaps they need to fill
5. recommendedSteps: Array of 3-4 actionable next steps to achieve their goal

Return ONLY valid JSON, no markdown formatting.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let responseText = response.text();

        // Clean markdown formatting if present
        responseText = responseText.trim();
        if (responseText.startsWith('```json')) {
            responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        } else if (responseText.startsWith('```')) {
            responseText = responseText.replace(/```\n?/g, '');
        }

        const analysis = JSON.parse(responseText);

        return NextResponse.json(analysis);
    } catch (error) {
        logger.error('Analysis error:', error);

        // Return intelligent fallback on error
        try {
            const session = await getServerSession(authOptions);
            if (session?.user?.email) {
                const user = await db.user.findUnique({
                    where: { email: session.user.email }
                });

                if (user && user.plans.length > 0) {
                    const latestPlan = user.plans[user.plans.length - 1];
                    const planData = JSON.parse(latestPlan.data);
                    const userProfile = {
                        name: user.name || 'User',
                        skills: planData.skills || [],
                        experienceLevel: planData.experienceLevel || 'beginner',
                        goal: planData.goal || '',
                        timeCommitment: planData.timeCommitment || '5-10'
                    };

                    return NextResponse.json(generateFallbackAnalysis(userProfile));
                }
            }
        } catch (fallbackError) {
            logger.error('Fallback error:', fallbackError);
        }

        return NextResponse.json({
            error: 'Failed to generate analysis. Please try again.'
        }, { status: 500 });
    }
}

// Intelligent fallback analysis based on user profile
function generateFallbackAnalysis(userProfile: any) {
    const skillCount = userProfile.skills.length;

    // Calculate match score based on skills and experience
    let matchScore = 60; // Base score
    if (skillCount >= 5) matchScore += 20;
    if (skillCount >= 8) matchScore += 10;
    if (userProfile.experienceLevel === 'intermediate') matchScore += 5;
    if (userProfile.experienceLevel === 'advanced') matchScore += 10;

    // Generate strengths based on skills
    const strengths = [];
    if (skillCount > 0) {
        strengths.push(`Proficient in ${userProfile.skills.slice(0, 3).join(', ')}`);
    }
    if (userProfile.experienceLevel === 'intermediate' || userProfile.experienceLevel === 'advanced') {
        strengths.push('Strong foundation in core technologies');
    }
    strengths.push('Clear career goals and direction');
    if (parseInt(userProfile.timeCommitment.split('-')[0]) >= 10) {
        strengths.push('High commitment to learning and growth');
    }

    // Generate gaps
    const gaps = [
        'Advanced system design and architecture',
        'Real-world project experience',
        'Industry-specific domain knowledge'
    ];

    // Generate recommended steps
    const recommendedSteps = [
        `Build 2-3 portfolio projects showcasing ${userProfile.goal} skills`,
        'Contribute to open-source projects in your field',
        'Network with professionals in your target role',
        'Pursue relevant certifications or courses'
    ];

    return {
        careerPath: userProfile.goal || 'Full Stack Developer',
        matchScore: Math.min(95, matchScore),
        strengths: strengths.slice(0, 4),
        gaps: gaps.slice(0, 3),
        recommendedSteps: recommendedSteps.slice(0, 4),
        isFallback: true
    };
}
