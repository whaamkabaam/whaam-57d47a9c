// ============================================
// Dashboard Home - Main Curve Experience
// ============================================

import { useState } from 'react';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Skeleton } from '@/components/ui/skeleton';
import { Crosshair, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import {
  useCurrentCurve,
  useDownloadCurve,
  useMarkCurvePerfect,
  useCurveContent,
} from '@/hooks/api/useCurves';
import { useDailyLimit, useSubmitFeedback } from '@/hooks/api/useFeedback';

import { CurrentCurveCard } from '@/components/app/curves/CurrentCurveCard';
import { CurveHistoryModal } from '@/components/app/curves/CurveHistoryModal';
import { CurveDetailModal } from '@/components/app/curves/CurveDetailModal';

export default function DashboardHome() {
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [graphModalOpen, setGraphModalOpen] = useState(false);

  // Data fetching
  const { data: currentCurve, isLoading: isLoadingCurrent } = useCurrentCurve();
  const { data: dailyLimit, isLoading: isLoadingDailyLimit } = useDailyLimit();
  
  // Fetch current curve content for inline graph
  const { data: currentCurveContent, isLoading: isLoadingContent } = useCurveContent(
    currentCurve?.id ?? null
  );

  // Mutations
  const downloadMutation = useDownloadCurve();
  const markPerfectMutation = useMarkCurvePerfect();
  const submitFeedbackMutation = useSubmitFeedback();

  // Handlers
  const handleDownload = async () => {
    if (!currentCurve) return;
    try {
      await downloadMutation.mutateAsync(currentCurve.id);
      toast.success('Curve downloaded successfully');
    } catch (error) {
      toast.error('Failed to download curve');
    }
  };

  const handleViewHistory = () => {
    if (!currentCurve) return;
    setHistoryModalOpen(true);
  };

  const handleViewGraph = () => {
    setGraphModalOpen(true);
  };

  const handleMarkPerfect = async () => {
    if (!currentCurve) return;
    try {
      await markPerfectMutation.mutateAsync(currentCurve.id);
      toast.success('Curve marked as perfect!');
    } catch (error) {
      toast.error('Failed to mark curve as perfect');
    }
  };

  const handleSubmitFeedback = async (longRange: number, midRange: number, shortRange: number) => {
    if (!currentCurve) return;
    try {
      await submitFeedbackMutation.mutateAsync({
        curve_id: currentCurve.id,
        long_range: longRange,
        mid_range: midRange,
        short_range: shortRange,
      });
      toast.success('Feedback submitted! Your new curve is being generated.');
    } catch (error) {
      toast.error('Failed to submit feedback');
    }
  };

  // Loading state
  if (isLoadingCurrent) {
    return (
      <div className="space-y-6">
        <LiquidGlassCard variant="secondary" className="p-6">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-[180px] w-full mb-6 rounded-lg" />
          <div className="space-y-3 mb-6">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-32" />
          </div>
        </LiquidGlassCard>
      </div>
    );
  }

  // Empty state - no curve yet (friendly, clear message)
  if (!currentCurve) {
    return (
      <div className="space-y-6">
        <LiquidGlassCard variant="secondary" className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Crosshair className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Building your curve...</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            We're creating a custom sensitivity curve just for you. 
            This usually takes a few minutes.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 animate-pulse text-primary" />
            <span>Almost ready!</span>
          </div>
        </LiquidGlassCard>
      </div>
    );
  }

  // Main curve experience
  return (
    <div className="space-y-6">
      <CurrentCurveCard
        curve={currentCurve}
        curveContent={currentCurveContent}
        isLoadingContent={isLoadingContent}
        onDownload={handleDownload}
        onViewHistory={handleViewHistory}
        onMarkPerfect={handleMarkPerfect}
        onViewGraph={handleViewGraph}
        isDownloading={downloadMutation.isPending}
        isMarkingPerfect={markPerfectMutation.isPending}
        onSubmitFeedback={handleSubmitFeedback}
        isSubmittingFeedback={submitFeedbackMutation.isPending}
        dailyLimit={dailyLimit}
        isLoadingDailyLimit={isLoadingDailyLimit}
      />

      {/* History Modal */}
      <CurveHistoryModal
        curveId={currentCurve.id}
        open={historyModalOpen}
        onOpenChange={setHistoryModalOpen}
      />

      {/* Graph Detail Modal */}
      <CurveDetailModal
        open={graphModalOpen}
        onOpenChange={setGraphModalOpen}
        curve={currentCurve}
        curveContent={currentCurveContent ?? null}
        isLoading={isLoadingContent}
        onDownload={handleDownload}
        isDownloading={downloadMutation.isPending}
      />
    </div>
  );
}
