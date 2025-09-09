'use client';

import AdminLayout from '../../components/AdminLayout';

export default function AIPerformancePage() {
  return (
    <AdminLayout activeTab="ai" title="AI Performance">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">AI Model Performance</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Accuracy Rate</span>
                <span className="text-green-400 font-semibold">94.2%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '94.2%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Response Time</span>
                <span className="text-blue-400 font-semibold">1.2s</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Uptime</span>
                <span className="text-purple-400 font-semibold">99.9%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-purple-400 h-2 rounded-full" style={{ width: '99.9%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">Model Training</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Last Training</span>
                <span className="text-white">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Training Data</span>
                <span className="text-white">2.4M hands</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Model Version</span>
                <span className="text-white">v2.1.3</span>
              </div>
              <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                Retrain Model
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">AI Analysis Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-400">15,247</p>
              <p className="text-slate-400 text-sm">Hands Analyzed Today</p>
              <p className="text-green-300 text-xs mt-1">+12.5% from yesterday</p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-blue-400">98.7%</p>
              <p className="text-slate-400 text-sm">Analysis Accuracy</p>
              <p className="text-blue-300 text-xs mt-1">+0.3% improvement</p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-purple-400">0.8s</p>
              <p className="text-slate-400 text-sm">Avg Analysis Time</p>
              <p className="text-purple-300 text-xs mt-1">-0.2s faster</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Model Health Monitor</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                <div>
                  <p className="text-white font-medium">Primary Model</p>
                  <p className="text-slate-400 text-sm">GTO Solver v2.1.3</p>
                </div>
              </div>
              <span className="text-green-400 font-semibold">Healthy</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                <div>
                  <p className="text-white font-medium">Range Calculator</p>
                  <p className="text-slate-400 text-sm">Equity Engine v1.8.2</p>
                </div>
              </div>
              <span className="text-green-400 font-semibold">Healthy</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                <div>
                  <p className="text-white font-medium">Training Pipeline</p>
                  <p className="text-slate-400 text-sm">Data Processing v3.0.1</p>
                </div>
              </div>
              <span className="text-yellow-400 font-semibold">Busy</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                <div>
                  <p className="text-white font-medium">API Gateway</p>
                  <p className="text-slate-400 text-sm">Request Handler v2.5.0</p>
                </div>
              </div>
              <span className="text-green-400 font-semibold">Healthy</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}