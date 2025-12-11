import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

const messageSchema = z.object({
  manager: z.string().min(1, 'Manager name is required'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject too long'),
  message: z.string().min(1, 'Message is required').max(2000, 'Message too long'),
  priority: z.enum(['normal', 'high', 'urgent']).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await requireAuth();
    
    const body = await request.json();
    
    // Validate input
    const validatedData = messageSchema.parse(body);
    
    // Create message
    const messageId = await db.createMessage({
      user_id: user.id,
      manager_name: validatedData.manager,
      subject: validatedData.subject,
      message: validatedData.message,
      priority: validatedData.priority || 'normal',
      sender_type: 'user',
      receiver_type: 'agent',
    });
    
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
      message_id: messageId,
      manager: validatedData.manager,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.errors[0].message },
        { status: 400 }
      );
    }
    
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    console.error('Send message error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 }
    );
  }
}
