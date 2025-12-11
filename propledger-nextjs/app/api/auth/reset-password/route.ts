import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import mysql from 'mysql2/promise';

const schema = z.object({
  email: z.string().email(),
  pin: z.string().length(6),
  newPassword: z.string().min(6),
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
    const { email, pin, newPassword } = schema.parse(body);

    // Verify PIN exists and not expired
    const [resetRecord] = await pool.execute<any[]>(
      `SELECT * FROM password_resets 
            WHERE email = ? AND token = ? AND expires_at > CURRENT_TIMESTAMP`,
      [email, pin]
    );

    if (resetRecord.length === 0) {
      return NextResponse.json({ success: false, message: 'Invalid or expired PIN' }, { status: 400 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    await pool.execute(
      'UPDATE users SET password_hash = ? WHERE email = ?',
      [hashedPassword, email]
    );

    // Delete reset token
    await pool.execute(
      'DELETE FROM password_resets WHERE email = ?',
      [email]
    );

    return NextResponse.json({ success: true, message: 'Password updated successfully' });

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
