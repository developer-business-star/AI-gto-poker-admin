import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email } = body;

    console.log('Frontend API: Adding new user:', { fullName, email });

    if (!fullName || !email) {
      return NextResponse.json(
        { success: false, error: 'Full name and email are required' },
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

    // Call backend add user API
    const response = await fetch(`${BACKEND_URL}/api/auth/add-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        fullName,
        email,
        password: '123456' // Default password
      }),
    });

    const data = await response.json();
    console.log('Backend add user response:', { success: data.success, status: response.status });

    if (!response.ok || !data.success) {
      return NextResponse.json(
        { success: false, error: data.error || 'Failed to create user' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      data: data.data
    });

  } catch (error) {
    console.error('Frontend API: Add user error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}