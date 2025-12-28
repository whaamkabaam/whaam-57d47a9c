// ============================================
// WhaamKabaam API - Main Export
// ============================================

// Re-export all types
export * from './types';

// Re-export client utilities
export { api, ApiClientError, getOAuthUrl } from './client';

// Re-export endpoint functions
export {
  authApi,
  userApi,
  curvesApi,
  feedbackApi,
  subscriptionsApi,
  featureRequestsApi,
} from './endpoints';

// Re-export admin endpoints
export {
  adminStatsApi,
  adminConfigApi,
  adminUsersApi,
  adminFeatureRequestsApi,
  adminProblemReportsApi,
} from './adminEndpoints';
