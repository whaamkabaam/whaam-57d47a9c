// ============================================
// Feedback Slider Component - With Educational Hints
// ============================================

import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface FeedbackSliderProps {
  label: string;
  hint?: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  step?: number; // 0.5 for Basic, 0.1 for Plus/Ultra
}

function getZoneInfo(value: number): { label: string; color: string; bgColor: string } {
  if (value === 5) {
    return { label: 'Perfect', color: 'text-green-400', bgColor: 'bg-green-500/90' };
  } else if (value < 5) {
    if (value <= 2) return { label: 'Way too slow', color: 'text-red-400', bgColor: 'bg-red-500/90' };
    if (value <= 3.5) return { label: 'Too slow', color: 'text-red-400', bgColor: 'bg-red-500/80' };
    return { label: 'Bit slow', color: 'text-orange-400', bgColor: 'bg-orange-500/80' };
  } else {
    if (value >= 8) return { label: 'Way too fast', color: 'text-blue-400', bgColor: 'bg-blue-500/90' };
    if (value >= 6.5) return { label: 'Too fast', color: 'text-blue-400', bgColor: 'bg-blue-500/80' };
    return { label: 'Bit fast', color: 'text-sky-400', bgColor: 'bg-sky-500/80' };
  }
}

export function FeedbackSlider({ label, hint, value, onChange, disabled, step }: FeedbackSliderProps) {
  const zone = getZoneInfo(value);
  const isPerfect = value === 5;

  return (
    <div className="space-y-1.5">
      {/* Label row with hint */}
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-base font-semibold text-foreground">{label}</span>
          {hint && (
            <span className="text-xs text-muted-foreground/80">{hint}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("text-base font-mono font-bold tabular-nums", zone.color)}>
            {Number.isInteger(value) ? value : value.toFixed(1)}
          </span>
          {/* Only show badge when NOT perfect - reduces visual noise */}
          {!isPerfect && (
            <span className={cn(
              "text-xs px-2.5 py-1 rounded-full uppercase tracking-wide",
              zone.bgColor,
              "text-white font-semibold whitespace-nowrap"
            )}>
              {zone.label}
            </span>
          )}
        </div>
      </div>
      
      {/* Slider */}
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={0}
        max={10}
        step={step ?? 0.1}
        disabled={disabled}
        variant="glass"
        className="w-full"
      />
    </div>
  );
}
