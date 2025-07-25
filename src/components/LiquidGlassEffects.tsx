// src/components/LiquidGlassEffects.tsx

import React from 'react';
import { cn } from "@/lib/utils";

// This component is no longer needed but kept for compatibility.
export const LiquidDistortionFilters = () => null;

// The card is now a pure CSS component.
interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

export const LiquidGlassCard = React.forwardRef<HTMLDivElement, LiquidGlassCardProps>(
  ({ children, variant = 'primary', className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={cn("glass-card", `glass-${variant}`, className)} {...props}>
        <div className="glass-text relative z-10">{children}</div>
      </div>
    );
  }
);
LiquidGlassCard.displayName = 'LiquidGlassCard';

// The button is also a pure CSS component.
export const LiquidGlassButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'accent';
}>(
  ({ className, variant = 'primary', ...props }, ref) => {
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