// ============================================
// Admin Feature Requests Toolbar
// ============================================

import { RefreshCw } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { AdminFeatureRequestStatus } from '@/lib/api/types';

interface FeatureRequestsToolbarProps {
  status: AdminFeatureRequestStatus | undefined;
  onStatusChange: (status: AdminFeatureRequestStatus | undefined) => void;
  includeArchived: boolean;
  onIncludeArchivedChange: (include: boolean) => void;
  statusCounts: Record<AdminFeatureRequestStatus, number> | undefined;
  total: number;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const STATUS_OPTIONS: Array<{ value: AdminFeatureRequestStatus | undefined; label: string }> = [
  { value: undefined, label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'planned', label: 'Planned' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'declined', label: 'Declined' },
];

export function FeatureRequestsToolbar({
  status,
  onStatusChange,
  includeArchived,
  onIncludeArchivedChange,
  statusCounts,
  total,
  onRefresh,
  isRefreshing,
}: FeatureRequestsToolbarProps) {
  return (
    <LiquidGlassCard variant="secondary" className="p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Status Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map(({ value, label }) => {
            const isActive = status === value;
            const count = value ? statusCounts?.[value] : total;
            
            return (
              <button
                key={label}
                onClick={() => onStatusChange(value)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                  'border focus:outline-none focus:ring-2 focus:ring-secondary/50',
                  isActive
                    ? 'bg-secondary/20 border-secondary/40 text-secondary drop-shadow-[0_0_6px_rgba(255,215,64,0.4)]'
                    : 'bg-white/[0.04] border-white/[0.08] text-muted-foreground hover:bg-white/[0.08] hover:text-foreground'
                )}
              >
                {label}
                {count !== undefined && (
                  <span className={cn(
                    'ml-1.5 text-xs',
                    isActive ? 'text-secondary/80' : 'text-muted-foreground/60'
                  )}>
                    ({count})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right side: Toggle + Refresh */}
        <div className="flex items-center gap-4">
          {/* Include Archived Toggle */}
          <div className="flex items-center gap-2">
            <Switch
              id="include-archived"
              checked={includeArchived}
              onCheckedChange={onIncludeArchivedChange}
            />
            <Label 
              htmlFor="include-archived" 
              className="text-sm text-muted-foreground cursor-pointer"
            >
              Include archived
            </Label>
          </div>

          {/* Refresh Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
          </Button>
        </div>
      </div>
    </LiquidGlassCard>
  );
}
