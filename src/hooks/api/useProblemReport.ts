// ============================================
// Problem Report Hook
// ============================================

import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import type { ProblemReportRequest, ProblemReportResponse } from '@/lib/api/types';

export function useSubmitProblemReport() {
  return useMutation({
    mutationFn: (data: ProblemReportRequest) =>
      api.post<ProblemReportResponse>('/problem-reports', data),
  });
}
