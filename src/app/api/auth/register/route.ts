import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "@/lib/email";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 1. Validation
        const result = registerSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: result.error.errors[0].message },
                { status: 400 }
            );
        }

        const { name, email, password } = result.data;

        // 2. Check if user already exists
        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 400 }
            );
        }

        // 3. Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create User
        await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                plans: { create: [] }
            },
        });

        // 5. Send Welcome Email (Fire and forget, don't await blocking response)
        sendWelcomeEmail(email, name).catch(err => console.error("Failed to send welcome email:", err));

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        );

    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
