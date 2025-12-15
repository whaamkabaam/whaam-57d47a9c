// ============================================
// Feedback Slider Component
// 0-10 range with color-coded zones
// ============================================

import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Turtle, Rabbit } from 'lucide-react';

interface FeedbackSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

// Simplified, consistent "how it felt" language (no "Wanted" prefix)
function getZoneInfo(value: number): { label: string; color: string; bgColor: string } {
  if (value === 5) {
    return { label: 'Perfect', color: 'text-green-400', bgColor: 'bg-green-500/90' };
  } else if (value < 5) {
    // Felt too slow → they want it faster
    if (value <= 2) {
      return { label: 'Much Too Slow', color: 'text-red-400', bgColor: 'bg-red-500/90' };
    } else if (value <= 3.5) {
      return { label: 'Too Slow', color: 'text-red-400', bgColor: 'bg-red-500/80' };
    } else {
      return { label: 'Slightly Slow', color: 'text-orange-400', bgColor: 'bg-orange-500/80' };
    }
  } else {
    // Felt too fast → they want it slower
    if (value >= 8) {
      return { label: 'Much Too Fast', color: 'text-blue-400', bgColor: 'bg-blue-500/90' };
    } else if (value >= 6.5) {
      return { label: 'Too Fast', color: 'text-blue-400', bgColor: 'bg-blue-500/80' };
    } else {
      return { label: 'Slightly Fast', color: 'text-sky-400', bgColor: 'bg-sky-500/80' };
    }
  }
}

export function FeedbackSlider({ label, value, onChange, disabled }: FeedbackSliderProps) {
  const zone = getZoneInfo(value);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-lg font-mono font-bold tabular-nums",
            zone.color
          )}>
            {Number.isInteger(value) ? value : value.toFixed(1)}
          </span>
          <span className={cn(
            "text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide",
            zone.bgColor,
            "text-white font-medium"
          )}>
            {zone.label}
          </span>
        </div>
      </div>

      <div className="relative">
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
        
        {/* Clear visual anchors with icons */}
        <div className="flex justify-between mt-2 text-[10px] font-medium text-muted-foreground/60">
          <div className="flex items-center gap-1">
            <Turtle className="h-3 w-3 text-red-400/70" />
            <span>Felt slow</span>
          </div>
          <span className="text-green-400/70">Perfect</span>
          <div className="flex items-center gap-1">
            <span>Felt fast</span>
            <Rabbit className="h-3 w-3 text-blue-400/70" />
          </div>
        </div>
      </div>
    </div>
  );
}
