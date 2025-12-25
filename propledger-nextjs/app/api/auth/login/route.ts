import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email, password, loginType } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }

    const supabase = createSupabaseAdminClient()

    // Sign in with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError || !authData.user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password. Please try again.' },
        { status: 401 }
      )
    }

    // Get user profile from public.users table
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    if (profileError || !userProfile) {
      return NextResponse.json(
        { success: false, message: 'User profile not found' },
        { status: 404 }
      )
    }

    // Check if user is an agent (for agent login)
    if (loginType === 'agent') {
      const { data: agentData } = await supabase
        .from('agents')
        .select('*')
        .eq('user_id', authData.user.id)
        .single()

      if (!agentData) {
        return NextResponse.json(
          { success: false, message: 'Agent account not found' },
          { status: 403 }
        )
      }

      return NextResponse.json({
        success: true,
        user: {
          id: userProfile.id,
          email: userProfile.email,
          full_name: userProfile.full_name,
          user_type: 'agent',
        },
        redirect: '/agent-dashboard',
      })
    }

    // Regular user login
    return NextResponse.json({
      success: true,
      user: {
        id: userProfile.id,
        email: userProfile.email,
        full_name: userProfile.full_name,
        user_type: userProfile.user_type,
      },
      redirect: '/dashboard',
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred during login' },
      { status: 500 }
    )
  }
}
