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
  monthlyGrowth: number;
  aiAccuracy: number;
}

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  recentSignups: number;
  growthPercentage: string;
  usersByPlan: {
    free: number;
    premium: number;
    basic: number;
  };
  timestamp: string;
}

interface AiStats {
  aiAccuracy: number;
  totalAnalyses: number;
  recentAnalyses: number;
  growthPercentage: string;
  confidenceDistribution: {
    high: number;
    medium: number;
    low: number;
  };
  timestamp: string;
}

interface Activity {
  id: string;
  user: string;
  action: string;
  timeDisplay: string;
  type: 'success' | 'warning' | 'upgrade' | 'info';
  source: 'analysis' | 'registration' | 'support' | 'login';
}

interface ActivityData {
  activities: Activity[];
  totalActivities: number;
  timestamp: string;
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
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [aiStats, setAiStats] = useState<AiStats | null>(null);
  const [activityData, setActivityData] = useState<ActivityData | null>(null);
  const [loading, setLoading] = useState(true);

  // Stats data with real user counts
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    revenue: 45680, // Keep mock data for revenue
    monthlyGrowth: 23.8, // Keep mock data for growth
    aiAccuracy: 94.2, // Keep mock data for AI
  });

  // Filter users to exclude admin
  const filteredUsers = useMemo(() => {
    return realUsers.filter(user => {
      return adminUser ? user.email !== adminUser.email : true;
    });
  }, [realUsers, adminUser]);

  // Function to fetch recent activity from database
  const fetchRecentActivity = async () => {
    try {
      console.log('Overview: Fetching recent activity from database...');

      const response = await fetch('/api/users/recent-activity', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Overview: Activity response:', { success: data.success });

      if (response.ok && data.success) {
        setActivityData(data.data);
        console.log('Overview: Successfully loaded recent activity:', data.data.activities.length, 'activities');
      } else {
        console.error('Overview: Failed to fetch recent activity:', data.error);
      }
    } catch (error) {
      console.error('Overview: Activity fetch error:', error);
    }
  };

  // Function to fetch user statistics from database
  const fetchUserStats = async () => {
    try {
      console.log('Overview: Fetching user statistics from database...');

      const response = await fetch('/api/users/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Overview: User stats response:', { success: data.success });

      if (response.ok && data.success) {
        setUserStats(data.data);
        setStats(prev => ({
          ...prev,
          totalUsers: data.data.totalUsers,
          activeUsers: data.data.activeUsers
        }));
        console.log('Overview: Successfully loaded user statistics:', data.data);
      } else {
        console.error('Overview: Failed to fetch user stats:', data.error);
      }
    } catch (error) {
      console.error('Overview: User stats fetch error:', error);
    }
  };

  // Function to fetch AI statistics from database
  const fetchAiStats = async () => {
    try {
      console.log('Overview: Fetching AI statistics from database...');

      const response = await fetch('/api/users/ai-stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Overview: AI stats response:', { success: data.success });

      if (response.ok && data.success) {
        setAiStats(data.data);
        setStats(prev => ({
          ...prev,
          aiAccuracy: data.data.aiAccuracy
        }));
        console.log('Overview: Successfully loaded AI statistics:', data.data);
      } else {
        console.error('Overview: Failed to fetch AI stats:', data.error);
      }
    } catch (error) {
      console.error('Overview: AI stats fetch error:', error);
    }
  };

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

  // Get admin user from localStorage/cookies and fetch data
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
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

        // Fetch user statistics, AI statistics, activity, and users in parallel
        await Promise.all([
          fetchUserStats(),
          fetchAiStats(),
          fetchRecentActivity(),
          fetchUsers()
        ]);

      } catch (error) {
        console.error('Overview: Error initializing data:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Auto-refresh activity every 30 seconds
  useEffect(() => {
    if (!loading) {
      const interval = setInterval(() => {
        fetchRecentActivity();
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [loading]);

  // Note: Stats are now updated directly from the user statistics API

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
            value={loading ? '...' : stats.totalUsers.toLocaleString()}
            change={userStats?.growthPercentage || '+12.5%'}
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Active Users"
            value={loading ? '...' : stats.activeUsers.toLocaleString()}
            change="+···%"
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
            title="AI Accuracy"
            value={loading ? '...' : `${stats.aiAccuracy}%`}
            change={aiStats?.growthPercentage || '+1.2%'}
            icon={Zap}
            color="green"
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            <button 
              onClick={fetchRecentActivity}
              className="text-slate-400 hover:text-white text-sm transition-colors"
              title="Refresh Activity"
            >
              🔄 Refresh
            </button>
          </div>
          <div className="space-y-3">
            {loading ? (
              // Loading state
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg animate-pulse">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3 bg-slate-600" />
                    <div>
                      <div className="h-4 bg-slate-600 rounded w-20 mb-1"></div>
                      <div className="h-3 bg-slate-600 rounded w-32"></div>
                    </div>
                  </div>
                  <div className="h-3 bg-slate-600 rounded w-16"></div>
                </div>
              ))
            ) : activityData?.activities.length === 0 ? (
              // Empty state
              <div className="text-center py-8 text-slate-400">
                <p>No recent activity found</p>
                <p className="text-sm mt-1">Activity will appear here as users interact with the system</p>
              </div>
            ) : (
              // Real activity data
              activityData?.activities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
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
                  <span className="text-slate-400 text-sm">{activity.timeDisplay}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}