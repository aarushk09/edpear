import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

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

    // 2. Get Request ID and OTP
    const { requestId, otp } = await request.json();
    if (!requestId || !otp) {
      return NextResponse.json({ error: 'Request ID and OTP are required' }, { status: 400 });
    }

    // 3. Find the auth request
    const requestsSnapshot = await adminDb.collection('cliAuthRequests')
      .where('requestId', '==', requestId)
      .where('status', '==', 'otp_pending')
      .limit(1)
      .get();

    if (requestsSnapshot.empty) {
      return NextResponse.json({ error: 'Invalid or expired request' }, { status: 404 });
    }

    const requestDoc = requestsSnapshot.docs[0];
    const requestData = requestDoc.data();

    // Check if OTP expired
    if (requestData.otpExpiresAt && requestData.otpExpiresAt.toMillis() < Date.now()) {
      await requestDoc.ref.update({ status: 'expired' });
      return NextResponse.json({ error: 'OTP expired. Please request a new one.' }, { status: 400 });
    }

    // Check if too many attempts (rate limiting)
    if (requestData.otpAttempts >= 5) {
      return NextResponse.json({ error: 'Too many failed attempts. Please request a new OTP.' }, { status: 429 });
    }

    // 4. Verify OTP
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');
    
    if (requestData.otpHash !== otpHash) {
      // Increment failed attempts
      await requestDoc.ref.update({
        otpAttempts: (requestData.otpAttempts || 0) + 1,
      });
      return NextResponse.json({ error: 'Invalid OTP code' }, { status: 400 });
    }

    // 5. OTP verified - Generate CLI token and complete authentication
    const cliToken = jwt.sign(
      { userId, email: decoded.email, type: 'cli' },
      process.env.JWT_SECRET!,
      { expiresIn: '365d' } // Long expiration for CLI
    );

    // 6. Update the request to completed
    await requestDoc.ref.update({
      status: 'completed',
      completedAt: new Date(),
      cliToken,
      otpVerifiedAt: new Date(),
    });

    return NextResponse.json({ 
      success: true,
      message: 'OTP verified successfully',
    });

  } catch (error: any) {
    console.error('CLI OTP verify error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}

