import { useState, useEffect, useRef } from 'react';
import { Check, Sparkles } from 'lucide-react';
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
}

const tierConfig: Record<PaidTier, TierConfig> = {
  basic: {
    name: 'Basic',
    bestFor: 'Light tweaking · casual use',
    caps: [
      { label: 'Adj/day', value: '5' },
      { label: 'Library', value: '5' },
      { label: 'Favs', value: '1' },
      { label: 'Precision', value: '0.5x' },
    ],
    includes: null,
    deltaFeatures: [
      'Coarse tuning (0.5 steps)',
      'Last version restore',
    ],
    notIncluded: '.ccurve upload · lineages · form settings · beta',
  },
  plus: {
    name: 'Plus',
    bestFor: 'Daily iteration · most players',
    caps: [
      { label: 'Adj/day', value: '25' },
      { label: 'Library', value: '20' },
      { label: 'Favs', value: '5' },
      { label: 'Precision', value: '0.1x' },
    ],
    includes: 'Everything in Basic, plus:',
    deltaFeatures: [
      'Fine tuning (0.1 steps)',
      'Full version history',
      'Upload & edit .ccurve',
      'Multiple curve families',
    ],
    notIncluded: 'form settings · beta',
  },
  ultra: {
    name: 'Ultra',
    bestFor: 'Unlimited · full control',
    caps: [
      { label: 'Adj/day', value: '∞' },
      { label: 'Library', value: '∞' },
      { label: 'Favs', value: '∞' },
      { label: 'Precision', value: '0.1x' },
    ],
    includes: 'Everything in Plus, plus:',
    deltaFeatures: [
      'Unlimited adjustments',
      'Unlimited library & favorites',
      'Form settings access',
      'Beta feature testing',
    ],
    notIncluded: null,
  },
};

function getMicroline(duration: SubscriptionDuration): string {
  switch (duration) {
    case 'daily':
      return 'One-time · valid 24 hours';
    case 'weekly':
      return 'One-time · valid 7 days';
    case 'monthly':
      return 'Auto-renews · cancel anytime';
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
    <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mb-6 pt-5 border-t border-white/[0.06]">
      {caps.map((cap) => (
        <div key={cap.label} className="flex items-center justify-between py-1">
          <span className="text-[11px] text-white/50">{cap.label}</span>
          <span className="text-sm font-semibold text-white/90">{cap.value}</span>
        </div>
      ))}
    </div>
  );
}

function DeltaFeatures({ config }: { config: TierConfig }) {
  return (
    <div className="flex-1 mb-6">
      {config.includes && (
        <p className="text-[11px] text-white/45 uppercase tracking-wide mb-3">
          {config.includes}
        </p>
      )}
      <ul className="space-y-2">
        {config.deltaFeatures.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check className="w-3.5 h-3.5 mt-0.5 text-whaam-yellow/60 shrink-0" />
            <span className="text-sm text-foreground/85">{feature}</span>
          </li>
        ))}
      </ul>
      {config.notIncluded && (
        <p className="mt-4 text-[11px] text-white/30">
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
      {/* Most Popular badge — centered */}
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-[0_0_12px_rgba(255,215,64,0.4)] text-whaam-yellow whitespace-nowrap">
          <Sparkles className="w-3 h-3" />
          Most Popular
        </span>
      )}

      <LiquidGlassCard
        className={cn(
          "flex flex-col border border-white/[0.08] transition-all duration-300 h-full",
          isPopular && "border-white/[0.15] shadow-lg shadow-secondary/10",
          isCurrentTier && "ring-2 ring-secondary ring-offset-2 ring-offset-background"
        )}
      >
        {/* Subtle inner gradient overlay */}
        <div className="absolute inset-0 rounded-[inherit] pointer-events-none bg-gradient-to-b from-white/[0.03] to-transparent" />

        <div className="relative flex flex-col flex-1">
          {/* Header: badge + name + best-for pill */}
          <div className="mb-4 text-center">
            <img
              src={tierBadges[tier]}
              alt={`${config.name} tier`}
              className="w-24 h-24 mx-auto mb-3 object-contain"
            />
            <h3 className="text-xl font-bold text-foreground">{config.name}</h3>
            <div className="flex justify-center mt-2">
              <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[11px] text-muted-foreground">
                {config.bestFor}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6 text-center">
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
                  className="text-[11px] text-white/40 mt-1"
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
            className="w-full h-11 rounded-xl liquid-glow-yellow border border-whaam-yellow/30 hover:border-whaam-yellow/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
          >
            {isCurrentTier ? 'Current Plan' : isProcessing ? 'Processing...' : `Start ${config.name}`}
          </LiquidGlassButton>

          {/* Microline */}
          <p className="mt-3 text-[11px] text-center text-white/40">
            {getMicroline(duration)}
          </p>
        </div>
      </LiquidGlassCard>
    </div>
  );
}
