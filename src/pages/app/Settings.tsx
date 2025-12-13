// ============================================
// Settings Page - Placeholder
// ============================================

import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <SettingsIcon className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <LiquidGlassCard variant="secondary" className="p-6">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <p className="text-muted-foreground">
          Manage your account details, connected services, and preferences.
        </p>
      </LiquidGlassCard>
    </div>
  );
}
