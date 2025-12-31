// ============================================
// Curve List Item Component
// ============================================

import { useState, useEffect } from 'react';
import { Curve } from '@/lib/api/types';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, History, Star, RotateCcw, Loader2, Check, Pencil, X } from 'lucide-react';
import { format } from 'date-fns';

interface CurveListItemProps {
  curve: Curve;
  previousCurveId?: number | null;
  onDownload: () => void;
  onViewHistory: (id: number) => void;
  onRevert: (id: number) => void;
  onSetCurrent: (id: number) => void;
  onRename: (id: number, newName: string) => void;
  isDownloading?: boolean;
  isReverting?: boolean;
}

export function CurveListItem({
  curve,
  previousCurveId,
  onDownload,
  onViewHistory,
  onRevert,
  onSetCurrent,
  onRename,
  isDownloading,
  isReverting,
}: CurveListItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  // Store only the base name (without .ccurve extension)
  const getBaseName = (name: string) => name.replace(/\.ccurve$/, '');
  const [editName, setEditName] = useState(getBaseName(curve.name));
  
  // Optimistic name update - show new name instantly before API confirms
  const [optimisticName, setOptimisticName] = useState<string | null>(null);
  const displayName = optimisticName ?? curve.name;
  
  // Clear optimistic name when actual curve.name updates from API
  useEffect(() => {
    if (optimisticName && curve.name === optimisticName) {
      setOptimisticName(null);
    }
  }, [curve.name, optimisticName]);

  const handleStartEdit = () => {
    setEditName(getBaseName(displayName));
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditName(getBaseName(displayName));
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    const trimmedName = editName.trim();
    if (!trimmedName) {
      handleCancelEdit();
      return;
    }
    // Always append .ccurve extension
    const finalName = `${trimmedName}.ccurve`;
    
    if (finalName !== curve.name) {
      console.log('[Rename Debug] Calling rename with:', { curveId: curve.id, newName: finalName });
      setOptimisticName(finalName); // Instant UI update
      onRename(curve.id, finalName);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <LiquidGlassCard variant="secondary" className="p-4">
      <div className="flex items-center justify-between gap-4">
        {/* Curve Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              {isEditing ? (
                <div className="flex items-center">
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-0 border-b border-primary/50 outline-none text-sm font-semibold text-foreground min-w-[40px] max-w-[160px] focus:border-primary transition-colors"
                    style={{ width: `${Math.max(editName.length * 7, 40)}px` }}
                    autoFocus
                  />
                  <span className="text-sm font-semibold text-muted-foreground/60">.ccurve</span>
                  <button
                    onClick={handleSaveEdit}
                    className="p-1 ml-1.5 rounded hover:bg-green-500/10 transition-colors"
                    title="Save"
                  >
                    <Check className="h-3.5 w-3.5 text-green-400" />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="p-1 rounded hover:bg-muted/30 transition-colors"
                    title="Cancel"
                  >
                    <X className="h-3.5 w-3.5 text-muted-foreground/50" />
                  </button>
                </div>
              ) : (
                <>
                  <span className="font-semibold truncate">{displayName}</span>
                  <button
                    onClick={handleStartEdit}
                    className="p-1 rounded opacity-40 hover:opacity-100 hover:bg-muted/30 transition-all"
                    title="Rename curve"
                  >
                    <Pencil className="h-3 w-3" />
                  </button>
                </>
              )}
              {curve.is_current && (
                <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                  Current
                </Badge>
              )}
              {curve.is_favorite && (
                <Badge variant="default" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Favorite
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Curve #{curve.upload_number} • {format(new Date(curve.created_at), 'MMM d, yyyy')}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={onDownload}
            disabled={isDownloading}
            title="Download curve"
          >
            {isDownloading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewHistory(curve.id)}
            title="View history"
          >
            <History className="h-4 w-4" />
          </Button>
          
          {/* Set as Current - for non-current curves */}
          {!curve.is_current && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSetCurrent(curve.id)}
              disabled={isReverting}
              title="Set as current"
            >
              {isReverting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
            </Button>
          )}
          
          {/* Revert to Parent - only for current curve with a parent */}
          {curve.is_current && previousCurveId && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRevert(previousCurveId)}
              disabled={isReverting}
              title="Revert to previous version"
            >
              {isReverting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RotateCcw className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>
    </LiquidGlassCard>
  );
}
