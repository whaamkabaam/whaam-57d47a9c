// ============================================
// Curves Page - Placeholder
// ============================================

import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Sliders } from 'lucide-react';

export default function Curves() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Sliders className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold">My Curves</h1>
      </div>

      <LiquidGlassCard variant="secondary" className="p-6">
        <h2 className="text-xl font-semibold mb-4">Your Custom Curves</h2>
        <p className="text-muted-foreground">
          Your custom curves and configuration files will appear here. You'll be able to download, preview, and manage your curves.
        </p>
      </LiquidGlassCard>
    </div>
  );
}
