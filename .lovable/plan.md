

# Fix Navigation Flash and Scroll Animation (For Real This Time)

## Root Cause (verified by reading every line)

There are three layers causing the visual mess:

1. **The `<nav>` wrapper** (line 50) has `transition-all duration-300` with NO mount guard. This means every CSS property on the nav animates on initial page load — including padding, dimensions, and background. The `mounted` guard only protects the inner `LiquidGlassCard`, not this outer wrapper.

2. **LiquidGlassCard base class conflict**: The component hardcodes `rounded-[28px] p-6 md:p-8` (LiquidGlassEffects.tsx line 179). Navigation passes `p-2 px-4 rounded-2xl` to override them. `cn()` (tailwind-merge) resolves correctly, but on the first paint frame the browser computes styles and the unguarded `transition-all` on `<nav>` catches and animates the difference — making padding visibly grow/shrink on load.

3. **Transition scope too broad on the card**: `transition-[max-width,padding,border-radius]` includes padding and border-radius which don't actually change between scroll states. Only `max-width` changes. Including unused properties adds potential for jank.

## Fix

### `src/components/Navigation.tsx`

| Line | Change | Why |
|------|--------|-----|
| 50 | Remove `transition-all duration-300` from `<nav>` | This is the primary flash cause. The nav doesn't need its own transition — only the inner card does. |
| 55 | Simplify to `transition-[max-width] duration-500 ease-out` | Only animate what actually changes between states |

That's it. Two targeted fixes:
- Kill the unguarded transition on the `<nav>` wrapper
- Narrow the card's transition to only `max-width`

### No changes to LiquidGlassEffects.tsx

The base `p-6 md:p-8 rounded-[28px]` classes are fine — `cn()` correctly overrides them. The flash was caused by the transition catching the override, not by the override itself. With the transition removed from `<nav>`, there's nothing to animate the initial style computation.

