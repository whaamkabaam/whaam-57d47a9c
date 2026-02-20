import { useState, useEffect, useRef } from 'react';
import { Check, Sparkles, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { getPrice, formatPrice, getDurationLabel } from '@/lib/fastspring';
import { LiquidGlassCard, LiquidGlassButton } from '@/components/LiquidGlassEffects';
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

interface TierConfig {
  name: string;
  bestFor: string;
  caps: Array<{ label: string; value: string }>;
  includes: string | null;
  deltaFeatures: string[];
  notIncluded: string | null;
  accent: string;
}

const tierConfig: Record<PaidTier, TierConfig> = {
  basic: {
    name: 'Basic',
    bestFor: 'Light tweaking / casual use',
    caps: [
      { label: 'Adjustments/day', value: '5' },
      { label: 'Library slots', value: '5' },
      { label: 'Favorites', value: '1' },
      { label: 'Tuning precision', value: '0.5x' },
    ],
    includes: null,
    deltaFeatures: [
      'Coarse tuning (0.5 steps)',
      'Last version restore',
    ],
    notIncluded: '.ccurve upload, lineages, form settings, beta',
    accent: 'border-border',
  },
  plus: {
    name: 'Plus',
    bestFor: 'Most players who iterate daily',
    caps: [
      { label: 'Adjustments/day', value: '25' },
      { label: 'Library slots', value: '20' },
      { label: 'Favorites', value: '5' },
      { label: 'Tuning precision', value: '0.1x' },
    ],
    includes: 'Everything in Basic, plus:',
    deltaFeatures: [
      'Fine tuning (0.1 steps)',
      'Full version history',
      'Upload & edit .ccurve files',
      'Multiple curve families',
    ],
    notIncluded: 'form settings, beta',
    accent: 'border-secondary',
  },
  ultra: {
    name: 'Ultra',
    bestFor: 'Unlimited everything · full control',
    caps: [
      { label: 'Adjustments/day', value: '∞' },
      { label: 'Library slots', value: '∞' },
      { label: 'Favorites', value: '∞' },
      { label: 'Tuning precision', value: '0.1x' },
    ],
    includes: 'Everything in Plus, plus:',
    deltaFeatures: [
      'Unlimited adjustments',
      'Unlimited library & favorites',
      'Form settings access',
      'Beta feature testing',
    ],
    notIncluded: null,
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

function useAnimatedPrice(targetPrice: number) {
  const [displayPrice, setDisplayPrice] = useState(targetPrice);
  const prevPrice = useRef(targetPrice);

  useEffect(() => {
    const from = prevPrice.current;
    const to = targetPrice;
    prevPrice.current = targetPrice;

    if (from === to) return;

    const duration = 400;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayPrice(from + (to - from) * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [targetPrice]);

  return displayPrice;
}

function getEffectiveDailyCost(price: number, duration: SubscriptionDuration): string | null {
  if (duration === 'daily') return null;
  const days = duration === 'weekly' ? 7 : 30;
  return `~$${(price / days).toFixed(2)}/day`;
}

/* ── Sub-components ── */

function CapsBlock({ caps }: { caps: TierConfig['caps'] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-0 mb-6 py-3 px-3 rounded-lg bg-muted/30 border border-border/50">
      {caps.map((cap, i) => (
        <div
          key={cap.label}
          className={cn(
            "flex items-center justify-between py-2",
            i < caps.length - 2 && "border-b border-border/30"
          )}
        >
          <span className="text-xs text-muted-foreground">{cap.label}</span>
          <span className="text-sm font-bold text-foreground">{cap.value}</span>
        </div>
      ))}
    </div>
  );
}

function DeltaFeatures({ config }: { config: TierConfig }) {
  return (
    <div className="flex-1 mb-6">
      {config.includes && (
        <p className="text-xs text-muted-foreground italic mb-3">
          {config.includes}
        </p>
      )}
      <ul className="space-y-2.5">
        {config.deltaFeatures.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 text-secondary shrink-0" />
            <span className="text-sm text-foreground font-semibold">{feature}</span>
          </li>
        ))}
      </ul>
      {config.notIncluded && (
        <p className="mt-4 text-xs text-muted-foreground/60">
          Not included: {config.notIncluded}
        </p>
      )}
    </div>
  );
}

/* ── Main component ── */

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
  const animatedPrice = useAnimatedPrice(price);
  const durationLabel = getDurationLabel(duration);
  const dailyCost = getEffectiveDailyCost(price, duration);

  return (
    <div className="relative">
      {/* Most Popular badge */}
      {isPopular && (
        <span className="absolute -top-3 -right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-[0_0_12px_rgba(255,215,64,0.4)] text-whaam-yellow">
          <Sparkles className="w-3.5 h-3.5" />
          Most Popular
        </span>
      )}

      <LiquidGlassCard
        className={cn(
          "flex flex-col border-2 transition-all duration-300 h-full",
          config.accent,
          isPopular && "shadow-lg shadow-secondary/20 border-secondary",
          isCurrentTier && "ring-2 ring-secondary ring-offset-2 ring-offset-background"
        )}
      >
        <div className="flex flex-col flex-1">
          {/* Header: badge + name + best-for */}
          <div className="mb-4 text-center">
            <img
              src={tierBadges[tier]}
              alt={`${config.name} tier`}
              className="w-24 h-24 mx-auto mb-3 object-contain"
            />
            <h3 className="text-xl font-bold text-foreground">{config.name}</h3>
            <p className="flex items-center justify-center gap-1.5 mt-1.5 text-xs text-muted-foreground italic">
              <Target className="w-3 h-3" />
              {config.bestFor}
            </p>
          </div>

          {/* Price */}
          <div className="mb-4 text-center">
            <div className="flex items-baseline gap-1 justify-center">
              <span className="text-4xl font-bold text-foreground">
                {formatPrice(animatedPrice)}
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={durationLabel}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="text-muted-foreground"
                >
                  /{durationLabel}
                </motion.span>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              {dailyCost && (
                <motion.p
                  key={dailyCost}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs text-muted-foreground mt-1"
                >
                  {dailyCost}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Caps block */}
          <CapsBlock caps={config.caps} />

          {/* Delta features */}
          <DeltaFeatures config={config} />

          {/* CTA */}
          <LiquidGlassButton
            onClick={onSelect}
            disabled={isProcessing || isCurrentTier}
            variant="none"
            className={cn(
              "w-full h-12 liquid-glow-yellow border border-whaam-yellow/30 hover:border-whaam-yellow/60",
              isPopular && "liquid-glow-yellow-strong border-whaam-yellow/40 hover:border-whaam-yellow/70"
            )}
          >
            {isCurrentTier ? 'Current Plan' : isProcessing ? 'Processing...' : `Start ${config.name}`}
          </LiquidGlassButton>

          {/* Microline */}
          <p className="mt-3 text-xs text-center text-muted-foreground">
            {getMicroline(duration)}
          </p>
        </div>
      </LiquidGlassCard>
    </div>
  );
}
