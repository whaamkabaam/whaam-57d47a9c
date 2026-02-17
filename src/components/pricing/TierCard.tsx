import { Check, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getPrice, formatPrice, getDurationLabel } from '@/lib/fastspring';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import type { SubscriptionDuration } from '@/lib/api';

import basicBadge from '@/assets/tiers/basic.png';
import plusBadge from '@/assets/tiers/plus.png';
import ultraBadge from '@/assets/tiers/ultra.png';

const tierBadges: Record<PaidTier, string> = {
  basic: basicBadge,
  plus: plusBadge,
  ultra: ultraBadge,
};

type PaidTier = 'basic' | 'plus' | 'ultra';

interface TierCardProps {
  tier: PaidTier;
  duration: SubscriptionDuration;
  isPopular?: boolean;
  onSelect: () => void;
  isProcessing?: boolean;
  isCurrentTier?: boolean;
}

const tierConfig: Record<PaidTier, {
  name: string;
  description: string;
  features: Array<{ text: string; included: boolean }>;
  accent: string;
}> = {
  basic: {
    name: 'Basic',
    description: 'Get started with the essentials',
    features: [
      { text: '5 adjustments per day', included: true },
      { text: 'Preset feedback buttons (0.5 steps)', included: true },
      { text: '5 library slots', included: true },
      { text: '1 favorite slot', included: true },
      { text: 'Restore last version only', included: true },
      { text: 'Upload .ccurve files', included: false },
      { text: 'Multiple curve lineages', included: false },
      { text: 'Form settings', included: false },
    ],
    accent: 'border-border',
  },
  plus: {
    name: 'Plus',
    description: 'For serious aimers who want room to tweak',
    features: [
      { text: '25 adjustments per day', included: true },
      { text: 'Fine feedback slider (0.1 steps)', included: true },
      { text: '20 library slots', included: true },
      { text: '5 favorite slots', included: true },
      { text: 'Restore any version', included: true },
      { text: 'Upload .ccurve files', included: true },
      { text: 'Multiple curve lineages', included: true },
      { text: 'Form settings', included: false },
    ],
    accent: 'border-secondary',
  },
  ultra: {
    name: 'Ultra',
    description: 'Unlimited everything, full control',
    features: [
      { text: 'Unlimited adjustments', included: true },
      { text: 'Fine feedback slider (0.1 steps)', included: true },
      { text: 'Unlimited library slots', included: true },
      { text: 'Unlimited favorites', included: true },
      { text: 'Restore any version', included: true },
      { text: 'Upload .ccurve files', included: true },
      { text: 'Multiple curve lineages', included: true },
      { text: 'Form settings access', included: true },
    ],
    accent: 'border-primary',
  },
};

function getMicroline(duration: SubscriptionDuration): string {
  switch (duration) {
    case 'daily':
      return 'One-time purchase · valid for 24 hours';
    case 'weekly':
      return 'One-time purchase · valid for 7 days';
    case 'monthly':
      return 'Auto-renews monthly · cancel anytime';
  }
}

export function TierCard({ 
  tier, 
  duration, 
  isPopular, 
  onSelect, 
  isProcessing,
  isCurrentTier,
}: TierCardProps) {
  const config = tierConfig[tier];
  const price = getPrice(tier, duration);
  const durationLabel = getDurationLabel(duration);

  return (
    <LiquidGlassCard
      className={cn(
        "flex flex-col border-2 transition-all duration-300",
        config.accent,
        isPopular && "scale-[1.02] shadow-lg shadow-secondary/20 border-secondary",
        isCurrentTier && "ring-2 ring-secondary ring-offset-2 ring-offset-background"
      )}
    >
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="mb-4 text-center">
          <img 
            src={tierBadges[tier]} 
            alt={`${config.name} tier`}
            className="w-24 h-24 mx-auto mb-3 object-contain"
          />
          {isPopular && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 mb-2 text-xs font-bold uppercase bg-secondary text-secondary-foreground rounded-full">
              <Sparkles className="w-3 h-3" />
              Most Popular
            </span>
          )}
          <h3 className="text-xl font-bold text-foreground">{config.name}</h3>
          <p className="text-sm text-muted-foreground">{config.description}</p>
        </div>

        {/* Price */}
        <div className="mb-6 text-center">
          <div className="flex items-baseline gap-1 justify-center">
            <span className="text-4xl font-bold text-foreground">{formatPrice(price)}</span>
            <span className="text-muted-foreground">/{durationLabel}</span>
          </div>
        </div>

        {/* Features */}
        <ul className="flex-1 space-y-3 mb-6">
          {config.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              {feature.included ? (
                <Check className="w-4 h-4 mt-0.5 text-secondary shrink-0" />
              ) : (
                <X className="w-4 h-4 mt-0.5 text-muted-foreground/50 shrink-0" />
              )}
              <span className={cn(
                "text-sm",
                feature.included ? "text-foreground font-semibold" : "text-muted-foreground/50"
              )}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          onClick={onSelect}
          disabled={isProcessing || isCurrentTier}
          variant={isPopular ? "whaam" : "outline"}
          className={cn(
            "w-full h-12",
            isPopular && "liquid-glow-secondary"
          )}
        >
          {isCurrentTier ? 'Current Plan' : isProcessing ? 'Processing...' : `Get ${config.name}`}
        </Button>

        {/* Microline */}
        <p className="mt-3 text-xs text-center text-muted-foreground">
          {getMicroline(duration)}
        </p>
      </div>
    </LiquidGlassCard>
  );
}
