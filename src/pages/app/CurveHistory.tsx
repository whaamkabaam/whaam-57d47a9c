// ============================================
// Curve Library Page - All Curves with Filtering
// ============================================

import { useState, useEffect, useMemo } from 'react';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Library, Star, ChevronDown, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import {
  useCurves,
  useDownloadCurve,
  useRevertCurve,
  useSetCurveCurrent,
  useRenameCurve,
  useCurveContent,
} from '@/hooks/api/useCurves';
import { Curve } from '@/lib/api/types';

import { CurveListItem } from '@/components/app/curves/CurveListItem';
import { CurveHistoryModal } from '@/components/app/curves/CurveHistoryModal';
import { CurveDetailModal } from '@/components/app/curves/CurveDetailModal';

const ITEMS_PER_PAGE = 10;

export default function CurveHistory() {
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [graphModalOpen, setGraphModalOpen] = useState(false);
  const [selectedCurveId, setSelectedCurveId] = useState<number | null>(null);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [revertingId, setRevertingId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'favorite'>('all');

  // Pagination state - true server-side pagination
  const [page, setPage] = useState(0);
  const [allCurves, setAllCurves] = useState<Curve[]>([]);
  const [newCurveIds, setNewCurveIds] = useState<Set<number>>(new Set());

  // Data fetching - only fetch current page
  const { data: curvesData, isLoading: isLoadingCurves, isFetching } = useCurves(
    ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Accumulate curves when new data arrives
  useEffect(() => {
    if (curvesData?.curves) {
      if (page === 0) {
        setAllCurves(curvesData.curves);
        setNewCurveIds(new Set());
      } else {
        setAllCurves(prev => {
          // Avoid duplicates by checking IDs
          const existingIds = new Set(prev.map(c => c.id));
          const newCurves = curvesData.curves.filter(c => !existingIds.has(c.id));
          
          // Mark new curves for animation
          setNewCurveIds(new Set(newCurves.map(c => c.id)));
          
          return [...prev, ...newCurves];
        });
        
        // Clear animation markers after animation completes
        setTimeout(() => setNewCurveIds(new Set()), 400);
      }
    }
  }, [curvesData, page]);

  // Fetch selected curve content for modal
  const selectedCurve = allCurves.find(c => c.id === selectedCurveId);
  const { data: selectedCurveContent, isLoading: isLoadingSelectedContent } = useCurveContent(
    graphModalOpen ? selectedCurveId : null
  );

  // Mutations
  const downloadMutation = useDownloadCurve();
  const revertMutation = useRevertCurve();
  const setCurrentMutation = useSetCurveCurrent();
  const renameMutation = useRenameCurve();

  // Handlers
  const handleDownload = async (curve: Curve) => {
    setDownloadingId(curve.id);
    try {
      await downloadMutation.mutateAsync({ id: curve.id, name: curve.name });
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
      toast.success('Reverted to previous curve');
    } catch (error) {
      toast.error('Failed to revert curve');
    } finally {
      setRevertingId(null);
    }
  };

  const handleSetCurrent = async (id: number) => {
    setRevertingId(id);
    try {
      await setCurrentMutation.mutateAsync(id);
      toast.success('Curve set as current');
    } catch (error) {
      toast.error('Failed to set curve as current');
    } finally {
      setRevertingId(null);
    }
  };

  const handleRename = async (id: number, newName: string) => {
    try {
      await renameMutation.mutateAsync({ id, name: newName });
      toast.success('Curve renamed');
    } catch (error) {
      toast.error('Failed to rename curve');
    }
  };

  // Use accumulated curves for display
  const totalCurves = curvesData?.total ?? 0;
  const favoriteCount = allCurves.filter(c => c.is_favorite).length;
  
  // Filter for favorites (client-side since we need all favorites count anyway)
  const filteredCurves = useMemo(() => 
    filter === 'favorite' ? allCurves.filter(c => c.is_favorite) : allCurves,
    [allCurves, filter]
  );
  
  // Check if there are more curves to load from server
  const hasMoreCurves = filter === 'all' 
    ? allCurves.length < totalCurves 
    : false; // For favorites, we can't easily paginate server-side
  
  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };
  
  const handleFilterChange = (newFilter: 'all' | 'favorite') => {
    setFilter(newFilter);
    // Reset pagination when switching filters
    if (newFilter === 'all') {
      setPage(0);
      setAllCurves([]);
    }
  };

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
            onClick={() => handleFilterChange('all')}
          >
            All Curves {totalCurves > 0 && `(${totalCurves})`}
          </Button>
          <Button 
            variant={filter === 'favorite' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleFilterChange('favorite')}
            className={filter === 'favorite' ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300' : ''}
          >
            <Star className="h-3 w-3 mr-1 fill-current text-yellow-400" />
            Favorites ({favoriteCount})
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
      ) : filteredCurves.length === 0 && filter === 'favorite' ? (
        <LiquidGlassCard variant="secondary" className="p-8 text-center">
          <Star className="h-12 w-12 text-yellow-400/30 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Favorite Curves Yet</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            When a curve feels just right, set all sliders to 5 and save it to your favorites. 
            It'll appear here for easy access.
          </p>
        </LiquidGlassCard>
      ) : allCurves.length === 0 && !isLoadingCurves ? (
        <LiquidGlassCard variant="secondary" className="p-8 text-center">
          <Library className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Curves Yet</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your curve iterations will appear here as you tune your sensitivity.
          </p>
        </LiquidGlassCard>
      ) : (
        <div className="space-y-3">
          {filteredCurves.map((curve) => {
            // Use parent_curve_id to find previous version (handles gaps correctly)
            const previousCurve = curve.is_current && curve.parent_curve_id
              ? allCurves.find(c => c.id === curve.parent_curve_id)
              : null;
            
            return (
              <div 
                key={curve.id}
                className={newCurveIds.has(curve.id) ? 'animate-fade-in' : ''}
              >
                <CurveListItem
                  curve={curve}
                  previousCurveId={previousCurve?.id ?? null}
                  onDownload={() => handleDownload(curve)}
                  onViewHistory={handleViewHistory}
                  onRevert={handleRevert}
                  onSetCurrent={handleSetCurrent}
                  onRename={handleRename}
                  isDownloading={downloadingId === curve.id}
                  isReverting={revertingId === curve.id}
                />
              </div>
            );
          })}
          
          {/* Load More Button - prominent styling */}
          {hasMoreCurves && (
            <Button
              variant="outline"
              size="lg"
              className="w-full border-primary/30 bg-card/50 hover:bg-primary/10 
                         hover:border-primary/50 text-foreground font-medium py-6
                         transition-all duration-200"
              onClick={handleLoadMore}
              disabled={isFetching}
            >
              {isFetching ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-2" />
                  Load {Math.min(ITEMS_PER_PAGE, totalCurves - allCurves.length)} more curves
                </>
              )}
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
        onDownload={() => selectedCurve && handleDownload(selectedCurve)}
        isDownloading={downloadingId === selectedCurve?.id}
      />
    </div>
  );
}
