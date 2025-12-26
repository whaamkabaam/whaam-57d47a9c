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

export type SortBy = 'votes' | 'recent';

// Query Keys
export const featureRequestKeys = {
  all: ['feature-requests'] as const,
  list: (limit: number, offset: number, sortBy: SortBy) => 
    [...featureRequestKeys.all, 'list', { limit, offset, sortBy }] as const,
  my: (limit: number, offset: number, sortBy: SortBy) => 
    [...featureRequestKeys.all, 'my', { limit, offset, sortBy }] as const,
  detail: (id: number) => [...featureRequestKeys.all, 'detail', id] as const,
};

// Fetch all feature requests (with pagination and sorting)
export function useFeatureRequests(
  limit = 10,
  offset = 0,
  sortBy: SortBy = 'votes'
) {
  return useQuery({
    queryKey: featureRequestKeys.list(limit, offset, sortBy),
    queryFn: () => featureRequestsApi.list(limit, offset, sortBy),
  });
}

// Fetch user's own feature requests (with pagination and sorting)
export function useMyFeatureRequests(
  limit = 10,
  offset = 0,
  sortBy: SortBy = 'votes'
) {
  return useQuery({
    queryKey: featureRequestKeys.my(limit, offset, sortBy),
    queryFn: () => featureRequestsApi.getMy(limit, offset, sortBy),
  });
}

// Create a new feature request
export function useCreateFeatureRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFeatureRequestInput) => 
      featureRequestsApi.create(data),
    onSuccess: () => {
      // Invalidate all feature request queries
      queryClient.invalidateQueries({ queryKey: featureRequestKeys.all });
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
      await queryClient.cancelQueries({ queryKey: featureRequestKeys.all });

      // Get all cached queries that match
      const queryCache = queryClient.getQueryCache();
      const queries = queryCache.findAll({ queryKey: featureRequestKeys.all });

      // Store previous values for rollback
      const previousData: Array<{ queryKey: readonly unknown[]; data: unknown }> = [];

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

      // Optimistically update all matching queries
      queries.forEach((query) => {
        const data = query.state.data as FeatureRequestsListResponse | undefined;
        if (data?.items) {
          previousData.push({ queryKey: query.queryKey, data });
          queryClient.setQueryData<FeatureRequestsListResponse>(query.queryKey, {
            ...data,
            items: updateItems(data.items),
          });
        }
      });

      return { previousData };
    },
    // Rollback on error
    onError: (err, variables, context) => {
      if (context?.previousData) {
        context.previousData.forEach(({ queryKey, data }) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    // Always refetch after
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: featureRequestKeys.all });
    },
  });
}
