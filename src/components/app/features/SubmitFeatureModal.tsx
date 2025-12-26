// ============================================
// Submit Feature Modal - Liquid Glass Design
// ============================================

import { useState, useEffect } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useSpring, animated, config } from 'react-spring';
import confetti from 'canvas-confetti';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { useCreateFeatureRequest } from '@/hooks/api/useFeatureRequests';
import { toast } from 'sonner';
import { Loader2, Check, X, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

// Animated success state component
function SuccessState() {
  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.35 },
      colors: ['#FFD740', '#FF6B35', '#FFEB99', '#ffffff'],
      gravity: 0.8,
      ticks: 200,
      scalar: 1.1,
    });
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
          Idea submitted!
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks for helping us improve.
        </p>
      </animated.div>
    </div>
  );
}

interface SubmitFeatureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SubmitFeatureModal({ open, onOpenChange }: SubmitFeatureModalProps) {
  const createMutation = useCreateFeatureRequest();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const titleLength = title.trim().length;
  const descriptionLength = description.trim().length;
  
  const isTitleValid = titleLength >= 5 && titleLength <= 200;
  const isDescriptionValid = descriptionLength >= 20 && descriptionLength <= 2000;
  const isValid = isTitleValid && isDescriptionValid;

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setIsAnonymous(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      await createMutation.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        is_anonymous: isAnonymous,
      });

      setShowSuccess(true);
      
      // Auto-close after 4s
      setTimeout(() => {
        onOpenChange(false);
        setTimeout(() => {
          resetForm();
          setShowSuccess(false);
        }, 200);
      }, 4000);
    } catch (err) {
      toast.error('Failed to submit. Please try again.');
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
        {/* Frosted overlay */}
        <DialogPrimitive.Overlay 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" 
        />
        
        {/* Liquid glass content */}
        <DialogPrimitive.Content
          className={cn(
            "z-50 w-full max-w-md",
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
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb className="h-5 w-5 text-whaam-yellow" />
              <DialogPrimitive.Title className="text-xl font-semibold text-foreground">
                Submit an Idea
              </DialogPrimitive.Title>
            </div>
            <DialogPrimitive.Description className="text-sm text-muted-foreground">
              Suggest a feature or improvement you'd like to see.
            </DialogPrimitive.Description>
          </div>

          {showSuccess ? (
            <SuccessState />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title Input */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-foreground">
                  Title
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    ({titleLength}/200)
                  </span>
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="A short, descriptive title"
                  maxLength={200}
                  className="h-11 rounded-xl border-white/[0.12] bg-white/[0.06] text-foreground placeholder:text-muted-foreground focus:border-white/20 focus:ring-white/10"
                />
                {titleLength > 0 && titleLength < 5 && (
                  <p className="text-sm text-destructive">
                    At least 5 characters required
                  </p>
                )}
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
                  placeholder="Describe the feature and why it would be helpful..."
                  rows={4}
                  maxLength={2000}
                  className="resize-y min-h-[100px] max-h-[200px] rounded-xl border-white/[0.12] bg-white/[0.06] text-foreground placeholder:text-muted-foreground focus:border-white/20 focus:ring-white/10"
                />
                {descriptionLength > 0 && descriptionLength < 20 && (
                  <p className="text-sm text-destructive">
                    Please provide at least 20 characters
                  </p>
                )}
              </div>

              {/* Anonymous Checkbox */}
              <div className="flex items-center gap-3">
                <Checkbox
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={(checked) => setIsAnonymous(checked === true)}
                  className="border-white/20 data-[state=checked]:bg-whaam-yellow data-[state=checked]:border-whaam-yellow"
                />
                <Label 
                  htmlFor="anonymous" 
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Post anonymously
                </Label>
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
                  disabled={!isValid || createMutation.isPending}
                  className="min-w-[100px] h-11"
                >
                  {createMutation.isPending ? (
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
