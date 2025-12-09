import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { logger } from '@/lib/logger';

export async function POST(req: NextRequest) {
    try {
        // Check if API key exists
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            logger.error('GEMINI_API_KEY is not set in environment variables');
            return NextResponse.json(
                { error: 'API key not configured' },
                { status: 500 }
            );
        }

        const { skillsText } = await req.json();

        if (!skillsText || skillsText.trim().length === 0) {
            return NextResponse.json(
                { error: 'Skills text is required' },
                { status: 400 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `Analyze the following skills input from a user and provide a structured analysis:

User Input: "${skillsText}"

Please analyze and return a JSON response with:
1. extractedSkills: Array of specific skills mentioned (clean, standardized names)
2. categories: Object categorizing skills into "technical", "soft", and "domain"
3. suggestedSkills: Array of 3-5 related skills they might also have or should learn
4. strengthScore: Number from 1-10 rating their overall skill profile
5. recommendations: String with personalized advice for improvement
6. relatedRoles: Array of 3-5 job roles that match their skills

Return ONLY valid JSON, no markdown formatting or explanation.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const responseText = response.text();

        if (!responseText) {
            throw new Error('No response from Gemini');
        }

        // Remove markdown code blocks if present
        let cleanedText = responseText.trim();
        if (cleanedText.startsWith('```json')) {
            cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        } else if (cleanedText.startsWith('```')) {
            cleanedText = cleanedText.replace(/```\n?/g, '');
        }

        const analysis = JSON.parse(cleanedText);

        return NextResponse.json(analysis);
    } catch (error) {
        logger.error('Skills analysis error:', error);

        return NextResponse.json(
            {
                error: 'Failed to analyze skills',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
