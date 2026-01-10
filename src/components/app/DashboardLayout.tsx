// ============================================
// Dashboard Layout Component
// ============================================

import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from './DashboardSidebar';
import { ProblemReportButton } from './ProblemReportButton';
import { SubscriptionBanner } from './SubscriptionBanner';

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative">
        <DashboardSidebar />
        <SidebarInset className="flex-1 relative z-10 bg-transparent">
          <div className="flex-1 p-6 bg-transparent flex items-center justify-center">
            <div className="w-full max-w-6xl">
              <SubscriptionBanner />
              <Outlet />
            </div>
          </div>
        </SidebarInset>
        <ProblemReportButton />
      </div>
    </SidebarProvider>
  );
}
