import nodemailer from 'nodemailer';

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_PASS  // Your Gmail App Password
    }
});

// Helper to send emails
const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
            console.warn('⚠️ Mailing credentials missing. Email not sent:', { to, subject });
            return false;
        }

        const info = await transporter.sendMail({
            from: `"Smart Career Navigator" <${process.env.GMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log('✅ Email sent:', info.messageId);
        return true;
    } catch (error) {
        console.error('❌ Error sending email:', error);
        return false;
    }
};

// 1. Welcome Email (Registration)
export const sendWelcomeEmail = async (email: string, name: string) => {
    const subject = "Welcome to Smart Career Navigator! 🚀";
    const html = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(to right, #2563eb, #9333ea); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0;">Welcome Aboard!</h1>
            </div>
            <div style="padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 10px 10px;">
                <p>Hi <strong>${name}</strong>,</p>
                <p>Your account has been created successfully. We're thrilled to have you join <strong>Smart Career Navigator</strong>.</p>
                <p>Here's what you can do now:</p>
                <ul>
                    <li>🎯 Generate your personalized career plan</li>
                    <li>📊 Analyze your resume with AI</li>
                    <li>💡 Discover startup ideas tailored to you</li>
                </ul>
                <p style="margin-top: 30px; text-align: center;">
                    <a href="http://localhost:3000/dashboard" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Dashboard</a>
                </p>
                <p style="margin-top: 30px; color: #666; font-size: 12px;">If you didn't create this account, please ignore this email.</p>
            </div>
        </div>
    `;
    return sendEmail(email, subject, html);
};

// 2. Login Notification
export const sendLoginNotification = async (email: string, name: string) => {
    const subject = "New Login Detected 🔐";
    const time = new Date().toLocaleString();
    const html = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Login Alert</h2>
            <p>Hi <strong>${name}</strong>,</p>
            <p>You have successfully logged in to Smart Career Navigator on <strong>${time}</strong>.</p>
            <p>If this was you, everything is safe. If you didn't log in, please reset your password immediately.</p>
        </div>
    `;
    return sendEmail(email, subject, html);
};

// 3. OTP Email (Forgot Password)
export const sendOTPEmail = async (email: string, otp: string) => {
    const subject = "Your Password Reset OTP 🔑";
    const html = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
            <div style="padding: 20px; border: 1px solid #ddd; border-radius: 10px; text-align: center;">
                <h2 style="color: #2563eb;">Password Reset Request</h2>
                <p>Use the following OTP to reset your password. This code expires in <strong>10 minutes</strong>.</p>
                <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; color: #333;">
                    ${otp}
                </div>
                <p style="color: #666; font-size: 14px;">Do not share this code with anyone.</p>
            </div>
        </div>
    `;
    return sendEmail(email, subject, html);
};

// 4. Password Reset Success
export const sendPasswordResetSuccess = async (email: string) => {
    const subject = "Password Reset Successful ✅";
    const html = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Password Changed</h2>
            <p>Your password has been reset successfully. You can now log in with your new credentials.</p>
            <p style="margin-top: 20px;">
                <a href="http://localhost:3000/login">Login Now</a>
            </p>
        </div>
    `;
    return sendEmail(email, subject, html);
};
