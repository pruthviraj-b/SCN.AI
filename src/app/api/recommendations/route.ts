import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { calculateCareerMatch, CareerPath, UserProfile } from '@/lib/matching-algorithm';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, experienceLevel, skills, interests, goal, timeCommitment, startingFresh } = body;

        // 1. Read Career Data
        const dataFilePath = path.join(process.cwd(), 'data.json');
        const fileContents = fs.readFileSync(dataFilePath, 'utf8');
        const jsonData = JSON.parse(fileContents);
        const careerPaths: CareerPath[] = jsonData.careerPaths;

        // 2. Construct User Profile
        const userProfile: UserProfile = {
            educationLevel: body.educationLevel || 'Bachelor\'s',
            fieldOfStudy: body.fieldOfStudy || '',
            skills: skills || [],
            interests: interests || []
        };

        // 3. Calculate Matches
        const matches = careerPaths.map(career => calculateCareerMatch(userProfile, career, startingFresh));

        // 4. Sort by Score
        matches.sort((a, b) => b.score - a.score);

        // 5. Format for Frontend
        // Frontend expects: id, title, match, description, timeframe
        const recommendations = matches.slice(0, 3).map(m => ({
            id: m.career.id,
            title: m.career.title,
            match: m.score,
            description: m.career.description,
            timeframe: '3-6 months' // Static for now or derive from gap
        }));

        return NextResponse.json({ recommendations });

    } catch (error) {
        console.error("Recommendation API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
