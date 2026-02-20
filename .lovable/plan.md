

# Fix Pricing Card Alignment + Most Popular Badge

## Issues Identified

1. **Horizontal misalignment**: The Plus card applies `scale-[1.02]` which physically enlarges it, throwing off the grid alignment. All three cards should occupy equal grid space.
2. **"Most Popular" badge clipping**: The `LiquidGlassCard` component applies `overflow-hidden` via its className (`overflow-hidden` is part of the component). The inline `style={{ overflow: 'visible' }}` fights with this, and the parent section has `overflow-x-hidden` which clips the badge anyway.

---

## Fix 1: Remove scale transform from Plus card

**File: `src/components/pricing/TierCard.tsx`**

Remove `scale-[1.02]` from the `isPopular` conditional class. The card should stay the same size as siblings -- the "Most Popular" badge and golden button glow already differentiate it visually.

## Fix 2: Move the "Most Popular" badge outside the LiquidGlassCard

**File: `src/components/pricing/TierCard.tsx`**

Wrap the entire return in a `div` with `relative` positioning. Place the badge as a sibling above the `LiquidGlassCard`, not inside it. This avoids the overflow clipping entirely.

Structure becomes:
```text
<div className="relative">        <-- new wrapper
  {badge}                          <-- absolute positioned, lives outside the card
  <LiquidGlassCard>                <-- no overflow override needed
    ...card content...
  </LiquidGlassCard>
</div>
```

Remove the `style={{ overflow: 'visible' }}` from LiquidGlassCard since it's no longer needed.

## Fix 3: Fix parent section overflow

**File: `src/components/Products.tsx`**

The parent section has `overflow-x-hidden` which clips anything that extends beyond the section bounds (like an absolute badge). Change to just `overflow-visible` or remove the overflow constraint, since the grid container already constrains the cards to `max-w-5xl`.

---

## Technical Summary

**Files changed: 2**

- `src/components/pricing/TierCard.tsx`: Wrap return in a relative div, move badge outside card, remove scale transform, remove overflow style override
- `src/components/Products.tsx`: Remove `overflow-x-hidden` from the section (line 58) to prevent badge clipping

