import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get('requestId');

    if (!requestId) {
      return NextResponse.json({ error: 'Missing requestId' }, { status: 400 });
    }

    // Look up by requestId (no userId required initially)
    const requestsSnapshot = await adminDb.collection('cliAuthRequests')
      .where('requestId', '==', requestId)
      .limit(1)
      .get();

    if (requestsSnapshot.empty) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    const requestData = requestsSnapshot.docs[0].data();

    // Check status
    if (requestData.status === 'completed' && requestData.cliToken) {
      return NextResponse.json({
        status: 'completed',
        cliToken: requestData.cliToken,
        user: {
          id: requestData.userId,
          name: requestData.userName,
          email: requestData.userEmail,
          credits: requestData.userCredits,
        }
      });
    }

    if (requestData.status === 'expired' || (requestData.expiresAt && requestData.expiresAt.toMillis() < Date.now())) {
      return NextResponse.json({ status: 'expired' });
    }

    return NextResponse.json({ status: 'pending' });

  } catch (error: any) {
    console.error('CLI status check error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to check status' },
      { status: 500 }
    );
  }
}

