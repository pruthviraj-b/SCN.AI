
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        const user = await db.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        const previousLength = user.plans.length;
        user.plans = user.plans.filter((p: any) => p.id !== id);

        if (user.plans.length === previousLength) {
            return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
        }

        await db.user.update(user.email, { plans: user.plans });

        return NextResponse.json({ success: true, message: 'Plan deleted' });

    } catch (error) {
        console.error('Delete Plan Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
