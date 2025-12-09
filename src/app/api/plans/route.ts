import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { logger } from '@/lib/logger';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const requestData = await req.json();
        const user = await db.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        await db.plan.create({
            data: {
                title: `Career Plan - ${new Date().toLocaleDateString()}`,
                data: JSON.stringify(requestData),
                userId: user.id
            }
        });

        return NextResponse.json({ message: 'Plan saved successfully' });
    } catch (error) {
        logger.error("Save plan error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
