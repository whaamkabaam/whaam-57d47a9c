// ============================================
// Curve Library Page - All Curves with Filtering
// ============================================

import { useState } from 'react';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Library, Star } from 'lucide-react';
import { toast } from 'sonner';

import {
  useCurves,
  useDownloadCurve,
  useRevertCurve,
  useCurveContent,
} from '@/hooks/api/useCurves';

import { CurveListItem } from '@/components/app/curves/CurveListItem';
import { CurveHistoryModal } from '@/components/app/curves/CurveHistoryModal';
import { CurveDetailModal } from '@/components/app/curves/CurveDetailModal';

export default function CurveHistory() {
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [graphModalOpen, setGraphModalOpen] = useState(false);
  const [selectedCurveId, setSelectedCurveId] = useState<number | null>(null);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [revertingId, setRevertingId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'perfect'>('all');

  // Data fetching
  const { data: curvesData, isLoading: isLoadingCurves } = useCurves();
  
  // Fetch selected curve content for modal
  const selectedCurve = curvesData?.curves?.find(c => c.id === selectedCurveId);
  const { data: selectedCurveContent, isLoading: isLoadingSelectedContent } = useCurveContent(
    graphModalOpen ? selectedCurveId : null
  );

  // Mutations
  const downloadMutation = useDownloadCurve();
  const revertMutation = useRevertCurve();

  // Pagination state
  const [visibleCurvesCount, setVisibleCurvesCount] = useState(10);

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

  const curves = curvesData?.curves ?? [];
  const perfectCount = curves.filter(c => c.is_perfect).length;
  const filteredCurves = filter === 'perfect' ? curves.filter(c => c.is_perfect) : curves;
  const visibleCurves = filteredCurves.slice(0, visibleCurvesCount);
  const hasMoreCurves = filteredCurves.length > visibleCurvesCount;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Library className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">My Library</h1>
        </div>
        
        {/* Filter tabs */}
        <div className="flex gap-2">
          <Button 
            variant={filter === 'all' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => { setFilter('all'); setVisibleCurvesCount(10); }}
          >
            All Curves ({curves.length})
          </Button>
          <Button 
            variant={filter === 'perfect' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => { setFilter('perfect'); setVisibleCurvesCount(10); }}
            className={filter === 'perfect' ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300' : ''}
          >
            <Star className="h-3 w-3 mr-1 fill-current text-yellow-400" />
            Perfect ({perfectCount})
          </Button>
        </div>
      </div>

      {/* Curves List */}
      {isLoadingCurves ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
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
      ) : filteredCurves.length === 0 && filter === 'perfect' ? (
        <LiquidGlassCard variant="secondary" className="p-8 text-center">
          <Star className="h-12 w-12 text-yellow-400/30 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Perfect Curves Yet</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            When a curve feels just right, set all sliders to 5 and mark it as perfect. 
            It'll appear here for easy access.
          </p>
        </LiquidGlassCard>
      ) : curves.length === 0 ? (
        <LiquidGlassCard variant="secondary" className="p-8 text-center">
          <Library className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Curves Yet</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your curve iterations will appear here as you tune your sensitivity.
          </p>
        </LiquidGlassCard>
      ) : (
        <div className="space-y-3">
          {visibleCurves.map((curve) => {
            const previousCurve = curve.is_current 
              ? curves.find(c => c.upload_number === curve.upload_number - 1)
              : null;
            
            return (
              <CurveListItem
                key={curve.id}
                curve={curve}
                previousCurveId={previousCurve?.id ?? null}
                onDownload={handleDownload}
                onViewHistory={handleViewHistory}
                onRevert={handleRevert}
                isDownloading={downloadingId === curve.id}
                isReverting={revertingId === curve.id}
              />
            );
          })}
          {hasMoreCurves && (
            <Button
              variant="ghost"
              className="w-full text-muted-foreground"
              onClick={() => setVisibleCurvesCount(prev => prev + 10)}
            >
              Show {Math.min(10, filteredCurves.length - visibleCurvesCount)} more curves...
            </Button>
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
