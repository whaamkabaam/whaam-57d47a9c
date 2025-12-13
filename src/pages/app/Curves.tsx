// ============================================
// Curves Page - User's Custom Curves
// ============================================

import { useState } from 'react';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Sliders, MessageSquarePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import {
  useCurves,
  useCurrentCurve,
  useDownloadCurve,
  useRevertCurve,
  useMarkCurvePerfect,
  useCurveContent,
} from '@/hooks/api/useCurves';

import { CurrentCurveCard } from '@/components/app/curves/CurrentCurveCard';
import { CurveListItem } from '@/components/app/curves/CurveListItem';
import { CurveHistoryModal } from '@/components/app/curves/CurveHistoryModal';
import { CurveDetailModal } from '@/components/app/curves/CurveDetailModal';

export default function Curves() {
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [graphModalOpen, setGraphModalOpen] = useState(false);
  const [selectedCurveId, setSelectedCurveId] = useState<number | null>(null);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [revertingId, setRevertingId] = useState<number | null>(null);

  // Data fetching
  const { data: currentCurve, isLoading: isLoadingCurrent } = useCurrentCurve();
  const { data: curvesData, isLoading: isLoadingCurves } = useCurves();
  
  // Fetch current curve content for inline graph
  const { data: currentCurveContent, isLoading: isLoadingContent } = useCurveContent(
    currentCurve?.id ?? null
  );
  
  // Fetch selected curve content for modal
  const selectedCurve = curvesData?.curves?.find(c => c.id === selectedCurveId) ?? currentCurve;
  const { data: selectedCurveContent, isLoading: isLoadingSelectedContent } = useCurveContent(
    graphModalOpen ? selectedCurveId : null
  );

  // Mutations
  const downloadMutation = useDownloadCurve();
  const revertMutation = useRevertCurve();
  const markPerfectMutation = useMarkCurvePerfect();

  // Handlers
  const handleDownload = async (id: number) => {
    setDownloadingId(id);
    try {
      await downloadMutation.mutateAsync(id);
      toast.success('Curve downloaded successfully');
    } catch (error) {
      toast.error('Failed to download curve');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleViewHistory = (id: number) => {
    setSelectedCurveId(id);
    setHistoryModalOpen(true);
  };

  const handleViewGraph = (id: number) => {
    setSelectedCurveId(id);
    setGraphModalOpen(true);
  };

  const handleRevert = async (id: number) => {
    setRevertingId(id);
    try {
      await revertMutation.mutateAsync(id);
      toast.success('Curve set as current');
    } catch (error) {
      toast.error('Failed to set curve as current');
    } finally {
      setRevertingId(null);
    }
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

  // Get non-current curves for the list
  const otherCurves = curvesData?.curves?.filter((c) => !c.is_current) ?? [];
  const hasCurves = curvesData?.curves && curvesData.curves.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Sliders className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold">My Curves</h1>
      </div>

      {/* Current Curve Section */}
      {isLoadingCurrent ? (
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
      ) : currentCurve ? (
        <CurrentCurveCard
          curve={currentCurve}
          curveContent={currentCurveContent}
          isLoadingContent={isLoadingContent}
          onDownload={() => handleDownload(currentCurve.id)}
          onViewHistory={() => handleViewHistory(currentCurve.id)}
          onMarkPerfect={handleMarkPerfect}
          onViewGraph={() => handleViewGraph(currentCurve.id)}
          isDownloading={downloadingId === currentCurve.id}
          isMarkingPerfect={markPerfectMutation.isPending}
        />
      ) : !isLoadingCurves && !hasCurves ? (
        // Empty state
        <LiquidGlassCard variant="secondary" className="p-8 text-center">
          <Sliders className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Curves Yet</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Your custom curves will appear here after you submit your first feedback. 
            Head over to the Feedback page to get started!
          </p>
          <Button asChild>
            <Link to="/app/feedback" className="flex items-center gap-2">
              <MessageSquarePlus className="h-4 w-4" />
              Submit Feedback
            </Link>
          </Button>
        </LiquidGlassCard>
      ) : null}

      {/* All Curves List */}
      {(isLoadingCurves || otherCurves.length > 0) && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-muted-foreground">
            All Curves {curvesData?.total ? `(${curvesData.total})` : ''}
          </h2>

          {isLoadingCurves ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <LiquidGlassCard key={i} variant="secondary" className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </div>
                </LiquidGlassCard>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {/* Show current curve first in the list too */}
              {currentCurve && (
                <CurveListItem
                  curve={currentCurve}
                  onDownload={handleDownload}
                  onViewHistory={handleViewHistory}
                  onRevert={handleRevert}
                  isDownloading={downloadingId === currentCurve.id}
                  isReverting={revertingId === currentCurve.id}
                />
              )}
              {otherCurves.map((curve) => (
                <CurveListItem
                  key={curve.id}
                  curve={curve}
                  onDownload={handleDownload}
                  onViewHistory={handleViewHistory}
                  onRevert={handleRevert}
                  isDownloading={downloadingId === curve.id}
                  isReverting={revertingId === curve.id}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* History Modal */}
      <CurveHistoryModal
        curveId={selectedCurveId}
        open={historyModalOpen}
        onOpenChange={setHistoryModalOpen}
      />

      {/* Graph Detail Modal */}
      <CurveDetailModal
        open={graphModalOpen}
        onOpenChange={setGraphModalOpen}
        curve={selectedCurve ?? null}
        curveContent={selectedCurveContent ?? null}
        isLoading={isLoadingSelectedContent}
        onDownload={() => selectedCurveId && handleDownload(selectedCurveId)}
        isDownloading={downloadingId === selectedCurveId}
      />
    </div>
  );
}
