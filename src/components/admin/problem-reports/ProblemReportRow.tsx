// ============================================
// Problem Report Row Component
// Table row with inline editing and actions
// ============================================

import { useState } from 'react';
import { Archive, ArchiveRestore, Image, MoreHorizontal, Trash2 } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { AdminProblemReport } from '@/lib/api/types';

type ProblemReportStatus = 'new' | 'triaged' | 'in_progress' | 'fixed' | 'wont_fix' | 'duplicate';
type ProblemCategory = 'bug' | 'ui_issue' | 'performance' | 'other';
type AdminPriority = 'low' | 'medium' | 'high' | 'critical';

interface ProblemReportRowProps {
  report: AdminProblemReport;
  onUpdateStatus: (id: number, status: ProblemReportStatus) => void;
  onUpdatePriority: (id: number, priority: AdminPriority | null) => void;
  onArchive: (id: number) => void;
  onUnarchive: (id: number) => void;
  onDelete: (id: number) => void;
  onViewDetails: (report: AdminProblemReport) => void;
  isUpdating: boolean;
}

const CATEGORY_CONFIG: Record<ProblemCategory, { label: string; className: string }> = {
  bug: { label: 'Bug', className: 'bg-red-500/20 text-red-400 border-red-500/30' },
  ui_issue: { label: 'UI Issue', className: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  performance: { label: 'Performance', className: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  other: { label: 'Other', className: 'bg-muted/50 text-muted-foreground border-white/10' },
};

const STATUS_CONFIG: Record<ProblemReportStatus, { label: string; className: string }> = {
  new: { label: 'New', className: 'bg-blue-500/20 text-blue-400' },
  triaged: { label: 'Triaged', className: 'bg-purple-500/20 text-purple-400' },
  in_progress: { label: 'In Progress', className: 'bg-whaam-yellow/20 text-whaam-yellow' },
  fixed: { label: 'Fixed', className: 'bg-emerald-500/20 text-emerald-400' },
  wont_fix: { label: "Won't Fix", className: 'bg-muted/50 text-muted-foreground' },
  duplicate: { label: 'Duplicate', className: 'bg-orange-500/20 text-orange-400' },
};

const PRIORITY_CONFIG: Record<AdminPriority, { label: string; className: string }> = {
  low: { label: 'Low', className: 'bg-muted/50 text-muted-foreground' },
  medium: { label: 'Medium', className: 'bg-blue-500/20 text-blue-400' },
  high: { label: 'High', className: 'bg-orange-500/20 text-orange-400' },
  critical: { label: 'Critical', className: 'bg-red-500/20 text-red-400' },
};

const STATUS_OPTIONS: ProblemReportStatus[] = ['new', 'triaged', 'in_progress', 'fixed', 'wont_fix', 'duplicate'];
const PRIORITY_OPTIONS: AdminPriority[] = ['low', 'medium', 'high', 'critical'];

export function ProblemReportRow({
  report,
  onUpdateStatus,
  onUpdatePriority,
  onArchive,
  onUnarchive,
  onDelete,
  onViewDetails,
  isUpdating,
}: ProblemReportRowProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const categoryConfig = CATEGORY_CONFIG[report.category as ProblemCategory] ?? CATEGORY_CONFIG.other;
  const statusConfig = STATUS_CONFIG[report.status as ProblemReportStatus] ?? STATUS_CONFIG.new;
  const priorityConfig = report.priority ? PRIORITY_CONFIG[report.priority as AdminPriority] : null;

  const screenshotCount = report.screenshot_urls?.length ?? 0;
  const userInitials = report.user_email
    ? report.user_email.substring(0, 2).toUpperCase()
    : '??';

  const formattedDate = new Date(report.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const truncatedDescription = report.description.length > 60
    ? `${report.description.substring(0, 60)}...`
    : report.description;

  const truncatedUrl = report.page_url && report.page_url.length > 30
    ? `${report.page_url.substring(0, 30)}...`
    : report.page_url;

  return (
    <>
      <TableRow
        className={cn(
          'group transition-colors hover:bg-white/5',
          report.is_archived && 'opacity-60'
        )}
      >
        {/* Category */}
        <TableCell>
          <Badge variant="outline" className={cn('text-xs', categoryConfig.className)}>
            {categoryConfig.label}
          </Badge>
        </TableCell>

        {/* Description */}
        <TableCell>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onViewDetails(report)}
                  className="text-left text-sm text-foreground hover:text-secondary transition-colors max-w-[200px] truncate block"
                >
                  {truncatedDescription}
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[300px] bg-background border-white/10">
                <p className="text-sm">{report.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>

        {/* Screenshots */}
        <TableCell>
          {screenshotCount > 0 ? (
            <Badge variant="secondary" className="bg-white/10 text-foreground gap-1">
              <Image className="h-3 w-3" />
              {screenshotCount}
            </Badge>
          ) : (
            <span className="text-muted-foreground text-xs">—</span>
          )}
        </TableCell>

        {/* Status */}
        <TableCell>
          <Select
            value={report.status}
            onValueChange={(val) => onUpdateStatus(report.id, val as ProblemReportStatus)}
            disabled={isUpdating}
          >
            <SelectTrigger className="w-[130px] h-8 bg-white/5 border-white/10">
              <Badge className={cn('text-xs', statusConfig.className)}>
                {statusConfig.label}
              </Badge>
            </SelectTrigger>
            <SelectContent className="bg-background border-white/10">
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>
                  <Badge className={cn('text-xs', STATUS_CONFIG[s].className)}>
                    {STATUS_CONFIG[s].label}
                  </Badge>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </TableCell>

        {/* Priority */}
        <TableCell>
          <Select
            value={report.priority ?? 'none'}
            onValueChange={(val) => onUpdatePriority(report.id, val === 'none' ? null : val as AdminPriority)}
            disabled={isUpdating}
          >
            <SelectTrigger className="w-[110px] h-8 bg-white/5 border-white/10">
              {priorityConfig ? (
                <Badge className={cn('text-xs', priorityConfig.className)}>
                  {priorityConfig.label}
                </Badge>
              ) : (
                <span className="text-muted-foreground text-xs">Set priority</span>
              )}
            </SelectTrigger>
            <SelectContent className="bg-background border-white/10">
              <SelectItem value="none">
                <span className="text-muted-foreground">None</span>
              </SelectItem>
              {PRIORITY_OPTIONS.map((p) => (
                <SelectItem key={p} value={p}>
                  <Badge className={cn('text-xs', PRIORITY_CONFIG[p].className)}>
                    {PRIORITY_CONFIG[p].label}
                  </Badge>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </TableCell>

        {/* User */}
        <TableCell>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs bg-white/10">{userInitials}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground truncate max-w-[120px]">
              {report.user_email ?? 'Anonymous'}
            </span>
          </div>
        </TableCell>

        {/* Page URL */}
        <TableCell>
          {report.page_url ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={report.page_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-secondary transition-colors truncate max-w-[120px] block"
                  >
                    {truncatedUrl}
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-background border-white/10">
                  <p className="text-xs">{report.page_url}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <span className="text-muted-foreground text-xs">—</span>
          )}
        </TableCell>

        {/* Created */}
        <TableCell>
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        </TableCell>

        {/* Actions */}
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background border-white/10">
              {report.is_archived ? (
                <DropdownMenuItem onClick={() => onUnarchive(report.id)}>
                  <ArchiveRestore className="h-4 w-4 mr-2" />
                  Unarchive
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => onArchive(report.id)}>
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-background border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Problem Report</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this problem report. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(report.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
