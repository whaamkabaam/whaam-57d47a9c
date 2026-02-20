

# Animated Duration Toggle + Price Transitions

## Two animations to add

### A. Sliding pill indicator in DurationToggle

Replace the static `bg-secondary` background on the active button with a shared `motion.div` using `layoutId`. This creates a smooth sliding pill that glides between options when you click a different duration. The buttons themselves become transparent -- the animated pill sits behind the active label.

**File: `src/components/pricing/DurationToggle.tsx`**

- Import `motion` and `AnimatePresence` from the `motion` package (already installed)
- Add a `motion.div` with `layoutId="duration-pill"` inside each button, rendered only when active
- The pill uses `position: absolute; inset: 0` with the `bg-secondary` styling
- Spring physics transition (`type: "spring", stiffness: 400, damping: 30`) for that snappy but smooth feel
- Button text sits above via `relative z-10`

### B. Animated price counter in TierCard

When the duration changes, the price number animates by counting up/down to the new value (like an odometer). This is much more engaging than a static swap.

**File: `src/components/pricing/TierCard.tsx`**

- Track previous price with `useRef` and detect changes with `useEffect`
- Use `requestAnimationFrame` loop to interpolate from old price to new price over ~400ms with an ease-out curve
- Display the interpolated value via `formatPrice()` so the dollar sign and decimals stay formatted
- The `/day`, `/week`, `/month` label cross-fades using `AnimatePresence` + `motion.span` with opacity + slight Y translate

### Summary of changes

| File | What |
|------|------|
| `DurationToggle.tsx` | Sliding pill with `layoutId` spring animation |
| `TierCard.tsx` | Animated price counter + cross-fade duration label |

No new dependencies needed -- `motion` is already installed. Both animations use spring physics for that premium, tactile feel.
