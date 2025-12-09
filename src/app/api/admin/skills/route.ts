import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.email !== 'pruthviraj1984bc@gmail.com') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const skills = db.skill.getAll();
    return NextResponse.json(skills);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.email !== 'pruthviraj1984bc@gmail.com') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await req.json();
        const newSkill = db.skill.create(data);
        return NextResponse.json(newSkill, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.email !== 'pruthviraj1984bc@gmail.com') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id, ...data } = await req.json();
        const updated = db.skill.update(id, data);

        if (!updated) {
            return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
    }
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

        db.skill.delete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 });
    }
}
