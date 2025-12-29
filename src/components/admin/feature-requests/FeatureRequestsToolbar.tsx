// ============================================
// Admin Feature Requests Toolbar
// With search, bulk actions, date range filter, and CSV export
// ============================================

import { useState, useEffect } from 'react';
import { RefreshCw, Search, Archive, Trash2, Download, X } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { DateRangeFilter, DateRangeValue } from '@/components/admin/shared/DateRangeFilter';
import { cn } from '@/lib/utils';
import type { AdminFeatureRequestStatus, AdminPriority } from '@/lib/api/types';

interface FeatureRequestsToolbarProps {
  status: AdminFeatureRequestStatus | undefined;
  onStatusChange: (status: AdminFeatureRequestStatus | undefined) => void;
  includeArchived: boolean;
  onIncludeArchivedChange: (include: boolean) => void;
  statusCounts: Record<AdminFeatureRequestStatus, number> | undefined;
  total: number;
  onRefresh: () => void;
  isRefreshing: boolean;
  // Search
  search?: string;
  onSearchChange?: (search: string) => void;
  // Date range
  dateRange?: DateRangeValue;
  onDateRangeChange?: (range: DateRangeValue) => void;
  // Bulk actions
  selectedCount?: number;
  onBulkStatusChange?: (status: AdminFeatureRequestStatus) => void;
  onBulkPriorityChange?: (priority: AdminPriority) => void;
  onBulkArchive?: () => void;
  onBulkDelete?: () => void;
  onSelectAll?: () => void;
  onDeselectAll?: () => void;
  isBulkOperating?: boolean;
  // Export
  onExport?: () => void;
}

const STATUS_OPTIONS: Array<{ value: AdminFeatureRequestStatus | undefined; label: string }> = [
  { value: undefined, label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'planned', label: 'Planned' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'declined', label: 'Declined' },
];

const PRIORITY_OPTIONS: Array<{ value: AdminPriority; label: string }> = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
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
  search = '',
  onSearchChange,
  dateRange,
  onDateRangeChange,
  selectedCount = 0,
  onBulkStatusChange,
  onBulkPriorityChange,
  onBulkArchive,
  onBulkDelete,
  onSelectAll,
  onDeselectAll,
  isBulkOperating = false,
  onExport,
}: FeatureRequestsToolbarProps) {
  const [localSearch, setLocalSearch] = useState(search);
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange?.(localSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  // Sync external search changes
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  return (
    <LiquidGlassCard variant="secondary" className="p-4">
      <div className="flex flex-col gap-4">
        {/* Bulk Actions Bar - shown when items are selected */}
        {selectedCount > 0 && (
          <div className="flex flex-wrap items-center gap-3 p-3 rounded-lg bg-secondary/10 border border-secondary/20">
            <span className="text-sm font-medium text-secondary">
              {selectedCount} selected
            </span>
            <div className="h-4 w-px bg-white/10" />
            
            {/* Bulk Status Change */}
            {onBulkStatusChange && (
              <Select
                onValueChange={(val) => onBulkStatusChange(val as AdminFeatureRequestStatus)}
                disabled={isBulkOperating}
              >
                <SelectTrigger className="w-[130px] h-8 bg-white/5 border-white/10">
                  <SelectValue placeholder="Set status" />
                </SelectTrigger>
                <SelectContent className="bg-background border-white/10">
                  {STATUS_OPTIONS.filter(opt => opt.value).map((opt) => (
                    <SelectItem key={opt.value} value={opt.value!}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* Bulk Priority Change */}
            {onBulkPriorityChange && (
              <Select
                onValueChange={(val) => onBulkPriorityChange(val as AdminPriority)}
                disabled={isBulkOperating}
              >
                <SelectTrigger className="w-[120px] h-8 bg-white/5 border-white/10">
                  <SelectValue placeholder="Set priority" />
                </SelectTrigger>
                <SelectContent className="bg-background border-white/10">
                  {PRIORITY_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {onBulkArchive && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBulkArchive}
                disabled={isBulkOperating}
                className="gap-1.5 text-muted-foreground hover:text-foreground"
              >
                <Archive className="h-4 w-4" />
                Archive
              </Button>
            )}

            {onBulkDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBulkDeleteDialog(true)}
                disabled={isBulkOperating}
                className="gap-1.5 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            )}

            <div className="flex-1" />

            {onDeselectAll && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDeselectAll}
                className="text-muted-foreground"
              >
                Deselect all
              </Button>
            )}
          </div>
        )}

        {/* Top row: Search + Status pills */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search + Select All */}
          <div className="flex items-center gap-3">
            {onSelectAll && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSelectAll}
                className="text-muted-foreground hover:text-foreground shrink-0"
              >
                Select all
              </Button>
            )}
            
            {onSearchChange && (
              <div className="relative max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search requests..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="pl-9 pr-8 bg-background/50 border-border/50 w-full"
                />
                {localSearch && (
                  <button
                    onClick={() => setLocalSearch('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>

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
        </div>

        {/* Bottom row: Toggle + Date filter + Actions */}
        <div className="flex flex-wrap items-center gap-4">
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

          {/* Date Range Filter */}
          {onDateRangeChange && dateRange && (
            <DateRangeFilter
              value={dateRange}
              onChange={onDateRangeChange}
              className="h-9"
            />
          )}

          <div className="flex-1" />

          {/* Export Button */}
          {onExport && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onExport}
              className="text-muted-foreground hover:text-foreground gap-1.5"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          )}

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

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog open={showBulkDeleteDialog} onOpenChange={setShowBulkDeleteDialog}>
        <AlertDialogContent className="bg-background border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedCount} Feature Requests</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {selectedCount} feature request{selectedCount !== 1 ? 's' : ''}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onBulkDelete?.();
                setShowBulkDeleteDialog(false);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete {selectedCount} requests
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </LiquidGlassCard>
  );
}
