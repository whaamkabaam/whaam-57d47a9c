// ============================================
// AI Processing Modal
// Story-driven "generating your curve" experience
// With randomized timing to feel organic
// ============================================

import { useState, useEffect, useRef, useMemo } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { Sparkles, Download, Check, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIProcessingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isComplete: boolean;
  onDownload?: () => void;
  isDownloading?: boolean;
  iterationNumber?: number;
}

// Large pool of processing messages grouped by phase
const MESSAGE_POOLS = {
  analyzing: [
    "Reading your feedback...",
    "Analyzing your input...",
    "Processing sensitivity data...",
    "Understanding your preferences...",
    "Examining aim patterns...",
  ],
  calculating: [
    "Calculating optimal response...",
    "Adjusting curve coefficients...",
    "Fine-tuning parameters...",
    "Optimizing inflection points...",
    "Balancing range profiles...",
  ],
  generating: [
    "Building your new curve...",
    "Applying micro-adjustments...",
    "Refining transitions...",
    "Polishing the final output...",
    "Almost there...",
    "Finalizing your curve...",
  ],
};

// Utility to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Generate randomized message sequence
function generateMessageSequence(): string[] {
  const analyzing = shuffleArray(MESSAGE_POOLS.analyzing).slice(0, 2);
  const calculating = shuffleArray(MESSAGE_POOLS.calculating).slice(0, 2);
  const generating = shuffleArray(MESSAGE_POOLS.generating).slice(0, 2);
  return [...analyzing, ...calculating, ...generating];
}

// Random number in range
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
  const [progress, setProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Generate randomized messages on each open
  const messages = useMemo(() => generateMessageSequence(), [open]);
  
  // Randomized timing parameters
  const timingRef = useRef({
    messageInterval: randomInRange(900, 1400),
    progressDuration: randomInRange(3800, 5200),
    holdAt: randomInRange(92, 97),
  });

  // Cycle through messages with randomized timing
  useEffect(() => {
    if (!open || isComplete) return;
    
    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        const next = prev + 1;
        // Randomize next interval slightly
        timingRef.current.messageInterval = randomInRange(800, 1500);
        return next >= messages.length ? prev : next;
      });
    }, timingRef.current.messageInterval);

    return () => clearInterval(interval);
  }, [open, isComplete, messages.length]);

  // Animate progress bar with randomized speed
  useEffect(() => {
    if (!open || isComplete) {
      if (isComplete) {
        setProgress(100);
        // Trigger celebration after a short delay
        setTimeout(() => setShowCelebration(true), 200);
      }
      return;
    }

    setProgress(0);
    setShowCelebration(false);
    
    const duration = timingRef.current.progressDuration;
    const holdAt = timingRef.current.holdAt;
    const steps = 80;
    const baseIncrement = holdAt / steps;
    let current = 0;

    const interval = setInterval(() => {
      // Add slight randomness to each step
      const variance = randomInRange(0.8, 1.3);
      current += baseIncrement * variance;
      
      if (current >= holdAt) {
        clearInterval(interval);
        setProgress(holdAt);
      } else {
        setProgress(current);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [open, isComplete]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setMessageIndex(0);
      setProgress(0);
      setShowCelebration(false);
      // Regenerate timing for next open
      timingRef.current = {
        messageInterval: randomInRange(900, 1400),
        progressDuration: randomInRange(3800, 5200),
        holdAt: randomInRange(92, 97),
      };
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-border/20 bg-background/95 backdrop-blur-xl">
        <div className="flex flex-col items-center text-center py-6">
          {/* Animated Icon */}
          <div className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-500",
            isComplete 
              ? "bg-green-500/20" 
              : "bg-primary/20",
            showCelebration && "animate-pulse"
          )}>
            {isComplete ? (
              <Check className="h-10 w-10 text-green-400" />
            ) : (
              <Sparkles className="h-10 w-10 text-primary animate-pulse" />
            )}
          </div>

          {/* Title */}
          <h3 className={cn(
            "font-bold mb-2 transition-all duration-300",
            isComplete ? "text-2xl text-green-400" : "text-xl"
          )}>
            {isComplete 
              ? `Curve v${iterationNumber} is ready!` 
              : `Generating v${iterationNumber}...`
            }
          </h3>

          {/* Cycling message or success message */}
          <p className="text-sm text-muted-foreground mb-6 h-5">
            {isComplete 
              ? "Your improved curve is waiting for you"
              : messages[messageIndex] || "Processing..."
            }
          </p>

          {/* Progress bar */}
          <div className="w-full max-w-xs mb-6">
            <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all",
                  isComplete ? "bg-green-500 duration-300" : "bg-primary duration-100"
                )}
                style={{ 
                  width: `${progress}%`,
                  boxShadow: isComplete 
                    ? '0 0 16px hsl(142, 71%, 45%, 0.6)' 
                    : '0 0 12px hsl(var(--primary) / 0.5)'
                }}
              />
            </div>
          </div>

          {/* Actions */}
          {isComplete && (
            <div className="flex flex-col gap-3 w-full max-w-xs">
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
            </div>
          )}

          {/* Subtle celebration particles */}
          {showCelebration && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <Zap
                  key={i}
                  className="absolute text-primary/30 animate-ping"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 100}ms`,
                    animationDuration: '1.5s',
                  }}
                  size={12 + Math.random() * 8}
                />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
