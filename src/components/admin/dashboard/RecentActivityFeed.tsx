// ============================================
// Recent Activity Feed Component
// Chronological list of recent admin events
// ============================================

import { useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { 
  AlertTriangle, 
  Lightbulb, 
  UserPlus, 
  ThumbsUp,
  Activity,
} from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ActivityItem {
  id: string;
  type: 'problem_report' | 'feature_request' | 'user_joined' | 'high_votes';
  title: string;
  description: string;
  timestamp: Date;
  link?: string;
}

interface RecentActivityFeedProps {
  isLoading?: boolean;
  className?: string;
}

// Generate mock activity data
function generateMockActivity(): ActivityItem[] {
  const now = new Date();
  return [
    {
      id: '1',
      type: 'problem_report',
      title: 'New bug report',
      description: 'UI glitch on curve editor page',
      timestamp: new Date(now.getTime() - 15 * 60 * 1000), // 15 min ago
      link: '/admin/problems',
    },
    {
      id: '2',
      type: 'feature_request',
      title: 'New feature request',
      description: 'Export curves as PNG images',
      timestamp: new Date(now.getTime() - 45 * 60 * 1000), // 45 min ago
      link: '/admin/features',
    },
    {
      id: '3',
      type: 'high_votes',
      title: 'Feature trending',
      description: 'Dark mode for editor reached 50 votes',
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
      link: '/admin/features',
    },
    {
      id: '4',
      type: 'user_joined',
      title: 'New user',
      description: 'user@example.com joined',
      timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000), // 3 hours ago
      link: '/admin/users',
    },
    {
      id: '5',
      type: 'problem_report',
      title: 'Critical bug report',
      description: 'Curves not saving properly',
      timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000), // 5 hours ago
      link: '/admin/problems',
    },
    {
      id: '6',
      type: 'feature_request',
      title: 'New feature request',
      description: 'Keyboard shortcuts for common actions',
      timestamp: new Date(now.getTime() - 8 * 60 * 60 * 1000), // 8 hours ago
      link: '/admin/features',
    },
  ];
}

const activityIcons = {
  problem_report: AlertTriangle,
  feature_request: Lightbulb,
  user_joined: UserPlus,
  high_votes: ThumbsUp,
};

const activityColors = {
  problem_report: 'text-destructive',
  feature_request: 'text-secondary',
  user_joined: 'text-primary',
  high_votes: 'text-green-500',
};

export function RecentActivityFeed({ isLoading, className }: RecentActivityFeedProps) {
  // In production, this would come from an API
  const activities = useMemo(() => generateMockActivity(), []);

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
        ) : activities.length === 0 ? (
          <div className="py-8 text-center">
            <Activity className="h-8 w-8 mx-auto text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          activities.map((activity) => (
            <ActivityRow key={activity.id} activity={activity} />
          ))
        )}
      </div>
    </LiquidGlassCard>
  );
}

function ActivityRow({ activity }: { activity: ActivityItem }) {
  const Icon = activityIcons[activity.type];
  const colorClass = activityColors[activity.type];

  const content = (
    <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/20 transition-colors group">
      <div className={cn('mt-0.5', colorClass)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate group-hover:text-secondary transition-colors">
          {activity.title}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {activity.description}
        </p>
      </div>
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
      </span>
    </div>
  );

  if (activity.link) {
    return <Link to={activity.link}>{content}</Link>;
  }

  return content;
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
