// ============================================
// Dashboard Layout Component
// ============================================

import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from './DashboardSidebar';

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative">
        <DashboardSidebar />
        <SidebarInset className="flex-1 relative z-10 bg-transparent">
          <header className="h-14 flex items-center gap-4 border-b border-border/40 px-4 bg-background/10 backdrop-blur-md">
            <SidebarTrigger className="-ml-1" />
          </header>
          <main className="flex-1 p-6 bg-transparent">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
