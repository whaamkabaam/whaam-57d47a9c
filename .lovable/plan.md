

# Fix Bottom Button Alignment

## Problem
The `flex-1` on DeltaFeatures should push buttons to the bottom, but the decorative `<span>` elements inside `LiquidGlassCard` are flex siblings competing for space. This breaks the flex-1 expansion.

## Fix

### File: `src/components/pricing/TierCard.tsx`

Instead of relying on `flex-1` on the DeltaFeatures container (which depends on the full flex chain working perfectly), wrap the CTA button + microline in a `mt-auto` container. This is a simpler, more robust approach:

Move the CTA button and microline into a wrapper with `mt-auto`, which pushes them to the very bottom of the flex container regardless of how much content is above.

**Change in the main TierCard component (around line 250):**

Current structure:
```
<div className="relative flex flex-col flex-1">
  <!-- header -->
  <!-- price -->
  <DeltaFeatures ... />  (has flex-1)
  <LiquidGlassButton ... />
  <p microline />
</div>
```

New structure:
```
<div className="relative flex flex-col flex-1">
  <!-- header -->
  <!-- price -->
  <DeltaFeatures ... />  (remove flex-1, just use normal flow)
  <div className="mt-auto">   <!-- pushes to bottom -->
    <LiquidGlassButton ... />
    <p microline />
  </div>
</div>
```

This way, the feature list takes its natural height, and `mt-auto` on the button wrapper eats all remaining space as top margin, perfectly aligning buttons across all cards.

### Technical details

1. In `DeltaFeatures`, change `flex-1 mb-6` to just `mb-6` on both code paths (lines 166 and 184)
2. Wrap the `LiquidGlassButton` and microline `<p>` in a `<div className="mt-auto">` (around lines 297-312)
