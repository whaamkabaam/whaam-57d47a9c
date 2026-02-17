

# Upgrade Pricing Section Visual Quality

## Problem

The tier cards, live session card, and duration toggle use the old `glass-container` / `glass-effect-layer` / `glass-content-layer` CSS system, while everything else on the homepage uses the interactive `LiquidGlassCard` component with mouse-tracking refraction. This creates a visible quality gap -- the pricing section feels flat and static compared to the rest of the page.

## Changes

### 1. TierCard.tsx -- Switch to LiquidGlassCard

Replace the manual `glass-container` + `glass-effect-layer` + `glass-content-layer` divs with `LiquidGlassCard`. This gives each card the interactive mouse-tracking glass refraction effect that the rest of the site uses.

Other visual improvements:
- Center the price block for better visual balance
- Make the "Most Popular" card stand out with a subtle `border-secondary` glow instead of just `scale`
- Increase badge image size slightly (w-20 h-20 to w-24 h-24) for more presence
- Use `font-semibold` on included feature text to make them scan better against the dimmed excluded ones
- Give the CTA buttons more height (`h-12`) for better touch targets and visual weight

### 2. LiveSessionCard.tsx -- Switch to LiquidGlassCard

Same treatment -- replace `glass-container` markup with `LiquidGlassCard variant="primary"`. This makes the live session card feel premium and interactive like the tier cards above it.

### 3. DurationToggle.tsx -- Use LiquidGlassCard as container

Wrap the toggle pill in a `LiquidGlassCard` instead of the static `glass-secondary` class. This makes the toggle feel integrated with the liquid glass design language rather than a flat pill floating on the page.

### 4. FeatureComparisonTable.tsx -- Minor polish

- Add slightly more row padding for breathing room
- Make the tier column headers larger (`text-base font-bold`) so they read clearly as column identifiers

### 5. Products.tsx -- Container polish

- Wrap the comparison table in `LiquidGlassCard` instead of a plain `glass-secondary` div so it matches the rest of the section

## Files Modified

| File | Change |
|------|--------|
| `src/components/pricing/TierCard.tsx` | Replace glass-container with LiquidGlassCard, visual hierarchy improvements |
| `src/components/pricing/LiveSessionCard.tsx` | Replace glass-container with LiquidGlassCard |
| `src/components/pricing/DurationToggle.tsx` | Wrap in LiquidGlassCard |
| `src/components/pricing/FeatureComparisonTable.tsx` | Spacing and header sizing |
| `src/components/Products.tsx` | Use LiquidGlassCard for comparison table wrapper |

## Technical Details

The key change is swapping from this pattern:
```text
<div class="glass-container border-2 ...">
  <div class="glass-effect-layer" />
  <div class="glass-content-layer">
    {content}
  </div>
</div>
```

To this:
```text
<LiquidGlassCard variant="primary" className="border-2 ...">
  {content}
</LiquidGlassCard>
```

`LiquidGlassCard` already handles the refractive background, mouse-tracking highlight shift, and prism sparkle effects. No new CSS needed.

