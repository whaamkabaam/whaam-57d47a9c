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
  ({ className = '', children, ...props }, forwardedRef) => {
    const ref = React.useRef<HTMLDivElement>(null);

    // merge refs
    React.useEffect(() => {
      if (typeof forwardedRef === 'function') forwardedRef(ref.current!);
      else if (forwardedRef) (forwardedRef as any).current = ref.current;
    }, [forwardedRef]);

    // align sampling to card’s absolute position
    const updateBgAnchors = () => {
      const el = ref.current;
      if (!el) return;

      const stage = el.closest<HTMLElement>(".glass-stage") || document.body;
      const sr = stage.getBoundingClientRect();
      const er = el.getBoundingClientRect();

      // Card position inside the stage (works with or without fixed backgrounds)
      const localLeft = er.left - sr.left + window.scrollX;
      const localTop  = er.top  - sr.top  + window.scrollY;

      // Read stage background position (px); fall back to 0
      const cs = getComputedStyle(stage as Element);
      const px = parseFloat((cs as any).backgroundPositionX) || 0;
      const py = parseFloat((cs as any).backgroundPositionY) || 0;

      const bx = -(localLeft - px);
      const by = -(localTop  - py);

      el.style.setProperty('--bx', `${bx}px`);
      el.style.setProperty('--by', `${by}px`);
    };

    React.useEffect(() => {
      updateBgAnchors();
      const h = () => updateBgAnchors();
      window.addEventListener('scroll', h, { passive: true } as any);
      window.addEventListener('resize', h);
      return () => {
        window.removeEventListener('scroll', h as any);
        window.removeEventListener('resize', h);
      };
    }, []);

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', `${x}`);
      el.style.setProperty('--my', `${y}`);

      // Edge-weighted strength (near center -> weaker, near edge -> stronger)
      const dx = x - 0.5, dy = y - 0.5;
      const dist = Math.min(Math.hypot(dx, dy) * 2, 1); // 0 center → 1 edge
      const k = Math.pow(dist, 1.25);                   // stronger edge weighting
      const strength = 22;                               // desktop 20–24, mobile 14–18
      el.style.setProperty('--shiftX', `${dx * strength * k}px`);
      el.style.setProperty('--shiftY', `${dy * strength * k}px`);
    };

    return (
      <div
        ref={ref}
        onMouseMove={onMove}
        className={cn('liquid-glass rounded-[28px] p-6 md:p-8 overflow-hidden', className)}
        {...props}
      >
        {/* refractive samplers */}
        <span aria-hidden className="liquid-refract" />
        {/* optional tiny prism sparkle */}
        <span aria-hidden className="liquid-refract liquid-refract--r" />
        <span aria-hidden className="liquid-refract liquid-refract--b" />

        {/* real content (only once) */}
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