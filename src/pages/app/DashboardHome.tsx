// ============================================
// Dashboard Home - Main Curve Experience
// With AI Processing flow for storytelling
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
import { AIProcessingModal } from '@/components/app/AIProcessingModal';

export default function DashboardHome() {
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [graphModalOpen, setGraphModalOpen] = useState(false);
  
  // AI Processing modal state
  const [processingModalOpen, setProcessingModalOpen] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);

  // Data fetching
  const { data: currentCurve, isLoading: isLoadingCurrent } = useCurrentCurve();
  const { data: dailyLimit, isLoading: isLoadingDailyLimit } = useDailyLimit();
  
  const { data: currentCurveContent, isLoading: isLoadingContent } = useCurveContent(
    currentCurve?.id ?? null
  );

  // Mutations
  const downloadMutation = useDownloadCurve();
  const markPerfectMutation = useMarkCurvePerfect();
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

  // Empty state
  if (!currentCurve) {
    return (
      <LiquidGlassCard variant="secondary" className="p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
          <Crosshair className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-lg font-semibold mb-1">Building your curve...</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Creating a custom sensitivity curve for you.
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="h-3 w-3 animate-pulse text-primary" />
          <span>Almost ready</span>
        </div>
      </LiquidGlassCard>
    );
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
    </>
  );
}
