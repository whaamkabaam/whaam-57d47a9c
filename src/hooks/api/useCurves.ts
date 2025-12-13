// ============================================
// Curves React Query Hooks
// ============================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { curvesApi } from '@/lib/api';

export const curveKeys = {
  all: ['curves'] as const,
  list: (limit?: number, offset?: number) => [...curveKeys.all, 'list', { limit, offset }] as const,
  current: () => [...curveKeys.all, 'current'] as const,
  detail: (id: number) => [...curveKeys.all, 'detail', id] as const,
  history: (id: number) => [...curveKeys.all, 'history', id] as const,
  content: (id: number) => [...curveKeys.all, 'content', id] as const,
};

// List all curves with pagination
export function useCurves(limit = 50, offset = 0) {
  return useQuery({
    queryKey: curveKeys.list(limit, offset),
    queryFn: () => curvesApi.list(limit, offset),
  });
}

// Get current active curve
export function useCurrentCurve() {
  return useQuery({
    queryKey: curveKeys.current(),
    queryFn: () => curvesApi.getCurrent(),
  });
}

// Get specific curve by ID
export function useCurve(id: number) {
  return useQuery({
    queryKey: curveKeys.detail(id),
    queryFn: () => curvesApi.getById(id),
    enabled: !!id,
  });
}

// Get curve iteration history
export function useCurveHistory(id: number) {
  return useQuery({
    queryKey: curveKeys.history(id),
    queryFn: () => curvesApi.getHistory(id),
    enabled: !!id,
  });
}

// Get curve file content as text for visualization
export function useCurveContent(id: number | null) {
  return useQuery({
    queryKey: curveKeys.content(id!),
    queryFn: async () => {
      const blob = await curvesApi.download(id!);
      return blob.text();
    },
    enabled: !!id,
  });
}

// Download curve file
export function useDownloadCurve() {
  return useMutation({
    mutationFn: async (id: number) => {
      const blob = await curvesApi.download(id);
      return { blob, id };
    },
    onSuccess: ({ blob }, id) => {
      // Trigger file download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `curve-${id}.ccurve`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
  });
}

// Revert to parent curve
export function useRevertCurve() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => curvesApi.revert(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: curveKeys.all });
    },
  });
}

// Mark curve as perfect
export function useMarkCurvePerfect() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => curvesApi.markPerfect(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: curveKeys.all });
    },
  });
}
