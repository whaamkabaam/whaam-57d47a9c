

# Fix 3 Remaining Issues

## Issue 1: Hero button glow cut off at the bottom

The glow div uses `absolute -inset-2` which extends outside the button. While `overflow-x-hidden` was applied to the section, the glow is being clipped at the bottom edge of the content area because the CTA buttons wrapper has no extra padding/margin below it to give the glow room to breathe.

**Fix in `src/components/Hero.tsx`**:
- Add `pb-4` to the CTA buttons container (`flex flex-col sm:flex-row gap-4`) so there is breathing room below the glow effect. This gives the `-inset-2` blur space to render without being clipped by the section boundary.

## Issue 2: Hero section vertical tightening

The hero uses `min-h-[100svh]` which forces it to fill the full viewport. On most screens the content finishes well before the bottom, creating wasted space. The subhead wrapper also has `min-h-[80px]` adding unnecessary height.

**Fix in `src/components/Hero.tsx`**:
- Reduce `min-h-[100svh]` to `min-h-[90svh]` to reclaim some vertical space while still keeping the hero dominant.
- Reduce the subhead min-height from `min-h-[80px]` to `min-h-[60px]`.

## Issue 3: Spacing between Three Steps and Pricing + "g" cutoff

Two padding sources stack up: the Three Steps wrapper in `Index.tsx` has `pb-16 md:pb-24` (64-96px) and Products has `pt-8` (32px). That is still 96-128px combined.

The "g" in "aiming" is clipped because `leading-tight` on the h2 reduces line height so descenders get cut by the next element's boundary. Adding a small `pb-2` to the heading ensures descenders render fully.

**Fix in `src/pages/Index.tsx`**:
- Halve the Three Steps wrapper padding from `pb-16 md:pb-24` to `pb-8 md:pb-12`.

**Fix in `src/components/Products.tsx`**:
- Add `pb-2` to the h2 element to give the descender ("g") room to render below the text baseline.

---

## Summary of file changes

| File | Changes |
|------|---------|
| `src/components/Hero.tsx` | Add `pb-4` to CTA wrapper; reduce section `min-h` to `90svh`; reduce subhead `min-h` to `60px` |
| `src/pages/Index.tsx` | Halve Three Steps wrapper bottom padding to `pb-8 md:pb-12` |
| `src/components/Products.tsx` | Add `pb-2` to the pricing h2 to prevent descender clipping |

