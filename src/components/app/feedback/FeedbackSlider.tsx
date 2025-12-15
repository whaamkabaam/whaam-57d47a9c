// ============================================
// Feedback Slider Component
// 0-10 range with color-coded zones
// ============================================

import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface FeedbackSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

function getZoneInfo(value: number): { label: string; color: string; bgColor: string } {
  if (value <= 3) {
    return { 
      label: 'Faster', 
      color: 'text-red-400',
      bgColor: 'bg-red-500/90'
    };
  } else if (value <= 6) {
    return { 
      label: 'Perfect', 
      color: 'text-green-400',
      bgColor: 'bg-green-500/90'
    };
  } else {
    return { 
      label: 'Slower', 
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/90'
    };
  }
}

export function FeedbackSlider({ label, value, onChange, disabled }: FeedbackSliderProps) {
  const zone = getZoneInfo(value);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-lg font-mono font-bold tabular-nums",
            zone.color
          )}>
            {value}
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
          step={1}
          disabled={disabled}
          variant="glass"
          className="w-full"
        />
        
        {/* Zone indicators below slider */}
        <div className="flex justify-between mt-2 text-[9px] font-medium uppercase tracking-wider text-muted-foreground/50">
          <span className="text-red-400/60">0</span>
          <span className="text-red-400/60">Faster</span>
          <span className="text-muted-foreground/30">•</span>
          <span className="text-green-400/60">Perfect</span>
          <span className="text-muted-foreground/30">•</span>
          <span className="text-blue-400/60">Slower</span>
          <span className="text-blue-400/60">10</span>
        </div>
      </div>
    </div>
  );
}
