// ============================================
// Subscription React Query Hooks
// ============================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subscriptionsApi } from '@/lib/api';
import type { CheckoutRequest, CancelRequest } from '@/lib/api';

export const subscriptionKeys = {
  tiers: ['subscriptions', 'tiers'] as const,
  current: ['subscriptions', 'current'] as const,
};

// Get available subscription tiers (public, no auth required)
export function useSubscriptionTiers() {
  return useQuery({
    queryKey: subscriptionKeys.tiers,
    queryFn: () => subscriptionsApi.getTiers(),
    staleTime: 30 * 60 * 1000, // 30 minutes - tiers rarely change
  });
}

// Get current user's subscription
export function useCurrentSubscription() {
  return useQuery({
    queryKey: subscriptionKeys.current,
    queryFn: () => subscriptionsApi.getCurrent(),
  });
}

// Create checkout session and redirect to Paddle
export function useCreateCheckout() {
  return useMutation({
    mutationFn: (data: CheckoutRequest) => subscriptionsApi.createCheckout(data),
    onSuccess: (response) => {
      if (response.success && response.checkout_url) {
        // Redirect to Paddle checkout
        window.location.href = response.checkout_url;
      }
    },
  });
}

// Get Paddle customer portal URL
export function useSubscriptionPortal() {
  return useMutation({
    mutationFn: () => subscriptionsApi.getPortal(),
    onSuccess: (response) => {
      if (response.success && response.portal_url) {
        // Redirect to Paddle portal
        window.location.href = response.portal_url;
      }
    },
  });
}

// Cancel subscription
export function useCancelSubscription() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data?: CancelRequest) => subscriptionsApi.cancel(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.current });
    },
  });
}
