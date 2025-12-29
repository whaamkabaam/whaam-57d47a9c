// ============================================
// WhaamKabaam API Types
// ============================================

// User & Auth Types
export interface User {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  email_verified: boolean;
  discord_id: number | null;
  has_legacy_account: boolean;
  is_admin: boolean;
}

export interface SessionResponse {
  user: User;
  expires_at: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface MessageResponse {
  message: string;
}

// Curve Types
export interface Curve {
  id: number;
  name: string;
  upload_number: number | null;
  is_current: boolean;
  is_favorite: boolean;
  created_at: string;
  parent_curve_id: number | null;
  activated_at: string | null;
  // Feedback that created this curve (0-10 scale, 5=perfect)
  // null for initial uploads (V1), populated for iterated curves (V2+)
  long_range_feedback: number | null;
  mid_range_feedback: number | null;
  short_range_feedback: number | null;
}

export interface CurvesListResponse {
  curves: Curve[];
  total: number;
}

// Feedback Types
export interface FeedbackRequest {
  curve_id: number;
  long_range: number;  // 0-10, 5 = perfect
  mid_range: number;   // 0-10, 5 = perfect
  short_range: number; // 0-10, 5 = perfect
}

export interface FeedbackResponse {
  success: boolean;
  message: string;
  new_curve?: {
    id: number;
    name: string;
    upload_number: number;
  };
  is_favorite?: boolean;
  daily_limit_reached?: boolean;
}

export interface DailyLimit {
  used: number;
  limit: number;
  remaining: number;
}

// Subscription Types
export type SubscriptionTier = 'free' | 'basic' | 'pro';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing';

export interface SubscriptionTierInfo {
  tier: SubscriptionTier;
  name: string;
  daily_adjustments: number;
  history_days: number;
  price_monthly: number;
  is_available: boolean;
}

export interface Subscription {
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  daily_adjustments: number;
  history_days: number;
  is_active: boolean;
  is_legacy: boolean;
  cancel_at_period_end: boolean;
  current_period_end: string | null;
}

export interface CheckoutRequest {
  tier: 'basic' | 'pro';
  success_url?: string;
}

export interface CheckoutResponse {
  success: boolean;
  checkout_url: string;
}

export interface PortalResponse {
  success: boolean;
  portal_url?: string;
}

export interface CancelRequest {
  immediate?: boolean;
}

// Settings Types (Legacy Accounts)
export interface SensitivitySettings {
  aiming_style: 'arm' | 'wrist' | 'hybrid' | null;
  current_sens: number | null;
  highest_sens: number | null;
  lowest_sens: number | null;
  sensitivity: number | null;
  maximum: number | null;
  dpms: number | null;
}

export interface UpdateSettingsRequest {
  aiming_style?: 'arm' | 'wrist' | 'hybrid';
  current_sens?: number;
  highest_sens?: number;
  lowest_sens?: number;
  sensitivity?: number;
  maximum?: number;
  dpms?: number;
}

export interface UpdateProfileRequest {
  display_name?: string;
  avatar_url?: string;
}

// API Error Type
export interface ApiError {
  detail: string;
}

// Login/Register Request Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  display_name?: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
}

// Curve Request Types
export interface RenameCurveRequest {
  name: string; // Must end with .ccurve
}

// Problem Report Types
export type ProblemCategory = 'bug' | 'ui_issue' | 'performance' | 'other';

export interface ProblemReportRequest {
  category: ProblemCategory;
  description: string; // 10-2000 chars
  page_url?: string;   // Auto-captured, max 500 chars
}

export interface ProblemReportResponse {
  success: boolean;
  message: string;
}

// ============================================
// Feature Request Types
// ============================================
export type FeatureRequestStatus = 'open' | 'planned' | 'in_progress' | 'completed' | 'declined';

