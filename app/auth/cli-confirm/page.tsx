'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, ShieldCheck, Loader2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

function CLIConfirmContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const requestId = searchParams.get('requestId');
  const [status, setStatus] = useState<'loading' | 'ready' | 'approving' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');

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
        setStatus('success');
        toast.success('Successfully authorized CLI');
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
        <p className="text-[#888]">{error}</p>
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

  return (
    <div className="text-center">
      <ShieldCheck className="w-16 h-16 text-[#4a9eff] mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-white mb-2">Authorize CLI Access</h2>
      <p className="text-[#888] mb-6">
        Do you want to authorize the EdPear CLI to access your account?
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
              Approving...
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

