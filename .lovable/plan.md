

# Fix 4 Remaining Issues

## Issue 1: Sticky CTA appears too late + Discord text flicker

**Root cause**: The scroll handler in `Index.tsx` uses sections `["home", "reviews", ...]`. Between "home" and "reviews", there are StoryCards and ThreeSteps which have no IDs in that array, so `activeSection` stays `"home"` and the CTA stays hidden until the user reaches the reviews section.

The Discord text appears because the `rightIsPlans` logic flips to `false` when `activeSection === "products"`, showing "Join Discord" -- but then `shouldShow` becomes `false` because products is excluded, causing a brief flash.

**Fix in `src/components/StickyCTA.tsx`**:
- Remove the `rightIsPlans` / Discord toggle entirely. The secondary CTA should always say "See plans" and scroll to products. The Discord link doesn't belong in a floating CTA.
- Keep `shouldShow` hiding during "home", "products", and empty string.

**Fix in `src/pages/Index.tsx`**:
- Add a wrapper with `id="storycards"` around StoryCards so that the section detection picks it up when the user scrolls past the hero.
- Add `"storycards"` to the sections array so activeSection updates to something other than "home" once the user passes the hero.

## Issue 2: Discord reviews cut off on the right

**Root cause**: In `hero-parallax.tsx` line 118, the outer container uses `overflow-hidden` which clips the third column on wider/narrower aspect ratios. The `ProductCard` component uses viewport-width sizing (`w-[30vw]`) which can push the third column past the container boundary.

**Fix in `src/components/ui/hero-parallax.tsx`**:
- Change the outer flex container from `overflow-hidden` to `overflow-hidden` is fine but add `w-full` constraint and ensure columns don't exceed their space. The real fix: change `w-[30vw]` on ProductCard to use flex-based sizing instead (`flex-1 min-w-0` on the column wrappers) so all three columns fit within the `max-w-7xl` container.

## Issue 3: Spacing above pricing + "g" being cut off

**Root cause**: Products has `py-24` which is 96px top/bottom padding. The Three Steps section above it also has `pb-16 md:pb-24`. That's 120-192px of whitespace between them. Additionally, `overflow-hidden` on the Products section (line 58) clips the descenders of the heading text ("g" in "aiming").

**Fix in `src/components/Products.tsx`**:
- Reduce top padding from `py-24` to `pt-8 pb-24` (or `pt-12 pb-24`) to tighten the gap between Three Steps and Pricing.
- Change `overflow-hidden` to `overflow-x-hidden overflow-y-visible` so the text descenders aren't clipped but horizontal overflow from decorative elements is still hidden.

## Issue 4: Hero CTA button glow cut off

**Root cause**: The hero section has `overflow-hidden` (line 41 in Hero.tsx). The glow effect on the CTA button uses `absolute -inset-2` which extends 8px outside the button, but the section-level `overflow-hidden` clips it when the button is near the bottom of the viewport.

**Fix in `src/components/Hero.tsx`**:
- Change the hero section from `overflow-hidden` to `overflow-x-hidden overflow-y-visible` (or just remove `overflow-hidden` entirely since the floating glass orbs are already removed).

---

## Summary of file changes

| File | Changes |
|------|---------|
| `src/components/StickyCTA.tsx` | Remove Discord toggle logic; always show "See plans" as secondary CTA |
| `src/pages/Index.tsx` | Add `id="storycards"` wrapper around StoryCards; add `"storycards"` to sections array |
| `src/components/ui/hero-parallax.tsx` | Constrain review columns to fit within container using flex sizing |
| `src/components/Products.tsx` | Reduce top padding to `pt-8`; change `overflow-hidden` to `overflow-x-hidden overflow-y-visible` |
| `src/components/Hero.tsx` | Remove `overflow-hidden` from the hero section (or change to `overflow-x-hidden`) |
