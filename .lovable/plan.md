
# Slim Down the Navigation Bar

## What's changing

The nav bar looks taller than it needs to be because the logo is 64px (`w-16 h-16`) and the LiquidGlassCard base styles add default padding (`p-6` from the component) which gets partially overridden by `p-2`. The fix is to shrink the logo and tighten vertical padding.

## Changes

**File: `src/components/Navigation.tsx`**

1. Reduce logo size from `w-16 h-16` (64px) to `w-10 h-10` (40px) -- still clearly visible but much more compact
2. Change card padding from `p-2 px-4` to `py-1.5 px-4` to minimize vertical breathing room
3. Reduce nav link text from `text-[15px]` to `text-sm` (14px) to match the slimmer proportion
4. Shrink the CTA button padding from `py-1.5` to `py-1` for a tighter fit

The result: a nav bar that hugs its content tightly -- roughly 48-52px tall instead of the current ~72-76px.
