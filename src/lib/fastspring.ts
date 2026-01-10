import { CONFIG } from '@/config';
import type { SubscriptionTier, SubscriptionDuration } from '@/lib/api';

// Extend window for FastSpring
declare global {
  interface Window {
    fastspring?: {
      builder?: {
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

/**
 * Verifies that the FastSpring SBL script in index.html matches our config.
 * Call this early in app startup to catch misconfigurations.
 */
export function verifyFastSpringConfig(): boolean {
  const script = document.querySelector('#fsc-api');
  if (!script) {
    console.warn('[FastSpring] SBL script (#fsc-api) not found in document');
    return false;
  }
  
  const htmlStorefront = script.getAttribute('data-storefront');
  const configStorefront = CONFIG.fastspring.storefront;
  
  if (htmlStorefront !== configStorefront) {
    console.error(
      `[FastSpring] Storefront mismatch!\n` +
      `  index.html:   ${htmlStorefront}\n` +
      `  config.ts:    ${configStorefront}\n` +
      `  Fix: Update index.html data-storefront to match config.`
    );
    return false;
  }
  
  return true;
}

/**
 * Checks if FastSpring SBL is fully loaded and ready for checkout.
 */
export function isFastSpringReady(): boolean {
  return !!(window.fastspring?.builder?.push);
}

export function getProductPath(
  tier: PaidTier, 
  duration: SubscriptionDuration
): string {
  return CONFIG.fastspring.products[tier][duration];
}

export type FastSpringError = 
  | 'not_loaded' 
  | 'builder_unavailable' 
  | 'unknown';

export interface FastSpringResult {
  success: boolean;
  error?: FastSpringError;
}

export function openFastSpringCheckout(
  tier: PaidTier,
  duration: SubscriptionDuration,
  userId?: string // Now optional for guest checkout
): FastSpringResult {
  // Check if SBL script exists
  if (!window.fastspring) {
    console.error('[FastSpring] SBL not loaded - window.fastspring is undefined');
    return { success: false, error: 'not_loaded' };
  }

  // Check if builder is available
  if (!window.fastspring.builder?.push) {
    console.error('[FastSpring] SBL loaded but builder.push unavailable - possible CORS/network issue');
    return { success: false, error: 'builder_unavailable' };
  }

  try {
    const productPath = getProductPath(tier, duration);

    window.fastspring.builder.push({
      products: [{ path: productPath }],
      // Only pass user_id if logged in - backend will use email for guest checkout
      tags: userId ? { user_id: userId } : undefined,
      checkout: true,
    });
    
    return { success: true };
  } catch (err) {
    console.error('[FastSpring] Checkout push failed:', err);
    return { success: false, error: 'unknown' };
  }
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

// Open FastSpring account management portal for billing
export function openFastSpringAccount(): void {
  window.open(CONFIG.fastspring.accountUrl, '_blank', 'noopener');
}

export function getDurationLabel(duration: SubscriptionDuration): string {
  switch (duration) {
    case 'daily': return 'day';
    case 'weekly': return 'week';
    case 'monthly': return 'month';
  }
}
