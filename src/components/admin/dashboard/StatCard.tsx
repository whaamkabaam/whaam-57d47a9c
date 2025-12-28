// ============================================
// Admin Dashboard Stat Card
// ============================================

import { LucideIcon } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Skeleton } from '@/components/ui/skeleton';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | undefined;
  isLoading?: boolean;
}

export function StatCard({ icon: Icon, label, value, isLoading }: StatCardProps) {
  return (
    <LiquidGlassCard variant="secondary" className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{label}</p>
          {isLoading ? (
            <Skeleton className="h-9 w-24" />
          ) : (
            <p className="text-3xl font-bold text-foreground">
              {value?.toLocaleString() ?? '—'}
            </p>
          )}
        </div>
        <div className="rounded-lg bg-secondary/10 p-3">
          <Icon className="h-6 w-6 text-secondary drop-shadow-[0_0_6px_rgba(255,215,64,0.5)]" />
        </div>
      </div>
    </LiquidGlassCard>
  );
}
