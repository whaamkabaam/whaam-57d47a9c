// ============================================
// User Profile React Query Hooks
// ============================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/lib/api';
import { authKeys } from './useAuth';
import type { UpdateProfileRequest, UpdateSettingsRequest } from '@/lib/api';

export const userKeys = {
  profile: ['user', 'profile'] as const,
  settings: ['user', 'settings'] as const,
};

// Get current user profile
export function useProfile() {
  return useQuery({
    queryKey: userKeys.profile,
    queryFn: () => userApi.getProfile(),
  });
}

// Update user profile
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => userApi.updateProfile(data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(userKeys.profile, updatedUser);
      // Also update session data if it exists
      queryClient.invalidateQueries({ queryKey: authKeys.session });
    },
  });
}

// Get sensitivity settings (legacy accounts only)
export function useSettings() {
  return useQuery({
    queryKey: userKeys.settings,
    queryFn: () => userApi.getSettings(),
  });
}

// Update sensitivity settings (legacy accounts only)
export function useUpdateSettings() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: UpdateSettingsRequest) => userApi.updateSettings(data),
    onSuccess: (updatedSettings) => {
      queryClient.setQueryData(userKeys.settings, updatedSettings);
    },
  });
}

// Delete user account
export function useDeleteAccount() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => userApi.deleteAccount(),
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
    },
  });
}
