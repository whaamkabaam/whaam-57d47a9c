// ============================================
// AI Processing Modal
// Liquid glass aesthetic with spring physics
// Story-driven "generating your curve" experience
// ============================================

import { useState, useEffect, useRef, useMemo } from 'react';
import { useSpring, animated, config } from 'react-spring';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { Download, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LiquidOrbSpinner } from './LiquidOrbSpinner';

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

// Progress phases with timing (total ~3.5s)
const PROGRESS_PHASES = [
  { duration: 1200, startProgress: 0, endProgress: 35 },   // Analyzing
  { duration: 1200, startProgress: 35, endProgress: 65 },  // Calculating
  { duration: 1100, startProgress: 65, endProgress: 92 },  // Generating (slows down at end)
];

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
  const [progress, setProgress] = useState(0);
  
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

  // Phased progress animation
  useEffect(() => {
    if (!open || isComplete) return;
    
    // Reset progress when opening
    setProgress(0);
    
    const startTime = Date.now();
    const totalDuration = PROGRESS_PHASES.reduce((sum, phase) => sum + phase.duration, 0);
    const finalHoldAt = timingRef.current.holdAt;
    
    const animationFrame = () => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed >= totalDuration) {
        // Hold at the final position (88-94%)
        setProgress(finalHoldAt);
        return;
      }
      
      // Find current phase
      let accumulatedTime = 0;
      for (const phase of PROGRESS_PHASES) {
        if (elapsed < accumulatedTime + phase.duration) {
          // Calculate progress within this phase
          const phaseElapsed = elapsed - accumulatedTime;
          const phaseProgress = phaseElapsed / phase.duration;
          
          // Use easeOutCubic for smooth deceleration within each phase
          const eased = 1 - Math.pow(1 - phaseProgress, 3);
          
          // For the last phase, adjust endpoint to finalHoldAt
          const endProgress = phase.endProgress === 92 ? finalHoldAt : phase.endProgress;
          const currentProgress = phase.startProgress + (endProgress - phase.startProgress) * eased;
          
          setProgress(currentProgress);
          break;
        }
        accumulatedTime += phase.duration;
      }
    };
    
    // Run animation at 60fps
    const interval = setInterval(animationFrame, 16);
    animationFrame(); // Run immediately
    
    return () => clearInterval(interval);
  }, [open, isComplete]);

  // Snap to 100% on completion
  useEffect(() => {
    if (isComplete) {
      setProgress(100);
    }
  }, [isComplete]);

  // Spring animation for progress bar (follows the state-driven progress)
  const progressSpring = useSpring({
    progress: progress,
    config: isComplete 
      ? { tension: 200, friction: 20 } // Quick snap to 100%
      : { tension: 180, friction: 24 }, // Smooth following
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

  // Spring animation for success content reveal
  const contentSpring = useSpring({
    opacity: showSuccess ? 1 : 0,
    y: showSuccess ? 0 : 10,
    config: config.gentle,
    delay: showSuccess ? 200 : 0,
  });

  // Spring for modal size animation (smaller during loading, expands when ready)
  const sizeSpring = useSpring({
    maxWidth: showSuccess ? 420 : 320,
    paddingY: showSuccess ? 40 : 28,
    config: { tension: 200, friction: 22 },
  });

  // Cycle through messages based on progress phase
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
      setProgress(0);
      timingRef.current = {
        messageInterval: randomInRange(800, 1200),
        holdAt: randomInRange(88, 94),
      };
    }
  }, [open]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Proper Radix Overlay - critical for positioning */}
        <DialogPrimitive.Overlay 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" 
        />
        
        {/* Modal content with liquid glass styling - animated size */}
        <DialogPrimitive.Content asChild>
          <animated.div
            className={cn(
              "liquid-glass",
              "z-50",
              "w-full rounded-[24px]",
              "border border-white/[0.12]",
              "shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]",
              "focus:outline-none",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
              "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
            )}
            style={{
              position: 'fixed',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: sizeSpring.maxWidth,
            }}
          >
            <animated.div 
              className="flex flex-col items-center text-center px-6 relative"
              style={{
                paddingTop: sizeSpring.paddingY,
                paddingBottom: sizeSpring.paddingY,
              }}
            >
            
            {/* Animated Icon Container */}
            <div className="relative w-20 h-20 mb-6">
              {/* Processing liquid orb spinner */}
              <animated.div
                style={{
                  scale: sparklesSpring.scale,
                  opacity: sparklesSpring.opacity,
                  position: 'absolute',
                  inset: 0,
                }}
                className="flex items-center justify-center"
              >
                <LiquidOrbSpinner progress={progress} size="lg" />
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
              <div className="h-3 rounded-full bg-white/[0.08] border border-white/[0.1] overflow-hidden">
                <animated.div 
                  className="h-full rounded-full"
                  style={{
                    width: progressSpring.progress.to(p => `${p}%`),
                    background: showSuccess 
                      ? 'linear-gradient(90deg, #FFD740, #FFEB99)'
                      : 'linear-gradient(90deg, #FF6B35, #FFD740)',
                    boxShadow: showSuccess
                      ? '0 0 20px rgba(255, 215, 64, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)'
                      : '0 0 16px rgba(255, 107, 53, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
                  }}
                />
              </div>
            </div>

            {/* Actions - consistent height */}
            {showSuccess ? (
              <animated.div 
                style={{
                  opacity: contentSpring.opacity,
                  transform: contentSpring.y.to(y => `translateY(${y}px)`),
                }}
                className="flex flex-col gap-3 w-full max-w-xs"
              >
                <LiquidGlassButton
                  variant="accent"
                  onClick={onDownload}
                  disabled={isDownloading}
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
            ) : (
              // Reserve same vertical space during processing
              <div className="h-[88px]" />
            )}

            {/* Subtle ambient glow when complete */}
            {showSuccess && (
              <div 
                className="absolute inset-0 -z-10 rounded-[24px] opacity-40 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 30%, rgba(255, 215, 64, 0.2), transparent 60%)',
                }}
              />
            )}
            </animated.div>
          </animated.div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
