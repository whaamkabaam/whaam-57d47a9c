// ============================================
// Upgrade Prompt Card
// Shown when user exhausts daily adjustment limit
// ============================================

import { Link } from 'react-router-dom';
import { Zap, Clock } from 'lucide-react';
import { LiquidGlassCard, LiquidGlassButton } from '@/components/LiquidGlassEffects';
import type { SubscriptionFeatures } from '@/lib/api';

interface UpgradePromptCardProps {
  currentTier: SubscriptionFeatures['tier'] | null;
  adjustmentsUsed: number;
}

export function UpgradePromptCard({ currentTier, adjustmentsUsed }: UpgradePromptCardProps) {
  // Tier-specific messaging
  const getUpgradeMessage = () => {
    switch (currentTier) {
      case 'basic':
        return 'Get 25 adjustments/day with Plus, or unlimited with Ultra';
      case 'plus':
        return 'Go unlimited with Ultra';
      default:
        return 'Upgrade for more adjustments';
    }
  };

  return (
    <div className="space-y-4">
      {/* Main prompt card */}
      <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <Zap className="h-5 w-5 text-amber-400" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-amber-200 mb-1">
              Daily limit reached
            </h3>
            <p className="text-sm text-amber-200/70 mb-3">
              You've used all {adjustmentsUsed} adjustments today. {getUpgradeMessage()}.
            </p>
            
            <Link to="/#products">
              <LiquidGlassButton 
                variant="accent" 
                className="px-4 py-2 text-sm"
              >
                <Zap className="h-4 w-4 mr-2" />
                View Plans
              </LiquidGlassButton>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Reset info */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/50">
        <Clock className="h-3.5 w-3.5" />
        <span>Resets tomorrow at midnight</span>
      </div>
    </div>
  );
}
