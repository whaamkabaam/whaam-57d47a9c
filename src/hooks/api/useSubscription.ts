// ============================================
// Subscription React Query Hooks
// ============================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subscriptionsApi } from '@/lib/api';
import type { CancelRequest } from '@/lib/api';

export const subscriptionKeys = {
  features: ['subscriptions', 'features'] as const,
  tiers: ['subscriptions', 'tiers'] as const,
  current: ['subscriptions', 'current'] as const,
};

// Primary hook for feature access (call in SubscriptionContext)
export function useSubscriptionFeatures(enabled = true) {
  return useQuery({
    queryKey: subscriptionKeys.features,
    queryFn: () => subscriptionsApi.getFeatures(),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get available subscription tiers (public, no auth required)
export function useSubscriptionTiers() {
  return useQuery({
    queryKey: subscriptionKeys.tiers,
    queryFn: () => subscriptionsApi.getTiers(),
    staleTime: 30 * 60 * 1000, // 30 minutes - tiers rarely change
  });
}

// Get current user's subscription (for account page)
export function useCurrentSubscription() {
  return useQuery({
    queryKey: subscriptionKeys.current,
    queryFn: () => subscriptionsApi.getCurrent(),
  });
}

// Cancel subscription
export function useCancelSubscription() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data?: CancelRequest) => subscriptionsApi.cancel(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.current });
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.features });
    },
  });
}
