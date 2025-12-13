// ============================================
// Dashboard Sidebar Component
// ============================================

import { Link, useLocation } from 'react-router-dom';
import { Home, Sliders, MessageSquare, CreditCard, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavLink } from '@/components/NavLink';

const navItems = [
  { title: 'Dashboard', url: '/app', icon: Home },
  { title: 'My Curves', url: '/app/curves', icon: Sliders },
  { title: 'Feedback', url: '/app/feedback', icon: MessageSquare },
  { title: 'Subscription', url: '/app/subscription', icon: CreditCard },
  { title: 'Settings', url: '/app/settings', icon: Settings },
];

export function DashboardSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch {
      toast.error('Failed to log out');
    }
  };

  const isActive = (url: string) => {
    if (url === '/app') {
      return location.pathname === '/app';
    }
    return location.pathname.startsWith(url);
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

      <SidebarFooter className="p-4 border-t border-border/40">
        <div className="flex flex-col gap-3">
          {!collapsed && user && (
            <div className="px-3 py-2">
              <p className="text-sm font-medium truncate">{user.display_name || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors w-full"
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
