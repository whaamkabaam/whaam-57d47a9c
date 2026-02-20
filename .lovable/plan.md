

# Bigger Logo That Overflows the Bar (Both States)

## Approach
Use negative vertical margins on the logo so it visually grows beyond the bar's edges without increasing the bar's layout height. The bar stays ~48px tall, but the logo renders at 64px, overflowing top and bottom equally.

## Changes

**File: `src/components/Navigation.tsx`**

1. **Line 63** -- Add `overflow-visible` to the logo wrapper div so the oversized logo isn't clipped
2. **Line 67** -- Change `h-12` to `h-16 -my-2` on the logo `<img>`:
   - `h-16` = 64px visual height (much bigger)
   - `-my-2` = negative 8px top + bottom margin, so it only contributes 48px to layout (64 - 16 = 48)
   - Bar height stays exactly the same

This works identically for both authenticated ("Studio" button) and unauthenticated ("Sign In" + "See Plans") states since the logo markup is shared.

## Result
- Logo appears ~33% larger (64px vs 48px)
- Bar height unchanged at ~48px
- Logo overflows the bar edges slightly for a premium, "hero logo" feel
- Both auth states get the same treatment automatically
