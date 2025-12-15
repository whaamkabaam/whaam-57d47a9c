// ============================================
// Current Curve Card Component
// Single unified card with compact layout
// ============================================

import { useState } from 'react';
import { Curve } from '@/lib/api/types';
import { LiquidGlassCard, LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { Badge } from '@/components/ui/badge';
import { Download, History, Star, Loader2, Send } from 'lucide-react';
import { format } from 'date-fns';
import { CurveGraph } from './CurveGraph';
import { FeedbackSlider } from '@/components/app/feedback/FeedbackSlider';
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
  onSubmitFeedback?: (longRange: number, midRange: number, shortRange: number) => void;
  isSubmittingFeedback?: boolean;
  dailyLimit?: { used: number; limit: number; remaining: number };
  isLoadingDailyLimit?: boolean;
}

// Compact inline historic feedback display
function HistoricFeedbackInline({ curve }: { curve: Curve }) {
  const hasAny = curve.long_range_feedback !== null || curve.mid_range_feedback !== null || curve.short_range_feedback !== null;
  if (!hasAny) return null;

  const getLabel = (value: number | null) => {
    if (value === null) return '—';
    if (value === 5) return 'perfect';
    if (value < 5) return value <= 3 ? 'slow' : 'bit slow';
    return value >= 7 ? 'fast' : 'bit fast';
  };

  return (
    <span className="text-xs text-muted-foreground/50">
      Last: Far {getLabel(curve.long_range_feedback)} · Med {getLabel(curve.mid_range_feedback)} · Close {getLabel(curve.short_range_feedback)}
    </span>
  );
}

export function CurrentCurveCard({
  curve,
  curveContent,
  isLoadingContent,
  onDownload,
  onViewHistory,
  onSubmitFeedback,
  isSubmittingFeedback,
  dailyLimit,
  isDownloading,
}: CurrentCurveCardProps) {
  const [longRange, setLongRange] = useState(5);
  const [midRange, setMidRange] = useState(5);
  const [shortRange, setShortRange] = useState(5);

  const canSubmitFeedback = onSubmitFeedback && dailyLimit && dailyLimit.remaining > 0;
  
  // Derive iteration number from curve name (e.g., "curve_v6" -> 6)
  const iterationMatch = curve.name.match(/v(\d+)/i);
  const iteration = iterationMatch ? parseInt(iterationMatch[1], 10) : 1;

  const handleSubmit = () => {
    if (onSubmitFeedback) {
      onSubmitFeedback(longRange, midRange, shortRange);
      setLongRange(5);
      setMidRange(5);
      setShortRange(5);
    }
  };

  return (
    <LiquidGlassCard variant="secondary" className="p-0 overflow-hidden">
      {/* Compact Header */}
      <div className="px-4 py-3 border-b border-border/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              Iteration {iteration}
            </span>
            <h2 className="text-base font-semibold text-foreground">
              {curve.name}
            </h2>
          </div>
          {curve.is_perfect && (
            <Badge variant="default" className="bg-yellow-500/15 text-yellow-400 border-yellow-500/25 text-[10px] px-1.5 py-0">
              <Star className="h-2.5 w-2.5 mr-0.5 fill-current" />
              Favorite
            </Badge>
          )}
        </div>
        <span className="text-xs text-muted-foreground/60">
          {format(new Date(curve.created_at), 'MMM d, yyyy')}
        </span>
      </div>

      {/* Compact Graph */}
      <div className="px-4 py-4">
        <div className="rounded-lg overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, hsl(var(--muted) / 0.1) 0%, hsl(var(--muted) / 0.03) 100%)',
            border: '1px solid hsl(var(--border) / 0.1)',
          }}
        >
          {isLoadingContent ? (
            <div className="h-[200px] flex items-center justify-center">
              <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          ) : curveContent ? (
            <div className="p-3">
              <CurveGraph curveContent={curveContent} height={200} showControls={false} />
            </div>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-muted-foreground/40 text-sm">
              No graph data
            </div>
          )}
        </div>
      </div>

      {/* Feedback Section - integrated, not separate card */}
      {onSubmitFeedback && (
        <>
          <div className="px-4 py-3 border-t border-border/10 bg-muted/5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-foreground">How did it feel?</span>
                <HistoricFeedbackInline curve={curve} />
              </div>
              {dailyLimit && (
                <span className="text-xs text-muted-foreground/50">
                  {dailyLimit.remaining} tune-up{dailyLimit.remaining !== 1 ? 's' : ''} left today
                </span>
              )}
            </div>
          </div>
          
          <div className="px-4 py-4 space-y-3">
            <FeedbackSlider 
              label="Far" 
              value={longRange} 
              onChange={setLongRange}
              disabled={isSubmittingFeedback || !canSubmitFeedback}
            />
            <FeedbackSlider 
              label="Medium" 
              value={midRange} 
              onChange={setMidRange}
              disabled={isSubmittingFeedback || !canSubmitFeedback}
            />
            <FeedbackSlider 
              label="Close" 
              value={shortRange} 
              onChange={setShortRange}
              disabled={isSubmittingFeedback || !canSubmitFeedback}
            />
          </div>
        </>
      )}

      {/* Unified Footer with all actions */}
      <div className="px-4 py-3 border-t border-border/10 bg-muted/5 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={onDownload}
            disabled={isDownloading}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            {isDownloading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />}
            Download
          </button>
          <button
            onClick={onViewHistory}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <History className="h-3 w-3" />
            History
          </button>
        </div>
        
        {onSubmitFeedback && (
          <LiquidGlassButton
            variant="accent"
            onClick={handleSubmit}
            disabled={isSubmittingFeedback || !canSubmitFeedback}
            className="flex items-center gap-1.5 text-sm px-4 py-1.5"
          >
            {isSubmittingFeedback ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
            Update Curve
          </LiquidGlassButton>
        )}
      </div>
    </LiquidGlassCard>
  );
}
