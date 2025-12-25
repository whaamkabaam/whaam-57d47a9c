// ============================================
// Problem Report Modal
// ============================================

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { useSubmitProblemReport } from '@/hooks/api/useProblemReport';
import { toast } from 'sonner';
import { Loader2, CheckCircle2 } from 'lucide-react';
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
  const [error, setError] = useState<string | null>(null);

  const descriptionLength = description.trim().length;
  const isValid = category !== '' && descriptionLength >= 10 && descriptionLength <= 2000;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !category) return;

    setError(null);

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
      setError(null);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Report a Problem</DialogTitle>
          <DialogDescription>
            Help us improve by reporting issues you encounter.
          </DialogDescription>
        </DialogHeader>

        {showSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
            <p className="text-lg font-medium">Thank you!</p>
            <p className="text-sm text-muted-foreground mt-1">
              Your report has been submitted.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={category} 
                onValueChange={(val) => setCategory(val as ProblemCategory)}
              >
                <SelectTrigger id="category">
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

            <div className="space-y-2">
              <Label htmlFor="description">
                Description
                <span className="text-muted-foreground text-xs ml-2">
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
                className="resize-none"
              />
              {descriptionLength > 0 && descriptionLength < 10 && (
                <p className="text-sm text-destructive">
                  Please provide at least 10 characters
                </p>
              )}
            </div>

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
      </DialogContent>
    </Dialog>
  );
}
