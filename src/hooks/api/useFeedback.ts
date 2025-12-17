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
// NOTE: Does NOT auto-invalidate - caller must handle query invalidation
// This allows the AI Processing Modal to complete its animation before
// the background updates with the new curve data
export function useSubmitFeedback() {
  return useMutation({
    mutationFn: (data: FeedbackRequest) => feedbackApi.submit(data),
    // Intentionally NO onSuccess - DashboardHome controls when to invalidate
  });
}

// Hook to manually invalidate curve queries after modal animation completes
export function useInvalidateCurveQueries() {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.invalidateQueries({ queryKey: curveKeys.all });
    queryClient.invalidateQueries({ queryKey: feedbackKeys.dailyLimit });
  };
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
