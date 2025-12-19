// ============================================
// Curve List Item Component
// ============================================

import { useState } from 'react';
import { Curve } from '@/lib/api/types';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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

  const handleStartEdit = () => {
    setEditName(getBaseName(curve.name));
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditName(getBaseName(curve.name));
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
                <div className="flex items-center gap-1.5">
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="h-6 w-32 text-sm bg-background/50 border-border/50 focus:border-primary/50 px-2"
                    autoFocus
                  />
                  <span className="text-sm text-muted-foreground">.ccurve</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSaveEdit}
                    className="h-6 w-6 p-0 hover:bg-green-500/10"
                  >
                    <Check className="h-3 w-3 text-green-400" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancelEdit}
                    className="h-6 w-6 p-0 hover:bg-destructive/10"
                  >
                    <X className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </div>
              ) : (
                <>
                  <span className="font-semibold truncate">{curve.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleStartEdit}
                    className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                    title="Rename curve"
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
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
              Upload #{curve.upload_number} • {format(new Date(curve.created_at), 'MMM d, yyyy')}
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
