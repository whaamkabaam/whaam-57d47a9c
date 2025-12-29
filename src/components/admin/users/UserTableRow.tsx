// ============================================
// User Table Row Component
// ============================================

import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, AlertTriangle, ThumbsUp, FlaskConical } from 'lucide-react';
import { format } from 'date-fns';
import type { AdminUser } from '@/lib/api/types';

interface UserTableRowProps {
  user: AdminUser;
  onToggleTestUser: (userId: string, isTestUser: boolean) => void;
  isToggling?: boolean;
  onViewDetails?: (user: AdminUser) => void;
}

export function UserTableRow({ user, onToggleTestUser, isToggling, onViewDetails }: UserTableRowProps) {
  const initials = user.display_name
    ? user.display_name.slice(0, 2).toUpperCase()
    : user.email.slice(0, 2).toUpperCase();

  return (
    <TableRow 
      className="hover:bg-muted/30 transition-colors cursor-pointer"
      onClick={() => onViewDetails?.(user)}
    >
      {/* User Info */}
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-border/50">
            <AvatarImage src={user.avatar_url || undefined} alt={user.display_name || user.email} />
            <AvatarFallback className="bg-secondary/20 text-secondary text-sm font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="font-medium text-foreground truncate">
              {user.display_name || 'No name'}
            </span>
            <span className="text-sm text-muted-foreground truncate">
              {user.email}
            </span>
          </div>
        </div>
      </TableCell>

      {/* Activity Counts */}
      <TableCell>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="gap-1 bg-muted/30">
            <MessageSquare className="h-3 w-3" />
            <span>{user.feature_request_count}</span>
          </Badge>
          <Badge variant="outline" className="gap-1 bg-muted/30">
            <AlertTriangle className="h-3 w-3" />
            <span>{user.problem_report_count}</span>
          </Badge>
          <Badge variant="outline" className="gap-1 bg-muted/30">
            <ThumbsUp className="h-3 w-3" />
            <span>{user.vote_count}</span>
          </Badge>
        </div>
      </TableCell>

      {/* Test User Toggle */}
      <TableCell onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2">
          <Switch
            checked={user.is_test_user}
            onCheckedChange={(checked) => onToggleTestUser(user.id, checked)}
            disabled={isToggling}
            aria-label="Toggle test user"
          />
          {user.is_test_user && (
            <Badge className="bg-secondary/20 text-secondary border-secondary/30 gap-1">
              <FlaskConical className="h-3 w-3" />
              Test
            </Badge>
          )}
        </div>
      </TableCell>

      {/* Joined Date */}
      <TableCell className="text-muted-foreground text-sm">
        {format(new Date(user.created_at), 'MMM d, yyyy')}
      </TableCell>
    </TableRow>
  );
}
