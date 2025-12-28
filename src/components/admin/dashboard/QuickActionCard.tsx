// ============================================
// Admin Dashboard Quick Action Card
// ============================================

import { Link } from 'react-router-dom';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Badge } from '@/components/ui/badge';

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  badge?: string;
}

export function QuickActionCard({ icon: Icon, title, description, to, badge }: QuickActionCardProps) {
  return (
    <Link to={to} className="block group">
      <LiquidGlassCard 
        variant="secondary" 
        className="p-5 transition-all duration-200 group-hover:ring-1 group-hover:ring-secondary/30"
      >
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-secondary/10 p-3 shrink-0">
            <Icon className="h-5 w-5 text-secondary drop-shadow-[0_0_6px_rgba(255,215,64,0.5)]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{title}</h3>
              {badge && (
                <Badge variant="secondary" className="text-xs">
                  {badge}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">{description}</p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-secondary shrink-0" />
        </div>
      </LiquidGlassCard>
    </Link>
  );
}
