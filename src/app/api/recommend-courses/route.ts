import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { courses } from '@/data/courses';
import { logger } from '@/lib/logger';

export async function POST(req: NextRequest) {
    let message = "";

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        console.log("DEBUG: GEMINI_API_KEY present in route:", !!apiKey);

        // Parse body once
        const body = await req.json();
        message = body.message;
        const userSkills = body.userSkills;

        if (!message) {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        // 1. Try AI Search if API key exists
        if (apiKey) {
            try {
                const genAI = new GoogleGenerativeAI(apiKey);
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

                const coursesContext = courses.map(c =>
                    `ID: ${c.id}, Title: ${c.title}, Category: ${c.category}, Level: ${c.level}, Platform: ${c.platform}`
                ).join('\n');

                const prompt = `
                You are an expert AI Career Counselor and Course Recommender.
                
                User Query: "${message}"
                User Current Skills: ${Array.isArray(userSkills) ? userSkills.join(', ') : 'None listed'}

                Available Courses Database:
                ${coursesContext}

                Task:
                1. Select the top 4-6 courses from the database that BEST match the user's query and skills.
                2. If the user asks for "AI" or "Artificial Intelligence", prioritize AI/ML courses.
                3. Provide a brief, encouraging reason for the recommendation.

                Return ONLY valid JSON in this format:
                {
                    "courseIds": ["id1", "id2", ...],
                    "message": "Here are some curated recommendations based on..."
                }
                `;

                const result = await model.generateContent(prompt);
                const response = await result.response;
                const responseText = response.text();

                let cleanedText = responseText.trim();
                const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    cleanedText = jsonMatch[0];
                } else {
                    cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
                }

                const recommendationData = JSON.parse(cleanedText);
                return NextResponse.json(recommendationData);

            } catch (aiError) {
                logger.error('Gemini API Error (falling back to local):', aiError);
                // Proceed to fallback
            }
        } else {
            logger.warn('No GEMINI_API_KEY found, using local fallback');
        }

        // 2. Fallback: Local Keyword Search
        const query = message.toLowerCase();
        const matchedCourses = courses.filter(course =>
            course.title.toLowerCase().includes(query) ||
            course.category.toLowerCase().includes(query) ||
            course.platform.toLowerCase().includes(query)
        ).slice(0, 5);

        const fallbackIds = matchedCourses.map(c => c.id);

        return NextResponse.json({
            courseIds: fallbackIds.length > 0 ? fallbackIds : [],
            message: fallbackIds.length > 0
                ? "I found these courses matching your keywords (AI is currently offline)."
                : "I couldn't find any courses matching that description locally."
        });

    } catch (error) {
        logger.error('Course recommendation critical error:', error);
        return NextResponse.json(
            { error: 'Failed to get recommendations' },
            { status: 500 }
        );
    }
}
