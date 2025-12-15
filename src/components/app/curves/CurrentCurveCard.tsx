// ============================================
// Current Curve Card Component
// ============================================

import { useState } from 'react';
import { Curve } from '@/lib/api/types';
import { LiquidGlassCard, LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { Badge } from '@/components/ui/badge';
import { Download, History, Star, Check, Loader2, Maximize2, Send } from 'lucide-react';
import { format } from 'date-fns';
import { CurveGraph } from './CurveGraph';
import { FeedbackSlider } from '@/components/app/feedback/FeedbackSlider';
import { DailyLimitIndicator } from '@/components/app/feedback/DailyLimitIndicator';

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
  // Feedback submission
  onSubmitFeedback?: (longRange: number, midRange: number, shortRange: number) => void;
  isSubmittingFeedback?: boolean;
  dailyLimit?: { used: number; limit: number; remaining: number };
  isLoadingDailyLimit?: boolean;
}

// Feedback value component with color-coded interpretation
function FeedbackValue({ label, value }: { label: string; value: number | null }) {
  if (value === null) {
    return (
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">{label}</span>
        <div className="text-sm text-muted-foreground/60">—</div>
      </div>
    );
  }
  
  const percentage = (value / 10) * 100;
  
  // Color based on value: 0-3=red (wanted faster), 4-6=green (perfect), 7-10=blue (wanted slower)
  const getColorInfo = () => {
    if (value < 4) return { bg: 'hsl(0, 84%, 60%)', label: 'wanted faster' };
    if (value > 6) return { bg: 'hsl(217, 91%, 60%)', label: 'wanted slower' };
    return { bg: 'hsl(142, 71%, 45%)', label: 'perfect' };
  };
  const colorInfo = getColorInfo();
  
  return (
    <div className="space-y-2">
      <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full bg-background/50 overflow-hidden border border-border/10">
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{ 
              width: `${percentage}%`,
              background: colorInfo.bg,
              boxShadow: `0 0 8px ${colorInfo.bg}40`,
            }}
          />
        </div>
        <span className="text-sm font-semibold text-foreground tabular-nums w-6 text-right font-mono">{value}</span>
      </div>
      <span className="text-xs text-muted-foreground/80">{colorInfo.label}</span>
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
  onSubmitFeedback,
  isSubmittingFeedback,
  dailyLimit,
  isLoadingDailyLimit,
}: CurrentCurveCardProps) {
  // Local state for feedback sliders
  const [longRange, setLongRange] = useState(5);
  const [midRange, setMidRange] = useState(5);
  const [shortRange, setShortRange] = useState(5);

  const hasHistoricFeedback = curve.long_range_feedback !== null || curve.mid_range_feedback !== null || curve.short_range_feedback !== null;
  const canSubmitFeedback = onSubmitFeedback && dailyLimit && dailyLimit.remaining > 0;

  const handleSubmit = () => {
    if (onSubmitFeedback) {
      onSubmitFeedback(longRange, midRange, shortRange);
    }
  };

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

      {/* Graph + Historic Feedback - 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left: Curve Graph */}
        <div className="rounded-2xl p-4 relative group overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, hsl(var(--background) / 0.6) 0%, hsl(var(--background) / 0.3) 100%)',
            boxShadow: 'inset 0 1px 0 hsl(var(--border) / 0.1), 0 4px 24px hsl(var(--background) / 0.4)',
            border: '1px solid hsl(var(--border) / 0.2)',
          }}
        >
          {isLoadingContent ? (
            <div className="h-[280px] flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-2 border-whaam-yellow border-t-transparent rounded-full" />
            </div>
          ) : curveContent ? (
            <>
              <CurveGraph curveContent={curveContent} height={280} showControls={true} />
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
            <div className="h-[280px] flex items-center justify-center text-muted-foreground text-sm">
              No graph data available
            </div>
          )}
        </div>

        {/* Right: Historic Feedback Values */}
        <div className="flex flex-col justify-center p-4 rounded-xl bg-background/20 border border-border/10">
          {hasHistoricFeedback ? (
            <>
              <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wide font-medium">
                This curve was created from your feedback:
              </p>
              <div className="space-y-4">
                <FeedbackValue label="Long Range" value={curve.long_range_feedback} />
                <FeedbackValue label="Mid Range" value={curve.mid_range_feedback} />
                <FeedbackValue label="Short Range" value={curve.short_range_feedback} />
              </div>
            </>
          ) : (
            <div className="text-sm text-muted-foreground/60 text-center py-8">
              Initial Upload — No feedback data
            </div>
          )}
        </div>
      </div>

      {/* Inline Feedback Submission */}
      {onSubmitFeedback && (
        <div className="mb-8 p-6 rounded-xl bg-background/30 border border-border/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-semibold">How did this curve feel?</h3>
            <DailyLimitIndicator 
              used={dailyLimit?.used ?? 0} 
              limit={dailyLimit?.limit ?? 3} 
              isLoading={isLoadingDailyLimit}
            />
          </div>
          
          <div className="space-y-6 mb-6">
            <FeedbackSlider 
              label="Long Range Sensitivity" 
              value={longRange} 
              onChange={setLongRange}
              disabled={isSubmittingFeedback || !canSubmitFeedback}
            />
            <FeedbackSlider 
              label="Mid Range Sensitivity" 
              value={midRange} 
              onChange={setMidRange}
              disabled={isSubmittingFeedback || !canSubmitFeedback}
            />
            <FeedbackSlider 
              label="Short Range Sensitivity" 
              value={shortRange} 
              onChange={setShortRange}
              disabled={isSubmittingFeedback || !canSubmitFeedback}
            />
          </div>

          <LiquidGlassButton
            variant="accent"
            onClick={handleSubmit}
            disabled={isSubmittingFeedback || !canSubmitFeedback}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            {isSubmittingFeedback ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Submit Feedback
          </LiquidGlassButton>
        </div>
      )}

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
