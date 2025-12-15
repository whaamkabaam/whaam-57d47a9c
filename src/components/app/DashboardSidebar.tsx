// ============================================
// Dashboard Sidebar Component - Simplified Navigation
// ============================================

import { Link, useLocation } from 'react-router-dom';
import { Crosshair, History, User } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

const navItems = [
  { title: 'My Curve', url: '/app', icon: Crosshair },
  { title: 'Curve History', url: '/app/history', icon: History },
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
    <Sidebar className="border-r border-border/40 bg-background/60 backdrop-blur-xl">
      <SidebarHeader className="p-4 border-b border-border/40">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/25252925-5ec6-4d83-aa0a-70a6e27f7b9e.png" 
            alt="WhaamKabaam" 
            className="h-8"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <NavLink 
                      to={item.url} 
                      end={item.url === '/app'}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-muted/50"
                      activeClassName="bg-primary/10 text-primary"
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Account section at bottom */}
      <SidebarFooter className="border-t border-border/40 p-3">
        {isLoading ? (
          <div className="flex items-center gap-3 px-2 py-2">
            <Skeleton className="h-9 w-9 rounded-full" />
            {!collapsed && (
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/app/account"
            className={`flex items-center gap-3 px-2 py-2 rounded-lg transition-colors hover:bg-muted/50 ${
              isActive('/app/account') ? 'bg-primary/10 text-primary' : ''
            }`}
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src={user?.avatar_url || undefined} alt={user?.display_name || 'User'} />
              <AvatarFallback className="bg-primary/20 text-primary text-sm font-medium">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.display_name || 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            )}
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
