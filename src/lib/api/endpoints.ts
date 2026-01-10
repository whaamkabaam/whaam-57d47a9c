// ============================================
// WhaamKabaam API Endpoints
// ============================================

import { api, getOAuthUrl } from './client';
import type {
  User,
  SessionResponse,
  AuthResponse,
  MessageResponse,
  LoginRequest,
  RegisterRequest,
  VerifyEmailRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  UpdateProfileRequest,
  SensitivitySettings,
  UpdateSettingsRequest,
  Curve,
  CurvesListResponse,
  FeedbackRequest,
  FeedbackResponse,
  DailyLimit,
  SubscriptionFeatures,
  SubscriptionTierInfo,
  SubscriptionCurrent,
  CancelRequest,
  CancelResponse,
  FeatureRequest,
  FeatureRequestsListResponse,
  CreateFeatureRequestInput,
  VoteResponse,
} from './types';

// ============================================
// Auth Endpoints
// ============================================
export const authApi = {
  login: (data: LoginRequest) => 
    api.post<AuthResponse>('/auth/login', data),

  register: (data: RegisterRequest) => 
    api.post<AuthResponse>('/auth/register', data),

  logout: () => 
    api.post<MessageResponse>('/auth/logout'),

  getSession: () => 
    api.get<SessionResponse>('/auth/session'),

  verifyEmail: (data: VerifyEmailRequest) => 
    api.post<MessageResponse>('/auth/verify-email', data),

  forgotPassword: (data: ForgotPasswordRequest) => 
    api.post<MessageResponse>('/auth/forgot-password', data),

  resetPassword: (data: ResetPasswordRequest) => 
    api.post<MessageResponse>('/auth/reset-password', data),

  // OAuth URLs (redirect user's browser to these)
  oauthDiscordUrl: getOAuthUrl('discord'),
  oauthGoogleUrl: getOAuthUrl('google'),
};

// ============================================
// User Endpoints
// ============================================
export const userApi = {
  getProfile: () => 
    api.get<User>('/users/me'),

  updateProfile: (data: UpdateProfileRequest) => 
    api.patch<User>('/users/me', data),

  getSettings: () => 
    api.get<SensitivitySettings>('/users/me/settings'),

  updateSettings: (data: UpdateSettingsRequest) => 
    api.patch<SensitivitySettings>('/users/me/settings', data),

  deleteAccount: () => 
    api.delete<MessageResponse>('/users/me'),
};

// ============================================
// Curves Endpoints
// ============================================
export const curvesApi = {
  list: (limit = 50, offset = 0) => 
    api.get<CurvesListResponse>(`/curves?limit=${limit}&offset=${offset}`),

  getCurrent: () => 
    api.get<Curve | null>('/curves/current'),

  getById: (id: number) => 
    api.get<Curve>(`/curves/${id}`),

  getHistory: (id: number) => 
    api.get<Curve[]>(`/curves/${id}/history`),

  download: (id: number) => 
    api.get<Blob>(`/curves/${id}/download`),

  revert: (id: number) => 
    api.post<Curve>(`/curves/${id}/revert`),

  rename: (id: number, name: string) => 
    api.patch<Curve>(`/curves/${id}/rename`, { name }),

  setCurrent: (id: number) => 
    api.post<Curve>(`/curves/${id}/set-current`),

  markFavorite: (id: number) => 
    api.post<MessageResponse & { success: boolean }>(`/curves/${id}/favorite`),

  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.postForm<Curve>('/curves/upload', formData);
  },
};

// ============================================
// Feedback Endpoints
// ============================================
export const feedbackApi = {
  submit: (data: FeedbackRequest) => 
    api.post<FeedbackResponse>('/feedback', data),

  getDailyLimit: () => 
    api.get<DailyLimit>('/feedback/daily-limit'),

  downloadAdjusted: (curveId: number) => 
    api.get<Blob>(`/feedback/${curveId}/download`),
};

// ============================================
// Subscriptions Endpoints
// ============================================
export const subscriptionsApi = {
  // Primary features endpoint (call after login, cache result)
  getFeatures: () => 
    api.get<SubscriptionFeatures>('/subscriptions/features'),

  // Tier list for pricing page (public, no auth)
  getTiers: () => 
    api.get<SubscriptionTierInfo[]>('/subscriptions/tiers'),

  // Current subscription details (for account page)
  getCurrent: () => 
    api.get<SubscriptionCurrent>('/subscriptions/current'),

  // Cancel subscription
  cancel: (data?: CancelRequest) => 
    api.post<CancelResponse>('/subscriptions/cancel', data),

  // Get the manage billing redirect URL
  // Opens in new tab - backend redirects (302) to FastSpring account portal
  getManageUrl: () => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
    return `${baseUrl}/subscriptions/manage`;
  },
};

// ============================================
// Feature Requests Endpoints
// ============================================
export const featureRequestsApi = {
  list: (limit = 50, offset = 0, sort: 'votes' | 'recent' = 'votes') =>
    api.get<FeatureRequestsListResponse>(
      `/feature-requests?limit=${limit}&offset=${offset}&sort=${sort}`
    ),

  getById: (id: number) =>
    api.get<FeatureRequest>(`/feature-requests/${id}`),

  getMy: (limit = 50, offset = 0, sort: 'votes' | 'recent' = 'votes') =>
    api.get<FeatureRequestsListResponse>(
      `/feature-requests/my?limit=${limit}&offset=${offset}&sort=${sort}`
    ),

  create: (data: CreateFeatureRequestInput) =>
    api.post<FeatureRequest>('/feature-requests', data),

  vote: (id: number) =>
    api.post<VoteResponse>(`/feature-requests/${id}/vote`),

  unvote: (id: number) =>
    api.delete<VoteResponse>(`/feature-requests/${id}/vote`),
};
