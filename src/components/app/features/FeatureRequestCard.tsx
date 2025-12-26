// ============================================
// Feature Request Card - Voting Card Component
// ============================================

import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { ChevronUp, ChevronDown, User, Calendar, Circle, Loader2, CheckCircle, XCircle } from 'lucide-react';
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
  isNew?: boolean;
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

// Collapsed height for 2 lines of text (~2.8rem)
const COLLAPSED_HEIGHT = 44;

export function FeatureRequestCard({ 
  request, 
  onVote, 
  isVoting = false,
  isAuthenticated,
  isNew = false,
}: FeatureRequestCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState<number>(COLLAPSED_HEIGHT);
  const [isTextTruncated, setIsTextTruncated] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const statusConfig = STATUS_CONFIG[request.status];
  const StatusIcon = statusConfig.icon;
  
  // Measure content height and detect truncation
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (el) {
      const fullHeight = el.scrollHeight;
      setContentHeight(fullHeight);
      setIsTextTruncated(fullHeight > COLLAPSED_HEIGHT + 4);
    }
  }, [request.description]);
  
  const handleVoteClick = () => {
    if (!isAuthenticated || isVoting) return;
    onVote(request.id, request.user_has_voted);
  };

  const timeAgo = formatDistanceToNow(new Date(request.created_at), { addSuffix: true });

  return (
    <LiquidGlassCard 
      className={cn(
        "p-5 rounded-2xl transition-all duration-300",
        isNew && "animate-fade-in ring-1 ring-whaam-yellow/30"
      )}
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

          {/* Description with smooth max-height animation */}
          <div 
            className="overflow-hidden transition-[max-height] duration-300 ease-out"
            style={{ 
              maxHeight: isExpanded ? `${contentHeight}px` : `${COLLAPSED_HEIGHT}px`
            }}
          >
            <div ref={contentRef}>
              <p className="text-sm text-muted-foreground">
                {request.description}
              </p>
            </div>
          </div>

          {/* Read more / Show less toggle */}
          {(isTextTruncated || isExpanded) && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-whaam-yellow/80 hover:text-whaam-yellow transition-colors mt-2 mb-3 flex items-center gap-1 group"
            >
              {isExpanded ? (
                <>
                  Show less 
                  <ChevronUp className="h-3 w-3 transition-transform group-hover:-translate-y-0.5" />
                </>
              ) : (
                <>
                  Read more 
                  <ChevronDown className="h-3 w-3 transition-transform group-hover:translate-y-0.5" />
                </>
              )}
            </button>
          )}

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
