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
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  AlertTriangle, 
  ThumbsUp, 
  FlaskConical,
  Calendar,
  Mail,
  Copy,
  Check,
} from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
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
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  const initials = user.display_name
    ? user.display_name.slice(0, 2).toUpperCase()
    : user.email.slice(0, 2).toUpperCase();

  const handleCopyId = () => {
    navigator.clipboard.writeText(user.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl bg-background border-white/10 max-h-[90vh] p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b border-white/[0.06]">
          <DialogTitle className="text-lg font-semibold">User Details</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* User Header */}
            <div className="flex items-start gap-4">
              <Avatar className="h-14 w-14 border border-white/[0.08]">
                <AvatarImage src={user.avatar_url || undefined} alt={user.display_name || user.email} />
                <AvatarFallback className="bg-white/[0.04] text-muted-foreground text-lg font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 space-y-1.5">
                <h2 className="text-base font-medium text-foreground truncate">
                  {user.display_name || 'No display name'}
                </h2>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="text-sm truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  <span className="text-sm">Joined {format(new Date(user.created_at), 'MMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  {user.email_verified && (
                    <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                      Verified
                    </Badge>
                  )}
                  {user.is_test_user && (
                    <Badge variant="outline" className="text-xs bg-secondary/10 text-secondary border-secondary/20">
                      Test User
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Activity Summary */}
            <div className="space-y-3">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">
                Activity Summary
              </Label>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 rounded-md bg-white/[0.02] border border-white/[0.06] text-center hover:bg-white/[0.04] transition-colors">
                  <MessageSquare className="h-4 w-4 text-muted-foreground mx-auto mb-1.5" />
                  <p className="text-xl font-semibold text-foreground">{user.feature_request_count}</p>
                  <p className="text-[11px] text-muted-foreground">Requests</p>
                </div>
                <div className="p-3 rounded-md bg-white/[0.02] border border-white/[0.06] text-center hover:bg-white/[0.04] transition-colors">
                  <AlertTriangle className="h-4 w-4 text-muted-foreground mx-auto mb-1.5" />
                  <p className="text-xl font-semibold text-foreground">{user.problem_report_count}</p>
                  <p className="text-[11px] text-muted-foreground">Reports</p>
                </div>
                <div className="p-3 rounded-md bg-white/[0.02] border border-white/[0.06] text-center hover:bg-white/[0.04] transition-colors">
                  <ThumbsUp className="h-4 w-4 text-muted-foreground mx-auto mb-1.5" />
                  <p className="text-xl font-semibold text-foreground">{user.vote_count}</p>
                  <p className="text-[11px] text-muted-foreground">Votes</p>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="space-y-3">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">
                Account Info
              </Label>
              <div className="rounded-md bg-white/[0.02] border border-white/[0.06] divide-y divide-white/[0.06]">
                <div className="flex justify-between items-center px-3 py-2.5">
                  <span className="text-sm text-muted-foreground">User ID</span>
                  <button
                    onClick={handleCopyId}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <code className="bg-white/[0.04] px-1.5 py-0.5 rounded font-mono">
                      {user.id.slice(0, 8)}...
                    </code>
                    {copied ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
                {user.discord_id && (
                  <div className="flex justify-between items-center px-3 py-2.5">
                    <span className="text-sm text-muted-foreground">Discord ID</span>
                    <span className="text-sm text-foreground">{user.discord_id}</span>
                  </div>
                )}
                <div className="flex justify-between items-center px-3 py-2.5">
                  <span className="text-sm text-muted-foreground">Legacy Account</span>
                  <span className="text-sm text-foreground">{user.has_legacy_account ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>

            {/* Admin Controls */}
            <div className="space-y-3">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">
                Admin Controls
              </Label>
              <div className="flex items-center justify-between p-3 rounded-md bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <FlaskConical className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label htmlFor="test-user-toggle" className="text-sm font-medium cursor-pointer">
                      Test User
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Exclude from analytics
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
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-white/[0.06]">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
