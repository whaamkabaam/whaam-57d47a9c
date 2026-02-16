import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { subscriptionsApi } from '@/lib/api';
import { subscriptionKeys } from '@/hooks/api';
import { 
  openFastSpringCheckout, 
  isFastSpringReady, 
  verifyFastSpringConfig,
  registerCheckoutCallbacks,
  clearCheckoutCallbacks,
} from '@/lib/fastspring';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import type { SubscriptionTier, SubscriptionDuration } from '@/lib/api';

type PaidTier = Exclude<SubscriptionTier, 'free'>;

interface CheckoutState {
  isProcessing: boolean;
  isPolling: boolean;
  error: string | null;
  selectedTier: PaidTier | null;
  selectedDuration: SubscriptionDuration | null;
  // Guest checkout success state
  checkoutComplete: boolean;
  isGuestCheckout: boolean;
}

const initialState: CheckoutState = {
  isProcessing: false,
  isPolling: false,
  error: null,
  selectedTier: null,
  selectedDuration: null,
  checkoutComplete: false,
  isGuestCheckout: false,
};

export function useFastSpringCheckout() {
  // === All hooks must be called unconditionally at the top ===
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [state, setState] = useState<CheckoutState>(initialState);
  
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pollingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const preCheckoutTierRef = useRef<string | null>(null);

  const clearPolling = useCallback(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    if (pollingTimeoutRef.current) {
      clearTimeout(pollingTimeoutRef.current);
      pollingTimeoutRef.current = null;
    }
  }, []);

  // Verify FastSpring config on mount (development aid)
  useEffect(() => {
    verifyFastSpringConfig();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearPolling();
      clearCheckoutCallbacks();
    };
  }, [clearPolling]);

  const pollForActivation = useCallback(async () => {
    setState(s => ({ ...s, isPolling: true }));
    
    let attempts = 0;
    const maxAttempts = 15;

    pollingIntervalRef.current = setInterval(async () => {
      attempts++;
      
      try {
        const features = await subscriptionsApi.getFeatures();
        
        if (
          features.status === 'active' &&
          features.tier !== 'free' &&
          features.tier !== preCheckoutTierRef.current
        ) {
          clearPolling();
          preCheckoutTierRef.current = null;
          queryClient.invalidateQueries({ queryKey: subscriptionKeys.features });

          toast({
            title: "Subscription activated!",
            description: `Welcome to ${features.tier.charAt(0).toUpperCase() + features.tier.slice(1)}!`,
          });

          setState(initialState);
          navigate('/studio');
          return;
        }
      } catch (error) {
        console.warn('Polling attempt failed:', error);
      }
      
      if (attempts >= maxAttempts) {
        clearPolling();
        setState(s => ({ 
          ...s, 
          isPolling: false,
          isProcessing: false,
          error: 'Subscription activation taking longer than expected. Please refresh the page or contact support.' 
        }));
      }
    }, 2000);

    pollingTimeoutRef.current = setTimeout(() => {
      clearPolling();
      setState(s => ({ 
        ...s, 
        isPolling: false,
        isProcessing: false,
        error: 'Subscription activation timed out. Please refresh the page.' 
      }));
    }, 35000);
  }, [clearPolling, queryClient, navigate, toast]);

  const startCheckout = useCallback(async (
    tier: PaidTier,
    duration: SubscriptionDuration
  ) => {
    const isGuest = !user?.id;

    if (!isFastSpringReady()) {
      toast({
        title: "Checkout unavailable",
        description: "Payment system is loading. Please try again in a moment.",
        variant: "destructive",
      });
      console.error('[FastSpring] Checkout attempted but SBL not ready');
      return;
    }

    // Snapshot current tier before checkout so polling can detect actual changes
    // (prevents admin tier_override from triggering false "activated" detection)
    try {
      const currentFeatures = await subscriptionsApi.getFeatures();
      preCheckoutTierRef.current = currentFeatures.tier || null;
      console.log('[Checkout] Pre-checkout tier snapshot:', preCheckoutTierRef.current);
    } catch {
      preCheckoutTierRef.current = null;
    }

    setState({
      isProcessing: true,
      isPolling: false,
      error: null,
      selectedTier: tier,
      selectedDuration: duration,
      checkoutComplete: false,
      isGuestCheckout: isGuest,
    });

    // Register callbacks BEFORE opening checkout
    // These will be called by FastSpring when popup closes or order completes
    registerCheckoutCallbacks(
      // onComplete - order was placed successfully
      (email: string, reference: string) => {
        console.log('[Checkout] Order complete - email:', email, 'reference:', reference);
        
        if (isGuest) {
          // Guest checkout complete - show success message
          setState(s => ({
            ...s,
            isProcessing: false,
            isPolling: false,
            checkoutComplete: true,
          }));
        } else {
          // Logged-in user - poll for subscription activation
          pollForActivation();
        }
      },
      // onCancel - popup closed without completing order
      () => {
        console.log('[Checkout] User cancelled checkout');
        setState(initialState);
      }
    );

    // Pass user ID if logged in, otherwise guest checkout
    const result = openFastSpringCheckout(tier, duration, user?.id);
    
    if (!result.success) {
      const errorMessages: Record<string, string> = {
        not_loaded: 'Payment system failed to load. Please refresh the page.',
        builder_unavailable: 'Payment system encountered an error. Please try again.',
        unknown: 'An unexpected error occurred. Please try again.',
      };
      
      clearCheckoutCallbacks();
      
      setState(s => ({ 
        ...s, 
        isProcessing: false,
        error: errorMessages[result.error || 'unknown'],
      }));
      
      toast({
        title: "Checkout failed",
        description: errorMessages[result.error || 'unknown'],
        variant: "destructive",
      });
      return;
    }

    // For logged-in users, also start polling after a delay as backup
    // (in case callbacks don't fire due to popup blockers, etc.)
    if (!isGuest) {
      setTimeout(() => {
        // Only start polling if we're still in processing state
        setState(s => {
          if (s.isProcessing && !s.isPolling && !s.checkoutComplete) {
            pollForActivation();
          }
          return s;
        });
      }, 10000); // 10 second delay before backup polling
    }
  }, [user, toast, pollForActivation]);

  const cancelPolling = useCallback(() => {
    clearPolling();
    clearCheckoutCallbacks();
    setState(initialState);
  }, [clearPolling]);

  return {
    ...state,
    startCheckout,
    cancelPolling,
  };
}
