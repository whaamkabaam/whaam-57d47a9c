// ============================================
// Subscription Gate
// Redirects free users to /pricing, allows grace/expired with banners
// ============================================

import { Navigate, useLocation } from 'react-router-dom';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { LiquidOrbSpinner } from '@/components/app/LiquidOrbSpinner';

interface SubscriptionGateProps {
  children: React.ReactNode;
}

export function SubscriptionGate({ children }: SubscriptionGateProps) {
  const { isFreeUser, isLoading } = useSubscription();
  const location = useLocation();

  // Show loading while fetching subscription status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LiquidOrbSpinner size="lg" />
      </div>
    );
  }

  // Free users (never subscribed) → redirect to pricing
  if (isFreeUser) {
    return <Navigate to="/#products" state={{ from: location }} replace />;
  }

  // Grace period users CAN access studio (with banner shown in layout)
  // Expired users CAN access studio (with banner shown in layout)
  // Active users proceed normally

  return <>{children}</>;
}
