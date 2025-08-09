// src/components/LiquidGlassEffects.tsx

import React from 'react';
import { cn } from "@/lib/utils";

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
  ({ children, variant = 'primary', className = '', ...props }, forwardedRef) => {
    const internalRef = React.useRef<HTMLDivElement>(null);

    const setRefs = (node: HTMLDivElement) => {
      internalRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    // Align background sampling to the card's position (for refractive layer)
    const updateBgAnchors = () => {
      const el = internalRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const bx = -(r.left + window.scrollX);
      const by = -(r.top + window.scrollY);
      el.style.setProperty('--bx', `${bx}px`);
      el.style.setProperty('--by', `${by}px`);
    };

    React.useEffect(() => {
      updateBgAnchors();
      const onScroll = () => updateBgAnchors();
      const onResize = () => updateBgAnchors();
      window.addEventListener('scroll', onScroll);
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
      };
    }, []);

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const el = internalRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', x.toString());
      el.style.setProperty('--my', y.toString());
      // refractive offset strength
      el.style.setProperty('--shiftX', `${(x - 0.5) * 12}px`);
      el.style.setProperty('--shiftY', `${(y - 0.5) * 12}px`);
    };

    return (
      <div
        ref={setRefs}
        onMouseMove={onMouseMove}
        className={cn('liquid-glass rounded-[28px] p-6 md:p-8 overflow-hidden', className)}
        {...props}
      >
        {/* refractive background sampler */}
        <span aria-hidden className="liquid-refract" />
        {/* content above effects */}
        <div className="relative z-10">{children}</div>
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