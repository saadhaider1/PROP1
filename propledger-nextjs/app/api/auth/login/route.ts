import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyPassword, createSession } from '@/lib/auth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
  loginType: z.enum(['user', 'agent']).optional(),
  remember: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = loginSchema.parse(body);
    
    // Find user by email
    const user = await db.getUserByEmail(validatedData.email);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password. Please check your credentials or sign up for a new account.' },
        { status: 400 }
      );
    }
    
    if (!user.is_active) {
      return NextResponse.json(
        { success: false, message: 'Account is deactivated. Please contact support.' },
        { status: 400 }
      );
    }
    
    // Verify password
    const isValidPassword = await verifyPassword(validatedData.password, user.password_hash);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password. Please check your credentials.' },
        { status: 400 }
      );
    }
    
    // Check if login type matches user type
    if (validatedData.loginType) {
      if (validatedData.loginType === 'agent' && user.user_type !== 'agent') {
        return NextResponse.json(
          { success: false, message: 'This account is not registered as an agent. Please use User Login.' },
          { status: 400 }
        );
      }
      if (validatedData.loginType === 'user' && user.user_type === 'agent') {
        return NextResponse.json(
          { success: false, message: 'This is an agent account. Please use Agent Login.' },
          { status: 400 }
        );
      }
    }
    
    // Create session
    await createSession(user);
    
    return NextResponse.json({
      success: true,
      message: 'Login successful!',
      user: {
        id: user.id,
        name: user.full_name,
        full_name: user.full_name,
        email: user.email,
        type: user.user_type,
        user_type: user.user_type,
      },
      redirect: user.user_type === 'agent' ? '/agent-dashboard' : '/dashboard',
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.errors[0].message },
        { status: 400 }
      );
    }
    
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during login. Please try again.' },
      { status: 500 }
    );
  }
}
