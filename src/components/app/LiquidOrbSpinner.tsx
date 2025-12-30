import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LiquidOrbSpinnerProps {
  progress?: number; // 0-100, affects color interpolation
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-20 h-20',
};

const iconSizes = {
  sm: 'h-5 w-5',
  md: 'h-7 w-7',
  lg: 'h-9 w-9',
};

const orbitRadii = {
  sm: '18px',
  md: '24px',
  lg: '28px',
};

export function LiquidOrbSpinner({ 
  progress = 0, 
  size = 'lg',
  className 
}: LiquidOrbSpinnerProps) {
  // Interpolate color from primary (red) to secondary (gold) based on progress
  const progressRatio = Math.min(progress / 100, 1);
  
  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Outer rotating conic gradient rim */}
      <div 
        className="absolute inset-0 rounded-full animate-liquid-rotate"
        style={{
          background: `conic-gradient(
            from 0deg,
            hsl(var(--primary) / ${0.1 + progressRatio * 0.2}) 0deg,
            hsl(var(--secondary) / ${0.4 + progressRatio * 0.3}) 90deg,
            hsl(var(--primary) / ${0.1 + progressRatio * 0.2}) 180deg,
            hsl(var(--secondary) / ${0.4 + progressRatio * 0.3}) 270deg,
            hsl(var(--primary) / ${0.1 + progressRatio * 0.2}) 360deg
          )`,
          padding: '2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Inner breathing glow */}
      <div 
        className="absolute inset-[3px] rounded-full animate-spinner-breathe"
        style={{
          background: `radial-gradient(
            circle at 50% 50%,
            hsl(var(--secondary) / ${0.15 + progressRatio * 0.15}) 0%,
            hsl(var(--primary) / ${0.08 + progressRatio * 0.08}) 50%,
            transparent 70%
          )`,
        }}
      />

      {/* Glass orb base */}
      <div className="absolute inset-[2px] rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.08]" />

      {/* Orbiting caustic highlights */}
      <div 
        className="absolute inset-0 animate-caustic-orbit"
        style={{ '--orbit-radius': orbitRadii[size] } as React.CSSProperties}
      >
        <div 
          className="absolute w-1.5 h-1.5 rounded-full left-1/2 top-1/2 -ml-[3px] -mt-[3px]"
          style={{
            background: `radial-gradient(circle, hsl(var(--secondary)) 0%, transparent 70%)`,
            boxShadow: `0 0 8px 2px hsl(var(--secondary) / 0.6)`,
            transform: `translateX(var(--orbit-radius))`,
          }}
        />
      </div>
      
      <div 
        className="absolute inset-0 animate-caustic-orbit-reverse"
        style={{ '--orbit-radius': orbitRadii[size] } as React.CSSProperties}
      >
        <div 
          className="absolute w-1 h-1 rounded-full left-1/2 top-1/2 -ml-[2px] -mt-[2px]"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)`,
            boxShadow: `0 0 6px 1px hsl(var(--primary) / 0.5)`,
            transform: `translateX(var(--orbit-radius))`,
          }}
        />
      </div>

      {/* Third caustic - slower, offset */}
      <div 
        className="absolute inset-0 animate-caustic-orbit-slow"
        style={{ '--orbit-radius': orbitRadii[size] } as React.CSSProperties}
      >
        <div 
          className="absolute w-1 h-1 rounded-full left-1/2 top-1/2 -ml-[2px] -mt-[2px]"
          style={{
            background: `radial-gradient(circle, hsl(var(--secondary) / 0.8) 0%, transparent 70%)`,
            boxShadow: `0 0 4px 1px hsl(var(--secondary) / 0.4)`,
            transform: `translateX(calc(var(--orbit-radius) * 0.7))`,
          }}
        />
      </div>

      {/* Center icon - static */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Sparkles 
          className={cn(
            iconSizes[size],
            "text-whaam-yellow/80"
          )} 
        />
      </div>
    </div>
  );
}
