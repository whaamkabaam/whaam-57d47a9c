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

// Download curve file - uses backend-provided name for filename
export function useDownloadCurve() {
  return useMutation({
    mutationFn: async ({ id, name }: { id: number; name: string }) => {
      const blob = await curvesApi.download(id);
      return { blob, name };
    },
    onSuccess: ({ blob, name }) => {
      // Trigger file download with proper filename from backend
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
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

// Mark curve as favorite
export function useMarkCurveFavorite() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => curvesApi.markFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: curveKeys.all });
    },
  });
}

// Upload a new curve file
export function useUploadCurve() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (file: File) => curvesApi.upload(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: curveKeys.current() });
      queryClient.invalidateQueries({ queryKey: curveKeys.all });
    },
  });
}
