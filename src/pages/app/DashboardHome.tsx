// ============================================
// Dashboard Home - Main Curve Experience
// With AI Processing flow for storytelling
// ============================================

import { useState } from 'react';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

import {
  useCurrentCurve,
  useCurveHistory,
  useDownloadCurve,
  useMarkCurvePerfect,
  useRevertCurve,
  useCurveContent,
} from '@/hooks/api/useCurves';
import { useDailyLimit, useSubmitFeedback } from '@/hooks/api/useFeedback';

import { CurrentCurveCard } from '@/components/app/curves/CurrentCurveCard';
import { CurveDetailModal } from '@/components/app/curves/CurveDetailModal';
import { AIProcessingModal } from '@/components/app/AIProcessingModal';
import { CurveUploadCard } from '@/components/app/curves/CurveUploadCard';

export default function DashboardHome() {
  const [graphModalOpen, setGraphModalOpen] = useState(false);
  
  // AI Processing modal state
  const [processingModalOpen, setProcessingModalOpen] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);

  // Data fetching
  const { data: currentCurve, isLoading: isLoadingCurrent } = useCurrentCurve();
  const { data: dailyLimit, isLoading: isLoadingDailyLimit } = useDailyLimit();
  
  const { data: curveHistory } = useCurveHistory(currentCurve?.id ?? 0);
  
  const { data: currentCurveContent, isLoading: isLoadingContent } = useCurveContent(
    currentCurve?.id ?? null
  );

  // Mutations
  const downloadMutation = useDownloadCurve();
  const markPerfectMutation = useMarkCurvePerfect();
  const revertMutation = useRevertCurve();
  const submitFeedbackMutation = useSubmitFeedback();

  // Derive iteration number
  const iterationMatch = currentCurve?.name.match(/v(\d+)/i);
  const currentIteration = iterationMatch ? parseInt(iterationMatch[1], 10) : 1;

  // Handlers
  const handleDownload = async () => {
    if (!currentCurve) return;
    try {
      await downloadMutation.mutateAsync(currentCurve.id);
      toast.success('Curve downloaded');
    } catch (error) {
      toast.error('Failed to download');
    }
  };

  const handleViewHistory = async () => {
    if (!currentCurve) return;

    const current = curveHistory?.find((c) => c.is_current);
    const previous = current
      ? curveHistory?.find((c) => c.upload_number === current.upload_number - 1)
      : null;

    if (!previous) {
      toast.error('No previous version to revert to');
      return;
    }

    try {
      await revertMutation.mutateAsync(previous.id);
      toast.success('Reverted to previous version');
    } catch (error) {
      toast.error('Failed to revert');
    }
  };

  const handleViewGraph = () => {
    setGraphModalOpen(true);
  };

  const handleMarkPerfect = async () => {
    if (!currentCurve) return;
    try {
      await markPerfectMutation.mutateAsync(currentCurve.id);
      toast.success('Saved as favorite');
    } catch (error) {
      toast.error('Failed to save');
    }
  };

  const handleSubmitFeedback = async (longRange: number, midRange: number, shortRange: number) => {
    if (!currentCurve) return;
    
    // Open processing modal immediately
    setProcessingComplete(false);
    setProcessingModalOpen(true);
    
    try {
      await submitFeedbackMutation.mutateAsync({
        curve_id: currentCurve.id,
        long_range: longRange,
        mid_range: midRange,
        short_range: shortRange,
      });
      
      // Minimum 4 second delay for "AI magic" feel
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      setProcessingComplete(true);
    } catch (error) {
      setProcessingModalOpen(false);
      toast.error('Failed to generate curve');
    }
  };

  // Loading state
  if (isLoadingCurrent) {
    return (
      <LiquidGlassCard variant="secondary" className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-[200px] w-full rounded-lg mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </LiquidGlassCard>
    );
  }

  // Empty state - show upload card
  if (!currentCurve) {
    return <CurveUploadCard />;
  }

  return (
    <>
      <CurrentCurveCard
        curve={currentCurve}
        curveContent={currentCurveContent}
        isLoadingContent={isLoadingContent}
        onDownload={handleDownload}
        onViewHistory={handleViewHistory}
        onMarkPerfect={handleMarkPerfect}
        onViewGraph={handleViewGraph}
        isDownloading={downloadMutation.isPending}
        isRevertingPrevious={revertMutation.isPending}
        isMarkingPerfect={markPerfectMutation.isPending}
        onSubmitFeedback={handleSubmitFeedback}
        isSubmittingFeedback={submitFeedbackMutation.isPending}
        dailyLimit={dailyLimit}
        isLoadingDailyLimit={isLoadingDailyLimit}
      />

      {/* AI Processing Modal */}
      <AIProcessingModal
        open={processingModalOpen}
        onOpenChange={(open) => {
          setProcessingModalOpen(open);
          if (!open) setProcessingComplete(false);
        }}
        isComplete={processingComplete}
        onDownload={handleDownload}
        isDownloading={downloadMutation.isPending}
        iterationNumber={currentIteration + 1}
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
    </>
  );
}
