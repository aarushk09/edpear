import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find the latest completed CLI auth request for this user email
    // This requires us to query by user email which might not be directly on the cliAuthRequest
    // So first we need to find the user
    const userSnapshot = await adminDb.collection('users').where('email', '==', email).limit(1).get();
    
    if (userSnapshot.empty) {
      // Don't reveal user existence
      return NextResponse.json({ status: 'pending' });
    }

    const userId = userSnapshot.docs[0].id;

    // Find latest completed auth request within last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    const authSnapshot = await adminDb.collection('cliAuthRequests')
      .where('userId', '==', userId)
      .where('status', '==', 'completed')
      .where('completedAt', '>', fiveMinutesAgo)
      .orderBy('completedAt', 'desc')
      .limit(1)
      .get();

    if (authSnapshot.empty) {
      return NextResponse.json({ status: 'pending' });
    }

    const authData = authSnapshot.docs[0].data();

    return NextResponse.json({
      status: 'completed',
      cliToken: authData.cliToken,
    });
  } catch (error: any) {
    console.error('CLI poll error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to poll status' },
      { status: 500 }
    );
  }
}

