import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
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
                { success: false, message: 'Access denied: Agent access required' },
                { status: 403 }
            );
        }

        // Get messages for this agent
        // The agent's name is stored in user.name (from the session)
        const agentName = user.name;

        if (!agentName) {
            return NextResponse.json(
                { success: false, message: 'Agent name not found' },
                { status: 400 }
            );
        }

        // Get agent messages from the database
        const messages = await db.getAgentMessages(agentName);

        // Count unread messages
        const unreadCount = messages.filter(msg => msg.status === 'unread').length;

        return NextResponse.json({
            success: true,
            messages,
            total_count: messages.length,
            unread_count: unreadCount,
            agent_name: agentName,
            user_id: user.id,
        });

    } catch (error) {
        console.error('Get agent messages error:', error);
        return NextResponse.json(
            { success: false, message: error instanceof Error ? error.message : 'Failed to retrieve messages' },
            { status: 500 }
        );
    }
}
