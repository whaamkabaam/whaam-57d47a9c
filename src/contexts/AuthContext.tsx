// ============================================
// Auth Context Provider
// ============================================

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useSession, useLogin, useLogout, useRegister } from '@/hooks/api';
import type { User, SessionResponse, LoginRequest, RegisterRequest } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  session: SessionResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  refetchSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isLoading, refetch } = useSession();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const registerMutation = useRegister();

  const login = useCallback(async (data: LoginRequest) => {
    await loginMutation.mutateAsync(data);
  }, [loginMutation]);

  const logout = useCallback(async () => {
    await logoutMutation.mutateAsync();
  }, [logoutMutation]);

  const register = useCallback(async (data: RegisterRequest) => {
    await registerMutation.mutateAsync(data);
  }, [registerMutation]);

  // Refetch session on tab focus
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refetch();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [refetch]);

  const value: AuthContextType = {
    user: session?.user ?? null,
    session: session ?? null,
    isLoading,
    isAuthenticated: !!session?.user,
    login,
    logout,
    register,
    refetchSession: refetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // In development, this can happen during HMR - return a safe loading state
    if (import.meta.env.DEV) {
      console.warn('useAuth called outside AuthProvider - returning loading state (likely HMR)');
      return {
        user: null,
        session: null,
        isLoading: true,
        isAuthenticated: false,
        login: async () => {},
        logout: async () => {},
        register: async () => {},
        refetchSession: () => {},
      };
    }
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
