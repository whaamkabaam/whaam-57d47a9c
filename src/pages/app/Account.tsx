// ============================================
// Account Page - Profile, Subscription & Settings
// ============================================

import { useState } from 'react';
import { LiquidGlassCard, LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrentSubscription, useCancelSubscription } from '@/hooks/api/useSubscription';
import { SubscriptionCard } from '@/components/app/account/SubscriptionCard';
import { CancelSubscriptionDialog } from '@/components/app/account/CancelSubscriptionDialog';
import { 
  User, 
  LogOut,
  Mail
} from 'lucide-react';
import { toast } from 'sonner';

export default function Account() {
  const { user, logout } = useAuth();
  const { data: subscription, isLoading: isLoadingSubscription } = useCurrentSubscription();
  const cancelMutation = useCancelSubscription();
  
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch {
      toast.error('Failed to log out');
    }
  };

  const handleConfirmCancel = async () => {
    try {
      await cancelMutation.mutateAsync({ immediate: false });
      toast.success('Subscription cancelled', {
        description: subscription?.current_period_end 
          ? `Access continues until ${new Date(subscription.current_period_end).toLocaleDateString()}`
          : 'Your access will end at the end of your billing period',
      });
      setShowCancelDialog(false);
    } catch {
      toast.error('Failed to cancel subscription', {
        description: 'Please try again or contact support',
      });
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
      <SubscriptionCard
        subscription={subscription}
        isLoading={isLoadingSubscription}
        onCancelClick={() => setShowCancelDialog(true)}
      />

      {/* Cancel Subscription Dialog */}
      <CancelSubscriptionDialog
        isOpen={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        onConfirm={handleConfirmCancel}
        isLoading={cancelMutation.isPending}
        subscription={subscription}
      />

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
