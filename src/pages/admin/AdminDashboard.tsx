// ============================================
// Admin Dashboard Page
// Overview stats, analytics charts, and recent activity
// ============================================

import { useMemo } from 'react';
import { LayoutDashboard, Users, FileText, MessageSquare, CreditCard, AlertTriangle, Lightbulb, RefreshCw, TrendingUp } from 'lucide-react';
import { useAdminStats } from '@/hooks/api/useAdmin';
import { StatCard } from '@/components/admin/dashboard/StatCard';
import { QuickActionCard } from '@/components/admin/dashboard/QuickActionCard';
import { ChartContainer, ActivityLineChart, StatusPieChart, StatusBarChart } from '@/components/admin/dashboard/StatsChart';
import { RecentActivityFeed } from '@/components/admin/dashboard/RecentActivityFeed';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Button } from '@/components/ui/button';

// Generate mock activity data for the last 30 days
function generateMockActivityData() {
  const data = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      reports: Math.floor(Math.random() * 8) + 1,
      requests: Math.floor(Math.random() * 5) + 1,
    });
  }
  
  return data;
}

export default function AdminDashboard() {
  const { data: stats, isLoading, isError, refetch } = useAdminStats();

  // Mock activity data (would come from API in production)
  const activityData = useMemo(() => generateMockActivityData(), []);

  // Mock status distribution data (would come from API in production)
  const problemReportsStatusData = useMemo(() => [
    { name: 'New', value: 12 },
    { name: 'Triaged', value: 8 },
    { name: 'In Progress', value: 5 },
    { name: 'Fixed', value: 15 },
    { name: "Won't Fix", value: 3 },
  ], []);

  const featureRequestsStatusData = useMemo(() => [
    { name: 'Pending', value: 18 },
    { name: 'Under Review', value: 6 },
    { name: 'Planned', value: 4 },
    { name: 'In Progress', value: 3 },
    { name: 'Completed', value: 8 },
  ], []);

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

      {/* Analytics Section */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Analytics</h2>
        </div>
        
        {/* Activity Over Time + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <ChartContainer title="Activity Over Time (Last 30 Days)" isLoading={isLoading}>
              <ActivityLineChart data={activityData} />
            </ChartContainer>
          </div>
          <div className="lg:col-span-1">
            <RecentActivityFeed isLoading={isLoading} className="h-full" />
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
