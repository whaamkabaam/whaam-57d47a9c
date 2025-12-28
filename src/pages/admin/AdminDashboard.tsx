// ============================================
// Admin Dashboard Page
// ============================================

import { LayoutDashboard, Users, FileText, MessageSquare, CreditCard, AlertTriangle, Lightbulb, RefreshCw } from 'lucide-react';
import { useAdminStats } from '@/hooks/api/useAdmin';
import { StatCard } from '@/components/admin/dashboard/StatCard';
import { QuickActionCard } from '@/components/admin/dashboard/QuickActionCard';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const { data: stats, isLoading, isError, refetch } = useAdminStats();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="h-8 w-8 text-secondary drop-shadow-[0_0_6px_rgba(255,215,64,0.5)]" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Overview of system stats and activity
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Error State */}
      {isError && (
        <LiquidGlassCard variant="secondary" className="p-6">
          <div className="flex items-center gap-4 text-destructive">
            <AlertTriangle className="h-6 w-6" />
            <div className="flex-1">
              <p className="font-medium">Failed to load stats</p>
              <p className="text-sm text-muted-foreground">There was an error fetching dashboard data.</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        </LiquidGlassCard>
      )}

      {/* Stats Grid */}
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Users}
            label="Total Users"
            value={stats?.total_users}
            isLoading={isLoading}
          />
          <StatCard
            icon={FileText}
            label="Total Curves"
            value={stats?.total_curves}
            isLoading={isLoading}
          />
          <StatCard
            icon={MessageSquare}
            label="Total Feedback"
            value={stats?.total_feedback}
            isLoading={isLoading}
          />
          <StatCard
            icon={CreditCard}
            label="Active Subscriptions"
            value={stats?.active_subscriptions}
            isLoading={isLoading}
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionCard
            icon={AlertTriangle}
            title="Problem Reports"
            description="Review user-submitted issues"
            to="/admin/problem-reports"
          />
          <QuickActionCard
            icon={Lightbulb}
            title="Feature Requests"
            description="Manage feature suggestions"
            to="/admin/feature-requests"
          />
          <QuickActionCard
            icon={Users}
            title="User Management"
            description="Browse and manage users"
            to="/admin/users"
          />
        </div>
      </section>
    </div>
  );
}
