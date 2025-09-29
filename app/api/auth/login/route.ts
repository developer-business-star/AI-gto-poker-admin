import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log('Frontend API: Admin login attempt for:', username);

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Call backend admin login API
    console.log('Calling backend:', `${BACKEND_URL}/api/auth/admin-login`);
    
    const response = await fetch(`${BACKEND_URL}/api/auth/admin-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username, // Backend expects email field
        password: password
      }),
    });

    const data = await response.json();
    console.log('Backend response:', { success: data.success, status: response.status });

    if (!response.ok || !data.success) {
      return NextResponse.json(
        { success: false, error: data.error || 'Login failed' },
        { status: response.status }
      );
    }

    // Backend already verified admin privileges

    // Create response with admin token
    const adminResponse = NextResponse.json({
      success: true,
      message: 'Admin login successful',
      data: {
        user: data.data.user,
        token: data.data.token
      }
    });

    // Set admin token as regular cookie (not httpOnly) so client can read it
    adminResponse.cookies.set('adminToken', data.data.token, {
      httpOnly: false, // Allow client-side access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    console.log('Frontend API: Admin login successful, cookie set for user:', data.data.user.email);
    console.log('Frontend API: Token length:', data.data.token.length);
    return adminResponse;

  } catch (error) {
    console.error('Frontend API: Admin login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}