// ============================================
// Dashboard Home Page - Placeholder
// ============================================

import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { useAuth } from '@/contexts/AuthContext';
import { User } from 'lucide-react';

export default function DashboardHome() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <LiquidGlassCard variant="secondary" className="p-6">
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
            <h1 className="text-2xl font-bold">
              Welcome{user?.display_name ? `, ${user.display_name}` : ''}!
            </h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </LiquidGlassCard>

      {/* Overview Placeholder */}
      <LiquidGlassCard variant="secondary" className="p-6">
        <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
        <p className="text-muted-foreground">
          Your dashboard overview and quick stats will appear here.
        </p>
      </LiquidGlassCard>
    </div>
  );
}
