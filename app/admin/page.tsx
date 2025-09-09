'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRoot() {
  const router = useRouter();

  useEffect(() => {
    // Only run authentication check on client side
    if (typeof window === 'undefined') {
      return;
    }

    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        // Get token from cookies first, then localStorage as backup
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find(c => c.trim().startsWith('adminToken='));
        let token = tokenCookie ? tokenCookie.split('=')[1] : null;

        if (!token) {
          token = localStorage.getItem('adminToken');
        }

        if (token) {
          // Verify token with backend
          const response = await fetch('/api/auth/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });

          const data = await response.json();

          if (response.ok && data.success) {
            // User is authenticated, redirect to dashboard
            console.log('Admin root: User authenticated, redirecting to dashboard');
            router.push('/admin/dashboard');
            return;
          }
        }

        // No valid token, redirect to login
        console.log('Admin root: No valid token, redirecting to login');
        router.push('/admin/login');
      } catch (error) {
        console.error('Admin root: Auth check error:', error);
        // On error, redirect to login
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  // Show loading while checking authentication
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading Admin Panel...</p>
        <p className="text-slate-400 text-sm mt-2">Checking authentication...</p>
      </div>
    </div>
  );
}