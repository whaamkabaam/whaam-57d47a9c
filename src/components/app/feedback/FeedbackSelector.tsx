// ============================================
// Feedback Selector Component
// 3-option segmented control for intuitive feedback
// ============================================

import { cn } from '@/lib/utils';
import { Turtle, Check, Rabbit } from 'lucide-react';

type FeedbackOption = 'slower' | 'perfect' | 'faster';

interface FeedbackSelectorProps {
  label: string;
  value: FeedbackOption;
  onChange: (value: FeedbackOption) => void;
  disabled?: boolean;
}

const options: { value: FeedbackOption; label: string; icon: React.ReactNode; color: string }[] = [
  { value: 'slower', label: 'Too Slow', icon: <Turtle className="h-4 w-4" />, color: 'text-blue-400' },
  { value: 'perfect', label: 'Perfect', icon: <Check className="h-4 w-4" />, color: 'text-green-400' },
  { value: 'faster', label: 'Too Fast', icon: <Rabbit className="h-4 w-4" />, color: 'text-orange-400' },
];

export function FeedbackSelector({ label, value, onChange, disabled }: FeedbackSelectorProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-medium text-foreground min-w-[60px]">{label}</span>
      
      <div className="flex gap-1 p-1 rounded-lg bg-muted/30 border border-border/20">
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              disabled={disabled}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all",
                "min-w-[80px] justify-center",
                isSelected
                  ? `bg-background/80 ${option.color} shadow-sm border border-border/30`
                  : "text-muted-foreground hover:text-foreground hover:bg-background/40",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {option.icon}
              <span className="hidden sm:inline">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Helper to convert option to numeric value for API
export function feedbackToNumeric(value: FeedbackOption): number {
  switch (value) {
    case 'slower': return 2;
    case 'perfect': return 5;
    case 'faster': return 8;
  }
}

// Helper to convert numeric to option for display
export function numericToFeedback(value: number | null): FeedbackOption {
  if (value === null || value === 5) return 'perfect';
  if (value < 5) return 'slower';
  return 'faster';
}
