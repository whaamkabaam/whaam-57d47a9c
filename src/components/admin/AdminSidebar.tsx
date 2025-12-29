// ============================================
// Admin Sidebar Component - Liquid Glass Design
// With keyboard shortcuts button and mobile optimizations
// ============================================

import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Lightbulb, 
  AlertTriangle, 
  Settings,
  ArrowLeft,
  Shield,
  Keyboard
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  onOpenShortcuts?: () => void;
}

const navItems = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
  { title: 'Users', url: '/admin/users', icon: Users },
  { title: 'Feature Requests', url: '/admin/features', icon: Lightbulb },
  { title: 'Problem Reports', url: '/admin/problems', icon: AlertTriangle },
  { title: 'Settings', url: '/admin/settings', icon: Settings },
];

export function AdminSidebar({ onOpenShortcuts }: AdminSidebarProps) {
  const location = useLocation();
  const { state } = useSidebar();
  const { user, isLoading } = useAuth();
  const collapsed = state === 'collapsed';

  const isActive = (url: string) => {
    if (url === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(url);
  };

  const getInitials = () => {
    if (user?.display_name) {
      return user.display_name.slice(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'A';
  };

  return (
    <Sidebar className="sidebar-glass border-r-0">
      {/* Logo Header with Admin Badge */}
      <SidebarHeader className="px-5 py-6 border-b border-white/[0.06]">
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src="/lovable-uploads/25252925-5ec6-4d83-aa0a-70a6e27f7b9e.png" 
            alt="WhaamKabaam" 
            className="h-8 drop-shadow-[0_2px_8px_rgba(255,215,64,0.15)] transition-all duration-300 group-hover:drop-shadow-[0_2px_12px_rgba(255,215,64,0.25)]"
          />
        </Link>
        {/* Admin Badge */}
        {!collapsed && (
          <div className="mt-3 flex items-center gap-2 px-1">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Admin Panel
            </span>
          </div>
        )}
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent className="px-3 py-5 flex-1">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const active = isActive(item.url);
            return (
              <Link
                key={item.title}
                to={item.url}
                className={cn(
                  'sidebar-nav-item flex items-center gap-3 px-4 py-3.5 text-sm font-medium',
                  active 
                    ? 'sidebar-nav-item-active text-white' 
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <item.icon className={cn(
                  'h-5 w-5 flex-shrink-0 transition-all',
                  active 
                    ? 'text-secondary drop-shadow-[0_0_6px_rgba(255,215,64,0.5)]' 
                    : ''
                )} />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Back to Studio Section */}
        <div className="mt-6 pt-6 border-t border-white/[0.06]">
          <Link
            to="/studio"
            className={cn(
              'sidebar-nav-item flex items-center gap-3 px-4 py-3.5 text-sm font-medium',
              'text-muted-foreground hover:text-foreground'
            )}
          >
            <ArrowLeft className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Back to Studio</span>}
          </Link>
          {!collapsed && (
            <p className="text-xs text-muted-foreground/70 px-4 mt-1">
              Return to your dashboard
            </p>
          )}
        </div>

        {/* Keyboard Shortcuts Button */}
        {onOpenShortcuts && (
          <div className="mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenShortcuts}
              className={cn(
                'w-full justify-start gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-white/5',
                collapsed && 'justify-center px-2'
              )}
            >
              <Keyboard className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span className="text-sm">Shortcuts</span>}
              {!collapsed && (
                <kbd className="ml-auto text-xs bg-muted/30 px-1.5 py-0.5 rounded">?</kbd>
              )}
            </Button>
          </div>
        )}
      </SidebarContent>

      {/* Account Footer */}
      <SidebarFooter className="px-3 py-5 border-t border-white/[0.06]">
        {isLoading ? (
          <div className="sidebar-account-glass p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-11 w-11 rounded-full" />
              {!collapsed && (
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="sidebar-account-glass flex items-center gap-3 p-4">
            <Avatar className="h-11 w-11 border border-white/10 shadow-lg">
              <AvatarImage src={user?.avatar_url || undefined} alt={user?.display_name || 'Admin'} />
              <AvatarFallback className="bg-primary/20 text-primary text-sm font-semibold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate text-foreground">
                  {user?.display_name || 'Admin'}
                </p>
                <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                  {user?.email}
                </p>
              </div>
            )}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
