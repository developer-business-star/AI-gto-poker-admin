'use client';

import { useState, useEffect, useMemo } from 'react';
import AdminLayout from '../components/AdminLayout';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  UserCheck,
  Zap,
  Clock,
  Star
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  conversionRate: number;
  monthlyGrowth: number;
  aiAccuracy: number;
  responseTime: number;
  satisfactionScore: number;
}

interface DatabaseUser {
  id: string;
  fullName: string;
  email: string;
  adminAllowed: boolean;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  planStatus: string;
  userUsage: number;
}

interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  adminAllowed: boolean;
  lastLogin: string;
}

export default function OverviewPage() {
  const [realUsers, setRealUsers] = useState<DatabaseUser[]>([]);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  // Stats data with real user counts
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    revenue: 45680, // Keep mock data for revenue
    conversionRate: 12.5, // Keep mock data for conversion
    monthlyGrowth: 23.8, // Keep mock data for growth
    aiAccuracy: 94.2, // Keep mock data for AI
    responseTime: 1.2, // Keep mock data for response time
    satisfactionScore: 4.7 // Keep mock data for satisfaction
  });

  // Filter users to exclude admin
  const filteredUsers = useMemo(() => {
    return realUsers.filter(user => {
      return adminUser ? user.email !== adminUser.email : true;
    });
  }, [realUsers, adminUser]);

  // Generate recent activity with real user names
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, user: 'Loading...', action: 'Completed hand analysis', time: '2 minutes ago', type: 'success' },
    { id: 2, user: 'Loading...', action: 'Upgraded to Premium', time: '5 minutes ago', type: 'upgrade' },
    { id: 3, user: 'Loading...', action: 'Reported issue with AI response', time: '12 minutes ago', type: 'warning' },
    { id: 4, user: 'Loading...', action: 'Downloaded strategy guide', time: '18 minutes ago', type: 'info' },
    { id: 5, user: 'Loading...', action: 'Started free trial', time: '25 minutes ago', type: 'success' },
  ]);

  // Memoize base activities to prevent recreation on every render
  const baseActivities = useMemo(() => [
    { id: 1, action: 'Completed hand analysis', time: '2 minutes ago', type: 'success' },
    { id: 2, action: 'Upgraded to Premium', time: '5 minutes ago', type: 'upgrade' },
    { id: 3, action: 'Reported issue with AI response', time: '12 minutes ago', type: 'warning' },
    { id: 4, action: 'Downloaded strategy guide', time: '18 minutes ago', type: 'info' },
    { id: 5, action: 'Started free trial', time: '25 minutes ago', type: 'success' },
  ], []);

  // Update recent activity with real user names (excluding admin)
  useEffect(() => {
    if (filteredUsers.length > 0) {
      const updatedActivities = baseActivities.map(activity => ({
        ...activity,
        user: filteredUsers[(activity.id - 1) % filteredUsers.length]?.fullName || 'Unknown User'
      }));

      setRecentActivity(updatedActivities);
      console.log('Overview: Updated recent activity with real user names (excluding admin)');
    }
  }, [filteredUsers, baseActivities]);

  // Function to fetch real users from database
  const fetchUsers = async () => {
    try {
      console.log('Overview: Fetching users from database...');

      const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Overview: Users fetch response:', { success: data.success, count: data.data?.count });

      if (response.ok && data.success) {
        setRealUsers(data.data.users);
        console.log('Overview: Successfully loaded', data.data.users.length, 'users from database');
      } else {
        console.error('Overview: Failed to fetch users:', data.error);
      }
    } catch (error) {
      console.error('Overview: Users fetch error:', error);
    }
  };

  // Get admin user from localStorage/cookies
  useEffect(() => {
    const getAdminUser = async () => {
      try {
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find(c => c.trim().startsWith('adminToken='));
        let token = tokenCookie ? tokenCookie.split('=')[1] : null;

        if (!token) {
          token = localStorage.getItem('adminToken');
        }

        if (token) {
          const response = await fetch('/api/auth/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });

          const data = await response.json();
          if (response.ok && data.success) {
            setAdminUser(data.data.user);
          }
        }
      } catch (error) {
        console.error('Overview: Error getting admin user:', error);
      }
    };

    getAdminUser();
    fetchUsers();
  }, []);

  // Update stats when users are loaded (excluding current admin)
  useEffect(() => {
    if (realUsers.length > 0 && adminUser) {
      const usersExcludingAdmin = realUsers.filter(user => user.email !== adminUser.email);
      const activeUsersCount = usersExcludingAdmin.filter(user => user.isActive).length;
      setStats(prev => ({
        ...prev,
        totalUsers: usersExcludingAdmin.length,
        activeUsers: activeUsersCount
      }));
      console.log('Overview: Updated stats (excluding admin) - Total users:', usersExcludingAdmin.length, 'Active users:', activeUsersCount);
    }
  }, [realUsers, adminUser]);

  const StatCard = ({ title, value, change, icon: Icon, color = 'purple' }: {
    title: string;
    value: string | number;
    change?: string;
    icon: React.ComponentType<{ className?: string }>;
    color?: string;
  }) => (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-300 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-500/20`}>
          <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout activeTab="overview" title="Overview">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={stats.totalUsers.toLocaleString()}
            change="+12.5%"
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Active Users"
            value={stats.activeUsers.toLocaleString()}
            change="+8.2%"
            icon={UserCheck}
            color="green"
          />
          <StatCard
            title="Revenue"
            value={`$${stats.revenue.toLocaleString()}`}
            change="+23.8%"
            icon={DollarSign}
            color="purple"
          />
          <StatCard
            title="Conversion Rate"
            value={`${stats.conversionRate}%`}
            change="+2.1%"
            icon={TrendingUp}
            color="orange"
          />
        </div>

        {/* AI Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="AI Accuracy"
            value={`${stats.aiAccuracy}%`}
            change="+1.2%"
            icon={Zap}
            color="green"
          />
          <StatCard
            title="Response Time"
            value={`${stats.responseTime}s`}
            change="-0.3s"
            icon={Clock}
            color="blue"
          />
          <StatCard
            title="Satisfaction"
            value={`${stats.satisfactionScore}/5`}
            change="+0.2"
            icon={Star}
            color="yellow"
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    activity.type === 'success' ? 'bg-green-400' :
                    activity.type === 'warning' ? 'bg-yellow-400' :
                    activity.type === 'upgrade' ? 'bg-purple-400' : 'bg-blue-400'
                  }`} />
                  <div>
                    <p className="text-white font-medium">{activity.user}</p>
                    <p className="text-slate-300 text-sm">{activity.action}</p>
                  </div>
                </div>
                <span className="text-slate-400 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}