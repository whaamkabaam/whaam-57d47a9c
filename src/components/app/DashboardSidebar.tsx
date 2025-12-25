// ============================================
// Dashboard Sidebar Component - Liquid Glass Design
// ============================================

import { Link, useLocation } from 'react-router-dom';
import { Home, Library, Upload } from 'lucide-react';
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
import { CurveUploadDialog } from './curves/CurveUploadDialog';
import { Settings } from 'lucide-react';

const navItems = [
  { title: 'My Curve', url: '/studio', icon: Home },
  { title: 'My Library', url: '/studio/history', icon: Library },
];

export function DashboardSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const { user, isLoading } = useAuth();
  const collapsed = state === 'collapsed';

  const isActive = (url: string) => {
    if (url === '/studio') {
      return location.pathname === '/studio';
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
      <SidebarHeader className="px-5 py-6 border-b border-white/[0.06]">
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src="/lovable-uploads/25252925-5ec6-4d83-aa0a-70a6e27f7b9e.png" 
            alt="WhaamKabaam" 
            className="h-8 drop-shadow-[0_2px_8px_rgba(255,215,64,0.15)] transition-all duration-300 group-hover:drop-shadow-[0_2px_12px_rgba(255,215,64,0.25)]"
          />
        </Link>
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

        {/* Upload Section */}
        <div className="mt-6 pt-6 border-t border-white/[0.06]">
          <CurveUploadDialog>
            <button
              className={cn(
                'sidebar-nav-item flex items-center gap-3 px-4 py-3.5 w-full text-sm font-medium',
                'text-muted-foreground hover:text-foreground'
              )}
            >
              <Upload className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>Upload Curve</span>}
            </button>
          </CurveUploadDialog>
          {!collapsed && (
            <p className="text-xs text-muted-foreground/70 px-4 mt-1">
              Replace your current curve
            </p>
          )}
        </div>
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
          <Link
            to="/studio/account"
            className={cn(
              'sidebar-account-glass flex items-center gap-3 p-4',
              isActive('/studio/account') 
                ? 'ring-1 ring-secondary/40 bg-white/[0.08]' 
                : ''
            )}
          >
            <Avatar className="h-11 w-11 border border-white/10 shadow-lg">
              <AvatarImage src={user?.avatar_url || undefined} alt={user?.display_name || 'User'} />
              <AvatarFallback className="bg-secondary/20 text-secondary text-sm font-semibold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate text-foreground">
                  {user?.display_name || 'Account'}
                </p>
                <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                  {user?.email}
                </p>
              </div>
            )}
            {!collapsed && (
              <Settings className="h-4 w-4 text-muted-foreground/70 flex-shrink-0 transition-colors group-hover:text-foreground" />
            )}
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
