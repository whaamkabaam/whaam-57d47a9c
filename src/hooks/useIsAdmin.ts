// ============================================
// Admin Detection Hook
// ============================================

import { useAuth } from '@/contexts/AuthContext';

/**
 * Hook to check if the current user is an admin.
 * Uses the is_admin field returned from the backend session.
 */
export function useIsAdmin() {
  const { user, isLoading } = useAuth();

  return {
    isAdmin: user?.is_admin ?? false,
    isLoading,
  };
}
