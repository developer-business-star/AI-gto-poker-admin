import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/users/ai-stats`, {
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
    console.error('AI stats API error:', error);
    
    // Return mock data if backend is not available
    const mockAiStats = {
      success: true,
      data: {
        aiAccuracy: 94.2,
        totalAnalyses: 1250,
        recentAnalyses: 45,
        growthPercentage: '+1.2%',
        confidenceDistribution: {
          high: 850,
          medium: 300,
          low: 100
        },
        timestamp: new Date().toISOString()
      }
    };
    
    return NextResponse.json(mockAiStats);
  }
}