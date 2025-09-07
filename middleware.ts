import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the user is trying to access admin routes
  if (pathname.startsWith('/admin')) {
    // Allow access to login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }
    
    // Check for admin token in cookies or headers
    const adminToken = request.cookies.get('adminToken')?.value || 
                      request.headers.get('authorization')?.replace('Bearer ', '');
    
    // If no token, redirect to login
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};