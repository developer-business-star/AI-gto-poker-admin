import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, fullName, email, isActive, adminAllowed } = body;

    console.log('Frontend API: Updating user:', userId, { fullName, email, isActive, adminAllowed });

    if (!userId || !fullName || !email || isActive === undefined || adminAllowed === undefined) {
      return NextResponse.json(
        { success: false, error: 'User ID, full name, email, active status, and admin status are required' },
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

    // Call backend update user API
    const response = await fetch(`${BACKEND_URL}/api/auth/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        fullName,
        email,
        isActive,
        adminAllowed
      }),
    });

    const data = await response.json();
    console.log('Backend update response:', { success: data.success, status: response.status });

    if (!response.ok || !data.success) {
      return NextResponse.json(
        { success: false, error: data.error || 'Failed to update user' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      data: data.data
    });

  } catch (error) {
    console.error('Frontend API: Update user error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}