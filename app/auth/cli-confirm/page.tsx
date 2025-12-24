'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, ShieldCheck, Loader2, XCircle, Mail, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

function CLIConfirmContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const requestId = searchParams.get('requestId');
  const [status, setStatus] = useState<'loading' | 'ready' | 'approving' | 'otp_pending' | 'verifying' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');
  const [otp, setOtp] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!requestId) {
      setStatus('error');
      setError('Missing request ID');
      return;
    }

    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login, preserving the return URL
      const returnUrl = encodeURIComponent(`/auth/cli-confirm?requestId=${requestId}`);
      router.push(`/auth/login?returnUrl=${returnUrl}`);
      return;
    }

    setStatus('ready');
  }, [requestId, router]);

  const approveRequest = async () => {
    setStatus('approving');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/cli/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ requestId }),
      });

      const data = await response.json();

      if (data.success) {
        setMaskedEmail(data.email || 'your email');
        setStatus('otp_pending');
        toast.success('OTP sent to your email');
      } else {
        setStatus('error');
        setError(data.error || 'Failed to approve request');
        toast.error('Failed to approve request');
      }
    } catch (err: any) {
      setStatus('error');
      setError(err.message || 'Network error');
    }
  };

  const verifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a 6-digit code');
      return;
    }

    setStatus('verifying');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/cli/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ requestId, otp }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        toast.success('Successfully authenticated!');
      } else {
        setStatus('otp_pending');
        setError(data.error || 'Invalid OTP');
        setOtp(''); // Clear OTP on error
        toast.error(data.error || 'Invalid OTP');
      }
    } catch (err: any) {
      setStatus('otp_pending');
      setError(err.message || 'Network error');
      setOtp('');
    }
  };

  const resendOTP = async () => {
    setResending(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/cli/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ requestId }),
      });

      const data = await response.json();

      if (data.success) {
        setOtp('');
        setError('');
        toast.success('New OTP sent to your email');
      } else {
        toast.error(data.error || 'Failed to resend OTP');
      }
    } catch (err: any) {
      toast.error('Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-[#4a9eff] animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white">Loading...</h2>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Error</h2>
        <p className="text-[#888] mb-4">{error}</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-[#888] hover:text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Authenticated!</h2>
        <p className="text-[#888]">You can now close this window and return to your terminal.</p>
      </div>
    );
  }

  if (status === 'otp_pending' || status === 'verifying') {
    return (
      <div className="text-center">
        <Mail className="w-16 h-16 text-[#4a9eff] mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Enter Verification Code</h2>
        <p className="text-[#888] mb-2">
          We sent a 6-digit code to {maskedEmail}
        </p>
        <p className="text-[#666] text-sm mb-6">
          Enter the code below to complete authentication
        </p>
        
        <div className="mb-4">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
              setOtp(value);
              setError('');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && otp.length === 6) {
                verifyOTP();
              }
            }}
            disabled={status === 'verifying'}
            className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white text-center text-2xl font-mono tracking-widest py-4 px-4 rounded-lg focus:outline-none focus:border-[#4a9eff] disabled:opacity-50"
            placeholder="000000"
            autoFocus
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={verifyOTP}
            disabled={otp.length !== 6 || status === 'verifying'}
            className="w-full bg-[#4a9eff] hover:bg-[#3a8eef] text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 active:scale-95 flex items-center justify-center"
          >
            {status === 'verifying' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              'Verify Code'
            )}
          </button>

          <button
            onClick={resendOTP}
            disabled={resending}
            className="w-full bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-[#888] hover:text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {resending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Resend Code
              </>
            )}
          </button>

          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-transparent hover:bg-[#1a1a1a] text-[#666] hover:text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <ShieldCheck className="w-16 h-16 text-[#4a9eff] mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-white mb-2">Authorize CLI Access</h2>
      <p className="text-[#888] mb-6">
        Do you want to authorize the EdPear CLI to access your account?
      </p>
      <p className="text-[#666] text-sm mb-6">
        You will receive a verification code via email to complete authentication.
      </p>
      
      <div className="flex flex-col gap-3">
        <button
          onClick={approveRequest}
          disabled={status === 'approving'}
          className="w-full bg-[#4a9eff] hover:bg-[#3a8eef] text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 active:scale-95 flex items-center justify-center"
        >
          {status === 'approving' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Sending verification code...
            </>
          ) : (
            'Approve Access'
          )}
        </button>
        
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-[#888] hover:text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function CLIConfirmPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8 max-w-md w-full">
        <Suspense fallback={
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-[#4a9eff] animate-spin mx-auto mb-4" />
          </div>
        }>
          <CLIConfirmContent />
        </Suspense>
      </div>
    </div>
  );
}
