'use client';

import AdminLayout from '../../components/AdminLayout';

export default function SupportPage() {
  return (
    <AdminLayout activeTab="support" title="Support Center">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Support Center</h3>
        <p className="text-slate-300">This section is under development. More features coming soon!</p>
        
        {/* Placeholder for support features */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-4">Support Tickets</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                  <div>
                    <p className="text-white font-medium">High Priority</p>
                    <p className="text-slate-400 text-sm">Payment processing issue</p>
                  </div>
                </div>
                <span className="text-red-400 font-semibold">3</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                  <div>
                    <p className="text-white font-medium">Medium Priority</p>
                    <p className="text-slate-400 text-sm">Feature requests</p>
                  </div>
                </div>
                <span className="text-yellow-400 font-semibold">12</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                  <div>
                    <p className="text-white font-medium">Low Priority</p>
                    <p className="text-slate-400 text-sm">General inquiries</p>
                  </div>
                </div>
                <span className="text-green-400 font-semibold">8</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-4">Response Times</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">High Priority</span>
                <span className="text-green-400 font-semibold">&lt; 2 hours</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Medium Priority</span>
                <span className="text-blue-400 font-semibold">&lt; 24 hours</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Low Priority</span>
                <span className="text-yellow-400 font-semibold">&lt; 3 days</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-white font-medium mb-4">Recent Support Activity</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full mr-3 bg-green-400" />
                <div>
                  <p className="text-white font-medium">Ticket #1247 resolved</p>
                  <p className="text-slate-400 text-sm">Payment issue fixed for user john@example.com</p>
                </div>
              </div>
              <span className="text-slate-400 text-sm">2 minutes ago</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full mr-3 bg-blue-400" />
                <div>
                  <p className="text-white font-medium">New ticket #1248 created</p>
                  <p className="text-slate-400 text-sm">Feature request from premium user</p>
                </div>
              </div>
              <span className="text-slate-400 text-sm">15 minutes ago</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full mr-3 bg-yellow-400" />
                <div>
                  <p className="text-white font-medium">Ticket #1246 escalated</p>
                  <p className="text-slate-400 text-sm">Technical issue requires developer attention</p>
                </div>
              </div>
              <span className="text-slate-400 text-sm">1 hour ago</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full mr-3 bg-purple-400" />
                <div>
                  <p className="text-white font-medium">Knowledge base updated</p>
                  <p className="text-slate-400 text-sm">Added new FAQ about hand analysis</p>
                </div>
              </div>
              <span className="text-slate-400 text-sm">3 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}