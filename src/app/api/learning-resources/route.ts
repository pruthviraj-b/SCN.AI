
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { logger } from '@/lib/logger';

export async function POST(req: Request) {
    try {
        const { careerPath, missingSkills, experienceLevel, learningStyle, timeCommitment } = await req.json();

        if (!careerPath || !missingSkills) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'API Key missing' }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
        ROLE (NON-NEGOTIABLE)

        You are building the Learning Resource Aggregator Module for the project:

        “Smart Career Navigator – AI-Powered Personalized Career Guidance System”

        This module acts as an intelligent bridge between:

        Career recommendations

        Skill gap analysis

        Real learning resources

        You must behave like a trusted educational platform, similar to:
        Coursera, Udemy, edX, Google Career Certificates.

        🔹 MODULE PURPOSE

        Convert skill gaps and career paths into:

        Curated learning resources

        Structured course sequences

        Practical project suggestions

        The output must be relevant, structured, and difficulty-aware.

        🔹 INPUTS (MANDATORY)

        You will receive from the Recommendation Engine:

        Target career roles: "${careerPath}"

        Missing / priority skills: "${missingSkills.join(', ')}"

        User experience level: "${experienceLevel}"

        Learning preference: "${learningStyle}"

        Weekly time commitment: "${timeCommitment}"

        🔹 INTERNAL PROCESS (STRICT LOGIC)
        STEP 1: Skill-to-Resource Mapping

        For each missing or priority skill:

        Identify learning categories:

        Fundamentals

        Tools & frameworks

        Applied practice

        Tag skill difficulty:
        Beginner / Intermediate / Advanced

        STEP 2: Resource Classification

        Classify resources into:

        Video courses

        Reading material

        Hands-on labs

        Real-world projects

        Each resource must include:

        Skill covered

        Difficulty level

        Estimated completion time

        STEP 3: Resource Filtering (CRITICAL)

        Filter resources based on:

        User experience level

        Learning style preference

        Time availability

        Example logic:

        Beginners → fundamentals first
        Advanced users → skip basics
        Low time → short, modular content

        STEP 4: Roadmap Integration

        Attach resources directly to the learning roadmap phases:

        Phase 1: Core foundations

        Phase 2: Intermediate concepts

        Phase 3: Advanced specialization

        Phase 4: Career / startup readiness

        Each phase must feel purposeful.

        🔹 OUTPUT FORMAT (MANDATORY ORDER)
        Return ONLY valid JSON with no markdown formatting.

        {
            "skillResources": [
                {
                    "skill": "Skill Name",
                    "reason": "Why this matters",
                    "learningPath": ["Step 1", "Step 2"]
                }
            ],
            "curatedCourses": [
                {
                    "title": "Course Title",
                    "platform": "Platform Name (e.g. Coursera, Udemy)",
                    "type": "Video / Project / Interactive",
                    "difficulty": "Beginner/Int/Adv",
                    "duration": "e.g. 20 hours",
                    "outcome": "What they will learn"
                }
            ],
            "projects": [
                {
                    "level": "Beginner",
                    "title": "Project Title",
                    "description": "Description",
                    "skillsApplied": ["Skill 1", "Skill 2"]
                },
                {
                    "level": "Intermediate",
                    "title": "Project Title",
                    "description": "Description",
                    "skillsApplied": ["Skill 1", "Skill 2"]
                },
                 {
                    "level": "Advanced",
                    "title": "Capstone Project Title",
                    "description": "Description",
                    "skillsApplied": ["Skill 1", "Skill 2"]
                }
            ],
            "weeklyPlan": {
                "focus": "Main focus for Week 1",
                "activity": "Specific learning activity",
                "practice": "Practical exercise"
            }
        }

        🔹 QUALITY RULES (VERY IMPORTANT)

        ❌ No random links

        ❌ No generic “learn online” suggestions

        ❌ No overwhelming lists

        ✅ Resources must align with skill gaps

        ✅ Maintain academic + professional tone

        ✅ Output must be actionable immediately
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean markdown
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return NextResponse.json(JSON.parse(text));
    } catch (error) {
        logger.error('Resource Aggregator failed:', error);
        return NextResponse.json({ error: 'Failed to generate resources' }, { status: 500 });
    }
}