export interface FeatureRequest {
  id: number;
  title: string;
  description: string;
  status: FeatureRequestStatus;
  author_name: string | null;
  is_anonymous: boolean;
  vote_count: number;
  user_has_voted: boolean;
  is_own: boolean;
  created_at: string;
}

export interface FeatureRequestsListResponse {
  items: FeatureRequest[];
  total: number;
}

export interface CreateFeatureRequestInput {
  title: string;        // 5-200 chars
  description: string;  // 20-2000 chars
  is_anonymous?: boolean;
}

export interface VoteResponse {
  message: string;
  success: boolean;
}

// ============================================
// Admin Types
// ============================================

// Admin Stats
export interface AdminStats {
  total_users: number;
  total_curves: number;
  total_feedback: number;
  active_subscriptions: number;
  total_feature_requests?: number;
  total_problem_reports?: number;
  feature_requests_by_status?: Record<string, number>;
  problem_reports_by_status?: Record<string, number>;
}

// Timeseries data for dashboard charts
export interface TimeseriesDataPoint {
  date: string;
  problem_reports: number;
  feature_requests: number;
  new_users: number;
}

export interface TimeseriesResponse {
  data: TimeseriesDataPoint[];
  days: number;
}

// Activity feed items
export type ActivityType = 'feature_request' | 'problem_report' | 'user_joined';

export interface ActivityItem {
  id: number;
  type: ActivityType;
  title: string;
  description: string | null;
  user_email: string | null;
  created_at: string;
}

export interface ActivityResponse {
  items: ActivityItem[];
}

// Admin Config
export interface AdminConfig {
  daily_cap: number;
  bot_version: string;
}

export interface UpdateAdminConfigRequest {
  daily_cap?: number;
}

// Admin User (extended with activity counts)
export interface AdminUser {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  email_verified: boolean;
  discord_id: number | null;
  has_legacy_account: boolean;
  is_test_user: boolean;
  feature_request_count: number;
  problem_report_count: number;
  vote_count: number;
  created_at: string;
}

export interface AdminUsersListResponse {
  users: AdminUser[];
  total: number;
}

// Admin Feature Request (extended with admin fields)
export type AdminFeatureRequestStatus = 'open' | 'planned' | 'in_progress' | 'completed' | 'declined';
export type AdminPriority = 'low' | 'medium' | 'high' | 'critical';

export interface AdminFeatureRequest {
  id: number;
  user_id: string;
  title: string;
  description: string;
  status: AdminFeatureRequestStatus;
  is_anonymous: boolean;
  admin_notes: string | null;
  admin_priority: AdminPriority | null;
  is_archived: boolean;
  author_email: string;
  author_name: string | null;
  vote_count: number;
  created_at: string;
  updated_at: string;
}

export interface AdminFeatureRequestsListResponse {
  items: AdminFeatureRequest[];
  total: number;
  by_status: Record<AdminFeatureRequestStatus, number>;
}

export interface UpdateAdminFeatureRequest {
  status?: AdminFeatureRequestStatus;
  admin_notes?: string;
  admin_priority?: AdminPriority;
}

// Admin Problem Report
export type ProblemReportStatus = 'new' | 'triaged' | 'in_progress' | 'fixed' | 'wont_fix' | 'duplicate';

export interface AdminProblemReport {
  id: number;
  user_id: string;
  page_url: string | null;
  category: ProblemCategory;
  description: string;
  user_agent: string | null;
  screenshot_urls: string[];
  status: ProblemReportStatus;
  priority: AdminPriority | null;
  admin_notes: string | null;
  is_archived: boolean;
  user_email: string;
  user_name: string | null;
  created_at: string;
}

export interface AdminProblemReportsListResponse {
  reports: AdminProblemReport[];
  total: number;
  by_status: Record<ProblemReportStatus, number>;
}

export interface UpdateAdminProblemReport {
  status?: ProblemReportStatus;
  priority?: AdminPriority;
  admin_notes?: string;
}

// Shared admin success response
export interface AdminSuccessResponse {
  success: boolean;
  id?: number;
}
