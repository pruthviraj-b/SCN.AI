import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { logger } from '@/lib/logger';

export async function POST(request: Request) {
    try {
        const { email, password, name, data } = await request.json();

        if (!email || !password || !name) {
            return NextResponse.json(
                { error: 'Name, email, and password are required' },
                { status: 400 }
            );
        }

        // Name validation - allow letters, spaces, hyphens, and apostrophes
        if (name.length < 2 || name.length > 50 || !/^[a-zA-Z\s\-']+$/.test(name.trim())) {
            return NextResponse.json({ error: 'Name must be 2-50 characters and contain only letters, spaces, hyphens, or apostrophes' }, { status: 400 });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
        }

        // Password validation
        if (password.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password)) {
            return NextResponse.json({ error: 'Password must be at least 8 characters and contain uppercase, lowercase, and number' }, { status: 400 });
        }

        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                plans: data ? {
                    create: {
                        title: `Career Plan - ${new Date().toLocaleDateString()}`,
                        data: JSON.stringify(data)
                    }
                } : undefined
            },
        });

        return NextResponse.json({
            message: 'User created successfully',
            user: { id: user.id, email: user.email, name: user.name }
        });
    } catch (error) {
        logger.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
