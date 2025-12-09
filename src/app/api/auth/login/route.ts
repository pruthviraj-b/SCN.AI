import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        await new Promise(resolve => setTimeout(resolve, 1000));

        if (email === 'test@example.com' && password === 'password') {
            return NextResponse.json({
                success: true,
                user: {
                    id: 'user_123',
                    email: 'test@example.com',
                    name: 'Test User'
                },
                token: 'mock-jwt-token-login'
            });
        }

        // Allow any login for MVP demo purposes if not specific test user
        if (email && password) {
            return NextResponse.json({
                success: true,
                user: {
                    id: 'user_' + Math.random().toString(36).substr(2, 9),
                    email,
                    name: 'Demo User'
                },
                token: 'mock-jwt-token-login'
            });
        }

        return NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
        );

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
