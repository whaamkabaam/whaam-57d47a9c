

# Bigger Logo, Same Bar Height

## The Math
Right now: `h-10` (40px) logo + `py-1` (4px top + 4px bottom) = 48px bar.

Trade the padding for logo size: `h-12` (48px) logo + `py-0` (0px) = 48px bar. Same height, bigger logo.

## Changes

**File: `src/components/Navigation.tsx`**

1. **Line 54**: Change `py-1` to `py-0` -- remove vertical padding
2. **Line 67**: Change `h-10` to `h-12` -- logo grows from 40px to 48px, filling the bar edge-to-edge

