import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useFastSpringCheckout } from '@/hooks/useFastSpringCheckout';
import { DurationToggle } from '@/components/pricing/DurationToggle';
import { TierCard } from '@/components/pricing/TierCard';
import { KeyLimitsComparator } from '@/components/pricing/KeyLimitsComparator';
import { LiveSessionCard } from '@/components/pricing/LiveSessionCard';
import { FeatureComparisonTable } from '@/components/pricing/FeatureComparisonTable';
import { ProcessingModal } from '@/components/pricing/ProcessingModal';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { SubscriptionDuration, SubscriptionTier } from '@/lib/api';

type PaidTier = Exclude<SubscriptionTier, 'free'>;

export default function Pricing() {
  const [duration, setDuration] = useState<SubscriptionDuration>('monthly');
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const navigate = useNavigate();
  
  const { isAuthenticated } = useAuth();
  const subscription = useSubscription();
  const { 
    startCheckout, 
    cancelPolling, 
    isProcessing, 
    isPolling, 
    error,
    checkoutComplete,
    isGuestCheckout,
  } = useFastSpringCheckout();

  const handleSelectTier = (tier: PaidTier) => {
    startCheckout(tier, duration);
  };

  const handleGoToAuth = () => {
    cancelPolling();
    navigate('/auth');
  };

  const currentTier = subscription?.tier;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-primary border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link 
            to={isAuthenticated ? "/studio" : "/"} 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
          
          {!isAuthenticated && (
            <Link to="/auth">
              <Button variant="outline" size="sm">
                Sign in
              </Button>
            </Link>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Pick your plan, start aiming better
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose your tier and duration. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Duration Toggle */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <DurationToggle value={duration} onChange={setDuration} />
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Just visiting? Grab a Day or Week Pass. Serious improvement? Monthly saves you money.
          </p>
        </div>

        {/* Key Limits Comparator */}
        <KeyLimitsComparator />

        {/* Tier Cards */}
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-12">
          <TierCard
            tier="basic"
            duration={duration}
            onSelect={() => handleSelectTier('basic')}
            isProcessing={isProcessing}
            isCurrentTier={currentTier === 'basic'}
          />
          <TierCard
            tier="plus"
            duration={duration}
            isPopular
            onSelect={() => handleSelectTier('plus')}
            isProcessing={isProcessing}
            isCurrentTier={currentTier === 'plus'}
          />
          <TierCard
            tier="ultra"
            duration={duration}
            onSelect={() => handleSelectTier('ultra')}
            isProcessing={isProcessing}
            isCurrentTier={currentTier === 'ultra'}
          />
        </div>

        {/* Feature Comparison */}
        <div className="max-w-4xl mx-auto mb-16">
          <Collapsible open={isComparisonOpen} onOpenChange={setIsComparisonOpen}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full flex items-center justify-center gap-2 text-muted-foreground"
              >
                <span>Compare all features</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isComparisonOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="p-6 rounded-2xl glass-secondary">
                <FeatureComparisonTable />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Live Session Section */}
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground uppercase tracking-wide font-medium">
              Or get expert help
            </p>
          </div>
          <LiveSessionCard />
        </div>

      </main>

      {/* Processing Modal */}
      <ProcessingModal
        isOpen={isProcessing || isPolling || !!error || checkoutComplete}
        isPolling={isPolling}
        error={error}
        checkoutComplete={checkoutComplete}
        isGuestCheckout={isGuestCheckout}
        onCancel={cancelPolling}
        onGoToAuth={handleGoToAuth}
      />
    </div>
  );
}
