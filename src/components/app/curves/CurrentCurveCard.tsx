// ============================================
// Current Curve Card Component
// Story-driven design: Play → Rate → AI improves
// ============================================

import { useState, useMemo } from 'react';
import { Curve } from '@/lib/api/types';
import { LiquidGlassCard, LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { Download, History, Loader2, Sparkles, Lightbulb } from 'lucide-react';
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
  isRevertingPrevious?: boolean;
  isMarkingPerfect?: boolean;
  onSubmitFeedback?: (longRange: number, midRange: number, shortRange: number) => void;
  isSubmittingFeedback?: boolean;
  dailyLimit?: { used: number; limit: number; remaining: number };
  isLoadingDailyLimit?: boolean;
}

const PRO_TIPS = [
  "If your aim feels jerky or unstable, that usually means it's too fast — try lowering the value.",
  "Struggling to stay on heads at range? Try increasing Far Range sensitivity.",
  "Missing flicks? You might need to increase Mid Range. Overshooting? Lower it.",
  "If 180° turns feel sluggish, increase Close Range. If you spin too far, lower it.",
  "Small adjustments (±1-2) often feel better than big jumps.",
  "Play 3-5 games before rating — your muscle memory needs time to adapt.",
  "Focus on one range at a time if you're unsure what to change.",
];

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
  isRevertingPrevious,
}: CurrentCurveCardProps) {
  const [farFeedback, setFarFeedback] = useState(5);
  const [mediumFeedback, setMediumFeedback] = useState(5);
  const [closeFeedback, setCloseFeedback] = useState(5);

  const canSubmitFeedback = onSubmitFeedback && dailyLimit && dailyLimit.remaining > 0;
  
  // Extract version from curve name
  const versionMatch = curve.name.match(/v(\d+)/i);
  const version = versionMatch ? parseInt(versionMatch[1]) : 1;

  // Random pro tip (stable per render cycle)
  const proTip = useMemo(() => PRO_TIPS[Math.floor(Math.random() * PRO_TIPS.length)], []);

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
    <LiquidGlassCard variant="secondary" className="p-0 overflow-hidden">
      {/* Header - Prominent curve name */}
      <div className="px-6 py-4 border-b border-border/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">
            Your Curve
          </h2>
          <span className="px-2.5 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold">
            v{version}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground/80">
            {format(new Date(curve.created_at), 'MMM d, yyyy')}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={onDownload}
              disabled={isDownloading}
              className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
              title="Download curve file"
            >
              {isDownloading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
            </button>
            <button
              onClick={onViewHistory}
              disabled={isRevertingPrevious}
              className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors disabled:opacity-50"
              title="Revert to previous version"
              aria-label="Revert to previous version"
            >
              {isRevertingPrevious ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <History className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Two-column layout: Graph + Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Curve Graph - Always visible */}
        <div className="p-6 lg:border-r border-border/10 overflow-visible">
          <div className="rounded-xl bg-muted/10 border border-border/10 aspect-[4/3] relative" style={{ overflow: 'visible' }}>
            {isLoadingContent ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : curveContent ? (
              <div className="absolute inset-0 overflow-visible">
                <CurveGraph curveContent={curveContent} height="100%" showControls={false} />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40 text-sm">
                No preview available
              </div>
            )}
          </div>
        </div>

        {/* Right: Feedback Section */}
        {onSubmitFeedback && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">How did it feel?</h3>
              <p className="text-sm text-muted-foreground/70">
                Play a few games, then rate each distance range
              </p>
            </div>

            {/* Scale legend */}
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground/70 py-2 px-4 rounded-lg bg-muted/10 border border-border/20">
              <span className="font-medium">0 = Too slow</span>
              <span className="text-green-400 font-semibold">5 = Perfect</span>
              <span className="font-medium">10 = Too fast</span>
            </div>

            {/* Sliders with hints */}
            <div className="space-y-6">
              <FeedbackSlider
                label="Far Range"
                hint="Micro-adjustments · tracking distant heads"
                value={farFeedback}
                onChange={setFarFeedback}
                disabled={isSubmittingFeedback || !canSubmitFeedback}
              />
              <FeedbackSlider
                label="Mid Range"
                hint="Flicks · switching between targets"
                value={mediumFeedback}
                onChange={setMediumFeedback}
                disabled={isSubmittingFeedback || !canSubmitFeedback}
              />
              <FeedbackSlider
                label="Close Range"
                hint="180s · snap reactions · close duels"
                value={closeFeedback}
                onChange={setCloseFeedback}
                disabled={isSubmittingFeedback || !canSubmitFeedback}
              />
            </div>

            {/* Pro tip */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
              <Lightbulb className="h-4 w-4 text-primary/70 shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                <span className="text-foreground/90 font-medium">Pro tip:</span> {proTip}
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
      </div>
    </LiquidGlassCard>
  );
}
