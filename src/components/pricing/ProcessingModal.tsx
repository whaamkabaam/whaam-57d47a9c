import { X, CheckCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LiquidOrbSpinner } from '@/components/app/LiquidOrbSpinner';

interface ProcessingModalProps {
  isOpen: boolean;
  isPolling: boolean;
  error: string | null;
  checkoutComplete?: boolean;
  isGuestCheckout?: boolean;
  onCancel: () => void;
  onGoToAuth?: () => void;
}

export function ProcessingModal({ 
  isOpen, 
  isPolling, 
  error, 
  checkoutComplete,
  isGuestCheckout,
  onCancel,
  onGoToAuth,
}: ProcessingModalProps) {
  if (!isOpen) return null;

  // Guest checkout complete state
  if (checkoutComplete && isGuestCheckout) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={onCancel}
        />
        
        <div className="relative z-10 w-full max-w-sm mx-4 p-8 rounded-2xl glass-container border border-border">
          <div className="glass-effect-layer" />
          
          <div className="glass-content-layer !p-0 flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-primary/20 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              You're all set!
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              Check your email for a link to set your password and access your account.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
              <Mail className="w-4 h-4" />
              <span>We sent instructions to your email</span>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Button onClick={onGoToAuth} variant="default">
                Sign in
              </Button>
              <Button onClick={onCancel} variant="ghost" size="sm">
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-sm mx-4 p-8 rounded-2xl glass-container border border-border">
        <div className="glass-effect-layer" />
        
        <div className="glass-content-layer !p-0 flex flex-col items-center text-center">
          {error ? (
            <>
              <div className="w-16 h-16 mb-4 rounded-full bg-destructive/20 flex items-center justify-center">
                <X className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Something went wrong
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                {error}
              </p>
              <Button onClick={onCancel} variant="outline">
                Close
              </Button>
            </>
          ) : (
            <>
              <LiquidOrbSpinner 
                size="lg" 
                progress={isPolling ? 75 : 25} 
              />
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                {isPolling ? 'Activating subscription...' : 'Completing purchase...'}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {isPolling 
                  ? "Please wait while we set up your account"
                  : "Complete the checkout in the popup window"
                }
              </p>
              <Button 
                onClick={onCancel} 
                variant="ghost" 
                size="sm"
                className="mt-6 text-muted-foreground"
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
