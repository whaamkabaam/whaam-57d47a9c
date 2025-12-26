// ============================================
// Feature Request Card - Voting Card Component
// ============================================

import { ChevronUp, User, Calendar, Circle, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import type { FeatureRequest, FeatureRequestStatus } from '@/lib/api/types';

interface FeatureRequestCardProps {
  request: FeatureRequest;
  onVote: (id: number, hasVoted: boolean) => void;
  isVoting?: boolean;
  isAuthenticated: boolean;
}

// Status badge configuration
const STATUS_CONFIG: Record<FeatureRequestStatus, { 
  label: string; 
  className: string; 
  icon: typeof Circle;
}> = {
  open: { 
    label: 'Open', 
    className: 'bg-muted/50 text-muted-foreground border-white/10',
    icon: Circle,
  },
  planned: { 
    label: 'Planned', 
    className: 'bg-whaam-yellow/20 text-whaam-yellow border-whaam-yellow/30',
    icon: Calendar,
  },
  in_progress: { 
    label: 'In Progress', 
    className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    icon: Loader2,
  },
  completed: { 
    label: 'Completed', 
    className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    icon: CheckCircle,
  },
  declined: { 
    label: 'Declined', 
    className: 'bg-destructive/20 text-destructive border-destructive/30',
    icon: XCircle,
  },
};

export function FeatureRequestCard({ 
  request, 
  onVote, 
  isVoting = false,
  isAuthenticated,
}: FeatureRequestCardProps) {
  const statusConfig = STATUS_CONFIG[request.status];
  const StatusIcon = statusConfig.icon;
  
  const handleVoteClick = () => {
    if (!isAuthenticated || isVoting) return;
    onVote(request.id, request.user_has_voted);
  };

  const timeAgo = formatDistanceToNow(new Date(request.created_at), { addSuffix: true });

  return (
    <LiquidGlassCard 
      className="p-5 rounded-2xl"
      glassVariant="default"
    >
      <div className="flex gap-4">
        {/* Vote Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleVoteClick}
            disabled={!isAuthenticated || isVoting}
            className={cn(
              'flex flex-col items-center justify-center w-14 h-16 rounded-xl transition-all duration-200',
              'border focus:outline-none focus:ring-2 focus:ring-white/20',
              request.user_has_voted
                ? 'bg-whaam-yellow/20 border-whaam-yellow/40 text-whaam-yellow'
                : 'bg-white/[0.04] border-white/[0.08] text-muted-foreground hover:bg-white/[0.08] hover:text-foreground',
              !isAuthenticated && 'opacity-50 cursor-not-allowed',
              isVoting && 'animate-pulse'
            )}
            title={!isAuthenticated ? 'Log in to vote' : request.user_has_voted ? 'Remove vote' : 'Upvote'}
          >
            <ChevronUp 
              className={cn(
                'h-5 w-5 transition-transform duration-200',
                request.user_has_voted && 'scale-110'
              )} 
            />
            <span className="text-sm font-semibold tabular-nums">
              {request.vote_count}
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header with title and status */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-base font-semibold text-foreground line-clamp-2">
              {request.title}
            </h3>
            <Badge 
              variant="outline" 
              className={cn(
                'shrink-0 text-xs font-medium border',
                statusConfig.className
              )}
            >
              <StatusIcon className={cn(
                'h-3 w-3 mr-1',
                request.status === 'in_progress' && 'animate-spin'
              )} />
              {statusConfig.label}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {request.description}
          </p>

          {/* Footer: Author & Time */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground/70">
            <div className="flex items-center gap-1.5">
              <User className="h-3 w-3" />
              <span>
                {request.is_anonymous 
                  ? 'Anonymous' 
                  : request.author_name || 'Unknown'}
              </span>
            </div>
            {request.is_own && (
              <Badge 
                variant="outline" 
                className="text-[10px] py-0 px-1.5 bg-white/[0.06] border-white/10 text-foreground/70"
              >
                Your idea
              </Badge>
            )}
            <span className="text-muted-foreground/50">•</span>
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
    </LiquidGlassCard>
  );
}
