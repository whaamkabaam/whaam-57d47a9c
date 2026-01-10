import { CONFIG } from '@/config';
import type { SubscriptionTier, SubscriptionDuration } from '@/lib/api';

// Extend window for FastSpring
declare global {
  interface Window {
    fastspring: {
      builder: {
        push: (config: FastSpringConfig) => void;
        reset: () => void;
      };
    };
  }
}

interface FastSpringConfig {
  products: Array<{ path: string }>;
  tags?: { user_id: string };
  checkout: boolean;
}

type PaidTier = Exclude<SubscriptionTier, 'free'>;

export function getProductPath(
  tier: PaidTier, 
  duration: SubscriptionDuration
): string {
  return CONFIG.fastspring.products[tier][duration];
}

export function openFastSpringCheckout(
  tier: PaidTier,
  duration: SubscriptionDuration,
  userId: string
): void {
  if (!window.fastspring) {
    console.error('FastSpring SBL not loaded');
    return;
  }

  const productPath = getProductPath(tier, duration);

  window.fastspring.builder.push({
    products: [{ path: productPath }],
    tags: { user_id: userId },
    checkout: true,
  });
}

export function getPrice(
  tier: PaidTier,
  duration: SubscriptionDuration
): number {
  return CONFIG.pricing[tier][duration];
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function getDurationLabel(duration: SubscriptionDuration): string {
  switch (duration) {
    case 'daily': return 'day';
    case 'weekly': return 'week';
    case 'monthly': return 'month';
  }
}
