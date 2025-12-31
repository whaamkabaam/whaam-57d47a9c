// ============================================
// Admin React Query Hooks
// ============================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  adminStatsApi,
  adminConfigApi,
  adminUsersApi,
  adminFeatureRequestsApi,
  adminProblemReportsApi,
} from '@/lib/api/adminEndpoints';
import type {
  UpdateAdminConfigRequest,
  UpdateAdminFeatureRequest,
  UpdateAdminProblemReport,
  AdminFeatureRequestStatus,
  ProblemReportStatus,
  ProblemCategory,
  AdminPriority,
} from '@/lib/api/types';

// ============================================
// Query Keys
// ============================================
export const adminKeys = {
  all: ['admin'] as const,
  stats: () => [...adminKeys.all, 'stats'] as const,
  timeseries: (days?: number) => [...adminKeys.all, 'timeseries', days] as const,
  activity: (limit?: number) => [...adminKeys.all, 'activity', limit] as const,
  config: () => [...adminKeys.all, 'config'] as const,
  users: (filters?: object) => [...adminKeys.all, 'users', filters] as const,
  user: (id: string) => [...adminKeys.all, 'users', id] as const,
  featureRequests: (filters?: object) =>
    [...adminKeys.all, 'feature-requests', filters] as const,
  featureRequest: (id: number) =>
    [...adminKeys.all, 'feature-requests', id] as const,
  problemReports: (filters?: object) =>
    [...adminKeys.all, 'problem-reports', filters] as const,
  problemReport: (id: number) =>
    [...adminKeys.all, 'problem-reports', id] as const,
};

// ============================================
// Stats Hooks
// ============================================
export function useAdminStats() {
  return useQuery({
    queryKey: adminKeys.stats(),
    queryFn: () => adminStatsApi.getStats(),
    staleTime: 60 * 1000, // 1 minute
  });
}

interface UseAdminTimeseriesOptions {
  enabled?: boolean;
}

export function useAdminTimeseries(days: number = 30, options?: UseAdminTimeseriesOptions) {
  return useQuery({
    queryKey: adminKeys.timeseries(days),
    queryFn: () => adminStatsApi.getTimeseries(days),
    staleTime: 30 * 1000, // 30 seconds (backend caches anyway)
    enabled: options?.enabled ?? true,
  });
}

export function useAdminActivity(limit: number = 20) {
  return useQuery({
    queryKey: adminKeys.activity(limit),
    queryFn: () => adminStatsApi.getActivity(limit),
    staleTime: 30 * 1000, // 30 seconds
  });
}

// ============================================
// Config Hooks
// ============================================
export function useAdminConfig() {
  return useQuery({
    queryKey: adminKeys.config(),
    queryFn: () => adminConfigApi.getConfig(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUpdateAdminConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateAdminConfigRequest) =>
      adminConfigApi.updateConfig(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.config() });
    },
  });
}

// ============================================
// Users Hooks
// ============================================
interface UseAdminUsersParams {
  limit?: number;
  offset?: number;
  search?: string;
  includeTestUsers?: boolean;
}

export function useAdminUsers(params: UseAdminUsersParams = {}) {
  const { limit = 50, offset = 0, search, includeTestUsers = true } = params;

  return useQuery({
    queryKey: adminKeys.users({ limit, offset, search, includeTestUsers }),
    queryFn: () =>
      adminUsersApi.listWithActivity({
        limit,
        offset,
        include_test_users: includeTestUsers,
      }),
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useAdminUser(userId: string) {
  return useQuery({
    queryKey: adminKeys.user(userId),
    queryFn: () => adminUsersApi.getById(userId),
    enabled: !!userId,
  });
}

export function useSetTestUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      isTestUser,
    }: {
      userId: string;
      isTestUser: boolean;
    }) => adminUsersApi.setTestUser(userId, isTestUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
    },
  });
}

// ============================================
// Feature Requests Hooks
// ============================================
interface UseAdminFeatureRequestsParams {
  status?: AdminFeatureRequestStatus;
  priority?: AdminPriority;
  limit?: number;
  offset?: number;
  includeArchived?: boolean;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export function useAdminFeatureRequests(
  params: UseAdminFeatureRequestsParams = {}
) {
  const { 
    status, 
    priority,
    limit = 50, 
    offset = 0, 
    includeArchived = false,
    search,
    dateFrom,
    dateTo,
  } = params;

  return useQuery({
    queryKey: adminKeys.featureRequests({
      status,
      priority,
      limit,
      offset,
      includeArchived,
      search,
      dateFrom,
      dateTo,
    }),
    queryFn: () =>
      adminFeatureRequestsApi.list({
        status,
        priority,
        limit,
        offset,
        include_archived: includeArchived,
        search,
        date_from: dateFrom,
        date_to: dateTo,
      }),
    staleTime: 30 * 1000,
  });
}

export function useAdminFeatureRequest(id: number) {
  return useQuery({
    queryKey: adminKeys.featureRequest(id),
    queryFn: () => adminFeatureRequestsApi.getById(id),
    enabled: id > 0,
  });
}

export function useUpdateAdminFeatureRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateAdminFeatureRequest }) =>
      adminFeatureRequestsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.featureRequests() });
    },
  });
}

export function useArchiveFeatureRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => adminFeatureRequestsApi.archive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.featureRequests() });
    },
  });
}

export function useUnarchiveFeatureRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => adminFeatureRequestsApi.unarchive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.featureRequests() });
    },
  });
}

export function useDeleteFeatureRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => adminFeatureRequestsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.featureRequests() });
    },
  });
}

// ============================================
// Problem Reports Hooks
// ============================================
interface UseAdminProblemReportsParams {
  status?: ProblemReportStatus;
  category?: ProblemCategory;
  priority?: AdminPriority;
  limit?: number;
  offset?: number;
  includeArchived?: boolean;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export function useAdminProblemReports(
  params: UseAdminProblemReportsParams = {}
) {
  const {
    status,
    category,
    priority,
    limit = 50,
    offset = 0,
    includeArchived = false,
    search,
    dateFrom,
    dateTo,
  } = params;

  return useQuery({
    queryKey: adminKeys.problemReports({
      status,
      category,
      priority,
      limit,
      offset,
      includeArchived,
      search,
      dateFrom,
      dateTo,
    }),
    queryFn: () =>
      adminProblemReportsApi.list({
        status,
        category,
        priority,
        limit,
        offset,
        include_archived: includeArchived,
        search,
        date_from: dateFrom,
        date_to: dateTo,
      }),
    staleTime: 30 * 1000,
  });
}

export function useAdminProblemReport(id: number) {
  return useQuery({
    queryKey: adminKeys.problemReport(id),
    queryFn: () => adminProblemReportsApi.getById(id),
    enabled: id > 0,
  });
}

export function useUpdateAdminProblemReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateAdminProblemReport;
    }) => adminProblemReportsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.problemReports() });
    },
  });
}

export function useArchiveProblemReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => adminProblemReportsApi.archive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.problemReports() });
    },
  });
}

export function useUnarchiveProblemReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => adminProblemReportsApi.unarchive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.problemReports() });
    },
  });
}

export function useDeleteProblemReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => adminProblemReportsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.problemReports() });
    },
  });
}
