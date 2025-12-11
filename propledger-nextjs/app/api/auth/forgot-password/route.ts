import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendPasswordResetEmail } from '@/lib/mail';
import { z } from 'zod';
import mysql from 'mysql2/promise';

const schema = z.object({
    email: z.string().email(),
});

// Get MySQL connection from environment
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'propledger_db',
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = schema.parse(body);

        // Check if user exists using db helper
        const user = await db.getUserByEmail(email);

        if (!user) {
            // Return success even if user doesn't exist to prevent enumeration
            return NextResponse.json({ success: true, message: 'If an account exists, a PIN has been sent.' });
        }

        // Generate 6-digit PIN
        const pin = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        // Store PIN in DB (upsert) - MySQL syntax
        await pool.execute(
            `INSERT INTO password_resets (email, token, expires_at)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE token = ?, expires_at = ?, created_at = CURRENT_TIMESTAMP`,
            [email, pin, expiresAt, pin, expiresAt]
        );

        // Send email with PIN
        try {
            await sendPasswordResetEmail(email, pin);
            console.log(`Password reset PIN sent to ${email}`);
        } catch (emailError: any) {
            console.error('Email service error:', emailError);
            return NextResponse.json({
                success: false,
                error: `Failed to send email: ${emailError.message}. Please check your email configuration in .env.local`
            }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'PIN sent to your email. Please check your inbox and spam folder.' });

    } catch (error) {
        console.error('Forgot password error:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }
        // Return actual error for debugging
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
    }
}
