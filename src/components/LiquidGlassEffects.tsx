import { useEffect, useRef, useState } from 'react';

// SVG Liquid Distortion Filters
export const LiquidDistortionFilters = () => {
  return (
    <svg style={{ display: 'none', position: 'absolute' }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Subtle Liquid Distortion */}
        <filter id="liquid-distortion-subtle">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.008 0.02" 
            numOctaves="2" 
            result="noise" 
          />
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            scale="8" 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>

        {/* Medium Liquid Distortion */}
        <filter id="liquid-distortion-medium">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.01 0.04" 
            numOctaves="1" 
            result="turbulence" 
          />
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="turbulence" 
            scale="15" 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>

        {/* Strong Liquid Distortion */}
        <filter id="liquid-distortion-strong">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.012 0.06" 
            numOctaves="3" 
            result="noise" 
          />
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            scale="25" 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>

        {/* Interactive Liquid Distortion (changes with mouse) */}
        <filter id="liquid-distortion-interactive">
          <feTurbulence 
            id="interactive-turbulence"
            type="fractalNoise" 
            baseFrequency="0.01 0.04" 
            numOctaves="2" 
            result="turbulence" 
          />
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="turbulence" 
            scale="20" 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>

        {/* Glass Refraction Effect */}
        <filter id="glass-refraction">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur"/>
          <feOffset in="blur" dx="1" dy="1" result="offset"/>
          <feFlood flood-color="rgba(255,255,255,0.3)" result="white"/>
          <feComposite in="white" in2="offset" operator="in" result="highlight"/>
          <feComposite in="SourceGraphic" in2="highlight" operator="over"/>
        </filter>
      </defs>
    </svg>
  );
};

// Hook for interactive liquid effects
export const useLiquidInteraction = (intensity: 'subtle' | 'medium' | 'strong' = 'medium') => {
  const elementRef = useRef<HTMLElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const turbulenceElement = document.getElementById('interactive-turbulence');
    if (!turbulenceElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      // Adjust frequency based on mouse position and intensity
      const baseFreqX = 0.01 + (x * 0.02);
      const baseFreqY = 0.04 + (y * 0.04);
      
      const intensityMultiplier = {
        subtle: 0.5,
        medium: 1,
        strong: 1.5
      }[intensity];

      turbulenceElement.setAttribute(
        'baseFrequency', 
        `${baseFreqX * intensityMultiplier} ${baseFreqY * intensityMultiplier}`
      );
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
      element.style.filter = 'url(#liquid-distortion-interactive)';
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      element.style.filter = 'none';
      
      // Reset to base frequency
      turbulenceElement.setAttribute('baseFrequency', '0.01 0.04');
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return { elementRef, isHovering };
};

// Glass Button Component with Advanced Effects
interface LiquidGlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  interactive?: boolean;
  className?: string;
}

export const LiquidGlassButton: React.FC<LiquidGlassButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  interactive = false,
  className = ''
}) => {
  const { elementRef } = useLiquidInteraction('subtle');

  const baseClasses = `glass-btn glass-button glass-text-contrast fluid-animation ${
    interactive ? 'glass-liquid-interactive' : ''
  }`;

  const variantClasses = {
    primary: 'liquid-glow',
    secondary: 'liquid-glow-secondary', 
    accent: 'liquid-glow-accent'
  };

  return (
    <button
      ref={interactive ? elementRef as React.RefObject<HTMLButtonElement> : undefined}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Glass Card Component with Liquid Effects
interface LiquidGlassCardProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  interactive?: boolean;
  distortion?: 'none' | 'subtle' | 'medium' | 'strong';
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  variant = 'primary',
  interactive = false,
  distortion = 'none',
  className = '',
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const { elementRef } = useLiquidInteraction(distortion === 'none' ? 'subtle' : distortion);

  const baseClasses = `glass-card glass-text ${
    interactive ? 'glass-liquid-interactive' : ''
  } ${distortion !== 'none' ? 'glass-liquid' : ''} fluid-animation`;

  const variantClasses = {
    primary: 'glass-primary',
    secondary: 'glass-secondary',
    accent: 'glass-accent'
  };

  const distortionFilter = distortion !== 'none' && !interactive 
    ? { filter: `url(#liquid-distortion-${distortion})` } 
    : {};

  return (
    <div
      ref={interactive ? elementRef as React.RefObject<HTMLDivElement> : undefined}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={distortionFilter}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};