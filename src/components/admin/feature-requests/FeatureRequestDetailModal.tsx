// ============================================
// Admin Feature Request Detail Modal
// ============================================

import { useState, useEffect } from 'react';
import { ChevronUp, User, Calendar, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import type { AdminFeatureRequest, AdminFeatureRequestStatus, AdminPriority, UpdateAdminFeatureRequest } from '@/lib/api/types';

interface FeatureRequestDetailModalProps {
  request: AdminFeatureRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: number, data: UpdateAdminFeatureRequest) => void;
  isSaving: boolean;
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

export function FeatureRequestDetailModal({
  request,
  open,
  onOpenChange,
  onSave,
  isSaving,
}: FeatureRequestDetailModalProps) {
  const [status, setStatus] = useState<AdminFeatureRequestStatus>('open');
  const [priority, setPriority] = useState<AdminPriority | 'none'>('none');
  const [adminNotes, setAdminNotes] = useState('');

  // Sync form state when request changes
  useEffect(() => {
    if (request) {
      setStatus(request.status);
      setPriority(request.admin_priority || 'none');
      setAdminNotes(request.admin_notes || '');
    }
  }, [request]);

  const handleSave = () => {
    if (!request) return;
    
    onSave(request.id, {
      status,
      admin_priority: priority === 'none' ? undefined : priority,
      admin_notes: adminNotes || undefined,
    });
  };

  const hasChanges = request && (
    status !== request.status ||
    (priority === 'none' ? null : priority) !== request.admin_priority ||
    adminNotes !== (request.admin_notes || '')
  );

  if (!request) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            {/* Vote count badge */}
            <div className="flex flex-col items-center px-3 py-2 rounded-lg bg-secondary/20 border border-secondary/30">
              <ChevronUp className="h-4 w-4 text-secondary" />
              <span className="text-lg font-bold text-secondary tabular-nums">
                {request.vote_count}
              </span>
            </div>
            
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl font-semibold text-foreground mb-2">
                {request.title}
              </DialogTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className={cn('text-xs', STATUS_CONFIG[request.status].className)}>
                  {STATUS_CONFIG[request.status].label}
                </Badge>
                {request.admin_priority && (
                  <Badge variant="outline" className={cn('text-xs', PRIORITY_CONFIG[request.admin_priority].className)}>
                    {PRIORITY_CONFIG[request.admin_priority].label}
                  </Badge>
                )}
                {request.is_archived && (
                  <Badge variant="outline" className="text-xs bg-muted/30 border-white/10">
                    Archived
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Description */}
        <div className="mt-4 p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
          <p className="text-sm text-foreground whitespace-pre-wrap">
            {request.description}
          </p>
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>
              {request.is_anonymous 
                ? 'Anonymous' 
                : (request.author_name || request.author_email)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Created {format(new Date(request.created_at), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground col-span-2">
            <Clock className="h-4 w-4" />
            <span>Updated {format(new Date(request.updated_at), 'MMM d, yyyy h:mm a')}</span>
          </div>
        </div>

        {/* Admin Controls */}
        <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
          <h4 className="text-sm font-semibold text-foreground">Admin Controls</h4>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Status */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as AdminFeatureRequestStatus)}>
                <SelectTrigger className="bg-background/50 border-white/10">
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
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as AdminPriority | 'none')}>
                <SelectTrigger className="bg-background/50 border-white/10">
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
            </div>
          </div>

          {/* Admin Notes */}
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Admin Notes</Label>
            <Textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add internal notes about this request..."
              className="min-h-24 bg-background/50 border-white/10 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || !hasChanges}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
