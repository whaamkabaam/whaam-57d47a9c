// ============================================
// Curve Upload Dialog - Modal for uploading new curves
// ============================================

import { useState } from 'react';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useUploadCurve } from '@/hooks/api/useCurves';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface CurveUploadDialogProps {
  children: React.ReactNode;
}

const MAX_FILE_SIZE = 100 * 1024; // 100KB

export function CurveUploadDialog({ children }: CurveUploadDialogProps) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const { mutate: uploadCurve, isPending } = useUploadCurve();

  const validateFile = (file: File): string | null => {
    if (!file.name.endsWith('.ccurve')) {
      return 'Please select a .ccurve file';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size must be under 100KB';
    }
    return null;
  };

  const handleFileSelect = (selectedFile: File) => {
    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      setFile(null);
    } else {
      setError(null);
      setFile(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    uploadCurve(file, {
      onSuccess: () => {
        toast.success('Curve uploaded successfully!', {
          description: 'Your new curve is now active.',
        });
        setOpen(false);
        resetState();
      },
      onError: (error: Error) => {
        const message = error.message || 'Upload failed. Please try again.';
        setError(message);
        toast.error('Upload failed', { description: message });
      },
    });
  };

  const resetState = () => {
    setFile(null);
    setError(null);
    setIsDragging(false);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetState();
    }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="glass-primary sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Upload Your Curve</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            This will replace your current curve and become your new active curve for tuning.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            className={cn(
              'relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 cursor-pointer',
              'flex flex-col items-center justify-center gap-3 text-center',
              isDragging
                ? 'border-secondary bg-secondary/10'
                : 'border-white/10 hover:border-white/20 bg-white/[0.02]',
              error && 'border-destructive/50'
            )}
            onClick={() => document.getElementById('curve-file-input')?.click()}
          >
            <input
              id="curve-file-input"
              type="file"
              accept=".ccurve"
              className="hidden"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) handleFileSelect(selectedFile);
              }}
            />

            {file ? (
              <>
                <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setError(null);
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </>
            ) : (
              <>
                <div className="h-12 w-12 rounded-full bg-white/[0.06] flex items-center justify-center">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {isDragging ? 'Drop your file here' : 'Drop your .ccurve file here'}
                  </p>
                  <p className="text-sm text-muted-foreground">or click to browse</p>
                </div>
              </>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 rounded-lg p-3">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Upload Button */}
          <Button
            onClick={handleUpload}
            disabled={!file || isPending}
            className="w-full"
          >
            {isPending ? (
              <>
                <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Curve
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
