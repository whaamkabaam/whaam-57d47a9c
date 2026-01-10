// ============================================
// Subscription Context
// Provides tier-based feature access throughout the app
// ============================================

import React, { createContext, useContext, useCallback } from 'react';
import { useSubscriptionFeatures, subscriptionKeys } from '@/hooks/api';
import type { SubscriptionFeatures } from '@/lib/api';

type FeatureFlag = 'can_upload' | 'can_restore_any_version' | 'can_modify_form_settings';

interface SubscriptionContextType {
  features: SubscriptionFeatures | null;
  isLoading: boolean;
  isError: boolean;
  
  // Convenience flags
  isFreeUser: boolean;
  isActive: boolean;
  isGracePeriod: boolean;
  isExpired: boolean;
  
  // Tier checks
  tier: SubscriptionFeatures['tier'] | null;
  hasFeature: (feature: FeatureFlag) => boolean;
  
  // Limits
  adjustmentsRemaining: number | null; // null = unlimited
  isAtDailyLimit: boolean;
  libraryLimit: number | null;
  favoriteLimit: number | null;
  
  // Actions
  refresh: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { data: features, isLoading, isError, refetch } = useSubscriptionFeatures();

  const refresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  // Convenience computed values
  const isFreeUser = !features || features.tier === 'free' || features.status === 'none';
  const isActive = features?.status === 'active';
  const isGracePeriod = features?.status === 'grace_period';
  const isExpired = features?.status === 'expired';

  const hasFeature = useCallback((feature: FeatureFlag) => {
    return features?.[feature] ?? false;
  }, [features]);

  // Adjustments remaining calculation
  const adjustmentsRemaining = features?.daily_adjustment_limit === null 
    ? null // unlimited
    : features 
      ? Math.max(0, features.daily_adjustment_limit - features.daily_adjustments_used)
      : 0;

  const isAtDailyLimit = adjustmentsRemaining !== null && adjustmentsRemaining <= 0;

  const value: SubscriptionContextType = {
    features: features ?? null,
    isLoading,
    isError,
    isFreeUser,
    isActive,
    isGracePeriod,
    isExpired,
    tier: features?.tier ?? null,
    hasFeature,
    adjustmentsRemaining,
    isAtDailyLimit,
    libraryLimit: features?.library_limit ?? null,
    favoriteLimit: features?.favorite_limit ?? null,
    refresh,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    // HMR safety in dev
    if (import.meta.env.DEV) {
      console.warn('useSubscription called outside SubscriptionProvider');
      return {
        features: null,
        isLoading: true,
        isError: false,
        isFreeUser: true,
        isActive: false,
        isGracePeriod: false,
        isExpired: false,
        tier: null,
        hasFeature: () => false,
        adjustmentsRemaining: 0,
        isAtDailyLimit: true,
        libraryLimit: 0,
        favoriteLimit: 0,
        refresh: async () => {},
      };
    }
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
