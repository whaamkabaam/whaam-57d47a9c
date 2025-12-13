// ============================================
// Current Curve Card Component
// ============================================

import { Curve } from '@/lib/api/types';
import { LiquidGlassCard, LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { Badge } from '@/components/ui/badge';
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
  // Normalize to 0-100% based on typical range 0-2
  const percentage = Math.min(100, Math.max(0, (value / 2) * 100));
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground font-medium">{label}</span>
        <span className="font-mono text-sm font-semibold text-foreground tabular-nums">
          {value.toFixed(2)}
        </span>
      </div>
      <div className="relative h-2 rounded-full bg-background/50 overflow-hidden backdrop-blur-sm border border-border/20">
        {/* Gradient fill */}
        <div 
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
          style={{ 
            width: `${percentage}%`,
            background: 'linear-gradient(90deg, hsl(var(--destructive)) 0%, #FFD740 50%, #FFD740 100%)',
            boxShadow: '0 0 12px rgba(255, 215, 64, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        />
        {/* Subtle glow overlay */}
        <div 
          className="absolute inset-y-0 left-0 rounded-full opacity-60"
          style={{ 
            width: `${percentage}%`,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
          }}
        />
      </div>
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
    <LiquidGlassCard variant="secondary" className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-medium">
            Current Curve
          </p>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            {curve.name}
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Upload #{curve.upload_number} • {format(new Date(curve.created_at), 'MMM d, yyyy')}
          </p>
        </div>
        <div className="flex gap-2">
          {curve.is_current && (
            <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30 backdrop-blur-sm">
              <Check className="h-3 w-3 mr-1" />
              Current
            </Badge>
          )}
          {curve.is_perfect && (
            <Badge variant="default" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 backdrop-blur-sm">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Perfect
            </Badge>
          )}
        </div>
      </div>

      {/* Curve Graph */}
      <div className="mb-8 rounded-2xl p-4 relative group overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, hsl(var(--background) / 0.6) 0%, hsl(var(--background) / 0.3) 100%)',
          boxShadow: 'inset 0 1px 0 hsl(var(--border) / 0.1), 0 4px 24px hsl(var(--background) / 0.4)',
          border: '1px solid hsl(var(--border) / 0.2)',
        }}
      >
        {isLoadingContent ? (
          <div className="h-[200px] flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-2 border-whaam-yellow border-t-transparent rounded-full" />
          </div>
        ) : curveContent ? (
          <>
            <CurveGraph curveContent={curveContent} height={200} showControls={false} />
            {onViewGraph && (
              <button
                onClick={onViewGraph}
                className="absolute top-3 right-3 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 bg-background/50 hover:bg-background/80 backdrop-blur-sm border border-border/20"
              >
                <Maximize2 className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </>
        ) : (
          <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">
            No graph data available
          </div>
        )}
      </div>

      {/* Scaling Values */}
      <div className="mb-8">
        <h3 className="text-xs text-muted-foreground uppercase tracking-widest mb-4 font-medium">
          Scaling Values
        </h3>
        <div className="space-y-4">
          <ScalingBar label="Long Range" value={curve.long_range_scaling} />
          <ScalingBar label="Mid Range" value={curve.mid_range_scaling} />
          <ScalingBar label="Short Range" value={curve.short_range_scaling} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pt-2">
        <LiquidGlassButton
          variant="secondary"
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
        </LiquidGlassButton>
        <LiquidGlassButton
          variant="secondary"
          onClick={onViewHistory}
          className="flex items-center gap-2"
        >
          <History className="h-4 w-4" />
          View History
        </LiquidGlassButton>
        {!curve.is_perfect && (
          <LiquidGlassButton
            variant="accent"
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
          </LiquidGlassButton>
        )}
      </div>
    </LiquidGlassCard>
  );
}
