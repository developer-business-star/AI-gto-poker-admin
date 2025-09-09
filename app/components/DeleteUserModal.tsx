'use client';

import { useState } from 'react';
import { X, Trash2, AlertTriangle, User } from 'lucide-react';

interface DatabaseUser {
  id: string;
  fullName: string;
  email: string;
  isActive: boolean;
  adminAllowed: boolean;
  planStatus: string;
  userUsage: number;
  lastLogin?: string;
  createdAt: string;
}

interface DeleteUserModalProps {
  user: DatabaseUser | null;
  isOpen: boolean;
  onClose: () => void;
  onUserDeleted: () => void;
}

export default function DeleteUserModal({ user, isOpen, onClose, onUserDeleted }: DeleteUserModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (!user) return;

    setIsLoading(true);
    setError('');

    try {
      console.log('Deleting user:', user.id);

      const response = await fetch('/api/users/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log('User deleted successfully');
        onUserDeleted(); // Refresh the user list
        onClose(); // Close the modal
      } else {
        console.error('Delete user failed:', data.error);
        setError(data.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Delete user error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-800 via-red-900/50 to-slate-800 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mr-3">
              <Trash2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Delete User</h2>
              <p className="text-slate-300 text-sm">This action cannot be undone</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Warning Section */}
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
              <h3 className="text-red-300 font-medium">Warning</h3>
            </div>
            <p className="text-red-200 text-sm">
              You are about to permanently delete this user account. This action cannot be undone and will remove all associated data.
            </p>
          </div>

          {/* User Info Section */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
            <div className="flex items-center mb-3">
              <User className="h-5 w-5 text-slate-400 mr-2" />
              <h3 className="text-white font-medium">User Details</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400 text-sm">Full Name:</span>
                <span className="text-white text-sm font-medium">{user.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-sm">Email:</span>
                <span className="text-white text-sm font-medium">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-sm">Status:</span>
                <span className={`text-sm font-medium ${user.isActive ? 'text-green-300' : 'text-red-300'}`}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-sm">Role:</span>
                <span className={`text-sm font-medium ${user.adminAllowed ? 'text-yellow-300' : 'text-slate-300'}`}>
                  {user.adminAllowed ? 'Admin' : 'User'}
                </span>
              </div>
            </div>
          </div>

          {/* Confirmation Text */}
          <div className="text-center">
            <p className="text-slate-300 text-sm">
              Are you sure you want to delete{' '}
              <span className="text-white font-medium">{user.fullName}</span>?
            </p>
            <p className="text-red-400 text-xs mt-1">
              Type the user&apos;s full name above to confirm deletion.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="px-4 py-2 text-slate-300 hover:text-white transition-colors duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="flex items-center px-6 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {isLoading ? 'Deleting...' : 'Delete User'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}