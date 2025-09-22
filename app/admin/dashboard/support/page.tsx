'use client';

import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import SupportContactTable from '../../../components/SupportContactTable';

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

export default function SupportPage() {
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);

  const handleTicketSelect = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
  };

  const closeTicketModal = () => {
    setShowTicketModal(false);
    setSelectedTicket(null);
  };

  return (
    <AdminLayout activeTab="support" title="Support Center">
      <div className="space-y-6">
        {/* Support Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">Open Tickets</p>
                <p className="text-2xl font-bold text-white">23</p>
              </div>
              <div className="text-blue-400 text-2xl">🎫</div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">High Priority</p>
                <p className="text-2xl font-bold text-red-400">3</p>
              </div>
              <div className="text-red-400 text-2xl">🚨</div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">Avg Response</p>
                <p className="text-2xl font-bold text-green-400">2.4h</p>
              </div>
              <div className="text-green-400 text-2xl">⏱️</div>
            </div>
          </div>
        </div>

        {/* Support Contact Table */}
        <SupportContactTable 
          onTicketSelect={handleTicketSelect}
          showFilters={true}
          showPagination={true}
          pageSize={15}
        />

      </div>

      {/* Ticket Detail Modal */}
      {showTicketModal && selectedTicket && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Ticket Details</h3>
                <button 
                  onClick={closeTicketModal}
                  className="text-slate-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-white font-medium mb-2">Ticket Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-slate-400">ID:</span> <span className="text-blue-400 font-mono">{selectedTicket.ticketId}</span></p>
                    <p><span className="text-slate-400">Type:</span> <span className="text-white capitalize">{selectedTicket.type.replace('_', ' ')}</span></p>
                    <p><span className="text-slate-400">Priority:</span> <span className="text-white capitalize">{selectedTicket.priority}</span></p>
                    <p><span className="text-slate-400">Status:</span> <span className="text-white capitalize">{selectedTicket.status}</span></p>
                    <p><span className="text-slate-400">Created:</span> <span className="text-white">{new Date(selectedTicket.createdAt).toLocaleString()}</span></p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-slate-400">Name:</span> <span className="text-white">{selectedTicket.userFullName || 'Not provided'}</span></p>
                    <p><span className="text-slate-400">Email:</span> <span className="text-white">{selectedTicket.userEmail}</span></p>
                    <p><span className="text-slate-400">Responses:</span> <span className="text-white">{selectedTicket.responses?.length || 0}</span></p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-white font-medium mb-2">Subject</h4>
                <p className="text-slate-300">{selectedTicket.subject}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-white font-medium mb-2">Description</h4>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-slate-300 whitespace-pre-wrap">{selectedTicket.description}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                  Reply to Ticket
                </button>
                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                  Mark as Resolved
                </button>
                <button className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors">
                  Escalate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}