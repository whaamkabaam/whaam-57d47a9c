// ============================================
// Current Curve Card Component
// ============================================

import { Curve } from '@/lib/api/types';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Download, History, Star, Check, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface CurrentCurveCardProps {
  curve: Curve;
  onDownload: () => void;
  onViewHistory: () => void;
  onMarkPerfect: () => void;
  isDownloading?: boolean;
  isMarkingPerfect?: boolean;
}

interface ScalingBarProps {
  label: string;
  value: number;
}

function ScalingBar({ label, value }: ScalingBarProps) {
  // Scaling values are typically 0-2 range, normalize to 0-100 for display
  const percentage = Math.min(100, Math.max(0, (value / 2) * 100));
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-foreground">{value.toFixed(2)}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}

export function CurrentCurveCard({
  curve,
  onDownload,
  onViewHistory,
  onMarkPerfect,
  isDownloading,
  isMarkingPerfect,
}: CurrentCurveCardProps) {
  return (
    <LiquidGlassCard variant="secondary" className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
            Current Curve
          </p>
          <h2 className="text-2xl font-bold">{curve.name}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Upload #{curve.upload_number} • {format(new Date(curve.created_at), 'MMM d, yyyy')}
          </p>
        </div>
        <div className="flex gap-2">
          {curve.is_current && (
            <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
              <Check className="h-3 w-3 mr-1" />
              Current
            </Badge>
          )}
          {curve.is_perfect && (
            <Badge variant="default" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Perfect
            </Badge>
          )}
        </div>
      </div>

      {/* Scaling Values */}
      <div className="space-y-3 mb-6">
        <ScalingBar label="Long Range" value={curve.long_range_scaling} />
        <ScalingBar label="Mid Range" value={curve.mid_range_scaling} />
        <ScalingBar label="Short Range" value={curve.short_range_scaling} />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={onDownload}
          disabled={isDownloading}
          className="flex items-center gap-2"
        >
          {isDownloading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Download
        </Button>
        <Button
          variant="outline"
          onClick={onViewHistory}
          className="flex items-center gap-2"
        >
          <History className="h-4 w-4" />
          View History
        </Button>
        {!curve.is_perfect && (
          <Button
            variant="default"
            onClick={onMarkPerfect}
            disabled={isMarkingPerfect}
            className="flex items-center gap-2"
          >
            {isMarkingPerfect ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Star className="h-4 w-4" />
            )}
            Mark as Perfect
          </Button>
        )}
      </div>
    </LiquidGlassCard>
  );
}
