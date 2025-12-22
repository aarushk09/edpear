import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tempToken = searchParams.get('token');
    const userId = searchParams.get('userId');

    if (!tempToken || !userId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Find CLI auth request
    const authSnapshot = await adminDb.collection('cliAuthRequests')
      .where('userId', '==', userId)
      .where('tempToken', '==', tempToken)
      .limit(1)
      .get();

    if (authSnapshot.empty) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 404 });
    }

    const authDoc = authSnapshot.docs[0];
    const authData = authDoc.data();

    // Check if expired
    if (authData.createdAt.toMillis() + 5 * 60 * 1000 < Date.now()) {
      await adminDb.collection('cliAuthRequests').doc(authDoc.id).update({ status: 'expired' });
      return NextResponse.json({ error: 'Token expired' }, { status: 400 });
    }

    // Return status
    return NextResponse.json({
      status: authData.status, // 'pending', 'completed', 'expired', 'failed'
      otpRequired: authData.status === 'pending' && !authData.cliToken,
      cliToken: authData.cliToken || null,
      user: authData.status === 'completed' && authData.cliToken ? {
        id: userId,
        name: authData.userName,
        email: authData.userEmail,
        credits: authData.userCredits,
      } : null,
    });
  } catch (error: any) {
    console.error('CLI status error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to check status' },
      { status: 500 }
    );
  }
}
