// ============================================
// Subscription Card - Account Subscription Management
// ============================================

import { Link } from 'react-router-dom';
import { LiquidGlassCard, LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { Skeleton } from '@/components/ui/skeleton';
import { openFastSpringAccount } from '@/lib/fastspring';
import type { SubscriptionCurrent } from '@/lib/api';
import { 
  CreditCard, 
  Crown, 
  Calendar,
  AlertTriangle,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

interface SubscriptionCardProps {
  subscription: SubscriptionCurrent | undefined;
  isLoading: boolean;
  onCancelClick: () => void;
}

// Helper to format subscription status for display
const getStatusDisplay = (status: string) => {
  switch (status) {
    case 'active': return 'Active';
    case 'grace_period': return 'Grace Period';
    case 'expired': return 'Expired';
    case 'none': return 'No Subscription';
    default: return status;
  }
};

// Helper to get status badge styles
const getStatusBadgeStyles = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-emerald-500/20 text-emerald-400';
    case 'grace_period':
      return 'bg-amber-500/20 text-amber-400';
    case 'expired':
      return 'bg-destructive/20 text-destructive';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

// Format duration for display
const formatDuration = (duration: string) => {
  switch (duration) {
    case 'daily': return 'Day Pass';
    case 'weekly': return 'Week Pass';
    case 'monthly': return 'Monthly';
    default: return duration;
  }
};

export function SubscriptionCard({ 
  subscription, 
  isLoading, 
  onCancelClick 
}: SubscriptionCardProps) {
  const hasActiveSubscription = subscription && 
    subscription.tier !== 'free' && 
    subscription.status !== 'none';

  const handleManageBilling = () => {
    openFastSpringAccount();
  };

  return (
    <LiquidGlassCard variant="secondary" className="p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <CreditCard className="h-5 w-5" />
        Subscription
      </h2>
      
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : hasActiveSubscription ? (
        <div className="space-y-4">
          {/* Plan Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Crown className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-lg capitalize">{subscription.tier} Plan</p>
              <div className="flex items-center gap-2 text-sm">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeStyles(subscription.status)}`}>
                  {getStatusDisplay(subscription.status)}
                </span>
                {subscription.duration && (
                  <span className="text-muted-foreground">
                    • {formatDuration(subscription.duration)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Grace period warning */}
          {subscription.status === 'grace_period' && subscription.grace_period_ends_at && (
            <div className="flex items-start gap-2 text-sm text-amber-400 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
              <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Payment required</p>
                <p className="text-amber-400/80">
                  Grace period ends {new Date(subscription.grace_period_ends_at).toLocaleDateString()}.
                  Update your payment method to continue.
                </p>
              </div>
            </div>
          )}

          {/* Expired warning */}
          {subscription.status === 'expired' && (
            <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20">
              <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Subscription expired</p>
                <p className="text-destructive/80">
                  Renew your subscription to continue using premium features.
                </p>
              </div>
            </div>
          )}
          
          {/* Renewal/End date */}
          {subscription.current_period_end && subscription.status === 'active' && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
              <Calendar className="h-4 w-4" />
              <span>
                {subscription.cancel_at_period_end ? (
                  <span className="text-amber-400">
                    Ends {new Date(subscription.current_period_end).toLocaleDateString()}
                  </span>
                ) : (
                  <>Renews {new Date(subscription.current_period_end).toLocaleDateString()}</>
                )}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Link to="/pricing" className="flex-1">
              <LiquidGlassButton variant="primary" className="w-full text-sm px-4 py-2.5">
                Change Plan
                <ArrowRight className="h-4 w-4 ml-1" />
              </LiquidGlassButton>
            </Link>
            <LiquidGlassButton 
              variant="secondary" 
              onClick={handleManageBilling}
              className="flex-1 text-sm px-4 py-2.5"
            >
              Manage Billing
              <ExternalLink className="h-3.5 w-3.5 ml-1" />
            </LiquidGlassButton>
          </div>

          {/* Cancel link (only show if not already cancelling) */}
          {!subscription.cancel_at_period_end && subscription.status === 'active' && (
            <button
              onClick={onCancelClick}
              className="text-sm text-muted-foreground hover:text-destructive transition-colors pt-1"
            >
              Cancel subscription
            </button>
          )}

          {/* Already cancelled notice */}
          {subscription.cancel_at_period_end && (
            <p className="text-sm text-muted-foreground pt-1">
              Your subscription will not renew. You can resubscribe anytime from the pricing page.
            </p>
          )}
        </div>
      ) : (
        /* No subscription state */
        <div className="text-center py-6">
          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
            <Crown className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-4">No active subscription</p>
          <Link to="/pricing">
            <LiquidGlassButton variant="primary" className="text-sm px-6 py-2.5">
              View Plans
              <ArrowRight className="h-4 w-4 ml-1" />
            </LiquidGlassButton>
          </Link>
        </div>
      )}
    </LiquidGlassCard>
  );
}
