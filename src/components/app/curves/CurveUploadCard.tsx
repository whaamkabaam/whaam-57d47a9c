// ============================================
// Curve Upload Card
// For new users to upload their first .ccurve file
// Gated for Plus+ tiers only
// ============================================

import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { LiquidGlassButton } from '@/components/LiquidGlassEffects';
import { Upload, FileText, X, AlertCircle, Loader2, Crosshair, Lock, Zap } from 'lucide-react';
import { useUploadCurve } from '@/hooks/api/useCurves';
import { toast } from 'sonner';
import { ApiClientError } from '@/lib/api/client';
import { useSubscription } from '@/contexts/SubscriptionContext';

const MAX_FILE_SIZE = 100 * 1024; // 100KB

interface CurveUploadCardProps {
  onUploadSuccess?: () => void;
}

export function CurveUploadCard({ onUploadSuccess }: CurveUploadCardProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const uploadMutation = useUploadCurve();
  const { hasFeature } = useSubscription();
  const canUpload = hasFeature('can_upload');

  // Client-side validation
  const validateFile = useCallback((file: File): string | null => {
    if (!file.name.toLowerCase().endsWith('.ccurve')) {
      return 'Please select a .ccurve file';
    }
    if (file.size === 0) {
      return 'File appears to be empty';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File is too large (max 100KB)';
    }
    return null;
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    setError(null);
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
  }, [validateFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;
    setError(null);

    try {
      await uploadMutation.mutateAsync(selectedFile);
      toast.success('Curve uploaded! You can now tune it.');
      onUploadSuccess?.();
    } catch (err) {
      // Map API errors to user-friendly messages
      let message = 'Upload failed. Please try again.';
      if (err instanceof ApiClientError) {
        if (err.detail.includes('extension')) {
          message = 'Please select a valid .ccurve file';
        } else if (err.detail.includes('format')) {
          message = "This file doesn't appear to be a valid curve file";
        } else if (err.detail.includes('linked') || err.detail.includes('legacy')) {
          message = "Your account isn't set up yet. Please contact support.";
        } else if (err.detail.includes('large') || err.status === 413) {
          message = 'File is too large (max 100KB)';
        } else if (err.detail.includes('empty')) {
          message = 'File appears to be empty';
        } else if (err.detail.includes('UTF-8')) {
          message = 'File must be a valid text file';
        } else {
          message = err.detail;
        }
      }
      setError(message);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  // If user can't upload (Basic tier), show upgrade prompt instead
  if (!canUpload) {
    return (
      <LiquidGlassCard variant="secondary" className="p-6 max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Upload Locked</h2>
            <p className="text-sm text-muted-foreground">Plus or higher required</p>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-6">
          Uploading custom .ccurve files is available on Plus and Ultra plans. 
          Basic tier users can only tune their generated curves.
        </p>
        
        <Link to="/#products">
          <LiquidGlassButton variant="accent" className="w-full">
            <Zap className="h-4 w-4 mr-2" />
            Upgrade to Plus
          </LiquidGlassButton>
        </Link>
      </LiquidGlassCard>
    );
  }

  return (
    <LiquidGlassCard variant="secondary" className="p-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Crosshair className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Get Started</h2>
          <p className="text-sm text-muted-foreground">Upload your Custom Curve file</p>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative cursor-pointer rounded-xl border-2 border-dashed p-8
          transition-all duration-200 ease-out
          ${isDragging 
            ? 'border-primary bg-primary/10 scale-[1.02]' 
            : 'border-white/20 hover:border-white/40 hover:bg-white/5'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".ccurve"
          onChange={handleInputChange}
          className="hidden"
        />
        
        <div className="flex flex-col items-center text-center">
          <div className={`
            w-12 h-12 rounded-full flex items-center justify-center mb-3
            transition-colors duration-200
            ${isDragging ? 'bg-primary/30' : 'bg-white/10'}
          `}>
            <Upload className={`h-6 w-6 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          
          <p className="text-sm font-medium text-foreground mb-1">
            Drag & drop your .ccurve file
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            or click to browse
          </p>
          
          <div className="flex items-center gap-3 text-xs text-muted-foreground/70">
            <span>.ccurve files only</span>
            <span>•</span>
            <span>Max 100KB</span>
          </div>
        </div>
      </div>

      {/* Selected File Preview */}
      {selectedFile && (
        <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
            <FileText className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {selectedFile.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatFileSize(selectedFile.size)}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearFile();
            }}
            className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Upload Button */}
      <div className="mt-6">
        <LiquidGlassButton
          variant="accent"
          onClick={handleUpload}
          disabled={!selectedFile || uploadMutation.isPending}
          className="w-full"
        >
          {uploadMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Upload Curve
            </>
          )}
        </LiquidGlassButton>
      </div>
    </LiquidGlassCard>
  );
}
