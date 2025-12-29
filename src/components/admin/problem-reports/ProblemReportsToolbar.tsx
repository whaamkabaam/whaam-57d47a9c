// ============================================
// Problem Reports Toolbar Component
// Status pills, category/priority filters, archive toggle, bulk actions, search, date range, export
// ============================================

import { useState, useEffect } from 'react';
import { Archive, RefreshCw, Trash2, Search, Download, X } from 'lucide-react';
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
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { DateRangeFilter, DateRangeValue } from '@/components/admin/shared/DateRangeFilter';
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
  // Search
  search?: string;
  onSearchChange?: (search: string) => void;
  // Date range
  dateRange?: DateRangeValue;
  onDateRangeChange?: (range: DateRangeValue) => void;
  // Bulk action props
  selectedCount: number;
  onBulkStatusChange: (status: ProblemReportStatus) => void;
  onBulkPriorityChange: (priority: AdminPriority) => void;
  onBulkArchive: () => void;
  onBulkDelete: () => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  isBulkOperating: boolean;
  // Export
  onExport?: () => void;
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
  search = '',
  onSearchChange,
  selectedCount,
  onBulkStatusChange,
  onBulkPriorityChange,
  onBulkArchive,
  onBulkDelete,
  onSelectAll,
  onDeselectAll,
  isBulkOperating,
  onExport,
}: ProblemReportsToolbarProps) {
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = useState(false);
  const [localSearch, setLocalSearch] = useState(search);

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
        {/* Search Bar */}
        {onSearchChange && (
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search reports..."
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

        {/* Bulk Actions Bar - shown when items are selected */}
        {selectedCount > 0 && (
          <div className="flex flex-wrap items-center gap-3 p-3 rounded-lg bg-secondary/10 border border-secondary/20">
            <span className="text-sm font-medium text-secondary">
              {selectedCount} selected
            </span>
            <div className="h-4 w-px bg-white/10" />
            
            {/* Bulk Status Change */}
            <Select
              onValueChange={(val) => onBulkStatusChange(val as ProblemReportStatus)}
              disabled={isBulkOperating}
            >
              <SelectTrigger className="w-[130px] h-8 bg-white/5 border-white/10">
                <SelectValue placeholder="Set status" />
              </SelectTrigger>
              <SelectContent className="bg-background border-white/10">
                {STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Bulk Priority Change */}
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

            <div className="flex-1" />

            <Button
              variant="ghost"
              size="sm"
              onClick={onDeselectAll}
              className="text-muted-foreground"
            >
              Deselect all
            </Button>
          </div>
        )}

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
          {/* Select All button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onSelectAll}
            className="text-muted-foreground hover:text-foreground"
          >
            Select all
          </Button>

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

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog open={showBulkDeleteDialog} onOpenChange={setShowBulkDeleteDialog}>
        <AlertDialogContent className="bg-background border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedCount} Problem Reports</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {selectedCount} problem report{selectedCount !== 1 ? 's' : ''}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onBulkDelete();
                setShowBulkDeleteDialog(false);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete {selectedCount} reports
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </LiquidGlassCard>
  );
}
