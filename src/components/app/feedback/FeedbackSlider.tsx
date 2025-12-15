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

export function FeedbackSlider({ label, hint, value, onChange, disabled }: FeedbackSliderProps) {
  const zone = getZoneInfo(value);

  return (
    <div className="space-y-1.5">
      {/* Label row with hint */}
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-foreground">{label}</span>
          {hint && (
            <span className="text-[11px] text-muted-foreground/50">{hint}</span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <span className={cn("text-sm font-mono font-bold tabular-nums", zone.color)}>
            {Number.isInteger(value) ? value : value.toFixed(1)}
          </span>
          <span className={cn(
            "text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wide",
            zone.bgColor,
            "text-white font-medium whitespace-nowrap"
          )}>
            {zone.label}
          </span>
        </div>
      </div>
      
      {/* Slider */}
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={0}
        max={10}
        step={0.1}
        disabled={disabled}
        variant="glass"
        className="w-full"
      />
    </div>
  );
}
