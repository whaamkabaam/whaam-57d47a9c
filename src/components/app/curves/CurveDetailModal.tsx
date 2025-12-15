import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { CurveGraph } from './CurveGraph';
import { Download, Star, Calendar, Hash } from 'lucide-react';
import { format } from 'date-fns';
import type { Curve } from '@/lib/api/types';

interface CurveDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  curve: Curve | null;
  curveContent: string | null;
  isLoading?: boolean;
  onDownload?: () => void;
  isDownloading?: boolean;
}

export function CurveDetailModal({
  open,
  onOpenChange,
  curve,
  curveContent,
  isLoading = false,
  onDownload,
  isDownloading = false,
}: CurveDetailModalProps) {
  if (!curve) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>{curve.name}</span>
            {curve.is_perfect && (
              <Star className="h-5 w-5 fill-whaam-yellow text-whaam-yellow" />
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Hash className="h-4 w-4" />
              <span>Upload #{curve.upload_number}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(curve.created_at), 'MMM d, yyyy')}</span>
            </div>
          </div>

          {/* Graph */}
          <div className="bg-background/50 rounded-lg p-4">
            {isLoading ? (
              <div className="h-[300px] flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-2 border-whaam-yellow border-t-transparent rounded-full" />
              </div>
            ) : curveContent ? (
              <CurveGraph 
                curveContent={curveContent} 
                height={300}
                showControls={true}
              />
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Failed to load curve data
              </div>
            )}
          </div>

          {/* Feedback Values */}
          {(curve.long_range_feedback !== null || curve.mid_range_feedback !== null || curve.short_range_feedback !== null) ? (
            <>
              <p className="text-xs text-muted-foreground mb-2">This curve was created from your feedback:</p>
              <div className="grid grid-cols-3 gap-4">
                <FeedbackValue label="Long Range" value={curve.long_range_feedback} />
                <FeedbackValue label="Mid Range" value={curve.mid_range_feedback} />
                <FeedbackValue label="Short Range" value={curve.short_range_feedback} />
              </div>
            </>
          ) : (
            <div className="text-sm text-muted-foreground/60 text-center py-4 border border-border/10 rounded-lg bg-background/30">
              Initial Upload — No feedback data
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end">
            <LiquidGlassButton
              onClick={onDownload}
              disabled={isDownloading}
              className="flex items-center gap-2"
            >
              {isDownloading ? (
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              Download .ccurve
            </LiquidGlassButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FeedbackValue({ label, value }: { label: string; value: number | null }) {
  if (value === null) {
    return (
      <div className="bg-background/30 rounded-lg p-3">
        <div className="text-xs text-muted-foreground mb-1">{label}</div>
        <div className="text-sm text-muted-foreground/60">—</div>
      </div>
    );
  }
  
  const percentage = (value / 10) * 100;
  
  // Intensity-based classification: Perfect is ONLY at exactly 5
  const getColorInfo = () => {
    if (value <= 2) return { bg: 'hsl(0, 84%, 50%)', label: 'Much Faster' };
    if (value <= 3.5) return { bg: 'hsl(15, 84%, 55%)', label: 'Faster' };
    if (value < 5) return { bg: 'hsl(35, 84%, 55%)', label: 'Slightly Faster' };
    if (value === 5) return { bg: 'hsl(142, 71%, 45%)', label: 'Perfect' };
    if (value <= 6.4) return { bg: 'hsl(190, 70%, 55%)', label: 'Slightly Slower' };
    if (value <= 7.9) return { bg: 'hsl(210, 80%, 55%)', label: 'Slower' };
    return { bg: 'hsl(230, 85%, 50%)', label: 'Much Slower' };
  };
  const colorInfo = getColorInfo();
  
  return (
    <div className="bg-background/30 rounded-lg p-3">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-background/50 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all"
            style={{ 
              width: `${percentage}%`,
              background: colorInfo.bg,
              boxShadow: `0 0 6px ${colorInfo.bg}40`,
            }}
          />
        </div>
        <span className="text-sm font-medium text-foreground w-6 text-right">{value}</span>
      </div>
      <div className="text-xs text-muted-foreground/80 mt-1">{colorInfo.label}</div>
    </div>
  );
}
