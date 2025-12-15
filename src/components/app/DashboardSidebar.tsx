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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavLink } from '@/components/NavLink';

const navItems = [
  { title: 'My Curve', url: '/app', icon: Crosshair },
  { title: 'Curve History', url: '/app/history', icon: History },
  { title: 'Account', url: '/app/account', icon: User },
];

export function DashboardSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

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
    </Sidebar>
  );
}
