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
      window.addEventListener('scroll', onScroll, { passive: true } as any);
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('scroll', onScroll as any);
        window.removeEventListener('resize', onResize);
      };
    }, []);

    // Smooth re-entry tween
    const animFrame = React.useRef<number | null>(null);
    const animating = React.useRef(false);
    const lastShift = React.useRef({ x: 0, y: 0 });
    const lastMouse = React.useRef({ x: 0.5, y: 0.5 });

    const stopAnim = () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
      animFrame.current = null;
      animating.current = false;
    };

    const setVars = (el: HTMLDivElement, mx: number, my: number, sx: number, sy: number) => {
      el.style.setProperty('--mx', String(mx));
      el.style.setProperty('--my', String(my));
      el.style.setProperty('--shiftX', `${sx}px`);
      el.style.setProperty('--shiftY', `${sy}px`);
      lastMouse.current = { x: mx, y: my };
      lastShift.current = { x: sx, y: sy };
    };

    const onEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;

      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;

      const dx = x - 0.5, dy = y - 0.5;
      const dist = Math.min(Math.hypot(dx, dy) * 2, 1);
      const k = Math.pow(dist, 1.15);
      const strength = 18;
      const targetSx = dx * strength * k;
      const targetSy = dy * strength * k;

      const startMx = lastMouse.current.x;
      const startMy = lastMouse.current.y;
      const startSx = lastShift.current.x;
      const startSy = lastShift.current.y;

      const duration = 140;
      const startTime = performance.now();
      animating.current = true;
      stopAnim();

      const ease = (t: number) => 1 - Math.pow(1 - t, 3);

      const step = (now: number) => {
        const t = Math.min((now - startTime) / duration, 1);
        const m = ease(t);
        const mx = startMx + (x - startMx) * m;
        const my = startMy + (y - startMy) * m;
        const sx = startSx + (targetSx - startSx) * m;
        const sy = startSy + (targetSy - startSy) * m;

        setVars(el, mx, my, sx, sy);

        if (t < 1 && animating.current) {
          animFrame.current = requestAnimationFrame(step);
        } else {
          animating.current = false;
          animFrame.current = null;
        }
      };

      animFrame.current = requestAnimationFrame(step);
    };

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      // abort entry animation for immediate tracking
      stopAnim();
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;

      // Edge-weighted strength (near center -> weaker, near edge -> stronger)
      const dx = x - 0.5, dy = y - 0.5;
      const dist = Math.min(Math.hypot(dx, dy) * 2, 1); // 0 center → 1 edge
      const k = Math.pow(dist, 1.15);                   // curve the response
      const strength = 18;                               // try 16–22
      const sx = dx * strength * k;
      const sy = dy * strength * k;
      setVars(el, x, y, sx, sy);
    };

    return (
      <div
        ref={ref}
        onMouseEnter={onEnter}
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