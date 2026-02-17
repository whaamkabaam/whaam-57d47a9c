

# Fix 4 Broken Things on the Homepage

## Issue 1: "SAVE" badge clipped on the DurationToggle

The "Save" badge uses `absolute -top-2 -right-2` positioning, but the parent `LiquidGlassCard` has `!rounded-full` and implicitly `overflow: hidden` (from the glass card styles). The badge gets clipped at the edge.

**Fix in `src/components/pricing/DurationToggle.tsx`**: Add `overflow-visible` to the `LiquidGlassCard` wrapper so the badge can escape the pill boundary:
```
<LiquidGlassCard className="!p-1 !rounded-full inline-flex items-center gap-1 !overflow-visible">
```

## Issue 2: Pricing title cut off + excess spacing above

The Products component already wraps itself in `<section id="products" className="py-24">`, but Index.tsx wraps it again in another `<section id="products" className="py-16">`. This creates double padding (py-24 + py-16 = massive gap) and the duplicate `id="products"` causes scroll-to issues.

**Fix in `src/pages/Index.tsx`**: Remove the outer wrapper section. Products already has its own section tag with id and padding:
```
{/* Before */}
<section id="products" className="py-16 relative z-10">
  <Products />
</section>

{/* After */}
<Products />
```

## Issue 3: Hero vertical spacing broken -- content pushed too low

The hero section uses `min-h-[100svh]` with `items-start` and large top padding (`pt-28 sm:pt-32 lg:pt-36`). The content and stats grid uses `items-center` which vertically centers the two columns, but combined with `items-start` on the outer flex, the CTA buttons get pushed far down. The `min-h-[120px]` on the animated subhead wrapper also adds unnecessary height.

**Fix in `src/components/Hero.tsx`**:
- Reduce the `min-h` on the subhead wrapper from `120px` to `80px` to tighten the gap
- Remove the empty `<div className="space-y-4"></div>` which adds dead space
- Reduce CTA button gap from `gap-6` to `gap-4`

## Issue 4: Yellow line at the bottom of the hero

Line 46 in Hero.tsx creates a visible accent-colored line at the bottom of the hero:
```
<div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-accent/30 to-transparent"></div>
```

**Fix in `src/components/Hero.tsx`**: Remove this line entirely. It was a decorative element that now looks out of place.

---

## Summary of file changes

| File | Changes |
|------|---------|
| `src/components/pricing/DurationToggle.tsx` | Add `!overflow-visible` to LiquidGlassCard wrapper |
| `src/pages/Index.tsx` | Remove double-wrapping section around Products |
| `src/components/Hero.tsx` | Remove bottom yellow line div, reduce subhead min-height, remove empty spacer div, tighten CTA gap |

