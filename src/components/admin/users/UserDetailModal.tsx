// ============================================
// User Detail Modal Component
// Shows detailed user info with activity summary
// ============================================

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  MessageSquare, 
  AlertTriangle, 
  ThumbsUp, 
  FlaskConical,
  Calendar,
  Mail,
  User,
} from 'lucide-react';
import { format } from 'date-fns';
import type { AdminUser } from '@/lib/api/types';

interface UserDetailModalProps {
  user: AdminUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleTestUser: (userId: string, isTestUser: boolean) => void;
  isToggling: boolean;
}

export function UserDetailModal({
  user,
  open,
  onOpenChange,
  onToggleTestUser,
  isToggling,
}: UserDetailModalProps) {
  if (!user) return null;

  const initials = user.display_name
    ? user.display_name.slice(0, 2).toUpperCase()
    : user.email.slice(0, 2).toUpperCase();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-white/10">
        <DialogHeader>
          <DialogTitle className="sr-only">User Details</DialogTitle>
        </DialogHeader>

        {/* User Header */}
        <div className="flex items-start gap-4 pb-4">
          <Avatar className="h-16 w-16 border-2 border-secondary/30">
            <AvatarImage src={user.avatar_url || undefined} alt={user.display_name || user.email} />
            <AvatarFallback className="bg-secondary/20 text-secondary text-xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-foreground truncate">
              {user.display_name || 'No display name'}
            </h2>
            <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
              <Mail className="h-3.5 w-3.5" />
              <span className="text-sm truncate">{user.email}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
              <Calendar className="h-3.5 w-3.5" />
              <span className="text-sm">Joined {format(new Date(user.created_at), 'MMM d, yyyy')}</span>
            </div>
            {user.email_verified && (
              <Badge variant="outline" className="mt-2 text-xs bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                Email Verified
              </Badge>
            )}
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Activity Summary */}
        <div className="py-4">
          <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <User className="h-4 w-4 text-secondary" />
            Activity Summary
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
              <MessageSquare className="h-5 w-5 text-blue-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-foreground">{user.feature_request_count}</p>
              <p className="text-xs text-muted-foreground">Feature Requests</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
              <AlertTriangle className="h-5 w-5 text-orange-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-foreground">{user.problem_report_count}</p>
              <p className="text-xs text-muted-foreground">Problem Reports</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
              <ThumbsUp className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-foreground">{user.vote_count}</p>
              <p className="text-xs text-muted-foreground">Votes Cast</p>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Account Info */}
        <div className="py-4">
          <h3 className="text-sm font-medium text-foreground mb-3">Account Info</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">User ID</span>
              <code className="text-xs bg-white/5 px-2 py-1 rounded font-mono">{user.id.slice(0, 8)}...</code>
            </div>
            {user.discord_id && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Discord ID</span>
                <span className="text-foreground">{user.discord_id}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Legacy Account</span>
              <span className="text-foreground">{user.has_legacy_account ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Admin Controls */}
        <div className="py-4">
          <h3 className="text-sm font-medium text-foreground mb-3">Admin Controls</h3>
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4 text-secondary" />
              <div>
                <Label htmlFor="test-user-toggle" className="text-sm font-medium cursor-pointer">
                  Test User
                </Label>
                <p className="text-xs text-muted-foreground">
                  Exclude from analytics and reports
                </p>
              </div>
            </div>
            <Switch
              id="test-user-toggle"
              checked={user.is_test_user}
              onCheckedChange={(checked) => onToggleTestUser(user.id, checked)}
              disabled={isToggling}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
