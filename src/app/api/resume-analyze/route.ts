import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
    try {
        const { resumeText, jobDescription } = await req.json();

        if (!resumeText) {
            return NextResponse.json({ error: 'Resume text is required' }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `You are an expert ATS (Applicant Tracking System) and Career Coach. Analyze the following resume text${jobDescription ? ` against the Job Description provided` : ''}.

        RESUME TEXT:
        "${resumeText.slice(0, 4000)}"

        ${jobDescription ? `JOB DESCRIPTION:\n"${jobDescription.slice(0, 2000)}"\n` : ''}

        Provide a strict, professional analysis in JSON format with the following structure:
        {
            "overallScore": number (0-100),
            "summary": "Professional summary of the resume's quality",
            "metrics": {
                "impact": number (0-100, based on use of numbers, metrics, results),
                "keywords": number (0-100, based on relevant hard skills),
                "formatting": number (0-100, based on structure and clarity check),
                "brevity": number (0-100, concise vs verbose)
            },
            "keyStrengths": ["string", "string"],
            "criticalIssues": ["string", "string"],
            "missingKeywords": ["string", "string"],
            "suggestedRewrites": [
                {
                    "original": "Weak bullet point found in text",
                    "improved": "Stronger, metric-driven version of that bullet point",
                    "reason": "Why the change was made"
                }
            ]
        }
        
        Return ONLY valid JSON. Do not include markdown formatting.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean markdown
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return NextResponse.json(JSON.parse(text));
    } catch (error) {
        console.error('Resume analysis failed:', error);
        return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
    }
}
