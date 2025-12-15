// ============================================
// Feedback Page - Submit curve adjustments
// ============================================

import { useState } from 'react';
import { MessageSquare, Send, AlertTriangle } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { FeedbackSlider } from '@/components/app/feedback/FeedbackSlider';
import { DailyLimitIndicator } from '@/components/app/feedback/DailyLimitIndicator';
import { useCurrentCurve } from '@/hooks/api/useCurves';
import { useDailyLimit, useSubmitFeedback } from '@/hooks/api/useFeedback';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

export default function Feedback() {
  const { toast } = useToast();
  const { data: currentCurve, isLoading: curveLoading } = useCurrentCurve();
  const { data: dailyLimit, isLoading: limitLoading } = useDailyLimit();
  const submitFeedback = useSubmitFeedback();

  // Slider values default to 5 (perfect)
  const [longRange, setLongRange] = useState(5);
  const [midRange, setMidRange] = useState(5);
  const [shortRange, setShortRange] = useState(5);

  const isLimitExhausted = dailyLimit ? (dailyLimit.limit - dailyLimit.used) <= 0 : false;
  const canSubmit = currentCurve && !isLimitExhausted && !submitFeedback.isPending;

  const handleSubmit = async () => {
    if (!currentCurve) return;

    try {
      await submitFeedback.mutateAsync({
        curve_id: currentCurve.id,
        long_range: longRange,
        mid_range: midRange,
        short_range: shortRange,
      });

      toast({
        title: 'Feedback submitted!',
        description: 'Your new adjusted curve is being generated.',
      });

      // Reset sliders to default
      setLongRange(5);
      setMidRange(5);
      setShortRange(5);
    } catch (error) {
      toast({
        title: 'Failed to submit feedback',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Submit Feedback</h1>
        </div>
        <DailyLimitIndicator
          used={dailyLimit?.used ?? 0}
          limit={dailyLimit?.limit ?? 3}
          isLoading={limitLoading}
        />
      </div>

      {/* Current Curve Info */}
      <LiquidGlassCard variant="secondary" className="p-5">
        {curveLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
        ) : currentCurve ? (
          <div>
            <h2 className="font-semibold text-lg">{currentCurve.name}</h2>
            <p className="text-sm text-muted-foreground">
              V{currentCurve.upload_number ?? 1} • Created {format(new Date(currentCurve.created_at), 'MMM d, yyyy')}
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-muted-foreground">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <p>No curve found. Please generate a curve first.</p>
          </div>
        )}
      </LiquidGlassCard>

      {/* Feedback Form */}
      <LiquidGlassCard variant="secondary" className="p-6 space-y-8">
        <div>
          <h2 className="text-lg font-semibold mb-2">How did your curve feel?</h2>
          <p className="text-sm text-muted-foreground">
            Rate each sensitivity range. Move left if it felt too slow, right if too fast.
          </p>
        </div>

        <div className="space-y-8">
          <FeedbackSlider
            label="Long Range Sensitivity"
            value={longRange}
            onChange={setLongRange}
            disabled={!canSubmit}
          />
          <FeedbackSlider
            label="Mid Range Sensitivity"
            value={midRange}
            onChange={setMidRange}
            disabled={!canSubmit}
          />
          <FeedbackSlider
            label="Short Range Sensitivity"
            value={shortRange}
            onChange={setShortRange}
            disabled={!canSubmit}
          />
        </div>

        {/* Warning if limit exhausted */}
        {isLimitExhausted && (
          <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-lg">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            <span>You've reached your daily adjustment limit. Come back tomorrow!</span>
          </div>
        )}

        {/* Submit Button */}
        <LiquidGlassButton
          variant="accent"
          className="w-full py-3 text-base"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          <Send className="h-4 w-4 mr-2" />
          {submitFeedback.isPending ? 'Submitting...' : 'Submit Feedback'}
        </LiquidGlassButton>
      </LiquidGlassCard>
    </div>
  );
}
