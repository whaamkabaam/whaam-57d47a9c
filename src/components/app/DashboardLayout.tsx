// ============================================
// Dashboard Layout Component
// ============================================

import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from './DashboardSidebar';

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative">
        <DashboardSidebar />
        <SidebarInset className="flex-1 relative z-10 bg-transparent">
          <div className="flex-1 p-6 pt-8 bg-transparent">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
