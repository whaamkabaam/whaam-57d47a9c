// ============================================
// Admin Settings Page
// Daily cap configuration and system info
// ============================================

import { useState, useEffect } from 'react';
import { Settings, Save, Info, Users, MessageSquare, CreditCard } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useAdminConfig, useUpdateAdminConfig, useAdminStats } from '@/hooks/api/useAdmin';

export default function AdminSettings() {
  const { data: config, isLoading: configLoading, isError: configError } = useAdminConfig();
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const updateConfig = useUpdateAdminConfig();

  const [dailyCap, setDailyCap] = useState<number>(10);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync local state with fetched config
  useEffect(() => {
    if (config?.daily_cap !== undefined) {
      setDailyCap(config.daily_cap);
      setHasChanges(false);
    }
  }, [config?.daily_cap]);

  const handleDailyCapChange = (value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 1 && num <= 100) {
      setDailyCap(num);
      setHasChanges(num !== config?.daily_cap);
    }
  };

  const handleSave = async () => {
    try {
      await updateConfig.mutateAsync({ daily_cap: dailyCap });
      toast.success('Settings saved successfully');
      setHasChanges(false);
    } catch {
      toast.error('Failed to save settings');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <Settings className="h-8 w-8 text-secondary drop-shadow-[0_0_6px_rgba(255,215,64,0.5)]" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Settings</h1>
          <p className="text-sm text-muted-foreground">
            Configure system-wide settings
          </p>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feedback Settings Card */}
        <LiquidGlassCard variant="secondary" className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-secondary" />
              <h2 className="text-lg font-semibold text-foreground">Feedback Settings</h2>
            </div>
            
            {configLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : configError ? (
              <p className="text-sm text-destructive">Failed to load configuration</p>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="daily-cap" className="text-sm text-muted-foreground">
                    Daily Feedback Cap
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="daily-cap"
                      type="number"
                      min={1}
                      max={100}
                      value={dailyCap}
                      onChange={(e) => handleDailyCapChange(e.target.value)}
                      className="w-24 bg-white/5 border-white/10"
                    />
                    <span className="text-sm text-muted-foreground">
                      feedback submissions per user per day
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Limits how many times a user can submit feedback each day (1-100)
                  </p>
                </div>

                <Button
                  onClick={handleSave}
                  disabled={!hasChanges || updateConfig.isPending}
                  className={hasChanges ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90' : ''}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {updateConfig.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            )}
          </div>
        </LiquidGlassCard>

        {/* Bot Version Card */}
        <LiquidGlassCard variant="secondary" className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-secondary" />
              <h2 className="text-lg font-semibold text-foreground">System Info</h2>
            </div>
            
            {configLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-16" />
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Bot Version</p>
                  <p className="text-xl font-mono font-semibold text-foreground">
                    {config?.bot_version ?? 'Unknown'}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Current version of the curve generation bot
                </p>
              </div>
            )}
          </div>
        </LiquidGlassCard>
      </div>

      {/* Quick Stats Card */}
      <LiquidGlassCard variant="secondary" className="p-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Quick Stats</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Total Users */}
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                {statsLoading ? (
                  <Skeleton className="h-6 w-12" />
                ) : (
                  <p className="text-xl font-semibold text-foreground">
                    {stats?.total_users?.toLocaleString() ?? '—'}
                  </p>
                )}
              </div>
            </div>

            {/* Total Feedback */}
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-emerald-500/10">
                <MessageSquare className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Feedback</p>
                {statsLoading ? (
                  <Skeleton className="h-6 w-12" />
                ) : (
                  <p className="text-xl font-semibold text-foreground">
                    {stats?.total_feedback?.toLocaleString() ?? '—'}
                  </p>
                )}
              </div>
            </div>

            {/* Active Subscriptions */}
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-secondary/10">
                <CreditCard className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Subscriptions</p>
                {statsLoading ? (
                  <Skeleton className="h-6 w-12" />
                ) : (
                  <p className="text-xl font-semibold text-foreground">
                    {stats?.active_subscriptions?.toLocaleString() ?? '—'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </LiquidGlassCard>
    </div>
  );
}
