import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import mysql from 'mysql2/promise';

export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Authentication required' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { message_id } = body;

        if (!message_id) {
            return NextResponse.json(
                { success: false, message: 'Message ID is required' },
                { status: 400 }
            );
        }

        // Delete message from database
        const pool = mysql.createPool({
            host: process.env.MYSQL_HOST || 'localhost',
            port: parseInt(process.env.MYSQL_PORT || '3306'),
            user: process.env.MYSQL_USER || 'root',
            password: process.env.MYSQL_PASSWORD || '',
            database: process.env.MYSQL_DATABASE || 'propledger_db',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });

        await pool.execute(
            'DELETE FROM manager_messages WHERE id = ?',
            [message_id]
        );

        return NextResponse.json({
            success: true,
            message: 'Message deleted successfully',
        });

    } catch (error) {
        console.error('Delete message error:', error);
        return NextResponse.json(
            { success: false, message: error instanceof Error ? error.message : 'Failed to delete message' },
            { status: 500 }
        );
    }
}
