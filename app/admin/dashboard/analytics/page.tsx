'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';

interface AnalyticsData {
  userEngagement: {
    dailyActiveUsers: number;
    sessionDuration: number;
    bounceRate: number;
  };
  featureUsage: {
    handAnalysis: number;
    rangeCalculator: number;
    trainingModules: number;
    strategyGuides: number;
    liveCoaching: number;
  };
  performanceMetrics: {
    systemUptime: number;
    avgResponseTime: number;
    userSatisfaction: number;
    conversionRate: number;
  };
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/analytics/dashboard');
        const data = await response.json();
        
        if (data.success) {
          setAnalyticsData(data.data);
        } else {
          console.error('Failed to fetch analytics:', data.error);
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const ProgressBar = ({ value, color, max = 100 }: { value: number; color: string; max?: number }) => {
    const percentage = Math.min((value / max) * 100, 100);
    
    return (
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  const MetricCard = ({ value, label, color }: { value: string | number; label: string; color: string }) => (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
      <div className={`text-3xl font-bold ${color} mb-2`}>
        {loading ? '...' : value}
      </div>
      <div className="text-slate-300 text-sm">{label}</div>
    </div>
  );

  return (
    <AdminLayout activeTab="analytics" title="Analytics Dashboard">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Analytics Dashboard</h1>
          <p className="text-slate-300 text-lg">This section is under development. More features coming soon!</p>
        </div>

        {/* User Engagement Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-6">User Engagement</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300">Daily Active Users</span>
                  <span className="text-green-400 font-semibold">
                    {loading ? '...' : analyticsData?.userEngagement.dailyActiveUsers.toLocaleString()}
                  </span>
                </div>
                <ProgressBar 
                  value={analyticsData?.userEngagement.dailyActiveUsers || 0} 
                  color="bg-green-400" 
                  max={2000}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1 mr-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300">Session Duration</span>
                  <span className="text-blue-400 font-semibold">
                    {loading ? '...' : `${analyticsData?.userEngagement.sessionDuration || 0} min`}
                  </span>
                </div>
                <ProgressBar 
                  value={analyticsData?.userEngagement.sessionDuration || 0} 
                  color="bg-blue-400" 
                  max={60}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1 mr-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300">Bounce Rate</span>
                  <span className="text-yellow-400 font-semibold">
                    {loading ? '...' : `${analyticsData?.userEngagement.bounceRate || 0}%`}
                  </span>
                </div>
                <ProgressBar 
                  value={analyticsData?.userEngagement.bounceRate || 0} 
                  color="bg-yellow-400" 
                  max={100}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Feature Usage Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-6">Feature Usage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-slate-300">Hand Analysis</span>
              <span className="text-pink-400 font-semibold">
                {loading ? '...' : `${analyticsData?.featureUsage.handAnalysis || 0}%`}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-slate-300">Range Calculator</span>
              <span className="text-blue-400 font-semibold">
                {loading ? '...' : `${analyticsData?.featureUsage.rangeCalculator || 0}%`}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-slate-300">Training Modules</span>
              <span className="text-green-400 font-semibold">
                {loading ? '...' : `${analyticsData?.featureUsage.trainingModules || 0}%`}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-slate-300">Strategy Guides</span>
              <span className="text-orange-400 font-semibold">
                {loading ? '...' : `${analyticsData?.featureUsage.strategyGuides || 0}%`}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-slate-300">Live Coaching</span>
              <span className="text-red-400 font-semibold">
                {loading ? '...' : `${analyticsData?.featureUsage.liveCoaching || 0}%`}
              </span>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-6">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              value={loading ? '...' : `${analyticsData?.performanceMetrics.systemUptime || 0}%`}
              label="System Uptime"
              color="text-green-400"
            />
            <MetricCard
              value={loading ? '...' : `${analyticsData?.performanceMetrics.avgResponseTime || 0}s`}
              label="Avg Response Time"
              color="text-blue-400"
            />
            <MetricCard
              value={loading ? '...' : `${analyticsData?.performanceMetrics.userSatisfaction || 0}/5`}
              label="User Satisfaction"
              color="text-purple-400"
            />
            <MetricCard
              value={loading ? '...' : `${analyticsData?.performanceMetrics.conversionRate || 0}%`}
              label="Conversion Rate"
              color="text-red-400"
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}