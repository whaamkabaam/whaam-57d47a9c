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
      <DialogContent className="sm:max-w-lg glass-primary rounded-2xl border-border/20">
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
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08]">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </>
          ) : history && Array.isArray(history) && history.length > 0 ? (
            (() => {
              const currentCurve = history.find(c => c.is_current);
              // Use parent_curve_id to find previous version (handles gaps correctly)
              const previousCurve = currentCurve?.parent_curve_id 
                ? history.find(c => c.id === currentCurve.parent_curve_id)
                : null;
              
              return (
                <>
                  {visibleHistory.map((curve: Curve) => (
                    <div
                      key={curve.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08]"
                    >
                      {/* Version badge */}
                      <div className={`
                        h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm
                        ${curve.is_current 
                          ? 'bg-white/[0.12] text-foreground border border-white/25' 
                          : 'bg-white/[0.06] text-muted-foreground border border-white/15'}
                      `}>
                        v{curve.upload_number}
                      </div>

                      {/* Curve info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-foreground truncate">{curve.name}</span>
                          {curve.is_current && (
                            <Badge variant="default" className="bg-green-400/15 text-green-400/90 border-green-400/25 text-xs px-2 py-0.5 font-medium">
                              Current
                            </Badge>
                          )}
                          {curve.is_favorite && (
                            <Badge variant="default" className="bg-yellow-400/15 text-yellow-400/90 border-yellow-400/25 text-xs px-2 py-0.5 font-medium">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              Favorite
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground/80">
                          {format(new Date(curve.created_at), 'MMM d, yyyy h:mm a')}
                        </p>
                      </div>

                      {/* Revert button - show for current curve (reverts to previous) or non-current curves */}
                      {(!curve.is_current || (curve.is_current && previousCurve)) && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-full hover:bg-white/10 focus-visible:ring-white/20 focus-visible:ring-1 focus-visible:ring-offset-0"
                          onClick={() => handleRevert(curve.is_current ? previousCurve!.id : curve.id)}
                          disabled={revertMutation.isPending}
                          title={curve.is_current ? "Revert to previous version" : "Set as current"}
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
                      className="w-full text-muted-foreground hover:bg-white/5"
                      onClick={() => setVisibleCount(prev => prev + 10)}
                    >
                      <ChevronDown className="h-4 w-4 mr-2" />
                      Show {Math.min(10, history.length - visibleCount)} more
                    </Button>
                  )}
                </>
              );
            })()
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
