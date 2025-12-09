import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.email !== 'pruthviraj1984bc@gmail.com') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resources = db.learningResource.getAll();
    return NextResponse.json(resources);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.email !== 'pruthviraj1984bc@gmail.com') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await req.json();
        const newResource = db.learningResource.create(data);
        return NextResponse.json(newResource, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.email !== 'pruthviraj1984bc@gmail.com') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id, ...data } = await req.json();
        const updated = db.learningResource.update(id, data);

        if (!updated) {
            return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update resource' }, { status: 500 });
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

        db.learningResource.delete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete resource' }, { status: 500 });
    }
}
