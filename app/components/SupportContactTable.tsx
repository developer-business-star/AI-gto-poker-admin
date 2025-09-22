'use client';

import { useState, useEffect, useMemo } from 'react';

interface SupportTicket {
  id: string;
  ticketId: string;
  type: 'general' | 'feature_request';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'closed';
  subject: string;
  description: string;
  userEmail: string;
  userFullName?: string;
  responses: Array<{
    responseId: string;
    message: string;
    isFromAgent: boolean;
    authorName: string;
    authorEmail: string;
    isInternal: boolean;
    attachments?: Array<{
      filename: string;
      url: string;
      size: number;
    }>;
    createdAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  ageInDays: number;
  statusDisplay: string;
}

interface SupportContactTableProps {
  className?: string;
  showFilters?: boolean;
  showPagination?: boolean;
  pageSize?: number;
  onTicketSelect?: (ticket: SupportTicket) => void;
}

const SupportContactTable: React.FC<SupportContactTableProps> = ({
  className = '',
  showFilters = true,
  showPagination = true,
  pageSize = 10,
  onTicketSelect
}) => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sorting
  const [sortField, setSortField] = useState<keyof SupportTicket>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  
  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, typeFilter, priorityFilter, searchTerm]);
  
  // Fetch tickets
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/support/tickets?limit=100');
      const data = await response.json();
      
      if (data.success) {
        setTickets(data.tickets || []);
      } else {
        setError('Failed to load support tickets');
      }
    } catch (err) {
      setError('Error fetching support tickets');
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort tickets
  const filteredAndSortedTickets = useMemo(() => {
    const filtered = tickets.filter(ticket => {
      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
      const matchesType = typeFilter === 'all' || ticket.type === typeFilter;
      const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
      const matchesSearch = searchTerm === '' || 
        (ticket.subject && ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ticket.userEmail && ticket.userEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ticket.ticketId && ticket.ticketId.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ticket.userFullName && ticket.userFullName.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesStatus && matchesType && matchesPriority && matchesSearch;
    });

    // Sort tickets
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortDirection === 'asc' ? -1 : 1;
      if (bValue == null) return sortDirection === 'asc' ? 1 : -1;
      
      let comparison = 0;
      
      // Handle different field types
      switch (sortField) {
        case 'createdAt':
        case 'updatedAt':
        case 'closedAt':
          // Date comparison
          const aTime = new Date(aValue as string).getTime();
          const bTime = new Date(bValue as string).getTime();
          comparison = aTime - bTime;
          break;
          
        case 'priority':
          // Custom priority ordering: urgent > high > medium > low
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          const aPriority = priorityOrder[aValue as keyof typeof priorityOrder] || 0;
          const bPriority = priorityOrder[bValue as keyof typeof priorityOrder] || 0;
          comparison = aPriority - bPriority;
          break;
          
        case 'status':
          // Custom status ordering: open > closed
          const statusOrder = { open: 2, closed: 1 };
          const aStatus = statusOrder[aValue as keyof typeof statusOrder] || 0;
          const bStatus = statusOrder[bValue as keyof typeof statusOrder] || 0;
          comparison = aStatus - bStatus;
          break;
          
        case 'type':
          // Custom type ordering: urgent issues first, then feature requests
          const typeOrder = { general: 2, feature_request: 1 };
          const aType = typeOrder[aValue as keyof typeof typeOrder] || 0;
          const bType = typeOrder[bValue as keyof typeof typeOrder] || 0;
          comparison = aType - bType;
          break;
          
        case 'ageInDays':
          // Numeric comparison
          comparison = (aValue as number) - (bValue as number);
          break;
          
        case 'subject':
        case 'userEmail':
        case 'userFullName':
        case 'ticketId':
        default:
          // String comparison (case-insensitive)
          const aStr = String(aValue).toLowerCase();
          const bStr = String(bValue).toLowerCase();
          comparison = aStr.localeCompare(bStr);
          break;
      }
      
      // Apply sort direction
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [tickets, statusFilter, typeFilter, priorityFilter, searchTerm, sortField, sortDirection]);

  // Paginated tickets
  const paginatedTickets = useMemo(() => {
    if (!showPagination) return filteredAndSortedTickets;
    
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedTickets.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedTickets, currentPage, pageSize, showPagination]);

  // Pagination info
  const totalPages = Math.ceil(filteredAndSortedTickets.length / pageSize);

  const handleSort = (field: keyof SupportTicket) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-400 bg-red-400/20';
      case 'high': return 'text-orange-400 bg-orange-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'low': return 'text-green-400 bg-green-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-blue-400 bg-blue-400/20';
      case 'closed': return 'text-gray-400 bg-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feature_request': return '🚀';
      case 'general': return '💬';
      default: return '❓';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <div className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 ${className}`}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <span className="ml-3 text-white">Loading support tickets...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 ${className}`}>
        <div className="text-center py-12">
          <div className="text-red-400 text-lg mb-2">⚠️ Error</div>
          <p className="text-slate-300">{error}</p>
          <button 
            onClick={fetchTickets}
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Support Contact Table</h3>
        <div className="flex items-center space-x-2 text-sm text-slate-300">
          <span>{filteredAndSortedTickets.length} tickets</span>
          <button 
            onClick={fetchTickets}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            title="Refresh"
          >
            🔄
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search tickets, emails, or IDs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
              />
            </div>
            
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
            
            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
            >
              <option value="all">All Types</option>
              <option value="general">General</option>
              <option value="feature_request">Feature Request</option>
            </select>
            
            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-3 px-2 text-slate-300 font-medium">
                <button 
                  onClick={() => handleSort('ticketId')}
                  className="flex items-center hover:text-white transition-colors group"
                >
                  Ticket ID
                  {sortField === 'ticketId' ? (
                    <span className="ml-1 text-blue-400">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  ) : (
                    <span className="ml-1 text-slate-500 opacity-0 group-hover:opacity-100">↕</span>
                  )}
                </button>
              </th>
              <th className="text-left py-3 px-2 text-slate-300 font-medium">
                <button 
                  onClick={() => handleSort('type')}
                  className="flex items-center hover:text-white transition-colors group"
                >
                  Type
                  {sortField === 'type' ? (
                    <span className="ml-1 text-blue-400">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  ) : (
                    <span className="ml-1 text-slate-500 opacity-0 group-hover:opacity-100">↕</span>
                  )}
                </button>
              </th>
              <th className="text-left py-3 px-2 text-slate-300 font-medium">
                <button 
                  onClick={() => handleSort('priority')}
                  className="flex items-center hover:text-white transition-colors group"
                >
                  Priority
                  {sortField === 'priority' ? (
                    <span className="ml-1 text-blue-400">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  ) : (
                    <span className="ml-1 text-slate-500 opacity-0 group-hover:opacity-100">↕</span>
                  )}
                </button>
              </th>
              <th className="text-left py-3 px-2 text-slate-300 font-medium">
                <button 
                  onClick={() => handleSort('status')}
                  className="flex items-center hover:text-white transition-colors group"
                >
                  Status
                  {sortField === 'status' ? (
                    <span className="ml-1 text-blue-400">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  ) : (
                    <span className="ml-1 text-slate-500 opacity-0 group-hover:opacity-100">↕</span>
                  )}
                </button>
              </th>
              <th className="text-left py-3 px-2 text-slate-300 font-medium">
                <button 
                  onClick={() => handleSort('subject')}
                  className="flex items-center hover:text-white transition-colors group"
                >
                  Subject
                  {sortField === 'subject' ? (
                    <span className="ml-1 text-blue-400">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  ) : (
                    <span className="ml-1 text-slate-500 opacity-0 group-hover:opacity-100">↕</span>
                  )}
                </button>
              </th>
              <th className="text-left py-3 px-2 text-slate-300 font-medium">
                <button 
                  onClick={() => handleSort('userEmail')}
                  className="flex items-center hover:text-white transition-colors group"
                >
                  Contact
                  {sortField === 'userEmail' ? (
                    <span className="ml-1 text-blue-400">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  ) : (
                    <span className="ml-1 text-slate-500 opacity-0 group-hover:opacity-100">↕</span>
                  )}
                </button>
              </th>
              <th className="text-left py-3 px-2 text-slate-300 font-medium">
                <button 
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center hover:text-white transition-colors group"
                >
                  Created
                  {sortField === 'createdAt' ? (
                    <span className="ml-1 text-blue-400">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  ) : (
                    <span className="ml-1 text-slate-500 opacity-0 group-hover:opacity-100">↕</span>
                  )}
                </button>
              </th>
              <th className="text-left py-3 px-2 text-slate-300 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTickets.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-12 text-slate-400">
                  {filteredAndSortedTickets.length === 0 && tickets.length > 0 
                    ? 'No tickets match your filters' 
                    : 'No support tickets found'}
                </td>
              </tr>
            ) : (
              paginatedTickets.map((ticket, index) => (
                <tr 
                  key={ticket.id || ticket.ticketId || `ticket-${index}`} 
                  className="border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  <td className="py-3 px-2">
                    <span className="text-blue-400 font-mono text-sm">{ticket.ticketId}</span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center">
                      <span className="mr-2">{getTypeIcon(ticket.type)}</span>
                      <span className="text-slate-300 capitalize">
                        {ticket.type.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                      {ticket.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="max-w-xs">
                      <p className="text-white truncate" title={ticket.subject}>
                        {ticket.subject}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div>
                      <p className="text-white text-sm">{ticket.userFullName || 'Unknown'}</p>
                      <p className="text-slate-400 text-xs">{ticket.userEmail}</p>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div>
                      <p className="text-slate-300 text-sm">{formatDate(ticket.createdAt)}</p>
                      <p className="text-slate-400 text-xs">
                        {ticket.ageInDays !== undefined ? `${ticket.ageInDays} days ago` : 'N/A'}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onTicketSelect?.(ticket)}
                        className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                        title="View Details"
                      >
                        View
                      </button>
                      <button
                        className="text-green-400 hover:text-green-300 text-sm transition-colors"
                        title="Reply"
                      >
                        Reply
                      </button>
                      {ticket.status === 'open' && (
                        <button
                          className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
                          title="Close"
                        >
                          Close
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-slate-300">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredAndSortedTickets.length)} of {filteredAndSortedTickets.length} tickets
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-white/10 border border-white/20 rounded text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                // Ensure pageNum is within valid range
                pageNum = Math.max(1, Math.min(totalPages, pageNum));
                
                return (
                  <button
                    key={`page-${i}-${pageNum}`}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      currentPage === pageNum
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-white/10 border border-white/20 rounded text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportContactTable;