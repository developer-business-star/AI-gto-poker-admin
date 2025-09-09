'use client';

import { useState, useEffect } from 'react';
import { X, User, Mail, Key, Save, Shield, ShieldOff, Crown, UserX } from 'lucide-react';

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

interface EditUserModalProps {
  user: DatabaseUser | null;
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
}

export default function EditUserModal({ user, isOpen, onClose, onUserUpdated }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    isActive: true,
    adminAllowed: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        email: user.email,
        isActive: user.isActive,
        adminAllowed: user.adminAllowed,
      });
    }
    setError('');
    setSuccess('');
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('Updating user:', user.id, formData);

      const response = await fetch('/api/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          fullName: formData.fullName,
          email: formData.email,
          isActive: formData.isActive,
          adminAllowed: formData.adminAllowed,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess('User updated successfully!');
        onUserUpdated(); // Refresh the user list
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError(data.error || 'Failed to update user');
      }
    } catch (error) {
      console.error('Update user error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!user) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('Resetting password for user:', user.id);

      const response = await fetch('/api/users/reset-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess('Password reset to "123456" successfully!');
      } else {
        setError(data.error || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-800 via-purple-900/50 to-slate-800 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Edit User</h2>
              <p className="text-slate-300 text-sm">Update user information</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Full Name Field */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter full name"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter email address"
              />
            </div>
          </div>

          {/* Account Status Toggle */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3">
                  {formData.isActive ? (
                    <Shield className="h-5 w-5 text-green-400" />
                  ) : (
                    <ShieldOff className="h-5 w-5 text-red-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-white font-medium">Account Status</h3>
                  <p className="text-slate-400 text-sm">
                    {formData.isActive ? 'Account is active' : 'Account is inactive'}
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>
          </div>

          {/* Admin Status Toggle */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3">
                  {formData.adminAllowed ? (
                    <Crown className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <UserX className="h-5 w-5 text-slate-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-white font-medium">Admin Privileges</h3>
                  <p className="text-slate-400 text-sm">
                    {formData.adminAllowed ? 'User has admin privileges' : 'User has no admin privileges'}
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="adminAllowed"
                  checked={formData.adminAllowed}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
              </label>
            </div>
          </div>

          {/* Password Reset Section */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Reset Password</h3>
                <p className="text-slate-400 text-sm">Reset user password to &quot;123456&quot;</p>
              </div>
              <button
                onClick={handleResetPassword}
                disabled={isLoading}
                className="flex items-center px-4 py-2 bg-orange-500/20 text-orange-300 border border-orange-500/30 rounded-lg hover:bg-orange-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Key className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-4 p-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-300 hover:text-white transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}