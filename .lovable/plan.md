

# Fix Build Error + Enhance CTA Button Yellow Glow

## Problem 1: Build Error
The `index.html` has a `crossorigin` attribute without a value on line 8 (`<link ... crossorigin />`). The Vite HTML parser (parse5) is choking on this during production builds. Fix: change `crossorigin` to `crossorigin=""`.

## Problem 2: Buttons Need More Yellow Glow
The three tier CTA buttons ("Start Basic", "Start Plus", "Start Ultra") and the "Book Your Session" button currently use the generic `liquid-glow` class which emits a glow based on `--primary` HSL color. To make them light up more in yellow (on-brand with the `whaam-yellow: #FFD740` accent), we'll update the glow specifically for these pricing buttons.

## Changes

### File: `index.html` (line 8)
- Change `crossorigin` to `crossorigin=""` to fix the parse5 build error.

### File: `src/components/pricing/TierCard.tsx`
- Add a yellow glow class to ALL tier CTA buttons (not just the popular one). Currently only `isPopular` gets the golden shadow. We'll give all three buttons a warm yellow glow:
  - `shadow-[0_0_15px_rgba(255,215,64,0.25)] border border-whaam-yellow/20 hover:shadow-[0_0_25px_rgba(255,215,64,0.4)] hover:border-whaam-yellow/50`
  - The popular tier keeps its stronger version with slightly higher intensity values.

### File: `src/components/pricing/LiveSessionCard.tsx`
- Already has yellow glow styling -- no changes needed here.

---

### Technical Summary

**2 files changed:**
- `index.html` -- fix `crossorigin` attribute for parse5 compatibility
- `src/components/pricing/TierCard.tsx` -- apply yellow glow to all tier CTA buttons, with stronger glow for the popular tier

