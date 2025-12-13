// ============================================
// Current Curve Card Component
// ============================================

import { Curve } from '@/lib/api/types';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Download, History, Star, Check, Loader2, Maximize2 } from 'lucide-react';
import { format } from 'date-fns';
import { CurveGraph } from './CurveGraph';

interface CurrentCurveCardProps {
  curve: Curve;
  curveContent?: string | null;
  isLoadingContent?: boolean;
  onDownload: () => void;
  onViewHistory: () => void;
  onMarkPerfect: () => void;
  onViewGraph?: () => void;
  isDownloading?: boolean;
  isMarkingPerfect?: boolean;
}

interface ScalingBarProps {
  label: string;
  value: number;
}

function ScalingBar({ label, value }: ScalingBarProps) {
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
  curveContent,
  isLoadingContent,
  onDownload,
  onViewHistory,
  onMarkPerfect,
  onViewGraph,
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

      {/* Curve Graph */}
      <div className="mb-6 bg-background/30 rounded-lg p-3 relative group">
        {isLoadingContent ? (
          <div className="h-[180px] flex items-center justify-center">
            <div className="animate-spin h-6 w-6 border-2 border-whaam-yellow border-t-transparent rounded-full" />
          </div>
        ) : curveContent ? (
          <>
            <CurveGraph curveContent={curveContent} height={180} showControls={false} />
            {onViewGraph && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onViewGraph}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            )}
          </>
        ) : (
          <div className="h-[180px] flex items-center justify-center text-muted-foreground text-sm">
            No graph data available
          </div>
        )}
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
