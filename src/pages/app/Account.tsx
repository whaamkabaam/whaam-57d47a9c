// ============================================
// Account Page - Profile, Subscription & Settings
// ============================================

import { useState } from 'react';
import { LiquidGlassCard, LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrentSubscription, useSubscriptionPortal } from '@/hooks/api/useSubscription';
import { 
  User, 
  CreditCard, 
  ExternalLink, 
  Crown, 
  LogOut,
  Mail,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';

export default function Account() {
  const { user, logout } = useAuth();
  const { data: subscription, isLoading: isLoadingSubscription } = useCurrentSubscription();
  const portalMutation = useSubscriptionPortal();

  const handleManageSubscription = () => {
    portalMutation.mutate();
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch {
      toast.error('Failed to log out');
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <User className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold">Account</h1>
      </div>

      {/* Profile Section */}
      <LiquidGlassCard variant="secondary" className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile
        </h2>
        
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            {user?.avatar_url ? (
              <img 
                src={user.avatar_url} 
                alt={user.display_name || 'Avatar'} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-primary" />
            )}
          </div>
          
          <div className="space-y-2 min-w-0">
            <div>
              <p className="text-sm text-muted-foreground">Display Name</p>
              <p className="font-medium truncate">{user?.display_name || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Mail className="h-3 w-3" />
                Email
              </p>
              <p className="font-medium truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </LiquidGlassCard>

      {/* Subscription Section */}
      <LiquidGlassCard variant="secondary" className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Subscription
        </h2>
        
        {isLoadingSubscription ? (
          <div className="space-y-3">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-10 w-40" />
          </div>
        ) : subscription ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Crown className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold capitalize">{subscription.tier} Plan</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {subscription.status}
                </p>
              </div>
            </div>
            
            {subscription.current_period_end && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {subscription.status === 'active' ? 'Renews' : 'Ends'}{' '}
                  {new Date(subscription.current_period_end).toLocaleDateString()}
                </span>
              </div>
            )}

            <LiquidGlassButton
              variant="secondary"
              onClick={handleManageSubscription}
              disabled={portalMutation.isPending}
              className="flex items-center gap-2 text-sm px-4 py-2"
            >
              <ExternalLink className="h-4 w-4" />
              {portalMutation.isPending ? 'Opening...' : 'Manage Billing'}
            </LiquidGlassButton>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground mb-4">No active subscription</p>
            <a href="/#pricing">
              <LiquidGlassButton variant="primary" className="text-sm px-4 py-2">
                View Plans
              </LiquidGlassButton>
            </a>
          </div>
        )}
      </LiquidGlassCard>

      {/* Sign Out Section */}
      <LiquidGlassCard variant="secondary" className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Sign Out</h2>
            <p className="text-sm text-muted-foreground">
              Sign out of your account on this device
            </p>
          </div>
          <LiquidGlassButton
            variant="secondary"
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm px-4 py-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </LiquidGlassButton>
        </div>
      </LiquidGlassCard>
    </div>
  );
}
