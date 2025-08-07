// src/components/LiquidGlassEffects.tsx

import React from 'react';
import { cn } from "@/lib/utils";
import LiquidEdgeFX from "@/components/LiquidEdgeFX";

// SVG filter for liquid distortion effect
export const LiquidDistortionFilters = () => (
  <svg style={{ display: 'none' }}>
    <filter id="liquid-distortion-filter">
      <feTurbulence 
        type="fractalNoise" 
        baseFrequency="0.015 0.035" 
        numOctaves="1" 
        result="turbulence" />
      <feDisplacementMap 
        in="SourceGraphic" 
        in2="turbulence" 
        scale="25" 
        xChannelSelector="R" 
        yChannelSelector="G" />
    </filter>
  </svg>
);

// The card is now a pure CSS component.
interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

export const LiquidGlassCard = React.forwardRef<HTMLDivElement, LiquidGlassCardProps>(
  ({ children, variant = 'primary', className = '', ...props }, ref) => {
    return (
      // This is the main container for positioning
      <div
        ref={ref}
        className={cn('glass-container', className)}
        {...props}
      >
        {/* This layer is ONLY for the visual effect */}
        <div className={cn('glass-effect-layer', `glass-${variant}`)}>
          <div className="webgl-canvas-container pointer-events-none">
            <LiquidEdgeFX />
          </div>
        </div>

        {/* This layer is ONLY for the content */}
        <div className="glass-content-layer">
          {children}
        </div>
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