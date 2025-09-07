'use client';

import { useState, useEffect } from 'react';

interface TokenTestResult {
  response?: {
    success: boolean;
    data?: {
      user: {
        email: string;
        fullName: string;
        adminAllowed: boolean;
      };
    };
    error?: string;
  };
  status?: number;
  error?: string;
}

export default function AdminTest() {
  const [cookies, setCookies] = useState('');
  const [tokenTest, setTokenTest] = useState<TokenTestResult | null>(null);

  useEffect(() => {
    // Get all cookies
    setCookies(document.cookie);

    // Test token verification
    const testToken = async () => {
      const token = document.cookie
        .split(';')
        .find(c => c.trim().startsWith('adminToken='))
        ?.split('=')[1];

      if (!token) {
        setTokenTest({ error: 'No token found' });
        return;
      }

      try {
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        setTokenTest({ response: data, status: response.status });
      } catch (error) {
        setTokenTest({ error: error instanceof Error ? error.message : 'Unknown error' });
      }
    };

    testToken();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Authentication Test</h1>
        
        <div className="bg-slate-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Cookies</h2>
          <pre className="text-green-400 text-sm overflow-x-auto">
            {cookies || 'No cookies found'}
          </pre>
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Token Verification Test</h2>
          <pre className="text-green-400 text-sm overflow-x-auto">
            {JSON.stringify(tokenTest, null, 2)}
          </pre>
        </div>

        <div className="mt-6">
          <a 
            href="/admin/dashboard" 
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}