// ============================================
// Dashboard Layout Component
// ============================================

import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from './DashboardSidebar';
import InteractiveBackground from '@/components/InteractiveBackground';

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative">
        {/* Interactive yellow dot background */}
        <InteractiveBackground />
        <div className="site-overlay" />
        
        <DashboardSidebar />
        <SidebarInset className="flex-1 relative z-10">
          <header className="h-14 flex items-center gap-4 border-b border-border/40 px-4 bg-background/60 backdrop-blur-xl">
            <SidebarTrigger className="-ml-1" />
          </header>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
