'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, ArrowRight } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in - check both localStorage and cookies
    const token = localStorage.getItem('adminToken') || 
                  document.cookie.split(';').find(c => c.trim().startsWith('adminToken='))?.split('=')[1];
    if (token) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            GTO Poker AI
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Assistant
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Advanced AI-powered poker strategy assistant with game theory optimal analysis, 
            real-time hand evaluation, and comprehensive training tools.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Shield className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">AI-Powered Analysis</h3>
            <p className="text-slate-300 text-sm">
              Advanced machine learning algorithms provide optimal poker strategies
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <ArrowRight className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Real-Time Strategy</h3>
            <p className="text-slate-300 text-sm">
              Get instant recommendations for every hand and situation
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Professional Grade</h3>
            <p className="text-slate-300 text-sm">
              Used by professional players and poker coaches worldwide
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/admin/login')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
          >
            <Shield className="w-5 h-5 mr-2" />
            Admin Portal
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          
          <button className="border border-white/20 text-white hover:bg-white/10 font-semibold py-4 px-8 rounded-lg transition-all duration-200">
            Learn More
          </button>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-sm">
            © 2024 GTO Poker AI Assistant. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
