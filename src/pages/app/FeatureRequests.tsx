// ============================================
// Feature Requests Page
// Vote on features you want to see built
// ============================================

import { useState } from 'react';
import { LiquidGlassCard, LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFeatureRequests, useMyFeatureRequests, useVoteFeatureRequest } from '@/hooks/api/useFeatureRequests';
import { useAuth } from '@/contexts/AuthContext';
import { FeatureRequestCard } from '@/components/app/features/FeatureRequestCard';
import { SubmitFeatureModal } from '@/components/app/features/SubmitFeatureModal';
import { Lightbulb, Plus, Inbox, AlertCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

type TabValue = 'all' | 'my';

export default function FeatureRequests() {
  const [activeTab, setActiveTab] = useState<TabValue>('all');
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  
  const { user, isLoading: isAuthLoading } = useAuth();
  const isAuthenticated = !!user && !isAuthLoading;
  
  // Fetch data based on active tab
  const allRequestsQuery = useFeatureRequests();
  const myRequestsQuery = useMyFeatureRequests();
  
  const voteMutation = useVoteFeatureRequest();

  // Determine which data to show
  const currentQuery = activeTab === 'all' ? allRequestsQuery : myRequestsQuery;
  const requests = currentQuery.data?.items ?? [];
  const isLoading = currentQuery.isLoading;
  const isError = currentQuery.isError;

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

      {/* Tabs */}
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
        
        {/* Sort indicator */}
        <p className="text-xs text-muted-foreground/60 mt-2">
          Sorted by most votes
        </p>
      </Tabs>

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
      ) : requests.length === 0 ? (
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
        // Request cards
        <div className="space-y-4">
          {requests.map((request) => (
            <FeatureRequestCard
              key={request.id}
              request={request}
              onVote={handleVote}
              isVoting={voteMutation.isPending}
              isAuthenticated={isAuthenticated}
            />
          ))}
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
