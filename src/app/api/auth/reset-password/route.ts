import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { sendPasswordResetSuccess } from "@/lib/email";
import { z } from "zod";

const resetPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
    otp: z.string().length(6, "OTP must be 6 digits"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 1. Validation
        const result = resetPasswordSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: result.error.errors[0].message },
                { status: 400 }
            );
        }

        const { email, otp, newPassword } = result.data;

        // 2. Verify OTP
        const isValidOTP = db.otp.verify(email, otp);
        if (!isValidOTP) {
            return NextResponse.json(
                { error: "Invalid or expired OTP" },
                { status: 400 }
            );
        }

        // 3. Hash New Password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 4. Update User Password
        const updatedUser = await db.user.update(email, {
            password: hashedPassword
        });

        if (!updatedUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // 5. Delete Used OTP
        db.otp.delete(email);

        // 6. Send Confirmation Email
        sendPasswordResetSuccess(email).catch(err => console.error("Failed to set reset email:", err));

        return NextResponse.json(
            { message: "Password reset successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Reset Password Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
