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
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="h-4 w-24 bg-muted/30 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        {isExhausted ? (
          <AlertCircle className="h-4 w-4 text-destructive" />
        ) : (
          <CheckCircle2 className="h-4 w-4 text-green-400" />
        )}
        <span className={cn(
          "text-sm font-medium",
          isExhausted ? "text-destructive" : "text-muted-foreground"
        )}>
          {remaining}/{limit} adjustments left
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="w-20 h-1.5 bg-muted/30 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-300",
            isExhausted ? "bg-destructive" : "bg-green-500"
          )}
          style={{ width: `${100 - percentage}%` }}
        />
      </div>
    </div>
  );
}
