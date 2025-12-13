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

          {/* Scaling Values */}
          <div className="grid grid-cols-3 gap-4">
            <ScalingValue label="Long Range" value={curve.long_range_scaling} />
            <ScalingValue label="Mid Range" value={curve.mid_range_scaling} />
            <ScalingValue label="Short Range" value={curve.short_range_scaling} />
          </div>

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

function ScalingValue({ label, value }: { label: string; value: number }) {
  const percentage = Math.min(value * 100, 100);
  
  return (
    <div className="bg-background/30 rounded-lg p-3">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-background/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-whaam-yellow rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm font-medium text-foreground w-10 text-right">
          {value.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
