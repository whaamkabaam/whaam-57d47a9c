

# Smooth Daily Cost Animation

## Problem
When switching between Week and Monthly durations, the `~$X.XX/day` text fades out and back in (AnimatePresence). The main price smoothly interpolates using `useAnimatedPrice`. The daily cost should do the same.

## Solution

In `src/components/pricing/TierCard.tsx`:

1. **Compute a raw daily cost number** instead of a formatted string, so it can be animated:
   - Change `getEffectiveDailyCost` to return a `number | null` (just the raw daily cost value)
   - Use `useAnimatedPrice` on that number to get a smooth interpolation

2. **Replace the AnimatePresence block** for daily cost with a static `<p>` that simply renders the animated number when `duration !== 'daily'`. No fade in/out -- the number just smoothly ticks up or down like the main price.

3. **Keep the fade** only for the transition between "daily" (where no daily cost is shown) and "weekly/monthly" (where it appears). This is the only case where the element truly appears/disappears.

## Technical Details

### `getEffectiveDailyCost` change
```typescript
// Before: returns formatted string
function getEffectiveDailyCost(price, duration): string | null

// After: returns raw number
function getRawDailyCost(price, duration): number | null {
  if (duration === 'daily') return null;
  const days = duration === 'weekly' ? 7 : 30;
  return price / days;
}
```

### In the component body
- Call `getRawDailyCost(price, duration)` to get the target number
- Feed it into `useAnimatedPrice` (reuse the same hook) for smooth interpolation
- Render: `~${animatedDailyCost.toFixed(2)}/day` as static text (no AnimatePresence key-swap)
- Wrap in a simple conditional: only show when `duration !== 'daily'`

### File changed
| File | Change |
|------|--------|
| `src/components/pricing/TierCard.tsx` | Replace string-based daily cost with animated number using existing `useAnimatedPrice` hook |

