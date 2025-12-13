// ============================================
// Dashboard Page - Placeholder
// ============================================

import { useAuth } from '@/contexts/AuthContext';
import { LiquidGlassCard, LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { toast } from 'sonner';

export default function Dashboard() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch {
      toast.error('Failed to log out');
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <img 
              src="/lovable-uploads/25252925-5ec6-4d83-aa0a-70a6e27f7b9e.png" 
              alt="WhaamKabaam" 
              className="h-10"
            />
          </Link>
          <LiquidGlassButton
            onClick={handleLogout}
            variant="secondary"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </LiquidGlassButton>
        </div>

        {/* Welcome Card */}
        <LiquidGlassCard className="mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              {user?.avatar_url ? (
                <img 
                  src={user.avatar_url} 
                  alt={user.display_name || 'Avatar'} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="h-8 w-8 text-primary" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold glass-text">
                Welcome{user?.display_name ? `, ${user.display_name}` : ''}!
              </h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </LiquidGlassCard>

        {/* Placeholder Content */}
        <LiquidGlassCard>
          <h2 className="text-xl font-semibold glass-text mb-4">Your Dashboard</h2>
          <p className="text-muted-foreground">
            This is a placeholder dashboard. Your custom curves and settings will appear here once the full dashboard UI is implemented.
          </p>
        </LiquidGlassCard>
      </div>
    </div>
  );
}
