import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    // 1. Verify User is Authenticated
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Authorization required' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; email: string };
    const userId = decoded.userId;

    // 2. Get Request ID
    const { requestId } = await request.json();
    if (!requestId) {
      return NextResponse.json({ error: 'Request ID is required' }, { status: 400 });
    }

    // 3. Find the auth request
    const requestsSnapshot = await adminDb.collection('cliAuthRequests')
      .where('requestId', '==', requestId)
      .where('status', '==', 'pending')
      .limit(1)
      .get();

    if (requestsSnapshot.empty) {
      return NextResponse.json({ error: 'Invalid or expired request' }, { status: 404 });
    }

    const requestDoc = requestsSnapshot.docs[0];
    const requestData = requestDoc.data();

    // Check expiration
    if (requestData.expiresAt && requestData.expiresAt.toMillis() < Date.now()) {
      await requestDoc.ref.update({ status: 'expired' });
      return NextResponse.json({ error: 'Request expired' }, { status: 400 });
    }

    // 4. Get User Data for the token response
    const userDoc = await adminDb.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const userData = userDoc.data();

    // 5. Generate new long-lived token for CLI
    const cliToken = jwt.sign(
      { userId, email: decoded.email, type: 'cli' },
      process.env.JWT_SECRET!,
      { expiresIn: '365d' } // Long expiration for CLI
    );

    // 6. Update the request with the token and user info
    await requestDoc.ref.update({
      status: 'completed',
      completedAt: new Date(),
      userId,
      userEmail: decoded.email,
      userName: userData?.name,
      userCredits: userData?.credits || 0,
      cliToken,
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('CLI approve error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to approve request' },
      { status: 500 }
    );
  }
}

