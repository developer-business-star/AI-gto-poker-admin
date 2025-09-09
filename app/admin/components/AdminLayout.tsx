'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  DollarSign, 
  Activity, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  BarChart3,
  MessageSquare,
  Shield,
  Zap
} from 'lucide-react';

interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  adminAllowed: boolean;
  lastLogin: string;
}

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  title?: string;
}

export default function AdminLayout({ children, activeTab, title }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Only run authentication on client side
    if (typeof window === 'undefined') {
      return;
    }

    const verifyAuth = async () => {
      try {
        console.log('AdminLayout: Starting authentication verification...');
        
        // Get token from cookies first, then localStorage as backup
        const cookies = document.cookie.split(';');
        console.log('AdminLayout: All cookies:', document.cookie);
        
        const tokenCookie = cookies.find(c => c.trim().startsWith('adminToken='));
        let token = tokenCookie ? tokenCookie.split('=')[1] : null;

        // If no cookie token, try localStorage
        if (!token) {
          token = localStorage.getItem('adminToken');
          console.log('AdminLayout: No cookie token, trying localStorage:', !!token);
        }

        console.log('AdminLayout: Final token found:', !!token);
        console.log('AdminLayout: Token length:', token ? token.length : 0);
    
        if (!token) {
          console.log('AdminLayout: No token found anywhere, redirecting to login');
          router.push('/admin/login');
          return;
        }

        console.log('AdminLayout: Calling verify API...');
        
        // Verify token with backend
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        console.log('AdminLayout: Verify API response:', { success: data.success, status: response.status });

        if (response.ok && data.success) {
          console.log('AdminLayout: Authentication successful, user:', data.data.user.email);
          setAdminUser(data.data.user);
          setIsAuthenticated(true);
        } else {
          console.log('AdminLayout: Authentication failed, redirecting to login');
          // Token is invalid, redirect to login
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('AdminLayout: Auth verification error:', error);
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

  const navigateToTab = (tab: string) => {
    setSidebarOpen(false);
    if (tab === 'overview') {
      router.push('/admin/dashboard');
    } else {
      router.push(`/admin/dashboard/${tab}`);
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
            onClick={() => navigateToTab('overview')}
          />
          <SidebarItem
            icon={Users}
            label="Users"
            active={activeTab === 'users'}
            onClick={() => navigateToTab('users')}
          />
          <SidebarItem
            icon={DollarSign}
            label="Revenue"
            active={activeTab === 'revenue'}
            onClick={() => navigateToTab('revenue')}
          />
          <SidebarItem
            icon={Activity}
            label="Analytics"
            active={activeTab === 'analytics'}
            onClick={() => navigateToTab('analytics')}
          />
          <SidebarItem
            icon={Zap}
            label="AI Performance"
            active={activeTab === 'ai'}
            onClick={() => navigateToTab('ai')}
          />
          <SidebarItem
            icon={MessageSquare}
            label="Support"
            active={activeTab === 'support'}
            onClick={() => navigateToTab('support')}
          />
          <SidebarItem
            icon={Settings}
            label="Settings"
            active={activeTab === 'settings'}
            onClick={() => navigateToTab('settings')}
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
            <h1 className="text-2xl font-bold text-white capitalize">{title || activeTab}</h1>
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
          {children}
        </main>
      </div>
    </div>
  );
}