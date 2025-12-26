// ============================================
// Feature Requests Page
// Vote on features you want to see built
// ============================================

import { useState, useEffect } from 'react';
import { LiquidGlassCard, LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useFeatureRequests, useMyFeatureRequests, useVoteFeatureRequest } from '@/hooks/api/useFeatureRequests';
import { useAuth } from '@/contexts/AuthContext';
import { FeatureRequestCard } from '@/components/app/features/FeatureRequestCard';
import { SubmitFeatureModal } from '@/components/app/features/SubmitFeatureModal';
import { Lightbulb, Plus, Inbox, AlertCircle, RefreshCw, TrendingUp, Clock, ChevronDown, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { FeatureRequest } from '@/lib/api/types';

type TabValue = 'all' | 'my';
type SortBy = 'votes' | 'recent';

const ITEMS_PER_PAGE = 10;

export default function FeatureRequests() {
  const [activeTab, setActiveTab] = useState<TabValue>('all');
  const [sortBy, setSortBy] = useState<SortBy>('votes');
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [allRequests, setAllRequests] = useState<FeatureRequest[]>([]);
  const [newItemIds, setNewItemIds] = useState<Set<number>>(new Set());
  
  const { user, isLoading: isAuthLoading } = useAuth();
  const isAuthenticated = !!user && !isAuthLoading;
  
  // Fetch data based on active tab with pagination
  const allRequestsQuery = useFeatureRequests(
    ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
    sortBy
  );
  const myRequestsQuery = useMyFeatureRequests(
    ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
    sortBy
  );
  
  const voteMutation = useVoteFeatureRequest();

  // Determine which data to show
  const currentQuery = activeTab === 'all' ? allRequestsQuery : myRequestsQuery;
  const isLoading = currentQuery.isLoading && page === 0;
  const isFetching = currentQuery.isFetching;
  const isError = currentQuery.isError;
  const total = currentQuery.data?.total ?? 0;

  // Reset pagination when tab or sort changes
  useEffect(() => {
    setPage(0);
    setAllRequests([]);
    setNewItemIds(new Set());
  }, [activeTab, sortBy]);

  // Accumulate requests on page change
  useEffect(() => {
    if (currentQuery.data?.items) {
      if (page === 0) {
        setAllRequests(currentQuery.data.items);
        setNewItemIds(new Set());
      } else {
        setAllRequests(prev => {
          const existingIds = new Set(prev.map(r => r.id));
          const newItems = currentQuery.data.items.filter(r => !existingIds.has(r.id));
          setNewItemIds(new Set(newItems.map(r => r.id)));
          return [...prev, ...newItems];
        });
        // Clear "new" animation after a short delay
        setTimeout(() => setNewItemIds(new Set()), 400);
      }
    }
  }, [currentQuery.data, page]);

  const hasMore = allRequests.length < total;

  const handleVote = (id: number, hasVoted: boolean) => {
    if (!isAuthenticated) {
      toast.error('Please log in to vote');
      return;
    }
    
    voteMutation.mutate(
      { id, hasVoted },
      {
        onError: () => {
          toast.error('Failed to update vote');
        },
      }
    );
  };

  const handleRetry = () => {
    currentQuery.refetch();
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb className="h-6 w-6 text-whaam-yellow" />
            <h1 className="text-2xl font-semibold text-foreground">Feature Requests</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Vote on features you want to see built
          </p>
        </div>
        
        <LiquidGlassButton
          variant="primary"
          onClick={() => setSubmitModalOpen(true)}
          disabled={!isAuthenticated}
          className="h-11 px-5"
          title={!isAuthenticated ? 'Log in to submit ideas' : undefined}
        >
          <Plus className="h-4 w-4 mr-2" />
          Submit Idea
        </LiquidGlassButton>
      </div>

      {/* Tabs + Sort Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)}>
          <TabsList className="bg-white/[0.04] border border-white/[0.08]">
            <TabsTrigger 
              value="all"
              className="data-[state=active]:bg-white/[0.1] data-[state=active]:text-foreground"
            >
              All Requests
            </TabsTrigger>
            <TabsTrigger 
              value="my"
              disabled={!isAuthenticated}
              className="data-[state=active]:bg-white/[0.1] data-[state=active]:text-foreground"
            >
              My Requests
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Sort Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground/60">Sort by:</span>
          <div className="flex rounded-lg bg-white/[0.04] border border-white/[0.08] p-0.5">
            <button
              onClick={() => setSortBy('votes')}
              className={cn(
                "text-xs px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5",
                sortBy === 'votes' 
                  ? "bg-white/[0.1] text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <TrendingUp className="h-3 w-3" />
              Most Votes
            </button>
            <button
              onClick={() => setSortBy('recent')}
              className={cn(
                "text-xs px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5",
                sortBy === 'recent' 
                  ? "bg-white/[0.1] text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Clock className="h-3 w-3" />
              Most Recent
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        // Loading skeleton
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <LiquidGlassCard key={i} className="p-5 rounded-2xl">
              <div className="flex gap-4">
                <Skeleton className="h-16 w-14 rounded-xl" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            </LiquidGlassCard>
          ))}
        </div>
      ) : isError ? (
        // Error state
        <LiquidGlassCard className="p-8 rounded-2xl text-center">
          <AlertCircle className="h-12 w-12 text-destructive/70 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Failed to load feature requests
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Something went wrong. Please try again.
          </p>
          <LiquidGlassButton
            variant="secondary"
            onClick={handleRetry}
            className="h-10 px-4"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </LiquidGlassButton>
        </LiquidGlassCard>
      ) : allRequests.length === 0 ? (
        // Empty state
        <LiquidGlassCard className="p-8 rounded-2xl text-center">
          <Inbox className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {activeTab === 'all' 
              ? 'No feature requests yet' 
              : "You haven't submitted any ideas yet"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {activeTab === 'all'
              ? 'Be the first to submit an idea!'
              : 'Share your ideas to help us improve.'}
          </p>
          {isAuthenticated && (
            <LiquidGlassButton
              variant="primary"
              onClick={() => setSubmitModalOpen(true)}
              className="h-10 px-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Submit Idea
            </LiquidGlassButton>
          )}
        </LiquidGlassCard>
      ) : (
        // Request cards + Load More
        <div className="space-y-4">
          {allRequests.map((request) => (
            <FeatureRequestCard
              key={request.id}
              request={request}
              onVote={handleVote}
              isVoting={voteMutation.isPending}
              isAuthenticated={isAuthenticated}
              isNew={newItemIds.has(request.id)}
            />
          ))}

          {/* Load More Button */}
          {hasMore && (
            <Button
              variant="ghost"
              size="lg"
              className="w-full bg-card/30 backdrop-blur-sm border border-white/5 
                       hover:bg-card/50 hover:border-white/10 text-muted-foreground 
                       hover:text-foreground font-medium py-6 transition-all duration-200
                       rounded-xl"
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
                  Load more ideas ({total - allRequests.length} remaining)
                </>
              )}
            </Button>
          )}
        </div>
      )}

      {/* Submit Modal */}
      <SubmitFeatureModal
        open={submitModalOpen}
        onOpenChange={setSubmitModalOpen}
      />
    </div>
  );
}
