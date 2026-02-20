

# Fix DurationToggle Vertical Stacking

## Problem
The `LiquidGlassCard` component wraps all children in a `<div className="relative z-10 flex flex-col flex-1">` (line 198 of `LiquidGlassEffects.tsx`). This forces the DurationToggle buttons into a vertical column layout instead of the intended horizontal row.

The `flex-col flex-1` was added to support tier card height alignment but broke the DurationToggle as a side effect.

## Solution
Add a `contentClassName` prop to `LiquidGlassCard` so individual consumers can override the inner wrapper's classes. The DurationToggle will pass `contentClassName="flex-row"` to keep buttons horizontal, while tier cards keep the default `flex-col flex-1` behavior.

## Changes

### 1. `src/components/LiquidGlassEffects.tsx`
- Add optional `contentClassName` prop to `LiquidGlassCardProps`
- Apply it to the inner wrapper div (line 198), merging with the default classes using `cn()`

### 2. `src/components/pricing/DurationToggle.tsx`
- Pass `contentClassName="flex-row items-center gap-1"` to `LiquidGlassCard`
- Remove `inline-flex items-center gap-1` from the outer card className (since those need to be on the inner wrapper to affect the buttons)

This restores the horizontal pill layout shown in the reference screenshot while keeping the tier card alignment intact.

