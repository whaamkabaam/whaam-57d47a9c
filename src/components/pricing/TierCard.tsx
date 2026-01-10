import { Check, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getPrice, formatPrice, getDurationLabel } from '@/lib/fastspring';
import type { SubscriptionDuration } from '@/lib/api';

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
    description: 'Get started with essentials',
    features: [
      { text: '5 adjustments per day', included: true },
      { text: '5 library slots', included: true },
      { text: '1 favorite slot', included: true },
      { text: 'Preset feedback buttons', included: true },
      { text: 'Upload .ccurve files', included: false },
      { text: 'Restore any version', included: false },
      { text: 'Form settings', included: false },
    ],
    accent: 'border-border',
  },
  plus: {
    name: 'Plus',
    description: 'For serious aimers',
    features: [
      { text: '25 adjustments per day', included: true },
      { text: '20 library slots', included: true },
      { text: '5 favorite slots', included: true },
      { text: 'Fine feedback slider (0.1)', included: true },
      { text: 'Upload .ccurve files', included: true },
      { text: 'Restore any version', included: true },
      { text: 'Form settings', included: false },
    ],
    accent: 'border-secondary',
  },
  ultra: {
    name: 'Ultra',
    description: 'Unlimited everything',
    features: [
      { text: 'Unlimited adjustments', included: true },
      { text: 'Unlimited library slots', included: true },
      { text: 'Unlimited favorites', included: true },
      { text: 'Fine feedback slider (0.1)', included: true },
      { text: 'Upload .ccurve files', included: true },
      { text: 'Restore any version', included: true },
      { text: 'Form settings access', included: true },
    ],
    accent: 'border-primary',
  },
};

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
    <div
      className={cn(
        "relative flex flex-col p-6 rounded-2xl glass-container border-2 transition-all duration-300",
        config.accent,
        isPopular && "scale-[1.02] shadow-lg shadow-secondary/20",
        isCurrentTier && "ring-2 ring-secondary ring-offset-2 ring-offset-background"
      )}
    >
      <div className="glass-effect-layer" />
      
      <div className="glass-content-layer !p-0 flex flex-col flex-1">
        {/* Header */}
        <div className="mb-4">
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
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
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
                feature.included ? "text-foreground" : "text-muted-foreground/50"
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
            "w-full",
            isPopular && "liquid-glow-secondary"
          )}
        >
          {isCurrentTier ? 'Current Plan' : isProcessing ? 'Processing...' : `Get ${config.name}`}
        </Button>

        {/* Microline */}
        <p className="mt-3 text-xs text-center text-muted-foreground">
          Auto-renews • Cancel anytime
        </p>
      </div>
    </div>
  );
}
