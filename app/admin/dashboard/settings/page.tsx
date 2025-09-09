'use client';

import AdminLayout from '../../components/AdminLayout';

export default function SettingsPage() {
  return (
    <AdminLayout activeTab="settings" title="System Settings">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">System Settings</h3>
        <p className="text-slate-300">This section is under development. More features coming soon!</p>
        
        {/* Placeholder for settings features */}
        <div className="mt-6 space-y-6">
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-4">General Settings</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Maintenance Mode</p>
                  <p className="text-slate-400 text-sm">Enable system maintenance mode</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">User Registration</p>
                  <p className="text-slate-400 text-sm">Allow new user registrations</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Email Notifications</p>
                  <p className="text-slate-400 text-sm">Send system notifications via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-4">Security Settings</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  defaultValue="60"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Maximum Login Attempts
                </label>
                <input
                  type="number"
                  defaultValue="5"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Two-Factor Authentication</p>
                  <p className="text-slate-400 text-sm">Require 2FA for admin accounts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-4">API Configuration</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  API Rate Limit (requests per minute)
                </label>
                <input
                  type="number"
                  defaultValue="1000"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  API Version
                </label>
                <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="v2.1">v2.1 (Current)</option>
                  <option value="v2.0">v2.0 (Legacy)</option>
                  <option value="v1.9">v1.9 (Deprecated)</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">API Logging</p>
                  <p className="text-slate-400 text-sm">Log all API requests and responses</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button className="px-6 py-2 text-slate-300 hover:text-white transition-colors duration-200">
              Cancel
            </button>
            <button className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}