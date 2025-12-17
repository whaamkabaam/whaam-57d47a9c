// ============================================
// Curve List Item Component
// ============================================

import { Curve } from '@/lib/api/types';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, History, Star, RotateCcw, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface CurveListItemProps {
  curve: Curve;
  previousCurveId?: number | null;
  onDownload: (id: number) => void;
  onViewHistory: (id: number) => void;
  onRevert: (id: number) => void;
  isDownloading?: boolean;
  isReverting?: boolean;
}

export function CurveListItem({
  curve,
  previousCurveId,
  onDownload,
  onViewHistory,
  onRevert,
  isDownloading,
  isReverting,
}: CurveListItemProps) {
  return (
    <LiquidGlassCard variant="secondary" className="p-4">
      <div className="flex items-center justify-between gap-4">
        {/* Curve Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold truncate">{curve.name}</span>
              {curve.is_current && (
                <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                  Current
                </Badge>
              )}
              {curve.is_perfect && (
                <Badge variant="default" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Perfect
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
            onClick={() => onDownload(curve.id)}
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
          {(!curve.is_current || previousCurveId) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRevert(curve.is_current ? previousCurveId! : curve.id)}
              disabled={isReverting}
              title={curve.is_current ? "Revert to previous version" : "Set as current"}
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
