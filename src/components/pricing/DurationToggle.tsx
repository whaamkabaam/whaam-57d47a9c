import { cn } from '@/lib/utils';
import type { SubscriptionDuration } from '@/lib/api';

interface DurationToggleProps {
  value: SubscriptionDuration;
  onChange: (duration: SubscriptionDuration) => void;
}

const durations: { value: SubscriptionDuration; label: string; badge?: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly', badge: 'Best value' },
];

export function DurationToggle({ value, onChange }: DurationToggleProps) {
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-full glass-secondary">
      {durations.map((duration) => (
        <button
          key={duration.value}
          onClick={() => onChange(duration.value)}
          className={cn(
            "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            value === duration.value
              ? "bg-secondary text-secondary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          {duration.label}
          {duration.badge && value === duration.value && (
            <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[10px] font-bold uppercase bg-primary text-primary-foreground rounded-full">
              Save
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
