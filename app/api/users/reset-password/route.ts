import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    console.log('Frontend API: Resetting password for user:', userId);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get admin token from cookies
    const adminToken = request.cookies.get('adminToken')?.value;

    if (!adminToken) {
      return NextResponse.json(
        { success: false, error: 'Admin authentication required' },
        { status: 401 }
      );
    }

    // Call backend reset password API
    const response = await fetch(`${BACKEND_URL}/api/auth/users/${userId}/reset-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        newPassword: '123456'
      }),
    });

    const data = await response.json();
    console.log('Backend reset password response:', { success: data.success, status: response.status });

    if (!response.ok || !data.success) {
      return NextResponse.json(
        { success: false, error: data.error || 'Failed to reset password' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Password reset to "123456" successfully'
    });

  } catch (error) {
    console.error('Frontend API: Reset password error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}