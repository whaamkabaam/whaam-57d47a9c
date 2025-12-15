// ============================================
// Curve History Modal Component
// ============================================

import { useState, useEffect } from 'react';
import { Curve } from '@/lib/api/types';
import { useCurveHistory, useRevertCurve } from '@/hooks/api/useCurves';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { RotateCcw, Star, GitBranch, Loader2, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface CurveHistoryModalProps {
  curveId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CurveHistoryModal({ curveId, open, onOpenChange }: CurveHistoryModalProps) {
  const { data: history, isLoading } = useCurveHistory(curveId ?? 0);
  const revertMutation = useRevertCurve();
  const [visibleCount, setVisibleCount] = useState(10);

  // Reset visible count when modal opens/closes
  useEffect(() => {
    if (!open) setVisibleCount(10);
  }, [open]);

  const visibleHistory = history?.slice(0, visibleCount) ?? [];
  const hasMore = history && history.length > visibleCount;

  const handleRevert = async (id: number) => {
    try {
      await revertMutation.mutateAsync(id);
      toast.success('Successfully reverted to this curve');
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to revert curve');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-background/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            Curve History
          </DialogTitle>
          <DialogDescription>
            View the iteration history and revert to previous versions
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-3 max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border/30">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </>
          ) : history && Array.isArray(history) && history.length > 0 ? (
            <>
            {visibleHistory.map((curve: Curve, index: number) => (
              <div
                key={curve.id}
                className="relative flex items-center gap-3 p-3 rounded-lg border border-border/30 bg-muted/20"
              >
                {/* Timeline connector */}
                {index < visibleHistory.length - 1 && (
                  <div className="absolute left-6 top-full h-3 w-px bg-border/50" />
                )}

                {/* Timeline dot */}
                <div className={`
                  h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0
                  ${curve.is_current ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}
                `}>
                  <span className="text-sm font-semibold">v{curve.upload_number}</span>
                </div>

                {/* Curve info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium truncate">{curve.name}</span>
                    {curve.is_current && (
                      <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        Current
                      </Badge>
                    )}
                    {curve.is_perfect && (
                      <Badge variant="default" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                        <Star className="h-2.5 w-2.5 mr-0.5 fill-current" />
                        Perfect
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(curve.created_at), 'MMM d, yyyy h:mm a')}
                  </p>
                </div>

                {/* Revert button */}
                {!curve.is_current && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRevert(curve.id)}
                    disabled={revertMutation.isPending}
                  >
                    {revertMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RotateCcw className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            ))}
            {hasMore && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground"
                onClick={() => setVisibleCount(prev => prev + 10)}
              >
                <ChevronDown className="h-4 w-4 mr-2" />
                Show {Math.min(10, history.length - visibleCount)} more
              </Button>
            )}
            </>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No history available for this curve
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
