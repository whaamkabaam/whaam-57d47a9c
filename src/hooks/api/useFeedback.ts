// ============================================
// Feedback React Query Hooks
// ============================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { feedbackApi } from '@/lib/api';
import { curveKeys } from './useCurves';
import type { FeedbackRequest } from '@/lib/api';

export const feedbackKeys = {
  dailyLimit: ['feedback', 'dailyLimit'] as const,
};

// Get daily adjustment limit
export function useDailyLimit() {
  return useQuery({
    queryKey: feedbackKeys.dailyLimit,
    queryFn: () => feedbackApi.getDailyLimit(),
  });
}

// Submit feedback and get adjusted curve
export function useSubmitFeedback() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: FeedbackRequest) => feedbackApi.submit(data),
    onSuccess: () => {
      // Invalidate curves and daily limit after feedback submission
      queryClient.invalidateQueries({ queryKey: curveKeys.all });
      queryClient.invalidateQueries({ queryKey: feedbackKeys.dailyLimit });
    },
  });
}

// Download adjusted curve (alternative to curves download)
export function useDownloadAdjustedCurve() {
  return useMutation({
    mutationFn: async (curveId: number) => {
      const blob = await feedbackApi.downloadAdjusted(curveId);
      return { blob, curveId };
    },
    onSuccess: ({ blob }, curveId) => {
      // Trigger file download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `curve-${curveId}.ccurve`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
  });
}
