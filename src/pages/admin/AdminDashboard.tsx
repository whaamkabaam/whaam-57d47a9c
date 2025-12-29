// ============================================
// Admin Dashboard Page
// Overview stats, analytics charts, and recent activity
// ============================================

import { useMemo } from 'react';
import { LayoutDashboard, Users, FileText, MessageSquare, CreditCard, AlertTriangle, Lightbulb, RefreshCw, TrendingUp } from 'lucide-react';
import { useAdminStats, useAdminTimeseries } from '@/hooks/api/useAdmin';
import { StatCard } from '@/components/admin/dashboard/StatCard';
import { QuickActionCard } from '@/components/admin/dashboard/QuickActionCard';
import { ChartContainer, ActivityLineChart, StatusPieChart, StatusBarChart } from '@/components/admin/dashboard/StatsChart';
import { RecentActivityFeed } from '@/components/admin/dashboard/RecentActivityFeed';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

// Helper to format status labels from snake_case to Title Case
function formatStatusLabel(status: string): string {
  return status
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function AdminDashboard() {
  const { data: stats, isLoading, isError, refetch } = useAdminStats();
  const { data: timeseriesData, isLoading: isTimeseriesLoading } = useAdminTimeseries(30);

  // Transform timeseries data for the chart
  const activityData = useMemo(() => {
    if (!timeseriesData?.data) return [];
    return timeseriesData.data.map(d => ({
      date: format(new Date(d.date), 'MMM d'),
      reports: d.problem_reports,
      requests: d.feature_requests,
    }));
  }, [timeseriesData]);

  // Transform status distribution data from API
  const problemReportsStatusData = useMemo(() => {
    if (!stats?.problem_reports_by_status) return [];
    return Object.entries(stats.problem_reports_by_status).map(
      ([name, value]) => ({ name: formatStatusLabel(name), value: value as number })
    );
  }, [stats?.problem_reports_by_status]);

  const featureRequestsStatusData = useMemo(() => {
    if (!stats?.feature_requests_by_status) return [];
    return Object.entries(stats.feature_requests_by_status).map(
      ([name, value]) => ({ name: formatStatusLabel(name), value: value as number })
    );
  }, [stats?.feature_requests_by_status]);

  const chartsLoading = isLoading || isTimeseriesLoading;

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Lightbulb}
            label="Feature Requests"
            value={stats?.total_feature_requests}
            isLoading={isLoading}
          />
          <StatCard
            icon={AlertTriangle}
            label="Problem Reports"
            value={stats?.total_problem_reports}
            isLoading={isLoading}
          />
        </div>
      </section>

      {/* Analytics Section */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Analytics</h2>
        </div>
        
        {/* Activity Over Time + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <ChartContainer title="Activity Over Time (Last 30 Days)" isLoading={chartsLoading}>
              {activityData.length > 0 ? (
                <ActivityLineChart data={activityData} />
              ) : (
                <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                  No activity data available
                </div>
              )}
            </ChartContainer>
          </div>
          <div className="lg:col-span-1">
            <RecentActivityFeed className="h-full" />
          </div>
        </div>

        {/* Status Distribution Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartContainer title="Problem Reports by Status" isLoading={isLoading}>
            {problemReportsStatusData.length > 0 ? (
              <StatusBarChart data={problemReportsStatusData} />
            ) : (
              <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </ChartContainer>
          
          <ChartContainer title="Feature Requests by Status" isLoading={isLoading}>
            {featureRequestsStatusData.length > 0 ? (
              <StatusPieChart data={featureRequestsStatusData} />
            ) : (
              <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </ChartContainer>
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
