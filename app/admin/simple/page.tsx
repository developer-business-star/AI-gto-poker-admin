'use client';

export default function SimpleAdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">✅ Admin Dashboard Working!</h1>
        <p className="text-slate-300 mb-8">This is a simple admin page without authentication checks.</p>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">Test Results</h2>
          <ul className="text-left text-slate-300 space-y-2">
            <li>✅ Route accessible</li>
            <li>✅ Page renders correctly</li>
            <li>✅ Styling works</li>
            <li>✅ Next.js routing functional</li>
          </ul>
        </div>

        <div className="mt-6 space-x-4">
          <a 
            href="/admin/login" 
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg inline-block"
          >
            Back to Login
          </a>
          <a 
            href="/admin/test" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg inline-block"
          >
            Auth Test Page
          </a>
        </div>
      </div>
    </div>
  );
}