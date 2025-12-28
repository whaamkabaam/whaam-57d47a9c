// ============================================
// Problem Reports Toolbar Component
// Status pills, category/priority filters, archive toggle
// ============================================

import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { cn } from '@/lib/utils';

// Types
type ProblemReportStatus = 'new' | 'triaged' | 'in_progress' | 'fixed' | 'wont_fix' | 'duplicate';
type ProblemCategory = 'bug' | 'ui_issue' | 'performance' | 'other';
type AdminPriority = 'low' | 'medium' | 'high' | 'critical';

interface ProblemReportsToolbarProps {
  status: ProblemReportStatus | undefined;
  category: ProblemCategory | undefined;
  priority: AdminPriority | undefined;
  includeArchived: boolean;
  statusCounts?: Partial<Record<ProblemReportStatus, number>>;
  total: number;
  onStatusChange: (status: ProblemReportStatus | undefined) => void;
  onCategoryChange: (category: ProblemCategory | undefined) => void;
  onPriorityChange: (priority: AdminPriority | undefined) => void;
  onIncludeArchivedChange: (include: boolean) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const STATUS_OPTIONS: { value: ProblemReportStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'triaged', label: 'Triaged' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'fixed', label: 'Fixed' },
  { value: 'wont_fix', label: "Won't Fix" },
  { value: 'duplicate', label: 'Duplicate' },
];

const CATEGORY_OPTIONS: { value: ProblemCategory; label: string }[] = [
  { value: 'bug', label: 'Bug' },
  { value: 'ui_issue', label: 'UI Issue' },
  { value: 'performance', label: 'Performance' },
  { value: 'other', label: 'Other' },
];

const PRIORITY_OPTIONS: { value: AdminPriority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
];

export function ProblemReportsToolbar({
  status,
  category,
  priority,
  includeArchived,
  statusCounts = {},
  total,
  onStatusChange,
  onCategoryChange,
  onPriorityChange,
  onIncludeArchivedChange,
  onRefresh,
  isRefreshing,
}: ProblemReportsToolbarProps) {
  return (
    <LiquidGlassCard variant="secondary" className="p-4">
      <div className="flex flex-col gap-4">
        {/* Top row: Status pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onStatusChange(undefined)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
              status === undefined
                ? 'bg-secondary/20 text-secondary drop-shadow-[0_0_6px_rgba(255,215,64,0.5)]'
                : 'bg-white/5 text-muted-foreground hover:bg-white/10'
            )}
          >
            All ({total})
          </button>
          {STATUS_OPTIONS.map((opt) => {
            const count = statusCounts[opt.value] ?? 0;
            const isActive = status === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onStatusChange(opt.value)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                  isActive
                    ? 'bg-secondary/20 text-secondary drop-shadow-[0_0_6px_rgba(255,215,64,0.5)]'
                    : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                )}
              >
                {opt.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Bottom row: Dropdowns, toggle, refresh */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Category filter */}
          <Select
            value={category ?? 'all'}
            onValueChange={(val) => onCategoryChange(val === 'all' ? undefined : val as ProblemCategory)}
          >
            <SelectTrigger className="w-[140px] bg-white/5 border-white/10">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-background border-white/10">
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORY_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Priority filter */}
          <Select
            value={priority ?? 'all'}
            onValueChange={(val) => onPriorityChange(val === 'all' ? undefined : val as AdminPriority)}
          >
            <SelectTrigger className="w-[130px] bg-white/5 border-white/10">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent className="bg-background border-white/10">
              <SelectItem value="all">All Priorities</SelectItem>
              {PRIORITY_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Include archived toggle */}
          <div className="flex items-center gap-2">
            <Switch
              id="include-archived"
              checked={includeArchived}
              onCheckedChange={onIncludeArchivedChange}
            />
            <Label htmlFor="include-archived" className="text-sm text-muted-foreground cursor-pointer">
              Include archived
            </Label>
          </div>

          {/* Refresh button */}
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
