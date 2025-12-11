import { NextResponse } from 'next/server';
import { z } from 'zod';
import mysql from 'mysql2/promise';

const schema = z.object({
    email: z.string().email(),
    pin: z.string().length(6),
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
        const { email, pin } = schema.parse(body);

        // Verify PIN
        const [rows] = await pool.execute<any[]>(
            `SELECT * FROM password_resets 
            WHERE email = ? AND token = ? AND expires_at > CURRENT_TIMESTAMP`,
            [email, pin]
        );

        if (rows.length === 0) {
            return NextResponse.json({ valid: false, message: 'Invalid or expired PIN' }, { status: 400 });
        }

        return NextResponse.json({ valid: true, message: 'PIN verified' });

    } catch (error) {
        console.error('Verify PIN error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
