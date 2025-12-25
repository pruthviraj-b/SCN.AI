import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.email !== 'pruthviraj1984bc@gmail.com') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Refactored to use Supabase (async)
    // const allUsers = db.read().users; <-- OLD
    const allUsers = await db.user.getAll(); // <-- NEW (added to db definition above)
    return NextResponse.json(allUsers);
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.email !== 'pruthviraj1984bc@gmail.com') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID required' }, { status: 400 });
        }

        db.user.delete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}
