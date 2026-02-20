

# Align LiveSessionCard with Liquid Glass Design Language

## Problem
The LiveSessionCard currently uses a standard `Button` component with `variant="whaam"` and plain opaque badge styling (`bg-primary/20`). This doesn't match the liquid glass aesthetic used across the rest of the pricing section (TierCards use `LiquidGlassButton`, glass-styled badges, etc.).

## Changes

**File: `src/components/pricing/LiveSessionCard.tsx`**

1. **Replace the standard Button with LiquidGlassButton** -- swap the `Button` import for `LiquidGlassButton` from `LiquidGlassEffects`, using `variant="primary"` with a golden accent border (matching the popular tier CTA pattern: `border border-whaam-yellow/30 hover:border-whaam-yellow/60 shadow-[0_0_20px_rgba(255,215,64,0.3)]`).

2. **Restyle the "Premium Experience" badge to liquid glass** -- replace `bg-primary/20 text-primary` with glass tokens: `backdrop-blur-md bg-white/10 border border-white/20 text-whaam-yellow shadow-[0_0_12px_rgba(255,215,64,0.4)]` to match the "Most Popular" badge styling from TierCard.

3. **Style the benefit icons with glass-friendly tones** -- change `text-primary` on icons to `text-whaam-yellow` for a warmer, more premium feel consistent with the golden accent language.

4. **Remove the hard `border-2 border-primary/50`** on the LiquidGlassCard -- the card already has liquid glass borders baked in; the extra primary border looks out of place. Replace with a subtle `border border-white/10` or remove entirely.

---

### Technical Summary

**1 file changed:** `src/components/pricing/LiveSessionCard.tsx`

- Import `LiquidGlassButton` instead of `Button`
- Update badge classes to glass + golden glow
- Update CTA to `LiquidGlassButton` with golden accent
- Update icon colors to `text-whaam-yellow`
- Remove opaque `border-primary/50` from card wrapper
