// ============================================
// Expired Subscription Overlay
// Covers feedback controls for expired users
// ============================================

import { Link } from 'react-router-dom';
import { CreditCard, Lock } from 'lucide-react';
import { LiquidGlassButton } from '@/components/LiquidGlassEffects';

export function ExpiredOverlay() {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl">
      <div className="text-center p-6 max-w-sm">
        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
          <Lock className="h-6 w-6 text-red-400" />
        </div>
        
        <h3 className="text-lg font-semibold text-red-200 mb-2">
          Subscription expired
        </h3>
        <p className="text-sm text-red-200/70 mb-5">
          Resubscribe to continue adjusting your curve. Your existing curves are safe.
        </p>
        
        <Link to="/#products">
          <LiquidGlassButton 
            variant="accent" 
            className="px-5 py-2.5"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Resubscribe
          </LiquidGlassButton>
        </Link>
      </div>
    </div>
  );
}
