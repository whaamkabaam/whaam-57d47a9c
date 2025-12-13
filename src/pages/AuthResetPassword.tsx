// ============================================
// Reset Password Page
// ============================================

import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useResetPassword } from '@/hooks/api';
import { ApiClientError } from '@/lib/api';
import { LiquidGlassCard, LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { z } from 'zod';

const passwordSchema = z.string().min(8, 'Password must be at least 8 characters');

export default function AuthResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const resetMutation = useResetPassword();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'form' | 'success' | 'error'>('form');
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <LiquidGlassCard className="w-full text-center">
            <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold glass-text mb-2">Invalid Link</h1>
            <p className="text-muted-foreground mb-6">
              No reset token provided. Please request a new password reset.
            </p>
            <LiquidGlassButton
              onClick={() => navigate('/auth')}
              variant="primary"
              className="w-full"
            >
              Back to Sign In
            </LiquidGlassButton>
          </LiquidGlassCard>
        </div>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }

    if (password !== confirmPassword) {
      newErrors.confirm = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await resetMutation.mutateAsync({ token, new_password: password });
      setStatus('success');
      toast.success('Password reset successfully!');
    } catch (error) {
      setStatus('error');
      if (error instanceof ApiClientError) {
        toast.error(error.detail);
      } else {
        toast.error('Failed to reset password. The link may have expired.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <LiquidGlassCard className="w-full">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="/lovable-uploads/25252925-5ec6-4d83-aa0a-70a6e27f7b9e.png" 
                alt="WhaamKabaam" 
                className="h-12 mx-auto"
              />
            </Link>

            {status === 'form' && (
              <>
                <h1 className="text-2xl font-bold glass-text">Reset Your Password</h1>
                <p className="text-muted-foreground mt-2">Enter your new password below</p>
              </>
            )}

            {status === 'success' && (
              <>
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold glass-text mb-2">Password Reset!</h1>
                <p className="text-muted-foreground mb-6">
                  Your password has been updated. You can now sign in.
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
                <h1 className="text-2xl font-bold glass-text mb-2">Reset Failed</h1>
                <p className="text-muted-foreground mb-6">
                  The reset link may have expired. Please request a new one.
                </p>
                <LiquidGlassButton
                  onClick={() => navigate('/auth')}
                  variant="primary"
                  className="w-full"
                >
                  Back to Sign In
                </LiquidGlassButton>
              </>
            )}
          </div>

          {status === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="glass-text">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-input border-border"
                  autoComplete="new-password"
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="glass-text">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-input border-border"
                  autoComplete="new-password"
                />
                {errors.confirm && (
                  <p className="text-sm text-destructive">{errors.confirm}</p>
                )}
              </div>

              <LiquidGlassButton
                type="submit"
                variant="primary"
                className="w-full cta-prominent"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                ) : (
                  'Reset Password'
                )}
              </LiquidGlassButton>
            </form>
          )}
        </LiquidGlassCard>
      </div>
    </div>
  );
}
