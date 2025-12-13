// ============================================
// Subscription Page - Placeholder
// ============================================

import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { CreditCard } from 'lucide-react';

export default function Subscription() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <CreditCard className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold">Subscription</h1>
      </div>

      <LiquidGlassCard variant="secondary" className="p-6">
        <h2 className="text-xl font-semibold mb-4">Your Plan</h2>
        <p className="text-muted-foreground">
          View and manage your subscription plan, billing history, and payment methods.
        </p>
      </LiquidGlassCard>
    </div>
  );
}
