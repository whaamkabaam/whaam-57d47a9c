// ============================================
// AI Processing Modal
// Liquid glass aesthetic with spring physics
// Story-driven "generating your curve" experience
// ============================================

import { useState, useEffect, useRef, useMemo } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { Sparkles, Download, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIProcessingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isComplete: boolean;
  onDownload?: () => void;
  isDownloading?: boolean;
  iterationNumber?: number;
}

// Processing messages grouped by phase
const MESSAGE_POOLS = {
  analyzing: [
    "Reading your feedback...",
    "Analyzing your input...",
    "Processing sensitivity data...",
    "Understanding your preferences...",
  ],
  calculating: [
    "Calculating optimal response...",
    "Adjusting curve coefficients...",
    "Fine-tuning parameters...",
    "Optimizing inflection points...",
  ],
  generating: [
    "Building your new curve...",
    "Applying micro-adjustments...",
    "Refining transitions...",
    "Finalizing your curve...",
  ],
};

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateMessageSequence(): string[] {
  const analyzing = shuffleArray(MESSAGE_POOLS.analyzing).slice(0, 2);
  const calculating = shuffleArray(MESSAGE_POOLS.calculating).slice(0, 2);
  const generating = shuffleArray(MESSAGE_POOLS.generating).slice(0, 2);
  return [...analyzing, ...calculating, ...generating];
}

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function AIProcessingModal({
  open,
  onOpenChange,
  isComplete,
  onDownload,
  isDownloading,
  iterationNumber = 2,
}: AIProcessingModalProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Generate randomized messages on each open
  const messages = useMemo(() => {
    if (open) return generateMessageSequence();
    return [];
  }, [open]);
  
  // Randomized timing parameters
  const timingRef = useRef({
    messageInterval: randomInRange(800, 1200),
    holdAt: randomInRange(88, 94),
  });

  // Spring animation for progress bar
  const progressSpring = useSpring({
    progress: isComplete ? 100 : (showSuccess ? 100 : timingRef.current.holdAt),
    config: isComplete 
      ? { tension: 200, friction: 20 } // Quick snap to 100%
      : { tension: 30, friction: 26 }, // Slow, organic fill
  });

  // Spring animation for icon scale
  const iconSpring = useSpring({
    scale: showSuccess ? 1 : 0.8,
    opacity: showSuccess ? 1 : 0,
    config: { mass: 0.8, tension: 300, friction: 20 },
  });

  // Spring for sparkles (processing state)
  const sparklesSpring = useSpring({
    scale: showSuccess ? 0.5 : 1,
    opacity: showSuccess ? 0 : 1,
    config: { mass: 0.6, tension: 280, friction: 22 },
  });

  // Spring for success content reveal
  const contentSpring = useSpring({
    opacity: showSuccess ? 1 : 0,
    y: showSuccess ? 0 : 10,
    config: config.gentle,
    delay: showSuccess ? 200 : 0,
  });

  // Cycle through messages
  useEffect(() => {
    if (!open || isComplete) return;
    
    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        const next = prev + 1;
        timingRef.current.messageInterval = randomInRange(700, 1300);
        return next >= messages.length ? prev : next;
      });
    }, timingRef.current.messageInterval);

    return () => clearInterval(interval);
  }, [open, isComplete, messages.length]);

  // Handle completion transition
  useEffect(() => {
    if (isComplete && !showSuccess) {
      // Small delay before showing success state
      const timer = setTimeout(() => setShowSuccess(true), 150);
      return () => clearTimeout(timer);
    }
  }, [isComplete, showSuccess]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setMessageIndex(0);
      setShowSuccess(false);
      timingRef.current = {
        messageInterval: randomInRange(800, 1200),
        holdAt: randomInRange(88, 94),
      };
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-white/[0.08] bg-background/80 backdrop-blur-2xl shadow-2xl">
        <div className="flex flex-col items-center text-center py-8 relative">
          
          {/* Animated Icon Container */}
          <div className="relative w-20 h-20 mb-6">
            {/* Processing sparkles */}
            <animated.div
              style={{
                scale: sparklesSpring.scale,
                opacity: sparklesSpring.opacity,
                position: 'absolute',
                inset: 0,
              }}
              className="flex items-center justify-center"
            >
              <div className="w-full h-full rounded-full bg-white/[0.06] backdrop-blur-sm border border-white/[0.1] flex items-center justify-center">
                <Sparkles className="h-9 w-9 text-whaam-yellow animate-pulse" />
              </div>
            </animated.div>

            {/* Success checkmark */}
            <animated.div
              style={{
                scale: iconSpring.scale,
                opacity: iconSpring.opacity,
                position: 'absolute',
                inset: 0,
              }}
              className="flex items-center justify-center"
            >
              <div className="w-full h-full rounded-full bg-whaam-yellow/20 backdrop-blur-sm border border-whaam-yellow/30 flex items-center justify-center">
                <Check className="h-9 w-9 text-whaam-yellow" strokeWidth={2.5} />
              </div>
            </animated.div>
          </div>

          {/* Title */}
          <h3 className={cn(
            "font-bold mb-2 transition-colors duration-300",
            showSuccess ? "text-2xl text-whaam-yellow" : "text-xl text-foreground"
          )}>
            {showSuccess 
              ? `Curve v${iterationNumber} is ready!` 
              : `Generating v${iterationNumber}...`
            }
          </h3>

          {/* Cycling message or success message */}
          <p className="text-sm text-muted-foreground mb-6 h-5 transition-opacity duration-200">
            {showSuccess 
              ? "Your improved curve is waiting"
              : messages[messageIndex] || "Processing..."
            }
          </p>

          {/* Progress bar with spring physics */}
          <div className="w-full max-w-xs mb-6">
            <div className="h-2 rounded-full bg-white/[0.06] border border-white/[0.08] overflow-hidden">
              <animated.div 
                className="h-full rounded-full"
                style={{
                  width: progressSpring.progress.to(p => `${p}%`),
                  background: showSuccess 
                    ? 'linear-gradient(90deg, hsl(var(--whaam-yellow)), hsl(var(--whaam-yellow) / 0.8))'
                    : 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--whaam-yellow)))',
                  boxShadow: showSuccess
                    ? '0 0 20px hsl(var(--whaam-yellow) / 0.5)'
                    : '0 0 12px hsl(var(--primary) / 0.4)',
                }}
              />
            </div>
          </div>

          {/* Success Actions */}
          <animated.div 
            style={{
              opacity: contentSpring.opacity,
              transform: contentSpring.y.to(y => `translateY(${y}px)`),
            }}
            className={cn(
              "flex flex-col gap-3 w-full max-w-xs",
              !showSuccess && "pointer-events-none"
            )}
          >
            <LiquidGlassButton
              variant="accent"
              onClick={onDownload}
              disabled={isDownloading || !showSuccess}
              className="flex items-center justify-center gap-2 py-3 text-base font-semibold"
            >
              <Download className="h-5 w-5" />
              Download Your Curve
            </LiquidGlassButton>
            <button
              onClick={() => onOpenChange(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Close
            </button>
          </animated.div>

          {/* Subtle ambient glow when complete */}
          {showSuccess && (
            <div 
              className="absolute inset-0 -z-10 rounded-xl opacity-30 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 30%, hsl(var(--whaam-yellow) / 0.15), transparent 60%)',
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
