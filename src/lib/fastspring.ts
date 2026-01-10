import { CONFIG } from '@/config';
import type { SubscriptionTier, SubscriptionDuration } from '@/lib/api';

// FastSpring order data structure
interface FastSpringOrderData {
  reference?: string;
  id?: string;
  customer?: {
    email?: string;
    first?: string;
    last?: string;
  };
  items?: Array<{
    product?: string;
    display?: string;
    quantity?: number;
  }>;
  total?: string;
  currency?: string;
}

// Extend window for FastSpring
declare global {
  interface Window {
    fastspring?: {
      builder?: {
        push: (config: FastSpringConfig) => void;
        reset: () => void;
      };
    };
    // FastSpring popup callbacks - called by SBL script
    onFSPopupClosed?: (orderReference: string | null) => void;
    onFSDataCallback?: (data: FastSpringOrderData) => void;
  }
}

interface FastSpringConfig {
  products: Array<{ path: string }>;
  tags?: { user_id: string };
  checkout: boolean;
}

type PaidTier = Exclude<SubscriptionTier, 'free'>;

// Callback storage
let onCheckoutCompleteCallback: ((email: string, reference: string) => void) | null = null;
let onCheckoutCancelledCallback: (() => void) | null = null;
let pendingOrderReference: string | null = null;

// Initialize FastSpring popup callbacks on window
// These are called by the FastSpring SBL script based on data-popup-closed and data-data-callback attributes
if (typeof window !== 'undefined') {
  // Called when popup closes - orderReference is set if order was placed, null if cancelled
  window.onFSPopupClosed = (orderReference: string | null) => {
    console.log('[FastSpring] Popup closed, orderReference:', orderReference);
    
    if (orderReference) {
      // Order was placed - store reference and wait for data callback
      pendingOrderReference = orderReference;
    } else {
      // Popup closed without placing an order (user cancelled)
      console.log('[FastSpring] User cancelled checkout');
      onCheckoutCancelledCallback?.();
      clearCheckoutCallbacks();
    }
  };

  // Called with order data after successful purchase
  window.onFSDataCallback = (data: FastSpringOrderData) => {
    console.log('[FastSpring] Order data received:', data);
    
    const reference = data.reference || data.id || pendingOrderReference;
    const email = data.customer?.email;
    
    if (reference) {
      console.log('[FastSpring] Checkout complete - reference:', reference, 'email:', email);
      onCheckoutCompleteCallback?.(email || '', reference);
      clearCheckoutCallbacks();
    }
  };
}

/**
 * Register callbacks for checkout completion and cancellation.
 * Call this before opening the checkout popup.
 */
export function registerCheckoutCallbacks(
  onComplete: (email: string, reference: string) => void,
  onCancel: () => void
): void {
  console.log('[FastSpring] Registering checkout callbacks');
  onCheckoutCompleteCallback = onComplete;
  onCheckoutCancelledCallback = onCancel;
  pendingOrderReference = null;
}

/**
 * Clear all registered checkout callbacks.
 * Call this when cancelling the checkout flow or after handling completion.
 */
export function clearCheckoutCallbacks(): void {
  console.log('[FastSpring] Clearing checkout callbacks');
  onCheckoutCompleteCallback = null;
  onCheckoutCancelledCallback = null;
  pendingOrderReference = null;
}

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
  
  // Verify callbacks are configured
  const hasPopupClosedCallback = script.hasAttribute('data-popup-closed');
  const hasDataCallback = script.hasAttribute('data-data-callback');
  
  if (!hasPopupClosedCallback || !hasDataCallback) {
    console.warn(
      '[FastSpring] Missing callback attributes on SBL script.\n' +
      `  data-popup-closed: ${hasPopupClosedCallback}\n` +
      `  data-data-callback: ${hasDataCallback}`
    );
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
    console.log('[FastSpring] Opening checkout for:', productPath, 'userId:', userId || '(guest)');

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
