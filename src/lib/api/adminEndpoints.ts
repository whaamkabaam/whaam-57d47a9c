// ============================================
// Admin API Endpoints
// ============================================

import { api } from './client';
import type {
  AdminStats,
  AdminConfig,
  UpdateAdminConfigRequest,
  AdminUser,
  AdminUsersListResponse,
  AdminFeatureRequest,
  AdminFeatureRequestsListResponse,
  UpdateAdminFeatureRequest,
  AdminProblemReport,
  AdminProblemReportsListResponse,
  UpdateAdminProblemReport,
  AdminSuccessResponse,
  AdminFeatureRequestStatus,
  ProblemReportStatus,
  ProblemCategory,
  AdminPriority,
} from './types';

// ============================================
// Stats
// ============================================
export const adminStatsApi = {
  getStats: () => api.get<AdminStats>('/admin/stats'),
};

// ============================================
// Config
// ============================================
export const adminConfigApi = {
  getConfig: () => api.get<AdminConfig>('/admin/config'),

  updateConfig: (data: UpdateAdminConfigRequest) =>
    api.patch<AdminConfig>('/admin/config', data),
};

// ============================================
// Users
// ============================================
interface AdminUsersParams {
  limit?: number;
  offset?: number;
  search?: string;
}

interface AdminUsersActivityParams extends AdminUsersParams {
  include_test_users?: boolean;
}

export const adminUsersApi = {
  list: (params: AdminUsersParams = {}) => {
    const { limit = 50, offset = 0, search } = params;
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
    return api.get<AdminUsersListResponse>(
      `/admin/users?limit=${limit}&offset=${offset}${searchParam}`
    );
  },

  getById: (userId: string) => api.get<AdminUser>(`/admin/users/${userId}`),

  listWithActivity: (params: AdminUsersActivityParams = {}) => {
    const { limit = 50, offset = 0, include_test_users = true } = params;
    return api.get<AdminUsersListResponse>(
      `/admin/users/activity?limit=${limit}&offset=${offset}&include_test_users=${include_test_users}`
    );
  },

  setTestUser: (userId: string, isTestUser: boolean) =>
    api.patch<AdminUser>(`/admin/users/${userId}/test-user`, {
      is_test_user: isTestUser,
    }),
};

// ============================================
// Feature Requests
// ============================================
interface AdminFeatureRequestsParams {
  status?: AdminFeatureRequestStatus;
  limit?: number;
  offset?: number;
  include_archived?: boolean;
}

export const adminFeatureRequestsApi = {
  list: (params: AdminFeatureRequestsParams = {}) => {
    const { status, limit = 50, offset = 0, include_archived = false } = params;
    const statusParam = status ? `&status=${status}` : '';
    return api.get<AdminFeatureRequestsListResponse>(
      `/admin/feature-requests?limit=${limit}&offset=${offset}&include_archived=${include_archived}${statusParam}`
    );
  },

  getById: (id: number) =>
    api.get<AdminFeatureRequest>(`/admin/feature-requests/${id}`),

  update: (id: number, data: UpdateAdminFeatureRequest) =>
    api.patch<AdminSuccessResponse>(`/admin/feature-requests/${id}`, data),

  archive: (id: number) =>
    api.post<AdminSuccessResponse>(`/admin/feature-requests/${id}/archive`),

  unarchive: (id: number) =>
    api.delete<AdminSuccessResponse>(`/admin/feature-requests/${id}/archive`),

  delete: (id: number) =>
    api.delete<AdminSuccessResponse>(`/admin/feature-requests/${id}`),
};

// ============================================
// Problem Reports
// ============================================
interface AdminProblemReportsParams {
  status?: ProblemReportStatus;
  category?: ProblemCategory;
  priority?: AdminPriority;
  limit?: number;
  offset?: number;
  include_archived?: boolean;
}

export const adminProblemReportsApi = {
  list: (params: AdminProblemReportsParams = {}) => {
    const {
      status,
      category,
      priority,
      limit = 50,
      offset = 0,
      include_archived = false,
    } = params;

    const queryParts = [
      `limit=${limit}`,
      `offset=${offset}`,
      `include_archived=${include_archived}`,
    ];
    if (status) queryParts.push(`status=${status}`);
    if (category) queryParts.push(`category=${category}`);
    if (priority) queryParts.push(`priority=${priority}`);

    return api.get<AdminProblemReportsListResponse>(
      `/admin/problem-reports?${queryParts.join('&')}`
    );
  },

  getById: (id: number) =>
    api.get<AdminProblemReport>(`/admin/problem-reports/${id}`),

  update: (id: number, data: UpdateAdminProblemReport) =>
    api.patch<AdminSuccessResponse>(`/admin/problem-reports/${id}`, data),

  archive: (id: number) =>
    api.post<AdminSuccessResponse>(`/admin/problem-reports/${id}/archive`),

  unarchive: (id: number) =>
    api.delete<AdminSuccessResponse>(`/admin/problem-reports/${id}/archive`),

  delete: (id: number) =>
    api.delete<AdminSuccessResponse>(`/admin/problem-reports/${id}`),
};
