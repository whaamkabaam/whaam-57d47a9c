// ============================================
// Protected Route Wrapper
// ============================================

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import { LiquidOrbSpinner } from '@/components/app/LiquidOrbSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LiquidOrbSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to auth page, preserving intended destination
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return (
    <SubscriptionProvider>
      {children}
    </SubscriptionProvider>
  );
}
