// ============================================
// Problem Report Modal - Liquid Glass Design
// ============================================

import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useSpring, animated, config } from 'react-spring';
import { fireLayeredConfetti } from '@/lib/layeredConfetti';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { useSubmitProblemReport } from '@/hooks/api/useProblemReport';
import { toast } from 'sonner';
import { Loader2, Check, X, ImagePlus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProblemCategory } from '@/lib/api/types';

// Screenshot upload constraints
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

const CATEGORY_OPTIONS: { value: ProblemCategory; label: string }[] = [
  { value: 'bug', label: 'Bug or Error' },
  { value: 'ui_issue', label: 'Visual/UI Issue' },
  { value: 'performance', label: 'Slow Performance' },
  { value: 'other', label: 'Something Else' },
];

// Animated success state component
function SuccessState() {
  // Fire confetti on mount
  useEffect(() => {
    fireLayeredConfetti({ foregroundRatio: 0.15 });
  }, []);

  const iconSpring = useSpring({
    from: { scale: 0, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    config: { mass: 0.8, tension: 300, friction: 18 },
  });

  const contentSpring = useSpring({
    from: { opacity: 0, y: 12 },
    to: { opacity: 1, y: 0 },
    config: config.gentle,
    delay: 150,
  });

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center relative">
      {/* Ambient glow */}
      <div 
        className="absolute inset-0 -z-10 opacity-50 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 35%, hsl(var(--whaam-yellow) / 0.25), transparent 65%)',
        }}
      />
      
      {/* Animated icon */}
      <animated.div
        style={{
          scale: iconSpring.scale,
          opacity: iconSpring.opacity,
        }}
        className="mb-5"
      >
        <div className="w-16 h-16 rounded-full bg-whaam-yellow/20 backdrop-blur-sm border border-whaam-yellow/30 flex items-center justify-center">
          <Check className="h-8 w-8 text-whaam-yellow" strokeWidth={2.5} />
        </div>
      </animated.div>
      
      {/* Animated content */}
      <animated.div
        style={{
          opacity: contentSpring.opacity,
          transform: contentSpring.y.to(y => `translateY(${y}px)`),
        }}
      >
        <p className="text-xl font-semibold text-whaam-yellow">
          Thanks for letting us know!
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          We'll look into this shortly.
        </p>
      </animated.div>
    </div>
  );
}

