import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        // We require a logged-in user to save a plan
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { profile, recommendations, analysis } = body;

        // Find the user in our DB
        const user = await db.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Create the plan
        // We'll store the entire generation result so it can be reloaded
        const planData = JSON.stringify({
            ...profile,
            recommendations: recommendations?.recommendations || [], // Extract array if nested
            analysis: analysis,
            tracking: {
                totalSteps: analysis.recommendedSteps?.length || 0,
                completedSteps: [],
                progress: 0
            }
        });

        const title = `Career Plan - ${analysis.careerPath || profile.goal || 'Onboarding'}`;

        const newPlan = await db.plan.create({
            data: {
                title,
                data: planData,
                userId: user.id
            }
        });

        return NextResponse.json({ success: true, message: 'Plan saved successfully', planId: newPlan.id });

    } catch (error) {
        console.error('Save Plan Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
