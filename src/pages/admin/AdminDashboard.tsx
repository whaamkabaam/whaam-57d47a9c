// ============================================
// Admin Dashboard Page
// ============================================

import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { LayoutDashboard } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <LayoutDashboard className="h-8 w-8 text-secondary drop-shadow-[0_0_6px_rgba(255,215,64,0.5)]" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of system stats and activity
          </p>
        </div>
      </div>

      {/* Placeholder Content */}
      <LiquidGlassCard variant="secondary" className="p-8">
        <div className="text-center py-12">
          <LayoutDashboard className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Dashboard Coming Soon
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Stats cards showing total users, curves, feedback, and active subscriptions will appear here.
          </p>
        </div>
      </LiquidGlassCard>
    </div>
  );
}
