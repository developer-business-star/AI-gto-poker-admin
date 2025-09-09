import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the user is trying to access admin routes
  if (pathname.startsWith('/admin')) {
    // Allow access to login page and root admin page
    if (pathname === '/admin/login' || pathname === '/admin') {
      return NextResponse.next();
    }
    
    // Check for admin token in cookies or headers
    const adminToken = request.cookies.get('adminToken')?.value || 
                      request.headers.get('authorization')?.replace('Bearer ', '');
    
    // If no token, redirect to login
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Verify admin token with backend
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/verify-admin-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: adminToken }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        // Token is invalid or user doesn't have admin privileges, redirect to login
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      // Token is valid and user has admin privileges
      return NextResponse.next();
    } catch (error) {
      console.error('Admin token verification error:', error);
      // Error verifying token, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};