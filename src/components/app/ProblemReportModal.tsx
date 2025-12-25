// ============================================
// Problem Report Modal - Liquid Glass Design
// ============================================

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { useSubmitProblemReport } from '@/hooks/api/useProblemReport';
import { toast } from 'sonner';
import { Loader2, CheckCircle2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProblemCategory } from '@/lib/api/types';

const CATEGORY_OPTIONS: { value: ProblemCategory; label: string }[] = [
  { value: 'bug', label: 'Bug or Error' },
  { value: 'ui_issue', label: 'Visual/UI Issue' },
  { value: 'performance', label: 'Slow Performance' },
  { value: 'other', label: 'Something Else' },
];

interface ProblemReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProblemReportModal({ open, onOpenChange }: ProblemReportModalProps) {
  const location = useLocation();
  const submitMutation = useSubmitProblemReport();

  const [category, setCategory] = useState<ProblemCategory | ''>('');
  const [description, setDescription] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const descriptionLength = description.trim().length;
  const isValid = category !== '' && descriptionLength >= 10 && descriptionLength <= 2000;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !category) return;

    try {
      await submitMutation.mutateAsync({
        category,
        description: description.trim(),
        page_url: location.pathname,
      });

      setShowSuccess(true);
      
      // Auto-close after 2.5s
      setTimeout(() => {
        onOpenChange(false);
        // Reset form after close animation
        setTimeout(() => {
          setCategory('');
          setDescription('');
          setShowSuccess(false);
        }, 200);
      }, 2500);
    } catch (err) {
      toast.error('Failed to submit report. Please try again.');
    }
  };

  const handleClose = (newOpen: boolean) => {
    if (!newOpen && !showSuccess) {
      // Reset form when manually closing
      setCategory('');
      setDescription('');
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
            "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2",
            "liquid-glass rounded-2xl p-6",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
          )}
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
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="mb-4 rounded-full bg-green-500/20 p-3">
                <CheckCircle2 className="h-8 w-8 text-green-400" />
              </div>
              <p className="text-lg font-medium text-foreground">Thank you!</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Your report has been submitted.
              </p>
            </div>
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
                  className="resize-none rounded-xl border-white/[0.12] bg-white/[0.06] text-foreground placeholder:text-muted-foreground focus:border-white/20 focus:ring-white/10"
                />
                {descriptionLength > 0 && descriptionLength < 10 && (
                  <p className="text-sm text-destructive">
                    Please provide at least 10 characters
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <LiquidGlassButton
                  type="button"
                  variant="secondary"
                  onClick={() => handleClose(false)}
                >
                  Cancel
                </LiquidGlassButton>
                <LiquidGlassButton
                  type="submit"
                  variant="primary"
                  disabled={!isValid || submitMutation.isPending}
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
