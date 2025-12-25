
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const { completedSteps } = await req.json();

        // Find the user
        const user = await db.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        // Find the plan attached to this user
        const planIndex = user.plans.findIndex((p: any) => p.id === id);

        if (planIndex === -1) {
            return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
        }

        const plan = user.plans[planIndex];
        const planData = JSON.parse(plan.data);

        // Update tracking data
        const totalSteps = planData.tracking?.totalSteps || planData.analysis.recommendedSteps.length || 1;
        const progress = Math.round((completedSteps.length / totalSteps) * 100);

        planData.tracking = {
            totalSteps,
            completedSteps,
            progress
        };

        // Update in DB (using our custom DB method pattern from db.ts)
        // Since we don't have a direct 'update plan' method exposed on the user object in the ORM-ish wrapper,
        // we might need to update the user's plan array.
        // Let's verify db.ts capabilities again.

        // checking db.ts shows:
        // user.update(email, data)
        // We can update the entire plans array for the user.

        user.plans[planIndex].data = JSON.stringify(planData);

        // This is a bit inefficient for a real DB but matches the file-based db.ts structure
        await db.user.update(user.email, { plans: user.plans });

        return NextResponse.json({ success: true, progress });

    } catch (error) {
        console.error('Update Progress Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
