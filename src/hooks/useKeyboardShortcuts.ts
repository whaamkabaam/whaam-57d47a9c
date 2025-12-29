// ============================================
// Keyboard Shortcuts Hook
// Register and manage keyboard shortcuts
// ============================================

import { useEffect, useCallback, useRef } from 'react';

type ModifierKey = 'ctrl' | 'alt' | 'shift' | 'meta';

interface ShortcutConfig {
  key: string;
  modifiers?: ModifierKey[];
  action: () => void;
  description?: string;
  /** If true, fires even inside input/textarea (default: false) */
  allowInInput?: boolean;
}

interface UseKeyboardShortcutsOptions {
  /** Disable all shortcuts */
  disabled?: boolean;
}

// Sequence tracking for vim-style shortcuts (e.g., 'g d')
const SEQUENCE_TIMEOUT = 800;

export function useKeyboardShortcuts(
  shortcuts: ShortcutConfig[],
  options: UseKeyboardShortcutsOptions = {}
) {
  const { disabled = false } = options;
  const sequenceRef = useRef<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (disabled) return;

      // Don't trigger in input fields unless explicitly allowed
      const target = event.target as HTMLElement;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      const key = event.key.toLowerCase();

      // Clear sequence timeout and reset
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Add key to sequence
      sequenceRef.current.push(key);

      // Set timeout to clear sequence
      timeoutRef.current = setTimeout(() => {
        sequenceRef.current = [];
      }, SEQUENCE_TIMEOUT);

      // Check for matching shortcuts
      for (const shortcut of shortcuts) {
        if (isInput && !shortcut.allowInInput) continue;

        const shortcutKey = shortcut.key.toLowerCase();
        const hasModifiers = shortcut.modifiers && shortcut.modifiers.length > 0;

        // Check modifiers
        if (hasModifiers) {
          const mods = shortcut.modifiers!;
          const ctrlMatch = mods.includes('ctrl') === (event.ctrlKey || event.metaKey);
          const altMatch = mods.includes('alt') === event.altKey;
          const shiftMatch = mods.includes('shift') === event.shiftKey;

          if (ctrlMatch && altMatch && shiftMatch && key === shortcutKey) {
            event.preventDefault();
            shortcut.action();
            sequenceRef.current = [];
            return;
          }
        } else {
          // Check for sequence (e.g., 'g d')
          if (shortcutKey.includes(' ')) {
            const sequenceKeys = shortcutKey.split(' ');
            const currentSequence = sequenceRef.current.slice(-sequenceKeys.length);
            
            if (
              currentSequence.length === sequenceKeys.length &&
              currentSequence.every((k, i) => k === sequenceKeys[i])
            ) {
              event.preventDefault();
              shortcut.action();
              sequenceRef.current = [];
              return;
            }
          } else if (key === shortcutKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
            // Single key shortcut (no modifiers required)
            event.preventDefault();
            shortcut.action();
            sequenceRef.current = [];
            return;
          }
        }
      }
    },
    [shortcuts, disabled]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleKeyDown]);
}

// Export shortcut definitions for display
export interface ShortcutDefinition {
  keys: string;
  description: string;
  category: string;
}

export const ADMIN_SHORTCUTS: ShortcutDefinition[] = [
  { keys: 'g d', description: 'Go to Dashboard', category: 'Navigation' },
  { keys: 'g u', description: 'Go to Users', category: 'Navigation' },
  { keys: 'g f', description: 'Go to Feature Requests', category: 'Navigation' },
  { keys: 'g p', description: 'Go to Problem Reports', category: 'Navigation' },
  { keys: 'g s', description: 'Go to Settings', category: 'Navigation' },
  { keys: '/', description: 'Focus search', category: 'Actions' },
  { keys: 'Esc', description: 'Close modal / Deselect all', category: 'Actions' },
  { keys: '?', description: 'Show keyboard shortcuts', category: 'Help' },
];
