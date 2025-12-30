// ============================================
// Dashboard Home - Main Curve Experience
// With AI Processing flow for storytelling
// ============================================

import { useState, useRef } from 'react';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

import {
  useCurrentCurve,
  useCurveHistory,
  useDownloadCurve,
  useMarkCurveFavorite,
  useRevertCurve,
  useCurveContent,
  useRenameCurve,
} from '@/hooks/api/useCurves';
import { useDailyLimit, useSubmitFeedback, useInvalidateCurveQueries } from '@/hooks/api/useFeedback';

import { CurrentCurveCard } from '@/components/app/curves/CurrentCurveCard';
import { CurveDetailModal } from '@/components/app/curves/CurveDetailModal';
import { AIProcessingModal } from '@/components/app/AIProcessingModal';
import { CurveUploadCard } from '@/components/app/curves/CurveUploadCard';

// Extract version number from curve name (e.g., "lol_v3.ccurve" → 3)
function extractVersionFromName(name: string): number | null {
  const match = name.match(/_v(\d+)\.ccurve$/i);
  return match ? parseInt(match[1], 10) : null;
}

export default function DashboardHome() {
  const [graphModalOpen, setGraphModalOpen] = useState(false);
  
  // AI Processing modal state
  const [processingModalOpen, setProcessingModalOpen] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  
  // Store the iteration number BEFORE mutation so it doesn't change mid-animation
  const capturedIterationRef = useRef<number>(2);

  // Data fetching
  const { data: currentCurve, isLoading: isLoadingCurrent } = useCurrentCurve();
  const { data: dailyLimit, isLoading: isLoadingDailyLimit } = useDailyLimit();
  
  const { data: curveHistory, isLoading: isLoadingHistory } = useCurveHistory(currentCurve?.id ?? 0);
  
  const { data: currentCurveContent, isLoading: isLoadingContent } = useCurveContent(
    currentCurve?.id ?? null
  );

  // Mutations
  const downloadMutation = useDownloadCurve();
  const markFavoriteMutation = useMarkCurveFavorite();
  const revertMutation = useRevertCurve();
  const submitFeedbackMutation = useSubmitFeedback();
  const renameMutation = useRenameCurve();
  const invalidateCurveQueries = useInvalidateCurveQueries();

  // Extract version from curve name (e.g., "lol_v3.ccurve" → 3)
  const extractedVersion = currentCurve ? extractVersionFromName(currentCurve.name) : null;
  const currentIteration = extractedVersion ?? 1;

  // Handlers
  const handleDownload = async () => {
    if (!currentCurve) return;
    try {
      await downloadMutation.mutateAsync({ id: currentCurve.id, name: currentCurve.name });
      toast.success('Curve downloaded');
    } catch (error) {
      toast.error('Failed to download');
    }
  };

  const handleViewHistory = async () => {
    if (!currentCurve) return;

    // Check if history is still loading
    if (isLoadingHistory) {
      toast.info('Loading history...');
      return;
    }

    // Check if this is the original upload (no parent to revert to)
    if (!currentCurve.parent_curve_id) {
      toast.info('This is the original upload');
      return;
    }

    try {
      // Pass the current curve ID - backend looks up parent_curve_id internally
      await revertMutation.mutateAsync(currentCurve.id);
      toast.success('Reverted to previous version');
    } catch (error) {
      toast.error('Failed to revert');
    }
  };

  const handleViewGraph = () => {
    setGraphModalOpen(true);
  };

  const handleMarkFavorite = async () => {
    if (!currentCurve) return;
    
    // Already marked favorite - show info instead of API call
    if (currentCurve.is_favorite) {
      toast.info('This curve is already in your favorites! ⭐');
      return;
    }
    
    try {
      await markFavoriteMutation.mutateAsync(currentCurve.id);
      toast.success('Saved to favorites ⭐');
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Failed to save';
      toast.error(message);
    }
  };

  const handleRename = async (newName: string) => {
    if (!currentCurve) return;
    try {
      await renameMutation.mutateAsync({ id: currentCurve.id, name: newName });
      toast.success('Curve renamed');
    } catch (error) {
      toast.error('Failed to rename');
    }
  };

  const handleSubmitFeedback = async (longRange: number, midRange: number, shortRange: number) => {
    if (!currentCurve) return;
    
    // IMPORTANT: Capture iteration number BEFORE mutation
    // This prevents the modal from showing wrong version when data updates
    capturedIterationRef.current = currentIteration + 1;
    
    // Open processing modal immediately
    setProcessingComplete(false);
    setProcessingModalOpen(true);
    
    try {
      // Submit feedback - mutation does NOT auto-invalidate queries
      await submitFeedbackMutation.mutateAsync({
        curve_id: currentCurve.id,
        long_range: longRange,
        mid_range: midRange,
        short_range: shortRange,
      });
      
      // Wait for "AI magic" feel - animation needs time to complete
      await new Promise(resolve => setTimeout(resolve, 3500));
      
      // Mark as complete - this triggers the success animation
      setProcessingComplete(true);
      
      // Wait for success animation to play before updating background
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // NOW invalidate queries - background updates AFTER modal shows success
      invalidateCurveQueries();
      
    } catch (error) {
      setProcessingModalOpen(false);
      toast.error('Failed to generate curve');
    }
  };

  // Handle modal close - reset state
  const handleProcessingModalClose = (open: boolean) => {
    setProcessingModalOpen(open);
    if (!open) {
      setProcessingComplete(false);
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
        onMarkFavorite={handleMarkFavorite}
        onViewGraph={handleViewGraph}
        isDownloading={downloadMutation.isPending}
        isRevertingPrevious={revertMutation.isPending}
        isMarkingFavorite={markFavoriteMutation.isPending}
        onSubmitFeedback={handleSubmitFeedback}
        isSubmittingFeedback={submitFeedbackMutation.isPending}
        dailyLimit={dailyLimit}
        isLoadingDailyLimit={isLoadingDailyLimit}
        onRename={handleRename}
        isRenaming={renameMutation.isPending}
      />

      {/* AI Processing Modal */}
      <AIProcessingModal
        open={processingModalOpen}
        onOpenChange={handleProcessingModalClose}
        isComplete={processingComplete}
        onDownload={handleDownload}
        isDownloading={downloadMutation.isPending}
        iterationNumber={capturedIterationRef.current}
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
