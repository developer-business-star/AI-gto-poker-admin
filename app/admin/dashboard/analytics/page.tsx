'use client';

import AdminLayout from '../../components/AdminLayout';

export default function AnalyticsPage() {
  return (
    <AdminLayout activeTab="analytics" title="Analytics Dashboard">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Analytics Dashboard</h3>
        <p className="text-slate-300">This section is under development. More features coming soon!</p>
        
        {/* Placeholder for analytics features */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-4">User Engagement</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Daily Active Users</span>
                <span className="text-green-400 font-semibold">1,247</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Session Duration</span>
                <span className="text-blue-400 font-semibold">24.5 min</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Bounce Rate</span>
                <span className="text-yellow-400 font-semibold">32.1%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-4">Feature Usage</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                <span className="text-slate-300">Hand Analysis</span>
                <span className="text-purple-400 font-semibold">89%</span>
              </div>
              
              <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                <span className="text-slate-300">Range Calculator</span>
                <span className="text-blue-400 font-semibold">67%</span>
              </div>
              
              <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                <span className="text-slate-300">Training Modules</span>
                <span className="text-green-400 font-semibold">54%</span>
              </div>
              
              <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                <span className="text-slate-300">Strategy Guides</span>
                <span className="text-yellow-400 font-semibold">43%</span>
              </div>
              
              <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                <span className="text-slate-300">Live Coaching</span>
                <span className="text-red-400 font-semibold">28%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-white font-medium mb-4">Performance Metrics</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-400">94.2%</p>
              <p className="text-slate-400 text-sm">System Uptime</p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-400">1.2s</p>
              <p className="text-slate-400 text-sm">Avg Response Time</p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-400">4.7/5</p>
              <p className="text-slate-400 text-sm">User Satisfaction</p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-yellow-400">12.5%</p>
              <p className="text-slate-400 text-sm">Conversion Rate</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}