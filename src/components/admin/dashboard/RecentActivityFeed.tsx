// ============================================
// Recent Activity Feed Component
// Chronological list of recent admin events (real API data)
// ============================================

import { formatDistanceToNow } from 'date-fns';
import { 
  AlertTriangle, 
  Lightbulb, 
  UserPlus, 
  Activity,
} from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAdminActivity } from '@/hooks/api/useAdmin';
import type { ActivityItem as ApiActivityItem } from '@/lib/api/types';

interface RecentActivityFeedProps {
  limit?: number;
  className?: string;
}

const activityIcons = {
  problem_report: AlertTriangle,
  feature_request: Lightbulb,
  user_joined: UserPlus,
};

const activityColors = {
  problem_report: 'text-destructive',
  feature_request: 'text-secondary',
  user_joined: 'text-primary',
};

function getActivityLink(item: ApiActivityItem): string {
  switch (item.type) {
    case 'problem_report':
      return '/admin/problem-reports';
    case 'feature_request':
      return '/admin/feature-requests';
    case 'user_joined':
      return '/admin/users';
    default:
      return '/admin';
  }
}

export function RecentActivityFeed({ limit = 10, className }: RecentActivityFeedProps) {
  const { data, isLoading, isError } = useAdminActivity(limit);

  return (
    <LiquidGlassCard variant="secondary" className={cn('p-4', className)}>
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Recent Activity
        </h3>
      </div>

      <div className="space-y-1">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <ActivitySkeleton key={i} />
          ))
        ) : isError ? (
          <div className="py-8 text-center">
            <AlertTriangle className="h-8 w-8 mx-auto text-destructive/50 mb-2" />
            <p className="text-sm text-muted-foreground">Failed to load activity</p>
          </div>
        ) : !data?.items || data.items.length === 0 ? (
          <div className="py-8 text-center">
            <Activity className="h-8 w-8 mx-auto text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          data.items.map((item) => (
            <ActivityRow key={`${item.type}-${item.id}`} item={item} />
          ))
        )}
      </div>
    </LiquidGlassCard>
  );
}

function ActivityRow({ item }: { item: ApiActivityItem }) {
  const Icon = activityIcons[item.type] || Activity;
  const colorClass = activityColors[item.type] || 'text-muted-foreground';
  const link = getActivityLink(item);

  return (
    <Link to={link}>
      <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/20 transition-colors group">
        <div className={cn('mt-0.5', colorClass)}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate group-hover:text-secondary transition-colors">
            {item.title}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {item.description || item.user_email || ''}
          </p>
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
        </span>
      </div>
    </Link>
  );
}

function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-3 p-2">
      <Skeleton className="h-4 w-4 rounded mt-0.5" />
      <div className="flex-1 space-y-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
      <Skeleton className="h-3 w-16" />
    </div>
  );
}
