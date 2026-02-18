

# Fix Navigation: Bigger Logo, No Flash, Sexy Text Dissolve

## Root Cause Analysis

### Why the flash happens (even at the top of the page)

There are **two layers** causing the flash:

1. **`transition-all duration-500` fires on mount.** When the page loads, the browser renders the element with its initial computed styles, then applies the full stylesheet. The `transition-all` property catches this initial style application and animates it -- causing a visible "grow-in" effect. This happens regardless of scroll position because the transition applies to ALL properties (padding, max-width, colors, etc.).

2. **LiquidGlassCard has conflicting base classes.** The component hardcodes `rounded-[28px] p-6 md:p-8` on line 179 of `LiquidGlassEffects.tsx`. Navigation passes `p-2 px-4 rounded-2xl` via className. Tailwind's merge handles this eventually, but on the very first paint frame the base styles may flash before the overrides take effect -- especially with `transition-all` animating the difference.

### Fix approach

Suppress transitions on mount using a `mounted` ref. Only apply `transition-all` after the first animation frame, so the initial render snaps instantly to the correct state with zero animation.

## All Changes

### `src/components/Navigation.tsx`

1. **Suppress mount flash**: Add a `mounted` ref that flips to `true` after the first `requestAnimationFrame`. Only apply `transition-all duration-500 ease-out` when `mounted` is true. This means the first render has no transition -- it just snaps to the correct size.

2. **Initialize scroll state correctly**: Change `useState(false)` to `useState(() => typeof window !== 'undefined' ? window.scrollY > 50 : false)` so the very first render matches the actual scroll position (covers refresh-while-scrolled).

3. **Bigger logo**: Change `w-8 h-8` to `w-10 h-10` with `transition-all duration-500 ease-out` for smooth feel.

4. **Sexier text dissolve**: Replace the current `opacity-0 max-w-0 overflow-hidden` with a richer effect:
   - When visible: `opacity-100 max-w-[200px] scale-100 blur-0 translate-x-0`
   - When hidden: `opacity-0 max-w-0 overflow-hidden scale-95 blur-[2px] -translate-x-1`
   - This creates a subtle shrink + blur + slide that feels like the text dissolves into the logo rather than just vanishing

5. **Transition property**: On the `LiquidGlassCard`, change from `transition-all` to `transition-[max-width,padding,border-radius]` so we only animate the properties we care about (avoids animating colors, backgrounds, etc. which contributes to the flash).

### `src/components/LiquidGlassEffects.tsx`

No structural changes needed. The `p-6 md:p-8 rounded-[28px]` base classes get correctly overridden by Navigation's className via Tailwind merge (`cn()`). The flash was caused by the transition, not the class merge.

## Summary of visual changes

| Element | Before | After |
|---------|--------|-------|
| Logo | `w-8 h-8` | `w-10 h-10` |
| Mount flash | Visible grow-in animation | Instant snap, no transition on first frame |
| Scroll init | `useState(false)` | `useState(() => window.scrollY > 50)` |
| Text dissolve | Opacity + max-width only | Opacity + max-width + scale(0.95) + blur(2px) + translateX(-4px) |
| Transition scope | `transition-all` | `transition-[max-width,padding,border-radius]` (card) / `transition-all` (text only) |

