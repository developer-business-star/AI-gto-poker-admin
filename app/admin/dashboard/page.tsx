'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EditUserModal from '../../components/EditUserModal';
import AddUserModal from '../../components/AddUserModal';
import DeleteUserModal from '../../components/DeleteUserModal';
import { 
  Users, 
  DollarSign, 
  Activity, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  BarChart3,
  UserCheck,
  MessageSquare,
  Shield,
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

interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  adminAllowed: boolean;
  lastLogin: string;
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

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [realUsers, setRealUsers] = useState<DatabaseUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DatabaseUser | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<DatabaseUser | null>(null);
  const router = useRouter();

  // Helper function to convert usage number to usage label
  const getUsageLabel = (usageCount: number): string => {
    if (usageCount < 100) {
      return 'Low';
    } else if (usageCount >= 100 && usageCount < 500) {
      return 'Medium';
    } else if (usageCount >= 1000) {
      return 'High';
    } else {
      return 'Medium'; // For 500-999 range
    }
  };

  // Helper function to format plan status
  const formatPlanStatus = (planStatus: string): string => {
    return planStatus.charAt(0).toUpperCase() + planStatus.slice(1).toLowerCase();
  };

  // Handle opening edit modal
  const handleEditUser = (user: DatabaseUser) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  // Handle closing edit modal
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  // Handle user updated (refresh user list)
  const handleUserUpdated = () => {
    fetchUsers();
  };

  // Handle opening add user modal
  const handleAddUser = () => {
    setAddModalOpen(true);
  };

  // Handle closing add user modal
  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  // Handle user added (refresh user list)
  const handleUserAdded = () => {
    fetchUsers();
  };

  // Handle opening delete user modal
  const handleRemoveUser = (user: DatabaseUser) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  // Handle closing delete user modal
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  // Handle user deleted (refresh user list)
  const handleUserDeleted = () => {
    fetchUsers();
  };

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

  // Update stats when users are loaded
  useEffect(() => {
    if (realUsers.length > 0) {
      const activeUsersCount = realUsers.filter(user => user.isActive).length;
      setStats(prev => ({
        ...prev,
        totalUsers: realUsers.length,
        activeUsers: activeUsersCount
      }));
      console.log('Dashboard: Updated stats - Total users:', realUsers.length, 'Active users:', activeUsersCount);
    }
  }, [realUsers]);
  

  // Generate recent activity with real user names
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, user: 'Loading...', action: 'Completed hand analysis', time: '2 minutes ago', type: 'success' },
    { id: 2, user: 'Loading...', action: 'Upgraded to Premium', time: '5 minutes ago', type: 'upgrade' },
    { id: 3, user: 'Loading...', action: 'Reported issue with AI response', time: '12 minutes ago', type: 'warning' },
    { id: 4, user: 'Loading...', action: 'Downloaded strategy guide', time: '18 minutes ago', type: 'info' },
    { id: 5, user: 'Loading...', action: 'Started free trial', time: '25 minutes ago', type: 'success' },
  ]);

  // Update recent activity with real user names
  useEffect(() => {
    if (realUsers.length > 0) {
      const activities = [
        { id: 1, action: 'Completed hand analysis', time: '2 minutes ago', type: 'success' },
        { id: 2, action: 'Upgraded to Premium', time: '5 minutes ago', type: 'upgrade' },
        { id: 3, action: 'Reported issue with AI response', time: '12 minutes ago', type: 'warning' },
        { id: 4, action: 'Downloaded strategy guide', time: '18 minutes ago', type: 'info' },
        { id: 5, action: 'Started free trial', time: '25 minutes ago', type: 'success' },
      ];

      const updatedActivities = activities.map(activity => ({
        ...activity,
        user: realUsers[activity.id % realUsers.length]?.fullName || 'Unknown User'
      }));

      setRecentActivity(updatedActivities);
      console.log('Dashboard: Updated recent activity with real user names');
    }
  }, [realUsers]);


  // Function to fetch real users from database
  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      console.log('Dashboard: Fetching users from database...');

      const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Dashboard: Users fetch response:', { success: data.success, count: data.data?.count });

      if (response.ok && data.success) {
        setRealUsers(data.data.users);
        console.log('Dashboard: Successfully loaded', data.data.users.length, 'users from database');
      } else {
        console.error('Dashboard: Failed to fetch users:', data.error);
      }
    } catch (error) {
      console.error('Dashboard: Users fetch error:', error);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        console.log('Dashboard: Starting authentication verification...');
        
        // Get token from cookies first, then localStorage as backup
        const cookies = document.cookie.split(';');
        console.log('Dashboard: All cookies:', document.cookie);
        
        const tokenCookie = cookies.find(c => c.trim().startsWith('adminToken='));
        let token = tokenCookie ? tokenCookie.split('=')[1] : null;

        // If no cookie token, try localStorage
        if (!token) {
          token = localStorage.getItem('adminToken');
          console.log('Dashboard: No cookie token, trying localStorage:', !!token);
        }

        console.log('Dashboard: Final token found:', !!token);
        console.log('Dashboard: Token length:', token ? token.length : 0);

        if (!token) {
          console.log('Dashboard: No token found anywhere, redirecting to login');
          router.push('/admin/login');
          return;
        }

        console.log('Dashboard: Calling verify API...');
        
        // Verify token with backend
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        console.log('Dashboard: Verify API response:', { success: data.success, status: response.status });

        if (response.ok && data.success) {
          console.log('Dashboard: Authentication successful, user:', data.data.user.email);
          setAdminUser(data.data.user);
          setIsAuthenticated(true);
          
          // Fetch real users after successful authentication
          await fetchUsers();
        } else {
          console.log('Dashboard: Authentication failed, redirecting to login');
          // Token is invalid, redirect to login
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Dashboard: Auth verification error:', error);
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      // Call logout API to clear server-side session
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear localStorage
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      
      // Clear local state and redirect
      setIsAuthenticated(false);
      setAdminUser(null);
      router.push('/admin/login');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

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

  const SidebarItem = ({ icon: Icon, label, active, onClick }: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    active: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
        active 
          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
          : 'text-slate-300 hover:bg-white/10 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800/90 backdrop-blur-lg border-r border-white/10 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-purple-400" />
            <span className="ml-2 text-xl font-bold text-white">Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          <SidebarItem
            icon={BarChart3}
            label="Overview"
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          />
          <SidebarItem
            icon={Users}
            label="Users"
            active={activeTab === 'users'}
            onClick={() => setActiveTab('users')}
          />
          <SidebarItem
            icon={DollarSign}
            label="Revenue"
            active={activeTab === 'revenue'}
            onClick={() => setActiveTab('revenue')}
          />
          <SidebarItem
            icon={Activity}
            label="Analytics"
            active={activeTab === 'analytics'}
            onClick={() => setActiveTab('analytics')}
          />
          <SidebarItem
            icon={Zap}
            label="AI Performance"
            active={activeTab === 'ai'}
            onClick={() => setActiveTab('ai')}
          />
          <SidebarItem
            icon={MessageSquare}
            label="Support"
            active={activeTab === 'support'}
            onClick={() => setActiveTab('support')}
          />
          <SidebarItem
            icon={Settings}
            label="Settings"
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          />
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-slate-300 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-all duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white/5 backdrop-blur-lg border-b border-white/10">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-300 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-white capitalize">{activeTab}</h1>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-medium">{adminUser?.fullName}</p>
                <p className="text-slate-400 text-sm">{adminUser?.email}</p>
              </div>
              <div className="relative">
                <div className="w-3 h-3 bg-green-400 rounded-full absolute -top-1 -right-1 animate-pulse"></div>
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {adminUser?.fullName?.charAt(0)?.toUpperCase() || 'A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeTab === 'overview' && (
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
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">User Management</h3>
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={fetchUsers}
                      disabled={usersLoading}
                      className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      {usersLoading ? 'Refreshing...' : 'Refresh'}
                    </button>
                    <button 
                      onClick={handleAddUser}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      Add User
                    </button>
                  </div>
                </div>
                
                {usersLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                    <span className="ml-2 text-slate-300">Loading users from database...</span>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left text-slate-300 py-3 px-4">User</th>
                          <th className="text-left text-slate-300 py-3 px-4">Plan</th>
                          <th className="text-left text-slate-300 py-3 px-4">Usage</th>
                          <th className="text-left text-slate-300 py-3 px-4">Status</th>
                          <th className="text-left text-slate-300 py-3 px-4">Admin</th>
                          <th className="text-left text-slate-300 py-3 px-4">Last Login</th>
                          <th className="text-left text-slate-300 py-3 px-4">Created</th>
                          <th className="text-left text-slate-300 py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {realUsers.length > 0 ? realUsers.map((user) => {
                          const usageLabel = getUsageLabel(user.userUsage);
                          const planLabel = formatPlanStatus(user.planStatus);
                          
                          return (
                            <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                              <td className="py-3 px-4">
                                <div>
                                  <p className="text-white font-medium">{user.fullName}</p>
                                  <p className="text-slate-400 text-sm">{user.email}</p>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  planLabel === 'Premium' ? 'bg-purple-500/20 text-purple-300' :
                                  planLabel === 'Basic' ? 'bg-blue-500/20 text-blue-300' :
                                  'bg-slate-500/20 text-slate-300'
                                }`}>
                                  {planLabel}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  usageLabel === 'High' ? 'bg-green-500/20 text-green-300' :
                                  usageLabel === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                  'bg-red-500/20 text-red-300'
                                }`}>
                                  {usageLabel}
                                </span>
                                <span className="text-slate-400 text-xs ml-2">({user.userUsage})</span>
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  user.isActive ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                                }`}>
                                  {user.isActive ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  user.adminAllowed ? 'bg-purple-500/20 text-purple-300' : 'bg-slate-500/20 text-slate-300'
                                }`}>
                                  {user.adminAllowed ? 'Admin' : 'User'}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-slate-300">
                                {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                              </td>
                              <td className="py-3 px-4 text-slate-300">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4">
                                <button 
                                  onClick={() => handleEditUser(user)}
                                  className="text-purple-400 hover:text-purple-300 text-sm mr-2 hover:underline transition-all duration-200"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleRemoveUser(user)}
                                  className="text-red-400 hover:text-red-300 text-sm hover:underline transition-all duration-200"
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          );
                        }) : (
                          <tr>
                            <td colSpan={8} className="py-8 px-4 text-center text-slate-400">
                              No users found in database
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
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
            </div>
          )}

          {/* Other tabs can be implemented similarly */}
          {activeTab !== 'overview' && activeTab !== 'users' && activeTab !== 'ai' && (
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4 capitalize">{activeTab} Management</h3>
              <p className="text-slate-300">This section is under development. More features coming soon!</p>
            </div>
          )}
        </main>
      </div>

      {/* Edit User Modal */}
      <EditUserModal
        user={selectedUser}
        isOpen={editModalOpen}
        onClose={handleCloseEditModal}
        onUserUpdated={handleUserUpdated}
      />

      {/* Add User Modal */}
      <AddUserModal
        isOpen={addModalOpen}
        onClose={handleCloseAddModal}
        onUserAdded={handleUserAdded}
      />

      {/* Delete User Modal */}
      <DeleteUserModal
        user={userToDelete}
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onUserDeleted={handleUserDeleted}
      />
    </div>
  );
}