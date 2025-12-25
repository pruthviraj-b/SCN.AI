
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { logger } from '@/lib/logger';

export async function POST(req: Request) {
    try {
        const { skills, goals, experienceLevel, preferredDomains, timeCommitment } = await req.json();

        if (!skills || !preferredDomains) {
            return NextResponse.json({ error: 'Missing required profile data' }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'API Key missing' }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
        ROLE (NON-NEGOTIABLE)

        You are building the Startup Idea Generator Module for the project:

        “Smart Career Navigator – AI-Powered Personalized Career Guidance System”

        This module must act like a virtual startup mentor + product strategist, not a random idea generator.

        You must produce practical, skill-aligned, realistic startup ideas, suitable for students, freshers, and early-stage founders.

        🔹 INPUTS (MANDATORY)

        User Skills: "${skills.join(', ')}"
        Career Goals: "${goals || 'Entrepreneurship'}"
        Experience Level: "${experienceLevel}"
        Preferred Domains: "${preferredDomains.join(', ')}"
        Time Availability: "${timeCommitment}"

        🔹 INTERNAL LOGIC (STRICT & SEQUENTIAL)
        STEP 1: Founder-Skill Fit Analysis

        Identify core strengths

        Detect technical vs non-technical bias

        Decide startup type (Tech product, Service, Content, etc.) based on "${skills}"

        STEP 2: Problem Identification (CRITICAL)

        For each startup idea:

        Identify a real-world problem

        Ensure problem is common, painful, and defined.

        STEP 3: Idea Generation & Validation

        Generate 2–3 startup ideas, ranked by skill alignment and feasibility.

        Each idea must pass: “Can a student/fresher realistically build an MVP in 4-6 weeks?”

        🔹 OUTPUT STRUCTURE (MANDATORY JSON)
        Return ONLY valid JSON.

        {
            "analysis": {
                "founderType": "Technical / Creative / Business / Hybrid",
                "coreStrengths": ["Strength 1", "Strength 2"],
                "recommendedModel": "SaaS / Agency / D2C / Content"
            },
            "ideas": [
                {
                    "title": "Startup Name (Working Title)",
                    "tagline": "Short, catchy description",
                    "problem": "Clear problem statement",
                    "solution": "Clear description of product/service",
                    "targetUsers": ["Target Group 1", "Target Group 2"],
                    "coreFeatures": ["Feature 1", "Feature 2", "Feature 3"],
                    "whyFitsUser": "Explain alignment with user's skills",
                    "mvpScope": "What to build in first 4-6 weeks",
                    "techStack": ["Tool/Lang 1", "Tool/Lang 2"],
                    "monetization": {
                        "model": "Subscription / Freemium / etc.",
                        "explanation": "How it makes money"
                    },
                    "validationSteps": ["Step 1", "Step 2", "Step 3"],
                    "learningValue": "Skills user will learn even if it fails",
                    "risk": {
                        "risk": "Key risk",
                        "mitigation": "How to handle it"
                    }
                }
            ]
        }

        🔹 QUALITY RULES (DO NOT BREAK)

        ❌ No billion-dollar fantasies

        ❌ No investor jargon overload

        ❌ No vague AI buzzwords

        ✅ Student-buildable ideas only

        ✅ Clear execution logic

        ✅ Feels like a real startup mentor
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean markdown
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return NextResponse.json(JSON.parse(text));
    } catch (error) {
        logger.error('Startup Generator failed:', error);
        return NextResponse.json({ error: 'Failed to generate startup ideas' }, { status: 500 });
    }
}
