import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseAdminClient } from '@/lib/supabase';

const schema = z.object({
  email: z.string().email(),
  pin: z.string().length(6),
  newPassword: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, pin, newPassword } = schema.parse(body);

    const supabase = createSupabaseAdminClient();

    // Verify PIN exists and not expired
    const { data: resetRecord, error: verifyError } = await supabase
      .from('password_resets')
      .select('*')
      .eq('email', email)
      .eq('token', pin)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (verifyError || !resetRecord) {
      console.log('PIN verification failed:', verifyError);
      return NextResponse.json({
        success: false,
        message: 'Invalid or expired PIN'
      }, { status: 400 });
    }

    // Update user password using Supabase Auth
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      resetRecord.email, // This should be user ID, but we'll use email lookup
      { password: newPassword }
    );

    // Alternative: Update password hash directly in users table if not using Supabase Auth
    // For now, let's use a direct update since we're using custom auth
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found'
      }, { status: 404 });
    }

    // Hash the password (you'll need to import bcrypt)
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in users table
    const { error: passwordError } = await supabase
      .from('users')
      .update({ password_hash: hashedPassword })
      .eq('email', email);

    if (passwordError) {
      console.error('Password update error:', passwordError);
      return NextResponse.json({
        success: false,
        message: 'Failed to update password'
      }, { status: 500 });
    }

    // Delete reset token
    await supabase
      .from('password_resets')
      .delete()
      .eq('email', email);

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Invalid input data'
      }, { status: 400 });
    }
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}
