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
import { cn } from '@/lib/utils';

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

// Compact feedback value for horizontal 3-column grid with intensity labels
function FeedbackValue({ label, value }: { label: string; value: number | null }) {
  if (value === null) {
    return (
      <div className="flex flex-col items-center text-center p-4 rounded-xl bg-background/10 border border-border/5">
        <span className="text-[11px] text-muted-foreground/60 uppercase tracking-widest font-medium mb-3">{label}</span>
        <div className="text-sm text-muted-foreground/30">—</div>
      </div>
    );
  }
  
  const percentage = (value / 10) * 100;
  
  // Match slider logic: Perfect only at exactly 5, intensity labels for others
  const getColorInfo = () => {
    if (value === 5) {
      return { bg: 'hsl(142, 71%, 45%)', label: 'Perfect', textColor: 'text-green-400' };
    } else if (value < 5) {
      if (value <= 2) {
        return { bg: 'hsl(0, 84%, 60%)', label: 'Much Faster', textColor: 'text-red-400' };
      } else if (value <= 3.5) {
        return { bg: 'hsl(0, 84%, 55%)', label: 'Faster', textColor: 'text-red-400' };
      } else {
        return { bg: 'hsl(25, 95%, 53%)', label: 'Slightly Faster', textColor: 'text-orange-400' };
      }
    } else {
      if (value >= 8) {
        return { bg: 'hsl(217, 91%, 60%)', label: 'Much Slower', textColor: 'text-blue-400' };
      } else if (value >= 6.5) {
        return { bg: 'hsl(217, 91%, 55%)', label: 'Slower', textColor: 'text-blue-400' };
      } else {
        return { bg: 'hsl(199, 89%, 48%)', label: 'Slightly Slower', textColor: 'text-sky-400' };
      }
    }
  };
  const colorInfo = getColorInfo();
  
  // Smart decimal display
  const displayValue = Number.isInteger(value) ? value : value.toFixed(1);
  
  return (
    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-background/15 border border-border/10">
      <span className="text-[11px] text-muted-foreground/60 uppercase tracking-widest font-medium mb-3">{label}</span>
      <div className="w-full h-2.5 rounded-full bg-muted/20 overflow-hidden mb-3">
        <div 
          className="h-full rounded-full transition-all duration-500"
          style={{ 
            width: `${percentage}%`,
            background: colorInfo.bg,
            boxShadow: `0 0 12px ${colorInfo.bg}50`,
          }}
        />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-2xl font-bold font-mono tabular-nums">{displayValue}</span>
        <span className={cn("text-[10px] font-medium uppercase tracking-wide", colorInfo.textColor)}>
          {colorInfo.label}
        </span>
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
      // Reset sliders to default "Perfect" value after submission
      setLongRange(5);
      setMidRange(5);
      setShortRange(5);
    }
  };

  return (
    <LiquidGlassCard variant="secondary" className="p-0 overflow-hidden">
      {/* Header Section */}
      <div className="px-6 py-5 md:px-8 md:py-6 border-b border-border/10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] text-muted-foreground/60 uppercase tracking-widest mb-1.5 font-medium">
              Current Curve
            </p>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              {curve.name}
            </h2>
            <p className="text-xs text-muted-foreground/70 mt-1.5">
              Upload #{curve.upload_number} • {format(new Date(curve.created_at), 'MMM d, yyyy')}
            </p>
          </div>
          <div className="flex gap-2">
            {curve.is_current && (
              <Badge variant="default" className="bg-green-500/15 text-green-400 border-green-500/25 text-[10px] uppercase tracking-wide">
                <Check className="h-3 w-3 mr-1" />
                Current
              </Badge>
            )}
            {curve.is_perfect && (
              <Badge variant="default" className="bg-yellow-500/15 text-yellow-400 border-yellow-500/25 text-[10px] uppercase tracking-wide">
                <Star className="h-3 w-3 mr-1 fill-current" />
                Perfect
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Content: Graph + Historic Feedback */}
      <div className="px-6 py-6 md:px-8 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
          {/* Left: Curve Graph (3 cols) */}
          <div className="lg:col-span-3 rounded-xl relative group overflow-hidden min-h-[320px]"
            style={{
              background: 'linear-gradient(180deg, hsl(var(--muted) / 0.15) 0%, hsl(var(--muted) / 0.05) 100%)',
              border: '1px solid hsl(var(--border) / 0.15)',
            }}
          >
            {isLoadingContent ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin h-6 w-6 border-2 border-whaam-yellow border-t-transparent rounded-full" />
              </div>
            ) : curveContent ? (
              <div className="p-4 h-full flex items-center justify-center">
                <div className="w-full max-w-[485px] relative">
                  <CurveGraph curveContent={curveContent} height={364} showControls={true} />
                  {onViewGraph && (
                    <button
                      onClick={onViewGraph}
                      className="absolute top-2 right-2 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 bg-background/60 hover:bg-background/80 backdrop-blur-sm border border-border/20"
                    >
                      <Maximize2 className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground/50 text-sm">
                No graph data available
              </div>
            )}
          </div>

          {/* Right: Historic Feedback Values (2 cols) */}
          <div className="lg:col-span-2 flex flex-col justify-center rounded-xl p-5"
            style={{
              background: 'linear-gradient(180deg, hsl(var(--muted) / 0.1) 0%, hsl(var(--muted) / 0.03) 100%)',
              border: '1px solid hsl(var(--border) / 0.1)',
            }}
          >
            {hasHistoricFeedback ? (
              <>
                <p className="text-[10px] text-muted-foreground/50 mb-5 uppercase tracking-widest font-medium text-center">
                  Created from your feedback
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <FeedbackValue label="Long" value={curve.long_range_feedback} />
                  <FeedbackValue label="Mid" value={curve.mid_range_feedback} />
                  <FeedbackValue label="Short" value={curve.short_range_feedback} />
                </div>
              </>
            ) : (
              <div className="text-sm text-muted-foreground/40 text-center py-8">
                Initial Upload<br />
                <span className="text-xs">No feedback data</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feedback Submission Section */}
      {onSubmitFeedback && (
        <div className="px-6 py-6 md:px-8 md:py-8 border-t border-border/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <h3 className="text-sm font-semibold text-foreground">How did this curve feel?</h3>
            <DailyLimitIndicator 
              used={dailyLimit?.used ?? 0} 
              limit={dailyLimit?.limit ?? 3} 
              isLoading={isLoadingDailyLimit}
            />
          </div>
          
          <div className="space-y-5 mb-6">
            <FeedbackSlider 
              label="Long Range" 
              value={longRange} 
              onChange={setLongRange}
              disabled={isSubmittingFeedback || !canSubmitFeedback}
            />
            <FeedbackSlider 
              label="Mid Range" 
              value={midRange} 
              onChange={setMidRange}
              disabled={isSubmittingFeedback || !canSubmitFeedback}
            />
            <FeedbackSlider 
              label="Short Range" 
              value={shortRange} 
              onChange={setShortRange}
              disabled={isSubmittingFeedback || !canSubmitFeedback}
            />
          </div>

          <LiquidGlassButton
            variant="accent"
            onClick={handleSubmit}
            disabled={isSubmittingFeedback || !canSubmitFeedback}
            className="flex items-center gap-2"
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

      {/* Actions Footer */}
      <div className="px-6 py-4 md:px-8 border-t border-border/10 bg-muted/5">
        <div className="flex flex-wrap gap-2">
          <LiquidGlassButton
            variant="secondary"
            onClick={onDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 text-sm"
          >
            {isDownloading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            Download
          </LiquidGlassButton>
          <LiquidGlassButton
            variant="secondary"
            onClick={onViewHistory}
            className="flex items-center gap-2 text-sm"
          >
            <History className="h-3.5 w-3.5" />
            History
          </LiquidGlassButton>
          {!curve.is_perfect && (
            <LiquidGlassButton
              variant="accent"
              onClick={onMarkPerfect}
              disabled={isMarkingPerfect}
              className="flex items-center gap-2 text-sm"
            >
              {isMarkingPerfect ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Star className="h-3.5 w-3.5" />
              )}
              Mark as Perfect
            </LiquidGlassButton>
          )}
        </div>
      </div>
    </LiquidGlassCard>
  );
}
