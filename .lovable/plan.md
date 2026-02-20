
# Fix Button Alignment: Propagate Flex Through Glass Card

## Root Cause
The `LiquidGlassCard` component wraps children in `<div className="relative z-10">{children}</div>` (line 198 of LiquidGlassEffects.tsx). This div does not participate in the flex layout, so the `flex-1` on the DeltaFeatures div has no effect -- it can't push the CTA button to the bottom because the flex chain is broken.

## Fix

### File: `src/components/LiquidGlassEffects.tsx` (line 198)
Change the inner content wrapper from:
```tsx
<div className="relative z-10">{children}</div>
```
to:
```tsx
<div className="relative z-10 flex flex-col flex-1">{children}</div>
```

This lets the flex layout flow from the outer card all the way through to the CTA button. The `flex-1` on DeltaFeatures will then absorb the extra vertical space in shorter cards, pushing buttons to the same bottom position across all three cards.

### File: `src/components/pricing/TierCard.tsx` (line 167)
Remove the spacer div `<div className="mb-3 h-[34px]" />` from the Basic card -- it's no longer needed since flexbox will handle the vertical distribution automatically.

### Why this works
- CSS Grid already makes all three cards the same height
- `h-full` on `LiquidGlassCard` fills that grid height
- Adding `flex flex-col flex-1` to the inner wrapper lets the flex chain reach `DeltaFeatures`
- `flex-1` on `DeltaFeatures` absorbs remaining space, pushing buttons to the bottom
- No spacers, no manual height matching needed -- pure flexbox alignment
