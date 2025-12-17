// ============================================
// Dashboard Sidebar Component - Liquid Glass Design
// ============================================

import { Link, useLocation } from 'react-router-dom';
import { Home, Clock, Settings } from 'lucide-react';
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
import { cn } from '@/lib/utils';

const navItems = [
  { title: 'My Curve', url: '/app', icon: Home },
  { title: 'History', url: '/app/history', icon: Clock },
];

export function DashboardSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const { user, isLoading } = useAuth();
  const collapsed = state === 'collapsed';

  const isActive = (url: string) => {
    if (url === '/app') {
      return location.pathname === '/app';
    }
    return location.pathname.startsWith(url);
  };

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (user?.display_name) {
      return user.display_name.slice(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
    <Sidebar className="sidebar-glass border-r-0">
      {/* Logo Header */}
      <SidebarHeader className="px-4 py-5 border-b border-border/10">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/25252925-5ec6-4d83-aa0a-70a6e27f7b9e.png" 
            alt="WhaamKabaam" 
            className="h-7"
          />
        </Link>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent className="px-3 py-4">
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const active = isActive(item.url);
            return (
              <Link
                key={item.title}
                to={item.url}
                className={cn(
                  'sidebar-nav-item flex items-center gap-3 px-3 py-3 text-sm font-medium',
                  active 
                    ? 'sidebar-nav-item-active text-secondary' 
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <item.icon className={cn(
                  'h-5 w-5 flex-shrink-0',
                  active ? 'text-secondary' : ''
                )} />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>
      </SidebarContent>

      {/* Account Footer */}
      <SidebarFooter className="px-3 py-4 mt-auto">
        {isLoading ? (
          <div className="sidebar-account-glass p-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              {!collapsed && (
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-20" />
                  <Skeleton className="h-3 w-28" />
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link
            to="/app/account"
            className={cn(
              'sidebar-account-glass flex items-center gap-3 p-3 transition-all',
              isActive('/app/account') 
                ? 'ring-1 ring-secondary/30' 
                : 'hover:bg-muted/20'
            )}
          >
            <Avatar className="h-10 w-10 border border-border/20">
              <AvatarImage src={user?.avatar_url || undefined} alt={user?.display_name || 'User'} />
              <AvatarFallback className="bg-secondary/20 text-secondary text-sm font-medium">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-foreground">
                  {user?.display_name || 'Account'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            )}
            {!collapsed && (
              <Settings className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            )}
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
