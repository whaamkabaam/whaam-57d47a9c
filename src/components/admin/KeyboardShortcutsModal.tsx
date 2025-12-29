// ============================================
// Keyboard Shortcuts Modal
// Shows all available keyboard shortcuts
// ============================================

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Keyboard } from 'lucide-react';
import { ADMIN_SHORTCUTS } from '@/hooks/useKeyboardShortcuts';

interface KeyboardShortcutsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function KeyboardShortcutsModal({ open, onOpenChange }: KeyboardShortcutsModalProps) {
  // Group shortcuts by category
  const groupedShortcuts = ADMIN_SHORTCUTS.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, typeof ADMIN_SHORTCUTS>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-popover/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5 text-secondary" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {Object.entries(groupedShortcuts).map(([category, shortcuts]) => (
            <div key={category}>
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                {category}
              </h3>
              <div className="space-y-2">
                {shortcuts.map((shortcut) => (
                  <div
                    key={shortcut.keys}
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                  >
                    <span className="text-sm text-foreground">{shortcut.description}</span>
                    <ShortcutKeys keys={shortcut.keys} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-xs text-muted-foreground text-center border-t border-border/50 pt-4">
          Press <kbd className="px-1.5 py-0.5 bg-muted/40 rounded text-foreground font-mono">?</kbd> anytime to show this dialog
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ShortcutKeys({ keys }: { keys: string }) {
  const parts = keys.split(' ');
  
  return (
    <div className="flex items-center gap-1">
      {parts.map((part, i) => (
        <span key={i} className="flex items-center gap-1">
          <kbd className="px-2 py-1 text-xs font-mono bg-background/50 border border-border/50 rounded shadow-sm text-foreground min-w-[24px] text-center">
            {part === 'Esc' ? 'Esc' : part.toUpperCase()}
          </kbd>
          {i < parts.length - 1 && (
            <span className="text-muted-foreground text-xs">then</span>
          )}
        </span>
      ))}
    </div>
  );
}
