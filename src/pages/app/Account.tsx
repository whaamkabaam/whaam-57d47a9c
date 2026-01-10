// ============================================
// Account Page - Profile, Subscription & Settings
// ============================================

import { LiquidGlassCard, LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrentSubscription } from '@/hooks/api/useSubscription';
import { 
  User, 
  CreditCard, 
  Crown, 
  LogOut,
  Mail,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

export default function Account() {
  const { user, logout } = useAuth();
  const { data: subscription, isLoading: isLoadingSubscription } = useCurrentSubscription();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch {
      toast.error('Failed to log out');
    }
  };

  // Helper to format subscription status for display
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'grace_period': return 'Grace Period';
      case 'expired': return 'Expired';
      case 'none': return 'No Subscription';
      default: return status;
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
        ) : subscription && subscription.tier !== 'free' && subscription.status !== 'none' ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Crown className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold capitalize">{subscription.tier} Plan</p>
                <p className="text-sm text-muted-foreground">
                  {getStatusDisplay(subscription.status)}
                  {subscription.duration && ` • ${subscription.duration}`}
                </p>
              </div>
            </div>

            {/* Grace period warning */}
            {subscription.status === 'grace_period' && subscription.grace_period_ends_at && (
              <div className="flex items-center gap-2 text-sm text-amber-500 bg-amber-500/10 p-3 rounded-lg">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                <span>
                  Your subscription has expired. Grace period ends{' '}
                  {new Date(subscription.grace_period_ends_at).toLocaleDateString()}
                </span>
              </div>
            )}

            {/* Expired warning */}
            {subscription.status === 'expired' && (
              <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                <span>Your subscription has expired. Renew to continue using premium features.</span>
              </div>
            )}
            
            {subscription.current_period_end && subscription.status === 'active' && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {subscription.cancel_at_period_end ? 'Ends' : 'Renews'}{' '}
                  {new Date(subscription.current_period_end).toLocaleDateString()}
                </span>
              </div>
            )}

            {/* Note: Manage Billing button will be added in Phase 5 with FastSpring portal */}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground mb-4">No active subscription</p>
            <a href="/pricing">
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
