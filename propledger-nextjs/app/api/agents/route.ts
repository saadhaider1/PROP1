import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Try PHP backend first (for XAMPP compatibility)
    try {
      const phpResponse = await fetch('http://localhost/PROPLEDGER/managers/get_agents.php');
      const phpData = await phpResponse.json();
      
      if (phpData.success && phpData.agents) {
        return NextResponse.json({
          success: true,
          agents: phpData.agents,
          count: phpData.agents.length,
        });
      }
    } catch (phpError) {
      console.log('PHP backend not available, trying PostgreSQL...', phpError);
    }
    
    // Fallback to PostgreSQL
    const agents = await db.getAgents();
    
    return NextResponse.json({
      success: true,
      agents,
      count: agents.length,
    });
    
  } catch (error) {
    console.error('Get agents error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}
