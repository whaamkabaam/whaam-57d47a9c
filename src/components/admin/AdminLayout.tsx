// ============================================
// Admin Layout Component
// With keyboard shortcuts and mobile responsiveness
// ============================================

import { useState, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from './AdminSidebar';
import { KeyboardShortcutsModal } from './KeyboardShortcutsModal';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export function AdminLayout() {
  const navigate = useNavigate();
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  // Keyboard shortcuts
  useKeyboardShortcuts([
    { key: 'g d', action: () => navigate('/admin'), description: 'Go to Dashboard' },
    { key: 'g u', action: () => navigate('/admin/users'), description: 'Go to Users' },
    { key: 'g f', action: () => navigate('/admin/features'), description: 'Go to Feature Requests' },
    { key: 'g p', action: () => navigate('/admin/problems'), description: 'Go to Problem Reports' },
    { key: 'g s', action: () => navigate('/admin/settings'), description: 'Go to Settings' },
    { key: '?', action: () => setShortcutsOpen(true), description: 'Show shortcuts' },
    { key: 'Escape', action: () => setShortcutsOpen(false), description: 'Close modal', allowInInput: true },
    { 
      key: '/', 
      action: () => {
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }, 
      description: 'Focus search' 
    },
  ]);

  const handleOpenShortcuts = useCallback(() => {
    setShortcutsOpen(true);
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative">
        <AdminSidebar onOpenShortcuts={handleOpenShortcuts} />
        <SidebarInset className="flex-1 relative z-10 bg-transparent">
          {/* Mobile-optimized padding */}
          <div className="flex-1 p-4 md:p-6 bg-transparent flex items-center justify-center">
            <div className="w-full max-w-6xl">
              <Outlet />
            </div>
          </div>
        </SidebarInset>
      </div>
      
      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal 
        open={shortcutsOpen} 
        onOpenChange={setShortcutsOpen} 
      />
    </SidebarProvider>
  );
}
