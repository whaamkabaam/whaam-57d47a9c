// src/components/LiquidGlassEffects.tsx

import React from 'react';
import { cn } from '@/lib/utils';

// Simplified Glass Card Component (CSS-only)
interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  interactive?: boolean;
  distortion?: 'none' | 'subtle' | 'medium';
  className?: string;
}

export const LiquidGlassCard = React.forwardRef<HTMLDivElement, LiquidGlassCardProps>(
  ({ children, variant = 'primary', interactive = false, distortion = 'none', className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={cn("glass-card", `glass-${variant}`, className)} {...props}>
        <div className="glass-text relative z-10">{children}</div>
      </div>
    );
  }
);
LiquidGlassCard.displayName = 'LiquidGlassCard';

// Simplified Glass Button Component (CSS-only)
export const LiquidGlassButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'accent';
  interactive?: boolean;
}>(
  ({ className, variant = 'primary', interactive = false, ...props }, ref) => {
    const variantClasses = {
      primary: 'liquid-glow',
      secondary: 'liquid-glow-secondary', 
      accent: 'liquid-glow-accent'
    };
    
    return (
      <button 
        ref={ref} 
        className={cn("glass-btn glass-button glass-text-contrast fluid-animation", variantClasses[variant], className)} 
        {...props}
      />
    );
  }
);
LiquidGlassButton.displayName = 'LiquidGlassButton';

// No longer needed - kept for compatibility
export const LiquidDistortionFilters = () => <></>;