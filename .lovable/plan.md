

# Fix Glow Cutoff and "g" Descender Clipping

## Issue 1 + 2: Hero button glow clipped at bottom

**Root cause discovered**: CSS specification states that when you set `overflow-x: hidden` while leaving `overflow-y` as `visible`, the browser computes `overflow-y` as `auto` (not `visible`). This means `overflow-x-hidden` on the hero section is silently creating vertical clipping too -- which is why the glow gets cut at the bottom no matter how much padding we add.

**Fix in `src/components/Hero.tsx`**:
- Remove `overflow-x-hidden` from the section entirely. The floating glass orbs that originally needed overflow containment were already removed, so there is nothing that needs horizontal clipping anymore.
- Remove the now-unnecessary `pb-4` from the CTA wrapper since the clipping was never a padding issue.

## Issue 3: "g" descender still clipped in pricing heading

**Root cause**: The gradient span uses `bg-clip-text text-transparent` combined with `leading-tight` on the parent h2. The tight line-height creates a line box that cuts into the descenders of letters like "g". The `pb-2` on the h2 adds padding below the entire element, but the clipping happens inside the line box of the gradient span itself.

**Fix in `src/components/Products.tsx`**:
- Add `leading-normal` (or `leading-snug`) to the gradient `<span>` so its line box is tall enough for descenders like "g" and punctuation like ".".
- Remove the `pb-2` from the h2 since it was a workaround that didn't address the actual cause.

---

## Summary of file changes

| File | Changes |
|------|---------|
| `src/components/Hero.tsx` | Remove `overflow-x-hidden` from section; remove `pb-4` from CTA wrapper |
| `src/components/Products.tsx` | Add `leading-normal` to gradient span; remove `pb-2` from h2 |

