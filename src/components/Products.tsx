import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Zap, Trophy, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useFastSpringCheckout } from "@/hooks/useFastSpringCheckout";
import { DurationToggle } from "@/components/pricing/DurationToggle";
import { TierCard } from "@/components/pricing/TierCard";
import { DashboardExplainer } from "@/components/pricing/DashboardExplainer";
import { LiveSessionCard } from "@/components/pricing/LiveSessionCard";
import { FeatureComparisonTable } from "@/components/pricing/FeatureComparisonTable";
import { ProcessingModal } from "@/components/pricing/ProcessingModal";
import { LiquidGlassCard } from "@/components/LiquidGlassEffects";
import type { SubscriptionDuration, SubscriptionTier } from "@/lib/api";

type PaidTier = Exclude<SubscriptionTier, 'free'>;

const Products = () => {
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

  const benefits = [
    { icon: Shield, title: "100% Satisfaction Guarantee", desc: "Unlimited tweaks until you're happy—or your money back." },
    { icon: Zap, title: "First Curve in Minutes", desc: "Your personalized curve delivered fast, not days." },
    { icon: Trophy, title: "750+ Players Helped", desc: "Join a growing community of aimers who leveled up." }
  ];

  return (
    <section id="products" className="pt-8 pb-24 relative">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold glass-text-contrast mb-6 leading-tight">
            Pick your plan,
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mt-2 leading-normal">
              start aiming better.
            </span>
          </h2>
          <p className="text-lg md:text-xl glass-text max-w-3xl mx-auto">
            Choose your tier and duration. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Duration Toggle */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <DurationToggle value={duration} onChange={setDuration} />
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Just visiting? Grab a Day or Week Pass. <br />Serious improvement? Monthly saves you money.
          </p>
        </div>


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
          <LiquidGlassCard
            role="button"
            tabIndex={0}
            className="cursor-pointer select-none rounded-2xl p-4 md:p-5"
            onClick={() => setIsComparisonOpen(prev => !prev)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsComparisonOpen(prev => !prev); } }}
          >
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <span className="text-sm font-medium">Compare all features</span>
              <motion.div
                animate={{ rotate: isComparisonOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </div>
          </LiquidGlassCard>

          <div
            className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{ gridTemplateRows: isComparisonOpen ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden min-h-0">
              <div className="pt-4">
                <div className="p-6 rounded-2xl glass-secondary">
                  <FeatureComparisonTable />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Session */}
        <div className="max-w-lg mx-auto mb-16">
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground uppercase tracking-wide font-medium">
              Or get expert help
            </p>
          </div>
          <LiveSessionCard />
        </div>

        {/* Dashboard Explainer */}
        <DashboardExplainer />

        {/* Benefits Section */}
        <LiquidGlassCard variant="primary" className="p-8 md:p-10">
          <h3 className="text-2xl md:text-3xl font-bold text-center glass-text-contrast mb-10">
            Why choose <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">WHAAMKABAAM</span>?
          </h3>
          
          <div className="grid sm:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-14 h-14 mx-auto mb-3 glass-accent rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110 liquid-glow-accent">
                  <benefit.icon className="text-primary" size={24} />
                </div>
                <h4 className="text-lg font-semibold glass-text-contrast mb-1.5">{benefit.title}</h4>
                <p className="glass-text text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </LiquidGlassCard>
      </div>

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
    </section>
  );
};

export default Products;
