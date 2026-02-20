
# Tone Down Duration Toggle Pill

## Problem
The active pill in the duration toggle uses `bg-secondary` (bright yellow), which clashes with the liquid glass aesthetic used everywhere else.

## Solution
Replace the solid yellow background with a frosted glass style that matches the design language -- a subtle white/translucent fill with backdrop blur and a soft border, similar to how other glass elements work throughout the site.

### File: `src/components/pricing/DurationToggle.tsx`

**Line 34** -- Replace the pill's classes:

- **Before:** `bg-secondary rounded-full shadow-md`
- **After:** `bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-sm`

This gives the pill a frosted glass look -- translucent white with blur and a subtle border glow.

**Line 27** -- Update the active text color:
- **Before:** `text-secondary-foreground` (dark text designed for yellow bg)
- **After:** `text-foreground` (standard bright text that works on glass)

One file, two class changes. The pill will feel native to the liquid glass design system.
