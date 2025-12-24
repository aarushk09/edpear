import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendOTPEmail } from '@/lib/email-service';

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
    const userEmail = decoded.email;

    // 2. Get Request ID
    const { requestId } = await request.json();
    if (!requestId) {
      return NextResponse.json({ error: 'Request ID is required' }, { status: 400 });
    }

    // 3. Find the auth request
    const requestsSnapshot = await adminDb.collection('cliAuthRequests')
      .where('requestId', '==', requestId)
      .where('status', '==', 'otp_pending')
      .limit(1)
      .get();

    if (requestsSnapshot.empty) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 404 });
    }

    const requestDoc = requestsSnapshot.docs[0];
    const requestData = requestDoc.data();

    // Check if user matches
    if (requestData.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // 4. Get User Data
    const userDoc = await adminDb.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const userData = userDoc.data();

    // 5. Generate new 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // 6. Send OTP email
    try {
      await sendOTPEmail(userEmail, otp, userData?.name);
    } catch (emailError: any) {
      console.error('Failed to send OTP email:', emailError);
      return NextResponse.json({ error: 'Failed to send OTP email' }, { status: 500 });
    }

    // 7. Update the request with new OTP
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');
    
    await requestDoc.ref.update({
      otpHash,
      otpExpiresAt,
      otpAttempts: 0, // Reset attempts
    });

    return NextResponse.json({ 
      success: true,
      message: 'New OTP sent to your email',
    });

  } catch (error: any) {
    console.error('CLI resend OTP error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to resend OTP' },
      { status: 500 }
    );
  }
}

