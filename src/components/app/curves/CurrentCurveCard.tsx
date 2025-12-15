// ============================================
// Current Curve Card Component
// Story-driven design: Play → Rate → AI improves
// ============================================

import { useState } from 'react';
import { Curve } from '@/lib/api/types';
import { LiquidGlassCard, LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { Download, History, ChevronDown, ChevronUp, Loader2, Sparkles, Lightbulb } from 'lucide-react';
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
  const [showGraph, setShowGraph] = useState(false);
  const [farFeedback, setFarFeedback] = useState(5);
  const [mediumFeedback, setMediumFeedback] = useState(5);
  const [closeFeedback, setCloseFeedback] = useState(5);

  const canSubmitFeedback = onSubmitFeedback && dailyLimit && dailyLimit.remaining > 0;
  
  // Extract version from curve name
  const versionMatch = curve.name.match(/v(\d+)/i);
  const version = versionMatch ? `v${versionMatch[1]}` : 'v1';

  const handleSubmit = () => {
    if (onSubmitFeedback) {
      onSubmitFeedback(farFeedback, mediumFeedback, closeFeedback);
      // Reset to perfect after submit
      setFarFeedback(5);
      setMediumFeedback(5);
      setCloseFeedback(5);
    }
  };

  return (
    <LiquidGlassCard variant="secondary" className="p-0 overflow-hidden max-w-2xl mx-auto">
      {/* Header - Clean and minimal */}
      <div className="px-5 py-4 border-b border-border/10 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Your Curve</h2>
          <p className="text-xs text-muted-foreground/60">
            {version} • {format(new Date(curve.created_at), 'MMM d, yyyy')}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onDownload}
            disabled={isDownloading}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
            title="Download curve file"
          >
            {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          </button>
          <button
            onClick={onViewHistory}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
            title="View curve history"
          >
            <History className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Collapsible Graph Section */}
      <div className="border-b border-border/10">
        <button
          onClick={() => setShowGraph(!showGraph)}
          className="w-full px-5 py-3 flex items-center justify-between text-sm text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-colors"
        >
          <span>{showGraph ? 'Hide curve preview' : 'Show curve preview'}</span>
          {showGraph ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        
        {showGraph && (
          <div className="px-5 pb-4">
            <div className="rounded-lg overflow-hidden bg-muted/10 border border-border/10">
              {isLoadingContent ? (
                <div className="h-[180px] flex items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : curveContent ? (
                <div className="p-3">
                  <CurveGraph curveContent={curveContent} height={180} showControls={false} />
                </div>
              ) : (
                <div className="h-[180px] flex items-center justify-center text-muted-foreground/40 text-sm">
                  No preview available
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Feedback Section */}
      {onSubmitFeedback && (
        <div className="px-5 py-5 space-y-5">
          <div>
            <h3 className="text-base font-medium text-foreground mb-1">How did it feel?</h3>
            <p className="text-xs text-muted-foreground/60">
              Play a few games, then rate each distance range
            </p>
          </div>

          {/* Scale legend */}
          <div className="flex items-center justify-center gap-3 text-[10px] text-muted-foreground/50">
            <span>0 = Too Slow</span>
            <span className="text-green-400/70">5 = Perfect</span>
            <span>10 = Too Fast</span>
          </div>

          {/* Sliders with hints */}
          <div className="space-y-4">
            <FeedbackSlider
              label="Far"
              hint="micro-adjustments · tracking distant heads"
              value={farFeedback}
              onChange={setFarFeedback}
              disabled={isSubmittingFeedback || !canSubmitFeedback}
            />
            <FeedbackSlider
              label="Medium"
              hint="flicks · switching between targets"
              value={mediumFeedback}
              onChange={setMediumFeedback}
              disabled={isSubmittingFeedback || !canSubmitFeedback}
            />
            <FeedbackSlider
              label="Close"
              hint="180s · snap reactions · close duels"
              value={closeFeedback}
              onChange={setCloseFeedback}
              disabled={isSubmittingFeedback || !canSubmitFeedback}
            />
          </div>

          {/* Pro tip */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-primary/5 border border-primary/10">
            <Lightbulb className="h-4 w-4 text-primary/70 shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="text-foreground/80 font-medium">Pro tip:</span> If your aim feels jerky or unstable, that usually means it's too fast — try lowering the value.
            </p>
          </div>

          {/* Submit button */}
          <LiquidGlassButton
            variant="accent"
            onClick={handleSubmit}
            disabled={isSubmittingFeedback || !canSubmitFeedback}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-3",
              !canSubmitFeedback && "opacity-50"
            )}
          >
            {isSubmittingFeedback ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            Generate Improved Curve
          </LiquidGlassButton>

          {/* Daily limit - only show when low */}
          {dailyLimit && dailyLimit.remaining <= 1 && (
            <p className="text-xs text-muted-foreground/50 text-center">
              {dailyLimit.remaining === 0 
                ? "Daily limit reached — resets tomorrow"
                : `${dailyLimit.remaining} adjustment left today`
              }
            </p>
          )}
        </div>
      )}
    </LiquidGlassCard>
  );
}
