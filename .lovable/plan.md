
# Smooth Feature Comparison Section

## Problem
The "Compare all features" collapsible snaps open/closed with no animation -- it just pops in. The Radix Collapsible doesn't animate by default, and the content inside is a basic HTML table with no visual polish matching the rest of the liquid glass design.

## Changes

### 1. `src/pages/Pricing.tsx` -- Replace Radix Collapsible with Motion animation
- Remove `Collapsible` from Radix; use `motion.div` with `AnimatePresence` instead
- The toggle button stays, but the content area smoothly slides open with opacity + height animation (matching the odometer/duration toggle animation style already in use)
- Animate chevron rotation with `motion` instead of CSS class toggle

### 2. `src/components/pricing/FeatureComparisonTable.tsx` -- Polish the table
- Add staggered row fade-in animation using `motion.tr` so rows cascade in when the section opens (subtle, ~30ms stagger)
- Remove the zebra stripe (`bg-muted/20` on even rows) -- it clashes with the glass aesthetic. Use consistent subtle row dividers instead
- Increase cell padding slightly for breathing room
- Make the infinity symbol render larger (`text-lg`) for visual punch, matching how the tier cards do it
- Add a subtle hover highlight on rows for interactivity feel

### Summary
Two files changed. The section will smoothly expand/collapse with a spring animation, and rows will cascade in with a staggered fade -- matching the premium feel of the rest of the pricing page.
