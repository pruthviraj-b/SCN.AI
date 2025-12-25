import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendOTPEmail } from "@/lib/email";
import { z } from "zod";

const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 1. Validation
        const result = forgotPasswordSchema.safeParse(body);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            return NextResponse.json(
                { error: fieldErrors.email?.[0] || "Invalid request" },
                { status: 400 }
            );
        }

        const { email } = result.data;

        // 2. Check if user exists
        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user) {
            // For security, don't reveal if email exists or not, but for UX we might want to (user decision).
            // Let's return generic success to prevent enumeration, or specific error if requested.
            // Requirement says "Validate email exist", implies returning error if it doesn't.
            return NextResponse.json(
                { error: "User not found with this email" },
                { status: 404 }
            );
        }

        // 3. Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // 4. Store OTP in DB
        db.otp.create(email, otp);

        // 5. Send OTP Email
        await sendOTPEmail(email, otp);

        return NextResponse.json(
            { message: "OTP sent to your email" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Forgot Password Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
