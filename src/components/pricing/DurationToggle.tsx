import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import type { SubscriptionDuration } from '@/lib/api';

interface DurationToggleProps {
  value: SubscriptionDuration;
  onChange: (duration: SubscriptionDuration) => void;
}

const durations: { value: SubscriptionDuration; label: string; badge?: string }[] = [
  { value: 'daily', label: 'Day Pass' },
  { value: 'weekly', label: 'Week Pass' },
  { value: 'monthly', label: 'Monthly', badge: 'Save 50%' },
];

export function DurationToggle({ value, onChange }: DurationToggleProps) {
  return (
    <LiquidGlassCard className="!p-1 !rounded-full inline-flex items-center gap-1 !overflow-visible">
      {durations.map((duration) => (
        <button
          key={duration.value}
          onClick={() => onChange(duration.value)}
          className={cn(
            "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
            value === duration.value
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {value === duration.value && (
            <motion.div
              layoutId="duration-pill"
              className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-sm"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{duration.label}</span>
          {duration.badge && (
            <span className="absolute -top-5 -right-3 px-2 py-0.5 text-[10px] font-bold uppercase bg-destructive text-destructive-foreground rounded-full z-20 shadow-md">
              {duration.badge}
            </span>
          )}
        </button>
      ))}
    </LiquidGlassCard>
  );
}
