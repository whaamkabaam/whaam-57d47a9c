// ============================================
// Daily Limit Indicator Component
// Shows remaining adjustments for the day
// ============================================

import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DailyLimitIndicatorProps {
  used: number;
  limit: number;
  isLoading?: boolean;
}

export function DailyLimitIndicator({ used, limit, isLoading }: DailyLimitIndicatorProps) {
  const remaining = limit - used;
  const isExhausted = remaining <= 0;
  const percentage = Math.min((used / limit) * 100, 100);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-3 w-20 bg-muted/20 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {isExhausted ? (
        <AlertCircle className="h-3.5 w-3.5 text-destructive" />
      ) : (
        <CheckCircle2 className="h-3.5 w-3.5 text-green-400/80" />
      )}
      <span className={cn(
        "text-xs font-medium",
        isExhausted ? "text-destructive" : "text-muted-foreground/70"
      )}>
        {remaining}/{limit} left
      </span>
      
      {/* Compact progress bar */}
      <div className="w-12 h-1.5 bg-muted/20 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-300",
            isExhausted ? "bg-destructive" : "bg-green-500/70"
          )}
          style={{ width: `${100 - percentage}%` }}
        />
      </div>
    </div>
  );
}
