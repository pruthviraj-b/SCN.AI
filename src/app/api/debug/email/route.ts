import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
    try {
        const user = process.env.GMAIL_USER;
        const pass = process.env.GMAIL_PASS;

        if (!user || !pass) {
            return NextResponse.json({
                status: "error",
                message: "Missing Credentials",
                details: {
                    user: user ? "Present" : "Missing",
                    pass: pass ? "Present" : "Missing"
                }
            }, { status: 500 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user, pass }
        });

        // Verify connection configuration
        await new Promise((resolve, reject) => {
            transporter.verify(function (error, success) {
                if (error) reject(error);
                else resolve(success);
            });
        });

        return NextResponse.json({
            status: "success",
            message: "SMTP Connection Successful! Credentials are correct."
        });

    } catch (error: any) {
        return NextResponse.json({
            status: "error",
            message: "SMTP Connection Failed",
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
