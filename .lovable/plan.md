

# Fix Tier Card Visual Issues

Seven targeted fixes to the `TierCard` component, all in one file.

## Changes

### 1. Remove "card inside a card"
Delete the inner gradient overlay div (`bg-gradient-to-b from-white/[0.03] to-transparent`). The `liquid-glass` class already provides the surface -- no second rectangle needed.

### 2. Rebuild stats as label-over-value spec grid
Replace the current side-by-side layout with a true 2x2 grid where each cell stacks label on top, value below:

```text
 Adj/day    Library
   5           5

  Favs     Precision
   1         0.5x
```

- Label: `text-[11px] text-white/40 mb-0.5`
- Value: `text-base font-semibold text-white/90`
- Grid: `grid-cols-2 gap-y-4 gap-x-8`
- No border, no background -- just a subtle top separator (`border-t border-white/[0.06]`) and spacing

### 3. Fix hierarchy: lighten pill, anchor price
- Remove pill background and border entirely; render best-for as plain muted text: `text-xs text-muted-foreground mt-1`
- Add `mb-8` between best-for and price block to give price clear breathing room
- Keep daily cost at `text-[11px] text-white/35` (slightly dimmer)

### 4. Attach "Most Popular" badge to card
- Move badge inside the LiquidGlassCard, positioned at the top-right corner of the card header area
- Use `absolute -top-3 right-4` so it overlaps the card's top edge and reads as part of the card, not floating between cards

### 5. Sentence-case the includes line
- Change `'Everything in Basic, plus:'` to `'Includes Basic, plus:'`
- Change `'Everything in Plus, plus:'` to `'Includes Plus, plus:'`
- Style: `text-xs text-white/40` (not uppercase, not tracking-wide)

### 6. Improve CTA depth
- Plus card CTA gets a stronger glow: add `shadow-[0_0_20px_rgba(255,215,64,0.25)]` and brighter border `border-whaam-yellow/40`
- All CTAs keep the inner highlight and get `hover:shadow-[0_0_24px_rgba(255,215,64,0.35)]` for press feel

### 7. Card border softening
- Default card border stays `border-white/[0.08]`
- Popular card: `border-white/[0.12]` (softer than current 0.15)
- Remove `shadow-lg shadow-secondary/10` from popular card (the glow on CTA provides enough distinction)

## File changed

| File | Change |
|------|--------|
| `src/components/pricing/TierCard.tsx` | All 7 fixes above |

## What stays the same
- All `tierConfig` data values (caps numbers, feature lists, notIncluded text)
- LiquidGlassCard wrapper and mouse-tracking effects
- Animated price counter and duration label transitions
- Badge images, tier names, CTA logic, processing/current-tier states

