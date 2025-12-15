// ============================================
// AI Processing Modal
// Story-driven "generating your curve" experience
// ============================================

import { useState, useEffect } from 'react';
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

const PROCESSING_MESSAGES = [
  "Analyzing your feedback...",
  "Calculating optimal sensitivity...",
  "Fine-tuning micro-adjustments...",
  "Balancing range profiles...",
  "Generating your curve...",
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
  const [progress, setProgress] = useState(0);

  // Cycle through messages
  useEffect(() => {
    if (!open || isComplete) return;
    
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % PROCESSING_MESSAGES.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [open, isComplete]);

  // Animate progress bar
  useEffect(() => {
    if (!open || isComplete) {
      if (isComplete) setProgress(100);
      return;
    }

    setProgress(0);
    const duration = 4000;
    const steps = 60;
    const increment = 100 / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= 95) {
        clearInterval(interval);
        setProgress(95); // Hold at 95% until complete
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
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-border/20 bg-background/95 backdrop-blur-xl">
        <div className="flex flex-col items-center text-center py-6">
          {/* Animated Icon */}
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-500",
            isComplete 
              ? "bg-green-500/20" 
              : "bg-primary/20"
          )}>
            {isComplete ? (
              <Check className="h-8 w-8 text-green-400" />
            ) : (
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold mb-1">
            {isComplete 
              ? "Your new curve is ready!" 
              : `Generating Iteration ${iterationNumber}...`
            }
          </h3>

          {/* Cycling message or success message */}
          <p className="text-sm text-muted-foreground mb-6 h-5">
            {isComplete 
              ? "Download it to start playing"
              : PROCESSING_MESSAGES[messageIndex]
            }
          </p>

          {/* Progress bar */}
          <div className="w-full max-w-xs mb-6">
            <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-300",
                  isComplete ? "bg-green-500" : "bg-primary"
                )}
                style={{ 
                  width: `${progress}%`,
                  boxShadow: isComplete 
                    ? '0 0 12px hsl(142, 71%, 45%, 0.5)' 
                    : '0 0 12px hsl(var(--primary) / 0.5)'
                }}
              />
            </div>
          </div>

          {/* Actions */}
          {isComplete && (
            <div className="flex gap-3">
              <LiquidGlassButton
                variant="accent"
                onClick={onDownload}
                disabled={isDownloading}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Curve
              </LiquidGlassButton>
              <LiquidGlassButton
                variant="secondary"
                onClick={() => onOpenChange(false)}
              >
                Close
              </LiquidGlassButton>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
