import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { subscriptionsApi } from '@/lib/api';
import { subscriptionKeys } from '@/hooks/api';
import { openFastSpringCheckout, isFastSpringReady, verifyFastSpringConfig } from '@/lib/fastspring';
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
}

export function useFastSpringCheckout() {
  // === All hooks must be called unconditionally at the top ===
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [state, setState] = useState<CheckoutState>({
    isProcessing: false,
    isPolling: false,
    error: null,
    selectedTier: null,
    selectedDuration: null,
  });
  
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pollingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    return () => clearPolling();
  }, [clearPolling]);

  const pollForActivation = useCallback(async () => {
    setState(s => ({ ...s, isPolling: true }));
    
    let attempts = 0;
    const maxAttempts = 15;

    pollingIntervalRef.current = setInterval(async () => {
      attempts++;
      
      try {
        const features = await subscriptionsApi.getFeatures();
        
        if (features.status === 'active' && features.tier !== 'free') {
          clearPolling();
          queryClient.invalidateQueries({ queryKey: subscriptionKeys.features });
          
          toast({
            title: "Subscription activated!",
            description: `Welcome to ${features.tier.charAt(0).toUpperCase() + features.tier.slice(1)}!`,
          });
          
          setState({ 
            isProcessing: false, 
            isPolling: false, 
            error: null,
            selectedTier: null,
            selectedDuration: null,
          });
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

  const startCheckout = useCallback((
    tier: PaidTier,
    duration: SubscriptionDuration
  ) => {
    if (!user?.id) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to subscribe.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    if (!isFastSpringReady()) {
      toast({
        title: "Checkout unavailable",
        description: "Payment system is loading. Please try again in a moment.",
        variant: "destructive",
      });
      console.error('[FastSpring] Checkout attempted but SBL not ready');
      return;
    }

    setState({ 
      isProcessing: true, 
      isPolling: false, 
      error: null,
      selectedTier: tier,
      selectedDuration: duration,
    });

    const result = openFastSpringCheckout(tier, duration, user.id);
    
    if (!result.success) {
      const errorMessages: Record<string, string> = {
        not_loaded: 'Payment system failed to load. Please refresh the page.',
        builder_unavailable: 'Payment system encountered an error. Please try again.',
        unknown: 'An unexpected error occurred. Please try again.',
      };
      
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

    setTimeout(() => {
      pollForActivation();
    }, 5000);
  }, [user, navigate, toast, pollForActivation]);

  const cancelPolling = useCallback(() => {
    clearPolling();
    setState({ 
      isProcessing: false, 
      isPolling: false, 
      error: null,
      selectedTier: null,
      selectedDuration: null,
    });
  }, [clearPolling]);

  return {
    ...state,
    startCheckout,
    cancelPolling,
  };
}
