'use client';

import { useState, useEffect, useMemo } from 'react';
import AdminLayout from '../../components/AdminLayout';
import EditUserModal from '../../../components/EditUserModal';
import AddUserModal from '../../../components/AddUserModal';
import DeleteUserModal from '../../../components/DeleteUserModal';
import { 
  Search,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

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

export default function UsersPage() {
  const [realUsers, setRealUsers] = useState<DatabaseUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DatabaseUser | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<DatabaseUser | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortField, setSortField] = useState<keyof DatabaseUser>('fullName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

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

  // Handle sorting
  const handleSort = (field: keyof DatabaseUser) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Reset to first page when sorting
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Sort button component
  const SortButton = ({ field, children }: { field: keyof DatabaseUser; children: React.ReactNode }) => {
    const isActive = sortField === field;
    const isAsc = isActive && sortDirection === 'asc';
    const isDesc = isActive && sortDirection === 'desc';

    return (
      <button
        onClick={() => handleSort(field)}
        className="flex items-center space-x-1 text-left hover:text-white transition-colors duration-200 group"
      >
        <span>{children}</span>
        <div className="flex flex-col">
          {isActive ? (
            isAsc ? (
              <ChevronUp className="h-4 w-4 text-purple-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-purple-400" />
            )
          ) : (
            <ChevronsUpDown className="h-4 w-4 text-slate-500 group-hover:text-slate-400" />
          )}
        </div>
      </button>
    );
  };

  // Filter and sort users: exclude admin, apply search query, and sort (memoized to prevent infinite re-renders)
  const filteredAndSortedUsers = useMemo(() => {
    // First, exclude the current admin user from the list
    let filtered = realUsers.filter(user => {
      return adminUser ? user.email !== adminUser.email : true;
    });

    // Then apply search filtering if there's a search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(user => 
        user.fullName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle undefined values
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return sortDirection === 'asc' ? 1 : -1;
      if (bValue === undefined) return sortDirection === 'asc' ? -1 : 1;

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [realUsers, adminUser, searchQuery, sortField, sortDirection]);

  // Paginated users for display
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedUsers.slice(startIndex, endIndex);
  }, [filteredAndSortedUsers, currentPage, itemsPerPage]);

  // Pagination info
  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredAndSortedUsers.length);

  // Function to fetch real users from database
  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      console.log('Users: Fetching users from database...');

      const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Users: Users fetch response:', { success: data.success, count: data.data?.count });

      if (response.ok && data.success) {
        setRealUsers(data.data.users);
        console.log('Users: Successfully loaded', data.data.users.length, 'users from database');
      } else {
        console.error('Users: Failed to fetch users:', data.error);
      }
    } catch (error) {
      console.error('Users: Users fetch error:', error);
    } finally {
      setUsersLoading(false);
    }
  };

  // Get admin user and fetch users on component mount
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
        console.error('Users: Error getting admin user:', error);
      }
    };

    getAdminUser();
    fetchUsers();
  }, []);

  return (
    <AdminLayout activeTab="users" title="User Management">
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
          
          {/* Search Input */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-5 w-5 text-slate-400 hover:text-white transition-colors duration-200" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-2 text-sm text-slate-400">
                {filteredAndSortedUsers.length === 0 
                  ? `No users found matching "${searchQuery}"` 
                  : `Found ${filteredAndSortedUsers.length} user${filteredAndSortedUsers.length !== 1 ? 's' : ''} matching "${searchQuery}"`
                }
              </p>
            )}
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
                    <th className="text-left text-slate-300 py-3 px-4">
                      <SortButton field="fullName">User</SortButton>
                    </th>
                    <th className="text-left text-slate-300 py-3 px-4">
                      <SortButton field="planStatus">Plan</SortButton>
                    </th>
                    <th className="text-left text-slate-300 py-3 px-4">
                      <SortButton field="userUsage">Usage</SortButton>
                    </th>
                    <th className="text-left text-slate-300 py-3 px-4">
                      <SortButton field="isActive">Status</SortButton>
                    </th>
                    <th className="text-left text-slate-300 py-3 px-4">
                      <SortButton field="adminAllowed">Admin</SortButton>
                    </th>
                    <th className="text-left text-slate-300 py-3 px-4">
                      <SortButton field="lastLogin">Last Login</SortButton>
                    </th>
                    <th className="text-left text-slate-300 py-3 px-4">
                      <SortButton field="createdAt">Created</SortButton>
                    </th>
                    <th className="text-left text-slate-300 py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.length > 0 ? paginatedUsers.map((user) => {
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
                        {searchQuery 
                          ? `No users found matching "${searchQuery}"` 
                          : (realUsers.length > 0 ? 'No regular users found (admin excluded)' : 'No users found in database')
                        }
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          {!usersLoading && filteredAndSortedUsers.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
              <div className="text-sm text-slate-400">
                Showing {startItem} to {endItem} of {filteredAndSortedUsers.length} users
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center px-3 py-2 text-sm text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    const isCurrentPage = page === currentPage;
                    const shouldShow = page === 1 || page === totalPages || 
                                     (page >= currentPage - 1 && page <= currentPage + 1);
                    const shouldShowDots = (page === 2 && currentPage > 4) || 
                                          (page === totalPages - 1 && currentPage < totalPages - 3);
                    
                    if (!shouldShow && !shouldShowDots) return null;
                    
                    if (shouldShowDots) {
                      return (
                        <span key={`dots-${page}`} className="px-2 text-slate-500">
                          ...
                        </span>
                      );
                    }
                    
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                          isCurrentPage
                            ? 'bg-purple-500 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center px-3 py-2 text-sm text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
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
    </AdminLayout>
  );
}