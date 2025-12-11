import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

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

        // Check if user is an agent
        if (user.type !== 'agent') {
            return NextResponse.json(
                { success: false, message: 'Access denied: Agents only' },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { message_id, reply_message } = body;

        if (!message_id || !reply_message) {
            return NextResponse.json(
                { success: false, message: 'Message ID and reply message are required' },
                { status: 400 }
            );
        }

        // Reply to the message in the database
        await db.replyToMessage(message_id, reply_message);

        return NextResponse.json({
            success: true,
            message: 'Reply sent successfully!',
        });

    } catch (error) {
        console.error('Reply message error:', error);
        return NextResponse.json(
            { success: false, message: error instanceof Error ? error.message : 'Failed to send reply' },
            { status: 500 }
        );
    }
}
