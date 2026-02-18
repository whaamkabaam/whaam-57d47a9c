

# Fix Navigation Scroll Animation and Compact Layout

## Problems

1. **Janky animation**: `transition-all` on `w-fit` doesn't work -- CSS can't interpolate between a percentage/fixed width and `fit-content`. The navbar just snaps instead of smoothly shrinking.
2. **Compact state is visually broken**: When scrolled, logo text "whaamkabaam" runs directly into "How" because `justify-between` in a `w-fit` container collapses the gap to zero.

## Solution

### 1. Smooth width animation via max-width

Instead of toggling between `mx-6` (full) and `w-fit` (compact), use a `max-width` approach:
- **Top of page**: `max-w-[1400px] mx-auto` (stretches wide with margins)
- **After scroll**: `max-w-[820px] mx-auto` (shrinks to a compact centered pill)

`max-width` is a numeric CSS property so `transition-all` can interpolate it smoothly. The bar stays `w-full` at all times -- only the max-width changes.

### 2. Fix compact spacing

Replace `justify-between` with a `gap` approach. Add a visible gap between the logo group and the nav links group:
- Use `gap-8` (or `gap-6` when scrolled) on the flex container
- This ensures items are always visually separated regardless of container width

### 3. Hide brand text when scrolled

To make the compact pill even tighter and avoid the cramped feeling, hide the "whaamkabaam" text when scrolled (keep just the logo icon). This is a common pattern -- the user already knows what site they're on after scrolling past the hero. The text fades out with opacity + width animation.

## Technical Changes

### `src/components/Navigation.tsx`

**LiquidGlassCard className**:
```
Before: scrolled ? 'mx-auto w-fit px-8' : 'mx-6'
After:  scrolled ? 'max-w-[820px] mx-auto' : 'max-w-[1400px] mx-auto px-4'
```
Both states use `mx-auto` so the bar is always centered. Only `max-width` changes, which CSS transitions handle smoothly.

**Inner flex container**:
- Change from `justify-between` to `gap-8` so spacing is explicit and doesn't collapse
- The logo group and nav group sit next to each other with a consistent gap

**Brand text**:
- Add transition classes for opacity and max-width
- When scrolled: `opacity-0 max-w-0 overflow-hidden` (collapses away)
- When not scrolled: `opacity-100 max-w-[200px]` (visible)
- This uses `transition-all duration-500` for a smooth fade + collapse

**GPU acceleration**: Add `will-change: max-width` on the card wrapper so the browser optimizes the transition on the compositor thread.

## File Changes

| File | Changes |
|------|---------|
| `src/components/Navigation.tsx` | Replace w-fit with max-width animation; add gap instead of justify-between; hide brand text on scroll |

