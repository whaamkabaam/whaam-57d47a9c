// ============================================
// Email Verification Page
// ============================================

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useVerifyEmail } from '@/hooks/api';
import { ApiClientError } from '@/lib/api';
import { LiquidGlassCard, LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { CheckCircle, XCircle } from 'lucide-react';
import { LiquidOrbSpinner } from '@/components/app/LiquidOrbSpinner';

export default function AuthVerify() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const verifyMutation = useVerifyEmail();

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setErrorMessage('No verification token provided.');
      return;
    }

    verifyMutation.mutateAsync({ token })
      .then(() => {
        setStatus('success');
        // Auto-redirect after 3 seconds
        setTimeout(() => navigate('/auth'), 3000);
      })
      .catch((error) => {
        setStatus('error');
        if (error instanceof ApiClientError) {
          setErrorMessage(error.detail);
        } else {
          setErrorMessage('Verification failed. The link may have expired.');
        }
      });
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <LiquidGlassCard className="w-full text-center">
          <Link to="/" className="inline-block mb-6">
            <img 
              src="/lovable-uploads/25252925-5ec6-4d83-aa0a-70a6e27f7b9e.png" 
              alt="WhaamKabaam" 
              className="h-12 mx-auto"
            />
          </Link>

          {status === 'loading' && (
            <div className="flex flex-col items-center">
              <LiquidOrbSpinner size="lg" className="mb-4" />
              <h1 className="text-2xl font-bold glass-text mb-2">Verifying Your Email</h1>
              <p className="text-muted-foreground">Please wait...</p>
            </div>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold glass-text mb-2">Email Verified!</h1>
              <p className="text-muted-foreground mb-6">
                Your email has been verified. Redirecting you to sign in...
              </p>
              <LiquidGlassButton
                onClick={() => navigate('/auth')}
                variant="primary"
                className="w-full"
              >
                Continue to Sign In
              </LiquidGlassButton>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h1 className="text-2xl font-bold glass-text mb-2">Verification Failed</h1>
              <p className="text-muted-foreground mb-6">{errorMessage}</p>
              <LiquidGlassButton
                onClick={() => navigate('/auth')}
                variant="primary"
                className="w-full"
              >
                Back to Sign In
              </LiquidGlassButton>
            </>
          )}
        </LiquidGlassCard>
      </div>
    </div>
  );
}
