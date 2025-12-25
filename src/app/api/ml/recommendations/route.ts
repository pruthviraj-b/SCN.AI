/**
 * Next.js API Route: ML Recommendations
 * 
 * Integrates with Python ML service to get career recommendations
 */

import { NextRequest, NextResponse } from 'next/server';

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
    try {
        const userProfile = await request.json();

        // Call Python ML service
        const response = await fetch(`${ML_SERVICE_URL}/api/ml/recommendations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userProfile),
        });

        if (!response.ok) {
            throw new Error(`ML service error: ${response.statusText}`);
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('ML recommendations error:', error);

        // Fallback to existing matching algorithm if ML service is down
        return NextResponse.json(
            {
                success: false,
                error: 'ML service unavailable, using fallback algorithm',
                useFallback: true
            },
            { status: 503 }
        );
    }
}
