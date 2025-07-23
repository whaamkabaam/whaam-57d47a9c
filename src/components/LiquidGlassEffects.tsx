import React from 'react';

// SVG Liquid Distortion Filters with built-in animation
export const LiquidDistortionFilters = () => {
  return (
    <svg style={{ display: 'none', position: 'absolute' }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="liquid-distortion-subtle">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.005 0.01" 
            numOctaves="1" 
            result="noise"
          >
            <animate attributeName="baseFrequency" dur="15s" values="0.005 0.01;0.006 0.015;0.005 0.01" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
        </filter>
        <filter id="liquid-distortion-medium">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.01 0.02" 
            numOctaves="2" 
            result="noise"
          >
             <animate attributeName="baseFrequency" dur="20s" values="0.01 0.02;0.02 0.03;0.01 0.02" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" />
        </filter>
      </defs>
    </svg>
  );
};

// Simplified Glass Button Component
interface LiquidGlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  interactive?: boolean;
}

export const LiquidGlassButton = React.forwardRef<HTMLButtonElement, LiquidGlassButtonProps>(
  ({ children, variant = 'primary', interactive = false, className = '', ...props }, ref) => {
    const baseClasses = `glass-btn glass-button glass-text-contrast fluid-animation ${interactive ? 'glass-liquid-interactive' : ''}`;
    const variantClasses = {
      primary: 'liquid-glow',
      secondary: 'liquid-glow-secondary', 
      accent: 'liquid-glow-accent'
    };

    return (
      <button ref={ref} className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  }
);
LiquidGlassButton.displayName = 'LiquidGlassButton';

// Simplified Glass Card Component
interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  interactive?: boolean;
  distortion?: 'none' | 'subtle' | 'medium';
}

export const LiquidGlassCard = React.forwardRef<HTMLDivElement, LiquidGlassCardProps>(
  ({ children, variant = 'primary', interactive = false, distortion = 'none', className = '', ...props }, ref) => {
    const baseClasses = `glass-card glass-text ${interactive ? 'glass-liquid-interactive' : ''} fluid-animation`;
    const variantClasses = {
      primary: 'glass-primary',
      secondary: 'glass-secondary',
      accent: 'glass-accent'
    };
    const distortionClass = {
        subtle: 'filter-liquid-subtle',
        medium: 'group-hover:filter-liquid-medium',
        none: ''
    }[distortion]

    return (
      <div ref={ref} className={`${baseClasses} ${variantClasses[variant]} ${distortionClass} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);
LiquidGlassCard.displayName = 'LiquidGlassCard';