import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the user is trying to access admin routes
  if (pathname.startsWith('/admin')) {
    // Allow access to login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }
    
    // Check for admin token in cookies
    const adminToken = request.cookies.get('adminToken')?.value;
    
    // If no token, redirect to login
    if (!adminToken) {
      console.log('Middleware: No admin token found, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // For middleware, we'll just check if token exists
    // The actual verification will be done by the dashboard page
    console.log('Middleware: Admin token found, allowing access to:', pathname);
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};