// ============================================
// Subscription Status Banner
// Shows warnings for grace period and expired subscriptions
// ============================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, X, Clock, CreditCard } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

export function SubscriptionBanner() {
  const { isGracePeriod, isExpired, features, tier } = useSubscription();
  
  // Persist dismissal per status in sessionStorage
  const storageKey = `banner-dismissed-${features?.status ?? 'none'}`;
  const [isDismissed, setIsDismissed] = useState(() => 
    sessionStorage.getItem(storageKey) === 'true'
  );

  // Don't show if dismissed or no warning needed
  if (isDismissed || (!isGracePeriod && !isExpired)) {
    return null;
  }

  const handleDismiss = () => {
    sessionStorage.setItem(storageKey, 'true');
    setIsDismissed(true);
  };

  // Calculate time remaining for grace period
  const graceEndsAt = features?.grace_period_ends_at 
    ? parseISO(features.grace_period_ends_at) 
    : null;
  
  const timeRemaining = graceEndsAt 
    ? formatDistanceToNow(graceEndsAt, { addSuffix: false })
    : null;

  // Tier display name
  const tierName = tier 
    ? tier.charAt(0).toUpperCase() + tier.slice(1) 
    : 'subscription';

  if (isGracePeriod) {
    return (
      <div className={cn(
        "relative rounded-xl px-4 py-3 mb-6",
        "bg-amber-500/10 border border-amber-500/30"
      )}>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-amber-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-200">
                Your {tierName} subscription expires in {timeRemaining}
              </p>
              <p className="text-xs text-amber-200/70 mt-0.5">
                Renew now to keep your features and avoid interruption.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="whitespace-nowrap">
              <Link to="/pricing">Renew Now</Link>
            </Button>
            <button 
              onClick={handleDismiss}
              className="p-1.5 text-amber-300/60 hover:text-amber-300 transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className={cn(
        "relative rounded-xl px-4 py-3 mb-6",
        "bg-red-500/10 border border-red-500/30"
      )}>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-200">
                Your subscription has expired
              </p>
              <p className="text-xs text-red-200/70 mt-0.5">
                Resubscribe to restore full access to your curves and features.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="whitespace-nowrap">
              <Link to="/pricing">
                <CreditCard className="h-4 w-4 mr-2" />
                Resubscribe
              </Link>
            </Button>
            <button 
              onClick={handleDismiss}
              className="p-1.5 text-red-300/60 hover:text-red-300 transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
