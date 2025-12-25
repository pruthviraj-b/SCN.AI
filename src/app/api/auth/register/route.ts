import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { supabase } from "@/lib/supabase";
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
            const fieldErrors = result.error.flatten().fieldErrors;
            return NextResponse.json(
                { error: fieldErrors.email?.[0] || fieldErrors.password?.[0] || fieldErrors.name?.[0] || "Invalid request" },
                { status: 400 }
            );
        }

        const { name, email, password } = result.data;

        const { name, email, password } = result.data;

        // 2. Sign Up with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: name }
            }
        });

        if (authError) {
            console.error("Supabase Auth Error:", authError);
            return NextResponse.json({ error: authError.message }, { status: 400 });
        }

        if (!authData.user) {
            return NextResponse.json({ error: "Registration failed" }, { status: 500 });
        }

        // 3. Create Profile Entry (Implicit via Trigger usually, but explicit here for safety)
        try {
            await db.user.updateProfile(authData.user.id, {
                full_name: name,
                email: email,
                created_at: new Date().toISOString()
            });
        } catch (dbError) {
            console.error("Profile creation warning:", dbError);
            // Proceeding because auth user is created, profile triggers might handle it
        }

        // 4. Send Welcome Email
        sendWelcomeEmail(email, name).catch(err => console.error("Failed to send welcome email:", err));

        return NextResponse.json(
            { message: "User registered successfully", userId: authData.user.id },
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
