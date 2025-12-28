// ============================================
// Problem Report Detail Modal Component
// Full view with screenshot gallery and admin controls
// ============================================

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import type { AdminProblemReport, UpdateAdminProblemReport } from '@/lib/api/types';

type ProblemReportStatus = 'new' | 'triaged' | 'in_progress' | 'fixed' | 'wont_fix' | 'duplicate';
type AdminPriority = 'low' | 'medium' | 'high' | 'critical';

interface ProblemReportDetailModalProps {
  report: AdminProblemReport | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: number, data: UpdateAdminProblemReport) => void;
  isSaving: boolean;
}

const CATEGORY_CONFIG = {
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

export function ProblemReportDetailModal({
  report,
  open,
  onOpenChange,
  onSave,
  isSaving,
}: ProblemReportDetailModalProps) {
  const [status, setStatus] = useState<ProblemReportStatus>('new');
  const [priority, setPriority] = useState<AdminPriority | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isUserAgentOpen, setIsUserAgentOpen] = useState(false);

  // Reset form when report changes
  useEffect(() => {
    if (report) {
      setStatus(report.status as ProblemReportStatus);
      setPriority(report.priority as AdminPriority | null);
      setAdminNotes(report.admin_notes ?? '');
      setLightboxIndex(null);
    }
  }, [report]);

  if (!report) return null;

  const categoryConfig = CATEGORY_CONFIG[report.category as keyof typeof CATEGORY_CONFIG] ?? CATEGORY_CONFIG.other;
  const screenshots = report.screenshot_urls ?? [];

  const handleSave = () => {
    onSave(report.id, {
      status,
      priority,
      admin_notes: adminNotes,
    });
  };

  const formattedDate = new Date(report.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl bg-background border-white/10 max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className={cn('text-xs', categoryConfig.className)}>
                {categoryConfig.label}
              </Badge>
              <Badge className={cn('text-xs', STATUS_CONFIG[status].className)}>
                {STATUS_CONFIG[status].label}
              </Badge>
              {priority && (
                <Badge className={cn('text-xs', PRIORITY_CONFIG[priority].className)}>
                  {PRIORITY_CONFIG[priority].label}
                </Badge>
              )}
            </div>
            <DialogTitle className="text-xl font-semibold mt-2">
              Problem Report #{report.id}
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[calc(90vh-200px)]">
            <div className="p-6 pt-4 space-y-6">
              {/* Description */}
              <div>
                <Label className="text-muted-foreground text-xs uppercase tracking-wide">Description</Label>
                <p className="mt-2 text-foreground whitespace-pre-wrap">{report.description}</p>
              </div>

              {/* Technical Info */}
              <div className="space-y-3">
                <Label className="text-muted-foreground text-xs uppercase tracking-wide">Technical Info</Label>
                
                {/* Page URL */}
                {report.page_url && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Page:</span>
                    <a
                      href={report.page_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-secondary hover:underline flex items-center gap-1"
                    >
                      {report.page_url}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}

                {/* User Agent */}
                {report.user_agent && (
                  <Collapsible open={isUserAgentOpen} onOpenChange={setIsUserAgentOpen}>
                    <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <span>User Agent</span>
                      <ChevronRight className={cn('h-4 w-4 transition-transform', isUserAgentOpen && 'rotate-90')} />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <pre className="mt-2 p-3 bg-white/5 rounded-lg text-xs text-muted-foreground font-mono overflow-x-auto">
                        {report.user_agent}
                      </pre>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </div>

              {/* Screenshots Gallery */}
              {screenshots.length > 0 && (
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wide">
                    Screenshots ({screenshots.length})
                  </Label>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {screenshots.map((url, index) => (
                      <button
                        key={index}
                        onClick={() => setLightboxIndex(index)}
                        className="relative aspect-video rounded-lg overflow-hidden bg-white/5 hover:ring-2 hover:ring-secondary/50 transition-all"
                      >
                        <img
                          src={url}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div>
                  <span className="text-muted-foreground/70">Reported by:</span>{' '}
                  <span>{report.user_email ?? 'Anonymous'}</span>
                </div>
                <div>
                  <span className="text-muted-foreground/70">Created:</span>{' '}
                  <span>{formattedDate}</span>
                </div>
              </div>

              {/* Admin Controls */}
              <div className="border-t border-white/10 pt-6 space-y-4">
                <Label className="text-muted-foreground text-xs uppercase tracking-wide">Admin Controls</Label>

                <div className="grid grid-cols-2 gap-4">
                  {/* Status */}
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm">Status</Label>
                    <Select value={status} onValueChange={(val) => setStatus(val as ProblemReportStatus)}>
                      <SelectTrigger id="status" className="bg-white/5 border-white/10">
                        <SelectValue />
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
                  </div>

                  {/* Priority */}
                  <div className="space-y-2">
                    <Label htmlFor="priority" className="text-sm">Priority</Label>
                    <Select
                      value={priority ?? 'none'}
                      onValueChange={(val) => setPriority(val === 'none' ? null : val as AdminPriority)}
                    >
                      <SelectTrigger id="priority" className="bg-white/5 border-white/10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-white/10">
                        <SelectItem value="none">None</SelectItem>
                        {PRIORITY_OPTIONS.map((p) => (
                          <SelectItem key={p} value={p}>
                            <Badge className={cn('text-xs', PRIORITY_CONFIG[p].className)}>
                              {PRIORITY_CONFIG[p].label}
                            </Badge>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Admin Notes */}
                <div className="space-y-2">
                  <Label htmlFor="admin-notes" className="text-sm">Admin Notes</Label>
                  <Textarea
                    id="admin-notes"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add internal notes about this report..."
                    className="bg-white/5 border-white/10 min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 pt-0 border-t border-white/10">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white"
            onClick={() => setLightboxIndex(null)}
          >
            <X className="h-8 w-8" />
          </button>
          
          {screenshots.length > 1 && (
            <>
              <button
                className="absolute left-4 text-white/70 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex - 1 + screenshots.length) % screenshots.length);
                }}
              >
                <ChevronLeft className="h-10 w-10" />
              </button>
              <button
                className="absolute right-4 text-white/70 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex + 1) % screenshots.length);
                }}
              >
                <ChevronRight className="h-10 w-10" />
              </button>
            </>
          )}

          <img
            src={screenshots[lightboxIndex]}
            alt={`Screenshot ${lightboxIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          
          <div className="absolute bottom-4 text-white/70 text-sm">
            {lightboxIndex + 1} / {screenshots.length}
          </div>
        </div>
      )}
    </>
  );
}
