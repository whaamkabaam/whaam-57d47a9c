

# "Most Popular" Badge + Button Styling Updates

## 1. Move "Most Popular" badge to top-right corner of the card

Currently the badge sits inline in the card header. Move it to an absolutely positioned pill on the top-right edge of the LiquidGlassCard, partially overflowing the card boundary for a premium feel.

**File: `src/components/pricing/TierCard.tsx`**

- Make the LiquidGlassCard wrapper `relative overflow-visible` (add to className)
- Remove the current inline `{isPopular && <span>...}` block from the header section
- Add a new absolutely positioned badge outside the card content flow:
  - Position: `absolute -top-3 -right-3`
  - Style: liquid glass aesthetic -- use `backdrop-blur-md bg-white/10 border border-white/20` with a warm golden glow (`shadow-[0_0_12px_rgba(255,215,64,0.4)]`)
  - Content: Sparkles icon + "Most Popular" text in `text-whaam-yellow`
  - Rounded pill shape

## 2. Golden CTA button for Plus (most popular tier)

**File: `src/components/pricing/TierCard.tsx`**

- When `isPopular` is true, add a golden accent class to the LiquidGlassButton
- Add a custom className that applies a warm golden glow: `shadow-[0_0_20px_rgba(255,215,64,0.3)] border border-whaam-yellow/30 hover:border-whaam-yellow/60`
- This makes the Plus button visually pop compared to Basic and Ultra while staying in the liquid glass family

## 3. Keep Basic and Ultra buttons as-is

They already use `LiquidGlassButton variant="primary"` which is the standard liquid glass look -- no changes needed.

---

## Technical Summary

Only one file changes: `src/components/pricing/TierCard.tsx`

- Add `relative` to LiquidGlassCard className (it already has `overflow-visible` via the component itself)
- Move the "Most Popular" badge to an absolute-positioned element before the card content
- Style badge with liquid glass tokens (backdrop-blur, subtle border, golden glow)
- Add golden glow styling to the CTA button when `isPopular` is true
