'use client';

import AdminLayout from '../../components/AdminLayout';

export default function RevenuePage() {
  return (
    <AdminLayout activeTab="revenue" title="Revenue Management">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Revenue Management</h3>
        <p className="text-slate-300">This section is under development. More features coming soon!</p>
        
        {/* Placeholder for revenue features */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Monthly Revenue</h4>
            <p className="text-2xl font-bold text-green-400">$45,680</p>
            <p className="text-sm text-slate-400 mt-1">+23.8% from last month</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Subscription Revenue</h4>
            <p className="text-2xl font-bold text-purple-400">$38,240</p>
            <p className="text-sm text-slate-400 mt-1">83.7% of total revenue</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">One-time Purchases</h4>
            <p className="text-2xl font-bold text-blue-400">$7,440</p>
            <p className="text-sm text-slate-400 mt-1">16.3% of total revenue</p>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-white font-medium mb-4">Revenue Breakdown</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">Premium Subscriptions</p>
                <p className="text-slate-400 text-sm">Monthly recurring revenue</p>
              </div>
              <span className="text-purple-400 font-semibold">$28,500</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">Basic Subscriptions</p>
                <p className="text-slate-400 text-sm">Monthly recurring revenue</p>
              </div>
              <span className="text-blue-400 font-semibold">$9,740</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">Strategy Guides</p>
                <p className="text-slate-400 text-sm">One-time purchases</p>
              </div>
              <span className="text-green-400 font-semibold">$4,680</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">Private Coaching</p>
                <p className="text-slate-400 text-sm">Premium services</p>
              </div>
              <span className="text-yellow-400 font-semibold">$2,760</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}