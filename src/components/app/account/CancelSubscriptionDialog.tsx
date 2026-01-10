// ============================================
// Cancel Subscription Dialog - Confirmation Modal
// ============================================

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertTriangle, X, Check, Loader2 } from 'lucide-react';
import type { SubscriptionCurrent } from '@/lib/api';

interface CancelSubscriptionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading: boolean;
  subscription: SubscriptionCurrent | undefined;
}

// Features lost by tier
const getFeaturesLost = (tier: string) => {
  switch (tier) {
    case 'basic':
      return [
        '5 daily curve adjustments',
        '5 library slots for saved curves',
      ];
    case 'plus':
      return [
        '25 daily curve adjustments',
        '20 library slots for saved curves',
        'Upload custom curves',
        'Restore any previous version',
      ];
    case 'ultra':
      return [
        'Unlimited curve adjustments',
        'Unlimited library storage',
        'Form settings access',
        'Priority support',
      ];
    default:
      return ['Premium features'];
  }
};

export function CancelSubscriptionDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  isLoading,
  subscription,
}: CancelSubscriptionDialogProps) {
  const featuresLost = subscription ? getFeaturesLost(subscription.tier) : [];
  const endDate = subscription?.current_period_end 
    ? new Date(subscription.current_period_end).toLocaleDateString()
    : 'the end of your billing period';

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <AlertDialogTitle className="text-xl">
              Cancel subscription?
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription asChild>
            <div className="space-y-4 text-left">
              <p className="text-foreground">
                Your access will continue until <strong>{endDate}</strong>.
              </p>
              
              <div>
                <p className="text-muted-foreground mb-2">
                  After that, you'll lose access to:
                </p>
                <ul className="space-y-1.5">
                  {featuresLost.map((feature, index) => (
                    <li 
                      key={index} 
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <X className="h-3.5 w-3.5 text-destructive flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sm text-muted-foreground">
                You can resubscribe anytime to restore access.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter className="flex-col sm:flex-row gap-2 mt-4">
          <AlertDialogCancel 
            className="flex-1 order-2 sm:order-1"
            disabled={isLoading}
          >
            <Check className="h-4 w-4 mr-1" />
            Keep Subscription
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isLoading}
            className="flex-1 order-1 sm:order-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                Cancelling...
              </>
            ) : (
              'Cancel Subscription'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
