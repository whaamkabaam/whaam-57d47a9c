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
  glassVariant?: 'default' | 'nav';
  contentClassName?: string;
  className?: string;
}

export const LiquidGlassCard = React.forwardRef<HTMLDivElement, LiquidGlassCardProps>(
  ({ className = '', children, glassVariant = 'default', contentClassName, ...props }, forwardedRef) => {
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

    React.useLayoutEffect(() => {
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

    // Suppress transitions on first paint to prevent flash
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
      requestAnimationFrame(() => setMounted(true));
    }, []);

    // Smooth re-entry tween with retargetable animation
    const animFrame = React.useRef<number | null>(null);
    const animating = React.useRef(false);

    // persistent last-known values
    const lastShift = React.useRef({ x: 0, y: 0 });
    const lastMouse = React.useRef({ x: 0.5, y: 0.8 });

    // tween state
    const startMouse = React.useRef({ x: 0.5, y: 0.5 });
    const startShift = React.useRef({ x: 0, y: 0 });
    const targetMouse = React.useRef({ x: 0.5, y: 0.5 });
    const targetShift = React.useRef({ x: 0, y: 0 });
    const startTimeRef = React.useRef(0);
    const durationRef = React.useRef(160);

    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const setVars = (el: HTMLDivElement, mx: number, my: number, sx: number, sy: number) => {
      el.style.setProperty('--mx', String(mx));
      el.style.setProperty('--my', String(my));
      el.style.setProperty('--shiftX', `${sx}px`);
      el.style.setProperty('--shiftY', `${sy}px`);
      lastMouse.current = { x: mx, y: my };
      lastShift.current = { x: sx, y: sy };
    };

    const step = () => {
      const el = ref.current;
      if (!el) return;
      const now = performance.now();
      const t = Math.min((now - startTimeRef.current) / durationRef.current, 1);
      const m = ease(t);
      const mx = startMouse.current.x + (targetMouse.current.x - startMouse.current.x) * m;
      const my = startMouse.current.y + (targetMouse.current.y - startMouse.current.y) * m;
      const sx = startShift.current.x + (targetShift.current.x - startShift.current.x) * m;
      const sy = startShift.current.y + (targetShift.current.y - startShift.current.y) * m;

      setVars(el, mx, my, sx, sy);

      if (t < 1 && animating.current) {
        animFrame.current = requestAnimationFrame(step);
      } else {
        animating.current = false;
        animFrame.current = null;
      }
    };

    const startTween = () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
      startTimeRef.current = performance.now();
      animating.current = true;
      animFrame.current = requestAnimationFrame(step);
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

      // set tween endpoints and start from last known position
      startMouse.current = { ...lastMouse.current };
      startShift.current = { ...lastShift.current };
      targetMouse.current = { x, y };
      targetShift.current = { x: targetSx, y: targetSy };
      durationRef.current = 160;

      startTween();
    };

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;

      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;

      const dx = x - 0.5, dy = y - 0.5;
      const dist = Math.min(Math.hypot(dx, dy) * 2, 1); // 0 center → 1 edge
      const k = Math.pow(dist, 1.15);                   // curve the response
      const strength = 18;                               // try 16–22
      const sx = dx * strength * k;
      const sy = dy * strength * k;

      if (animating.current) {
        // retarget ongoing tween smoothly
        targetMouse.current = { x, y };
        targetShift.current = { x: sx, y: sy };
        return;
      }

      // immediate tracking when not animating
      setVars(el, x, y, sx, sy);
    };

    return (
      <div
        ref={ref}
        onMouseEnter={onEnter}
        onMouseMove={onMove}
        className={cn(
          glassVariant === 'nav' ? 'liquid-glass-nav' : 'liquid-glass',
          'rounded-[28px] p-6 md:p-8 overflow-hidden',
          !mounted && 'glass-no-transition',
          className
        )}
        {...props}
      >
        {/* refractive samplers */}
        <span aria-hidden className="liquid-refract" />
        {/* optional tiny prism sparkle */}
        <span aria-hidden className="liquid-refract liquid-refract--r" />
        <span aria-hidden className="liquid-refract liquid-refract--b" />

        {/* real content (only once) */}
        <div className={cn("relative z-10 flex flex-col flex-1", contentClassName)}>{children}</div>
      </div>
    );
  }
);
LiquidGlassCard.displayName = 'LiquidGlassCard';

// The button is also a pure CSS component.
export const LiquidGlassButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'accent' | 'none';
}>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variantClasses = {
      primary: 'liquid-glow',
      secondary: 'liquid-glow-secondary', 
      accent: 'liquid-glow-accent',
      none: '',
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