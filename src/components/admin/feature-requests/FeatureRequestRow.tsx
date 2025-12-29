// ============================================
// Admin Feature Request Table Row
// ============================================

import { useState } from 'react';
import { MoreHorizontal, Archive, ArchiveRestore, Trash2, ChevronUp } from 'lucide-react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { format } from 'date-fns';
import type { AdminFeatureRequest, AdminFeatureRequestStatus, AdminPriority } from '@/lib/api/types';

interface FeatureRequestRowProps {
  request: AdminFeatureRequest;
  onUpdateStatus: (id: number, status: AdminFeatureRequestStatus) => void;
  onUpdatePriority: (id: number, priority: AdminPriority | null) => void;
  onArchive: (id: number) => void;
  onUnarchive: (id: number) => void;
  onDelete: (id: number) => void;
  onViewDetails: (request: AdminFeatureRequest) => void;
  isUpdating: boolean;
  isSelected?: boolean;
  onSelect?: (id: number, selected: boolean) => void;
}

// Status styling
const STATUS_CONFIG: Record<AdminFeatureRequestStatus, { label: string; className: string }> = {
  open: { label: 'Open', className: 'bg-muted/50 text-muted-foreground border-white/10' },
  planned: { label: 'Planned', className: 'bg-whaam-yellow/20 text-whaam-yellow border-whaam-yellow/30' },
  in_progress: { label: 'In Progress', className: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  completed: { label: 'Completed', className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  declined: { label: 'Declined', className: 'bg-destructive/20 text-destructive border-destructive/30' },
};

// Priority styling
const PRIORITY_CONFIG: Record<AdminPriority, { label: string; className: string }> = {
  low: { label: 'Low', className: 'bg-muted/50 text-muted-foreground border-white/10' },
  medium: { label: 'Medium', className: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  high: { label: 'High', className: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  critical: { label: 'Critical', className: 'bg-red-500/20 text-red-400 border-red-500/30' },
};

export function FeatureRequestRow({
  request,
  onUpdateStatus,
  onUpdatePriority,
  onArchive,
  onUnarchive,
  onDelete,
  onViewDetails,
  isUpdating,
  isSelected = false,
  onSelect,
}: FeatureRequestRowProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const truncatedDescription = request.description.length > 60
    ? request.description.slice(0, 60) + '...'
    : request.description;

  return (
    <>
      <TableRow className={cn(
        'transition-colors',
        request.is_archived && 'opacity-60',
        isUpdating && 'animate-pulse',
        isSelected && 'bg-secondary/10'
      )}>
        {/* Checkbox */}
        {onSelect && (
          <TableCell className="w-10">
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => onSelect(request.id, !!checked)}
              className="border-white/20"
              aria-label={`Select ${request.title}`}
            />
          </TableCell>
        )}
        
        {/* Vote Count */}
        <TableCell className="w-16">
          <div className="flex items-center gap-1 text-muted-foreground">
            <ChevronUp className="h-4 w-4" />
            <span className="font-semibold tabular-nums">{request.vote_count}</span>
          </div>
        </TableCell>

        {/* Title & Description */}
        <TableCell className="max-w-xs">
          <button
            onClick={() => onViewDetails(request)}
            className="text-left hover:text-secondary transition-colors"
          >
            <div className="font-medium text-foreground line-clamp-1">
              {request.title}
              {request.is_archived && (
                <Badge variant="outline" className="ml-2 text-xs bg-muted/30 border-white/10">
                  Archived
                </Badge>
              )}
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {truncatedDescription}
                  </p>
                </TooltipTrigger>
                {request.description.length > 60 && (
                  <TooltipContent side="bottom" className="max-w-sm">
                    <p>{request.description}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </button>
        </TableCell>

        {/* Status Dropdown */}
        <TableCell className="w-36">
          <Select
            value={request.status}
            onValueChange={(value) => onUpdateStatus(request.id, value as AdminFeatureRequestStatus)}
            disabled={isUpdating}
          >
            <SelectTrigger className="h-8 w-full bg-background/50 border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-white/10">
              {Object.entries(STATUS_CONFIG).map(([value, config]) => (
                <SelectItem key={value} value={value}>
                  <Badge variant="outline" className={cn('text-xs', config.className)}>
                    {config.label}
                  </Badge>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </TableCell>

        {/* Priority Dropdown */}
        <TableCell className="w-32">
          <Select
            value={request.admin_priority || 'none'}
            onValueChange={(value) => onUpdatePriority(request.id, value === 'none' ? null : value as AdminPriority)}
            disabled={isUpdating}
          >
            <SelectTrigger className="h-8 w-full bg-background/50 border-white/10">
              <SelectValue placeholder="Set priority" />
            </SelectTrigger>
            <SelectContent className="bg-card border-white/10">
              <SelectItem value="none">
                <span className="text-muted-foreground text-sm">None</span>
              </SelectItem>
              {Object.entries(PRIORITY_CONFIG).map(([value, config]) => (
                <SelectItem key={value} value={value}>
                  <Badge variant="outline" className={cn('text-xs', config.className)}>
                    {config.label}
                  </Badge>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </TableCell>

        {/* Author */}
        <TableCell className="w-40">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
              <span className="text-xs font-medium text-secondary">
                {request.author_email?.charAt(0).toUpperCase() || '?'}
              </span>
            </div>
            <span className="text-sm text-muted-foreground truncate">
              {request.is_anonymous ? 'Anonymous' : (request.author_name || request.author_email)}
            </span>
          </div>
        </TableCell>

        {/* Created Date */}
        <TableCell className="w-28 text-sm text-muted-foreground">
          {format(new Date(request.created_at), 'MMM d, yyyy')}
        </TableCell>

        {/* Actions */}
        <TableCell className="w-12">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-white/10">
              {request.is_archived ? (
                <DropdownMenuItem onClick={() => onUnarchive(request.id)}>
                  <ArchiveRestore className="h-4 w-4 mr-2" />
                  Unarchive
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => onArchive(request.id)}>
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
        <AlertDialogContent className="bg-card border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Feature Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{request.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-muted/50 border-white/10">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(request.id)}
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
