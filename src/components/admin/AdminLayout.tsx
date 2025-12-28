// ============================================
// Admin Layout Component
// ============================================

import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from './AdminSidebar';

export function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative">
        <AdminSidebar />
        <SidebarInset className="flex-1 relative z-10 bg-transparent">
          <div className="flex-1 p-6 bg-transparent flex items-center justify-center">
            <div className="w-full max-w-6xl">
              <Outlet />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
