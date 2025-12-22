import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    // Generate a unique request ID
    const requestId = crypto.randomBytes(32).toString('hex');
    
    // Create a pending request in Firestore
    await adminDb.collection('cliAuthRequests').add({
      requestId,
      status: 'pending',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes expiration
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://edpearofficial.vercel.app';
    
    return NextResponse.json({
      success: true,
      requestId,
      url: `${baseUrl}/auth/cli-confirm?requestId=${requestId}`,
    });
  } catch (error: any) {
    console.error('CLI init error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to initialize authentication' },
      { status: 500 }
    );
  }
}

