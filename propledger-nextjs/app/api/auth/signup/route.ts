import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, createSession } from '@/lib/auth';
import { z } from 'zod';

const signupSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(1, 'Phone number is required'),
  country: z.string().optional(),
  city: z.string().optional(),
  userType: z.enum(['investor', 'property_owner', 'agent', 'developer']),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  terms: z.boolean().optional(),
  newsletter: z.boolean().optional(),
  // Agent-specific fields
  licenseNumber: z.string().optional(),
  experience: z.string().optional(),
  specialization: z.string().optional(),
  agency: z.string().optional(),
  agreeAgent: z.boolean().optional(),
  // OAuth fields
  oauthProvider: z.string().optional(),
  oauthId: z.string().optional(),
  profilePictureUrl: z.string().optional(),
  emailVerified: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = signupSchema.parse(body);

    // Additional validation for agent
    if (validatedData.userType === 'agent') {
      if (!validatedData.licenseNumber || !validatedData.experience || !validatedData.specialization || !validatedData.city) {
        return NextResponse.json(
          { success: false, message: 'All agent fields are required' },
          { status: 400 }
        );
      }
      if (!validatedData.agreeAgent) {
        return NextResponse.json(
          { success: false, message: 'You must agree to the agent guidelines' },
          { status: 400 }
        );
      }
    } else {
      // Validate terms for non-agent users
      if (!validatedData.terms) {
        return NextResponse.json(
          { success: false, message: 'You must accept the terms and conditions' },
          { status: 400 }
        );
      }
      if (!validatedData.country) {
        return NextResponse.json(
          { success: false, message: 'Country is required' },
          { status: 400 }
        );
      }
    }

    // Try PHP backend first (for XAMPP compatibility)
    try {
      const phpPayload = {
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone,
        country: validatedData.userType === 'agent' ? (validatedData.city || '') : (validatedData.country || ''),
        userType: validatedData.userType,
        password: validatedData.password,
        newsletter: validatedData.newsletter || false,
        terms: validatedData.terms || false,
      };

      // Agent-specific fields
      if (validatedData.userType === 'agent') {
        Object.assign(phpPayload, {
          licenseNumber: validatedData.licenseNumber || '',
          experience: validatedData.experience || '',
          specialization: validatedData.specialization || '',
          city: validatedData.city || '',
          agency: validatedData.agency || '',
          agreeAgent: validatedData.agreeAgent || false,
        });
      }

      // OAuth fields if present
      if (validatedData.oauthProvider) {
        Object.assign(phpPayload, {
          oauthProvider: validatedData.oauthProvider,
          oauthId: validatedData.oauthId || '',
          profilePictureUrl: validatedData.profilePictureUrl || '',
          emailVerified: validatedData.emailVerified || false,
        });
      }

      const phpResponse = await fetch('http://localhost/PROPLEDGER/auth/signup_handler.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(phpPayload),
      });

      const phpData = await phpResponse.json();

      if (phpData.success) {
        return NextResponse.json({
          success: true,
          message: 'Account created successfully!',
          user_id: phpData.user_id,
          user: {
            id: phpData.user_id,
            name: validatedData.fullName,
            email: validatedData.email,
            type: validatedData.userType,
          },
          redirect: validatedData.userType === 'agent' ? '/agent-dashboard' : '/dashboard',
        });
      } else {
        throw new Error(phpData.message || 'PHP backend error');
      }
    } catch (phpError) {
      console.log('PHP backend not available, trying PostgreSQL...', phpError);

      // Fallback to PostgreSQL if PHP backend is not available
      // Check if email already exists
      const existingUser = await db.getUserByEmail(validatedData.email);
      if (existingUser) {
        return NextResponse.json(
          { success: false, message: 'Email already registered' },
          { status: 400 }
        );
      }

      // Hash password
      const password_hash = await hashPassword(validatedData.password);

      // Create user
      const userId = await db.createUser({
        full_name: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone,
        country: validatedData.userType === 'agent' ? (validatedData.city || '') : (validatedData.country || ''),
        user_type: validatedData.userType,
        password_hash,
        newsletter_subscribed: validatedData.newsletter || false,
        oauth_provider: validatedData.oauthProvider,
        oauth_id: validatedData.oauthId,
        profile_picture_url: validatedData.profilePictureUrl,
        email_verified: validatedData.emailVerified || false,
      });

      // If agent, create agent record
      if (validatedData.userType === 'agent') {
        await db.createAgent({
          user_id: userId,
          license_number: validatedData.licenseNumber!,
          experience: validatedData.experience!,
          specialization: validatedData.specialization!,
          city: validatedData.city!,
          agency: validatedData.agency,
          phone: validatedData.phone,
        });
      }

      // Get user info
      const user = await db.getUserById(userId);

      if (!user) {
        throw new Error('Failed to create user');
      }

      // Create session
      await createSession(user);

      return NextResponse.json({
        success: true,
        message: 'Account created successfully!',
        user_id: userId,
        user: {
          id: userId,
          name: user.full_name,
          email: user.email,
          type: user.user_type,
        },
        redirect: user.user_type === 'agent' ? '/agent-dashboard' : '/dashboard',
      });
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, message: 'Connection error. Please make sure XAMPP is running.' },
      { status: 500 }
    );
  }
}
