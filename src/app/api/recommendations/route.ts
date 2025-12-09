import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const data = await req.json();

        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        const recommendations = [
            {
                id: '1',
                title: 'Frontend Developer',
                match: 95,
                description: 'Build beautiful user interfaces using React and modern CSS.',
                timeframe: '4-6 months'
            },
            {
                id: '2',
                title: 'Full Stack Engineer',
                match: 85,
                description: 'Master both frontend and backend technologies.',
                timeframe: '6-8 months'
            },
            {
                id: '3',
                title: 'Product Manager',
                match: 70,
                description: 'Lead product development and strategy.',
                timeframe: '3-5 months'
            }
        ];

        return NextResponse.json({ recommendations });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
