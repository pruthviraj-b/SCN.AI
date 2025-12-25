
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { profile, recommendations, analysis } = body;

        // 1. Get User ID from Email
        const user = await db.user.findUnique({ where: { email: session.user.email } });
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        // 2. Save Profile Data
        await db.user.updateProfile(user.id, {
            full_name: profile.fullName,
            email: profile.email,
            highest_education: profile.educationLevel,
            field_of_study: profile.fieldOfStudy,
            current_status: profile.currentStatus,
            experience_level: profile.experienceLevel,
            career_goal: profile.goal
        });

        // 3. Save Skills
        const skillList = profile.skills.map((s: string) => ({
            skill_name: s,
            proficiency: 'Beginner' // Default or infer from experience level
        }));
        await db.skills.save(user.id, skillList);

        // 4. Save Recommendations (Career, Courses, etc.)
        await db.recommendations.save(user.id, 'career_analysis', analysis || recommendations);

        // 5. Log Activity
        await db.analytics.logActivity(user.id, 'onboarding_complete', {
            goal: profile.goal
        });

        return NextResponse.json({ success: true, userId: user.id });

    } catch (error: any) {
        console.error('Save failed:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
