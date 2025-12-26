// ============================================
// Feature Requests Hooks
// ============================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { featureRequestsApi } from '@/lib/api/endpoints';
import type { 
  FeatureRequest, 
  FeatureRequestsListResponse, 
  CreateFeatureRequestInput 
} from '@/lib/api/types';

// Query Keys
export const featureRequestKeys = {
  all: ['feature-requests'] as const,
  list: () => [...featureRequestKeys.all, 'list'] as const,
  my: () => [...featureRequestKeys.all, 'my'] as const,
  detail: (id: number) => [...featureRequestKeys.all, 'detail', id] as const,
};

// Fetch all feature requests (sorted by votes)
export function useFeatureRequests() {
  return useQuery({
    queryKey: featureRequestKeys.list(),
    queryFn: () => featureRequestsApi.list(),
  });
}

// Fetch user's own feature requests
export function useMyFeatureRequests() {
  return useQuery({
    queryKey: featureRequestKeys.my(),
    queryFn: () => featureRequestsApi.getMy(),
  });
}

// Create a new feature request
export function useCreateFeatureRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFeatureRequestInput) => 
      featureRequestsApi.create(data),
    onSuccess: () => {
      // Invalidate both lists
      queryClient.invalidateQueries({ queryKey: featureRequestKeys.list() });
      queryClient.invalidateQueries({ queryKey: featureRequestKeys.my() });
    },
  });
}

// Vote/unvote on a feature request with optimistic updates
export function useVoteFeatureRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, hasVoted }: { id: number; hasVoted: boolean }) => {
      if (hasVoted) {
        return featureRequestsApi.unvote(id);
      } else {
        return featureRequestsApi.vote(id);
      }
    },
    // Optimistic update
    onMutate: async ({ id, hasVoted }) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: featureRequestKeys.list() });
      await queryClient.cancelQueries({ queryKey: featureRequestKeys.my() });

      // Snapshot previous values
      const previousList = queryClient.getQueryData<FeatureRequestsListResponse>(
        featureRequestKeys.list()
      );
      const previousMy = queryClient.getQueryData<FeatureRequestsListResponse>(
        featureRequestKeys.my()
      );

      // Helper to update items in a list
      const updateItems = (items: FeatureRequest[]) =>
        items.map((item) =>
          item.id === id
            ? {
                ...item,
                user_has_voted: !hasVoted,
                vote_count: item.vote_count + (hasVoted ? -1 : 1),
              }
            : item
        );

      // Optimistically update both caches
      if (previousList) {
        queryClient.setQueryData<FeatureRequestsListResponse>(
          featureRequestKeys.list(),
          {
            ...previousList,
            items: updateItems(previousList.items),
          }
        );
      }

      if (previousMy) {
        queryClient.setQueryData<FeatureRequestsListResponse>(
          featureRequestKeys.my(),
          {
            ...previousMy,
            items: updateItems(previousMy.items),
          }
        );
      }

      return { previousList, previousMy };
    },
    // Rollback on error
    onError: (err, variables, context) => {
      if (context?.previousList) {
        queryClient.setQueryData(featureRequestKeys.list(), context.previousList);
      }
      if (context?.previousMy) {
        queryClient.setQueryData(featureRequestKeys.my(), context.previousMy);
      }
    },
    // Always refetch after
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: featureRequestKeys.list() });
      queryClient.invalidateQueries({ queryKey: featureRequestKeys.my() });
    },
  });
}