interface ProblemReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProblemReportModal({ open, onOpenChange }: ProblemReportModalProps) {
  const location = useLocation();
  const submitMutation = useSubmitProblemReport();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState<ProblemCategory | ''>('');
  const [description, setDescription] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [screenshotError, setScreenshotError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Shared validation function for click, drop, and paste
  const validateAndSetFile = useCallback((file: File) => {
    setScreenshotError(null);
    
    if (!ALLOWED_TYPES.includes(file.type)) {
      setScreenshotError('Invalid file type. Allowed: PNG, JPEG, WebP');
      return;
    }
    
    if (file.size > MAX_SIZE_BYTES) {
      setScreenshotError('File too large. Maximum size: 5MB');
      return;
    }
    
    // Revoke previous preview URL if exists
    if (screenshotPreview) {
      URL.revokeObjectURL(screenshotPreview);
    }
    
    setScreenshot(file);
    setScreenshotPreview(URL.createObjectURL(file));
  }, [screenshotPreview]);

  // Clipboard paste listener
  useEffect(() => {
    if (!open) return;
    
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            validateAndSetFile(file);
            break;
          }
        }
      }
    };
    
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [open, validateAndSetFile]);

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) validateAndSetFile(file);
  };

  const descriptionLength = description.trim().length;
  const isValid = category !== '' && descriptionLength >= 10 && descriptionLength <= 2000;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    } else {
      setScreenshot(null);
      setScreenshotPreview(null);
    }
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveScreenshot = () => {
    setScreenshot(null);
    if (screenshotPreview) {
      URL.revokeObjectURL(screenshotPreview);
      setScreenshotPreview(null);
    }
    setScreenshotError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const resetForm = () => {
    setCategory('');
    setDescription('');
    setScreenshot(null);
    if (screenshotPreview) {
      URL.revokeObjectURL(screenshotPreview);
      setScreenshotPreview(null);
    }
    setScreenshotError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !category) return;

    try {
      const formData = new FormData();
      formData.append('category', category);
      formData.append('description', description.trim());
      formData.append('page_url', location.pathname);
      
      if (screenshot) {
        formData.append('screenshot', screenshot);
      }

      await submitMutation.mutateAsync(formData);

      setShowSuccess(true);
      
      // Auto-close after confetti finishes falling
      setTimeout(() => {
        onOpenChange(false);
        // Reset form after close animation
        setTimeout(() => {
          resetForm();
          setShowSuccess(false);
        }, 200);
      }, 6500);
    } catch (err) {
      toast.error('Failed to submit report. Please try again.');
    }
  };

  const handleClose = (newOpen: boolean) => {
    if (!newOpen && !showSuccess) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleClose}>
      <DialogPrimitive.Portal>
        {/* Frosted overlay - z-1000 */}
        <DialogPrimitive.Overlay 
          className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" 
        />
        
        {/* Liquid glass content - z-1100 (between confetti layers) */}
        <DialogPrimitive.Content
          className={cn(
            "z-[1100] w-full max-w-md",
            "liquid-glass rounded-2xl p-6",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          )}
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Close button */}
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          {/* Header */}
          <div className="mb-6">
            <DialogPrimitive.Title className="text-xl font-semibold text-foreground">
              Report a Problem
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="mt-1.5 text-sm text-muted-foreground">
              Help us improve by reporting issues you encounter.
            </DialogPrimitive.Description>
          </div>

          {showSuccess ? (
            <SuccessState />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Category Select */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium text-foreground">
                  Category
                </Label>
                <Select 
                  value={category} 
                  onValueChange={(val) => setCategory(val as ProblemCategory)}
                >
                  <SelectTrigger 
                    id="category"
                    className="h-11 rounded-xl border-white/[0.12] bg-white/[0.06] text-foreground placeholder:text-muted-foreground focus:border-white/20 focus:ring-white/10"
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description Textarea */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-foreground">
                  Description
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    ({descriptionLength}/2000)
                  </span>
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what went wrong..."
                  rows={4}
                  maxLength={2000}
                  className="resize-y min-h-[100px] max-h-[200px] rounded-xl border-white/[0.12] bg-white/[0.06] text-foreground placeholder:text-muted-foreground focus:border-white/20 focus:ring-white/10"
                />
                {/* Smooth animated validation message */}
                <div 
                  className={cn(
                    "grid transition-[grid-template-rows] duration-200 ease-out",
                    descriptionLength > 0 && descriptionLength < 10 
                      ? "grid-rows-[1fr]" 
                      : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-destructive pt-1">
                      Please provide at least 10 characters
                    </p>
                  </div>
                </div>
              </div>

              {/* Screenshot Upload */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Screenshot <span className="text-xs font-normal text-muted-foreground">(optional)</span>
                </Label>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="screenshot-upload"
                />

                {!screenshot ? (
                  <label
                    htmlFor="screenshot-upload"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1.5 py-4 px-4 rounded-xl cursor-pointer transition-all",
                      "border border-dashed bg-white/[0.03]",
                      "text-sm text-muted-foreground",
                      isDragging 
                        ? "border-primary/50 bg-primary/10 ring-2 ring-primary/30 text-foreground" 
                        : "border-white/[0.15] hover:bg-white/[0.06] hover:border-white/20 hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <ImagePlus className="h-4 w-4" />
                      <span>Drop, paste, or click to add screenshot</span>
                    </div>
                    <span className="text-xs text-muted-foreground/70">
                      Pro tip: Press Ctrl+V to paste from clipboard
                    </span>
                  </label>
                ) : (
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.12] bg-white/[0.06]">
                    {/* Preview thumbnail */}
                    {screenshotPreview && (
                      <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0 bg-black/20">
                        <img 
                          src={screenshotPreview} 
                          alt="Screenshot preview" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Filename */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{screenshot.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(screenshot.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    
                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={handleRemoveScreenshot}
                      className="p-1.5 rounded-full text-muted-foreground hover:text-destructive hover:bg-white/10 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {screenshotError && (
                  <p className="text-sm text-destructive">{screenshotError}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <LiquidGlassButton
                  type="button"
                  variant="secondary"
                  onMouseDown={() => handleClose(false)}
                  className="min-w-[100px] h-11"
                >
                  Cancel
                </LiquidGlassButton>
              <LiquidGlassButton
                  type="submit"
                  variant="primary"
                  disabled={!isValid || submitMutation.isPending}
                  className="min-w-[100px] h-11"
                >
                  {submitMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Submit'
                  )}
                </LiquidGlassButton>
              </div>
            </form>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
