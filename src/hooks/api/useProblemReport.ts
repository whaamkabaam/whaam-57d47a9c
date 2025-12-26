// ============================================
// Problem Report Hook
// ============================================

import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import type { ProblemReportResponse } from '@/lib/api/types';

export function useSubmitProblemReport() {
  return useMutation({
    mutationFn: (formData: FormData) =>
      api.postForm<ProblemReportResponse>('/problem-reports', formData),
  });
}
