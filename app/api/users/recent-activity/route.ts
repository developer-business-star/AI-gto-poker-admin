import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/users/recent-activity`, {
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
    console.error('Recent activity API error:', error);
    
    // Return mock data if backend is not available
    const mockActivity = {
      success: true,
      data: {
        activities: [
          {
            id: 'mock-1',
            user: 'User123',
            action: 'Completed hand analysis',
            timeDisplay: '2 minutes ago',
            type: 'success',
            source: 'analysis'
          },
          {
            id: 'mock-2',
            user: 'Ahmad',
            action: 'Upgraded to Premium',
            timeDisplay: '5 minutes ago',
            type: 'upgrade',
            source: 'registration'
          },
          {
            id: 'mock-3',
            user: 'superman',
            action: 'Reported issue with AI response',
            timeDisplay: '12 minutes ago',
            type: 'warning',
            source: 'support'
          },
          {
            id: 'mock-4',
            user: 'GTO-User-1',
            action: 'Downloaded strategy guide',
            timeDisplay: '18 minutes ago',
            type: 'info',
            source: 'analysis'
          },
          {
            id: 'mock-5',
            user: 'gtouser',
            action: 'Started free trial',
            timeDisplay: '25 minutes ago',
            type: 'success',
            source: 'registration'
          }
        ],
        totalActivities: 5,
        timestamp: new Date().toISOString()
      }
    };
    
    return NextResponse.json(mockActivity);
  }
}