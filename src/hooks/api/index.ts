// ============================================
// API Hooks - Main Export
// ============================================

// Auth hooks
export { 
  useSession, 
  useLogin, 
  useRegister, 
  useLogout, 
  useVerifyEmail, 
  useForgotPassword, 
  useResetPassword,
  getOAuthUrl,
  authKeys,
} from './useAuth';

// User hooks
export { 
  useProfile, 
  useUpdateProfile, 
  useSettings, 
  useUpdateSettings, 
  useDeleteAccount,
  userKeys,
} from './useUser';

// Curves hooks
export { 
  useCurves, 
  useCurrentCurve, 
  useCurve, 
  useCurveHistory, 
  useDownloadCurve, 
  useRevertCurve, 
  useRenameCurve,
  useSetCurveCurrent,
  useMarkCurveFavorite,
  useUploadCurve,
  curveKeys,
} from './useCurves';

// Feedback hooks
export { 
  useDailyLimit, 
  useSubmitFeedback, 
  useDownloadAdjustedCurve,
  feedbackKeys,
} from './useFeedback';

// Subscription hooks
export { 
  useSubscriptionFeatures,
  useSubscriptionTiers, 
  useCurrentSubscription, 
  useCancelSubscription,
  subscriptionKeys,
} from './useSubscription';

// Feature Request hooks
export {
  useFeatureRequests,
  useMyFeatureRequests,
  useCreateFeatureRequest,
  useVoteFeatureRequest,
  featureRequestKeys,
} from './useFeatureRequests';

// Admin hooks
export {
  useAdminStats,
  useAdminConfig,
  useUpdateAdminConfig,
  useAdminUsers,
  useAdminUser,
  useSetTestUser,
  useAdminFeatureRequests,
  useAdminFeatureRequest,
  useUpdateAdminFeatureRequest,
  useArchiveFeatureRequest,
  useUnarchiveFeatureRequest,
  useDeleteFeatureRequest,
  useAdminProblemReports,
  useAdminProblemReport,
  useUpdateAdminProblemReport,
  useArchiveProblemReport,
  useUnarchiveProblemReport,
  useDeleteProblemReport,
  adminKeys,
} from './useAdmin';
