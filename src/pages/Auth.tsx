// ============================================
// Auth Page - Login / Register / Forgot Password
// ============================================

import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useForgotPassword } from '@/hooks/api';
import { getOAuthUrl, ApiClientError } from '@/lib/api';
import { LiquidGlassCard, LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, ArrowLeft, Mail } from 'lucide-react';
import { z } from 'zod';

// Validation schemas
const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(8, 'Password must be at least 8 characters');
const displayNameSchema = z.string().min(2, 'Display name must be at least 2 characters').max(50, 'Display name is too long').optional();

type AuthMode = 'login' | 'register' | 'forgot';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isAuthenticated, isLoading: authLoading } = useAuth();
  const forgotPasswordMutation = useForgotPassword();

  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; displayName?: string }>({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/app';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }

    if (mode !== 'forgot') {
      const passwordResult = passwordSchema.safeParse(password);
      if (!passwordResult.success) {
        newErrors.password = passwordResult.error.errors[0].message;
      }
    }

    if (mode === 'register' && displayName) {
      const nameResult = displayNameSchema.safeParse(displayName);
      if (!nameResult.success) {
        newErrors.displayName = nameResult.error.errors[0].message;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      if (mode === 'login') {
        await login({ email, password });
        toast.success('Welcome back!');
      } else if (mode === 'register') {
        await register({ email, password, display_name: displayName || undefined });
        toast.success('Account created! Check your email to verify.');
      } else if (mode === 'forgot') {
        await forgotPasswordMutation.mutateAsync({ email });
        toast.success('Password reset email sent!');
        setMode('login');
      }
    } catch (error) {
      if (error instanceof ApiClientError) {
        if (error.detail.toLowerCase().includes('already')) {
          toast.error('An account with this email already exists.');
        } else if (error.detail.toLowerCase().includes('invalid') || error.detail.toLowerCase().includes('credentials')) {
          toast.error('Invalid email or password.');
        } else {
          toast.error(error.detail);
        }
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuth = (provider: 'discord' | 'google') => {
    window.location.href = getOAuthUrl(provider);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <LiquidGlassCard className="w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="/lovable-uploads/25252925-5ec6-4d83-aa0a-70a6e27f7b9e.png" 
                alt="WhaamKabaam" 
                className="h-12 mx-auto"
              />
            </Link>
            <h1 className="text-2xl font-bold glass-text">
              {mode === 'login' && 'Welcome Back'}
              {mode === 'register' && 'Create Account'}
              {mode === 'forgot' && 'Reset Password'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {mode === 'login' && 'Sign in to access your custom curves'}
              {mode === 'register' && 'Get your personalized aim curve'}
              {mode === 'forgot' && 'Enter your email to reset your password'}
            </p>
          </div>

          {/* OAuth Buttons (not shown for forgot password) */}
          {mode !== 'forgot' && (
            <>
              <div className="space-y-3 mb-6">
                <LiquidGlassButton
                  type="button"
                  variant="secondary"
                  className="w-full flex items-center justify-center gap-3"
                  onClick={() => handleOAuth('discord')}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  Continue with Discord
                </LiquidGlassButton>
                <LiquidGlassButton
                  type="button"
                  variant="secondary"
                  className="w-full flex items-center justify-center gap-3"
                  onClick={() => handleOAuth('google')}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </LiquidGlassButton>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-muted-foreground">Or continue with email</span>
                </div>
              </div>
            </>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="displayName" className="glass-text">Display Name (optional)</Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="Your display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="bg-input border-border"
                />
                {errors.displayName && (
                  <p className="text-sm text-destructive">{errors.displayName}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="glass-text">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-border"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            {mode !== 'forgot' && (
              <div className="space-y-2">
                <Label htmlFor="password" className="glass-text">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-input border-border"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>
            )}

            {mode === 'login' && (
              <button
                type="button"
                onClick={() => setMode('forgot')}
                className="text-sm text-primary hover:text-accent transition-colors"
              >
                Forgot your password?
              </button>
            )}

            <LiquidGlassButton
              type="submit"
              variant="primary"
              className="w-full cta-prominent"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin mx-auto" />
              ) : (
                <>
                  {mode === 'login' && 'Sign In'}
                  {mode === 'register' && 'Create Account'}
                  {mode === 'forgot' && (
                    <span className="flex items-center justify-center gap-2">
                      <Mail className="h-4 w-4" />
                      Send Reset Link
                    </span>
                  )}
                </>
              )}
            </LiquidGlassButton>
          </form>

          {/* Mode Switch */}
          <div className="mt-6 text-center text-sm">
            {mode === 'login' && (
              <p className="text-muted-foreground">
                Don't have an account?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-primary hover:text-accent transition-colors font-medium"
                >
                  Sign up
                </button>
              </p>
            )}
            {mode === 'register' && (
              <p className="text-muted-foreground">
                Already have an account?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-primary hover:text-accent transition-colors font-medium"
                >
                  Sign in
                </button>
              </p>
            )}
            {mode === 'forgot' && (
              <button
                onClick={() => setMode('login')}
                className="text-primary hover:text-accent transition-colors font-medium flex items-center gap-1 mx-auto"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to sign in
              </button>
            )}
          </div>
        </LiquidGlassCard>
      </div>
    </div>
  );
}
