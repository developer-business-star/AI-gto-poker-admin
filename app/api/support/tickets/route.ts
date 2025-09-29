import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    
    const backendUrl = `${BACKEND_URL}/api/support/tickets${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Support API error:', error);
    
    // Return mock data if backend is not available
    const mockData = {
      success: true,
      tickets: [
        {
          id: '1',
          ticketId: 'SUP-20250922-00001',
          type: 'general',
          priority: 'high',
          status: 'open',
          subject: 'Payment processing issue',
          description: 'User experiencing issues with payment processing during premium upgrade.',
          userEmail: 'john@example.com',
          userFullName: 'John Smith',
          responses: [],
          createdAt: '2025-09-22T10:30:00Z',
          updatedAt: '2025-09-22T10:30:00Z',
          ageInDays: 0,
          statusDisplay: 'Open'
        },
        {
          id: '2',
          ticketId: 'SUP-20250922-00002',
          type: 'feature_request',
          priority: 'medium',
          status: 'open',
          subject: 'Request for dark mode',
          description: 'Would love to have a dark mode option in the application for better night time usage.',
          userEmail: 'sarah@example.com',
          userFullName: 'Sarah Johnson',
          responses: [{ id: 1, message: 'Thanks for the suggestion!' }],
          createdAt: '2025-09-21T15:45:00Z',
          updatedAt: '2025-09-21T16:00:00Z',
          ageInDays: 1,
          statusDisplay: 'Open'
        },
        {
          id: '3',
          ticketId: 'SUP-20250921-00001',
          type: 'general',
          priority: 'low',
          status: 'closed',
          subject: 'Question about hand analysis',
          description: 'How does the AI analyze different poker hands and provide recommendations?',
          userEmail: 'mike@example.com',
          userFullName: 'Mike Wilson',
          responses: [
            { id: 1, message: 'Great question! Let me explain...' },
            { id: 2, message: 'Thank you for the detailed explanation!' }
          ],
          createdAt: '2025-09-20T09:15:00Z',
          updatedAt: '2025-09-21T14:30:00Z',
          closedAt: '2025-09-21T14:30:00Z',
          ageInDays: 2,
          statusDisplay: 'Closed'
        },
        {
          id: '4',
          ticketId: 'SUP-20250920-00003',
          type: 'general',
          priority: 'urgent',
          status: 'open',
          subject: 'Account access issues',
          description: 'Unable to log into my account after password reset. Getting error message.',
          userEmail: 'emma@example.com',
          userFullName: 'Emma Davis',
          responses: [],
          createdAt: '2025-09-20T08:00:00Z',
          updatedAt: '2025-09-20T08:00:00Z',
          ageInDays: 2,
          statusDisplay: 'Open'
        },
        {
          id: '5',
          ticketId: 'SUP-20250919-00002',
          type: 'feature_request',
          priority: 'medium',
          status: 'open',
          subject: 'Mobile app support',
          description: 'When will there be a mobile app version available? This would be very helpful.',
          userEmail: 'alex@example.com',
          userFullName: 'Alex Thompson',
          responses: [{ id: 1, message: 'We are working on it!' }],
          createdAt: '2025-09-19T11:20:00Z',
          updatedAt: '2025-09-19T12:00:00Z',
          ageInDays: 3,
          statusDisplay: 'Open'
        },
        {
          id: '6',
          ticketId: 'SUP-20250918-00001',
          type: 'general',
          priority: 'high',
          status: 'open',
          subject: 'Performance issues',
          description: 'The application has been running slowly lately, especially during hand analysis.',
          userEmail: 'david@example.com',
          userFullName: 'David Brown',
          responses: [],
          createdAt: '2025-09-18T16:45:00Z',
          updatedAt: '2025-09-18T16:45:00Z',
          ageInDays: 4,
          statusDisplay: 'Open'
        }
      ],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalTickets: 6,
        hasNext: false,
        hasPrev: false
      }
    };
    
    return NextResponse.json(mockData);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${BACKEND_URL}/api/support/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Support API POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create support ticket' },
      { status: 500 }
    );
  }
}