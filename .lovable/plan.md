

# Scroll-Responsive Navigation Bar

## Problem

The navbar stretches edge-to-edge (`mx-6`), creating a large empty gap between the logo on the left and nav links on the right. The nav text is also small (`text-sm`). After the hero, the full-width bar adds no value -- it just wastes horizontal space.

## Solution: Two-State Navbar

The navbar starts full-width at the top of the page (matching the hero), then after a small scroll (~50px) it smoothly transitions to a compact, auto-width centered pill. Items move closer together, the bar gets tighter, and text bumps up slightly.

```text
STATE 1 (top of page):
+--[logo]------------------------------------[How  Pricing  About  Contact  |  Sign In  See Plans]--+

STATE 2 (after scroll):
              +--[logo]--[How  Pricing  About  Contact  |  Sign In  See Plans]--+
                              (centered, auto-width pill)
```

## Visual Changes

| Property | At top | After scroll |
|----------|--------|-------------|
| Width | Full (`mx-6`) | Auto-fit centered (`mx-auto w-fit px-6`) |
| Nav text | `text-sm` | `text-[15px]` (slightly bigger) |
| Justify | `justify-between` | `justify-between` (but gap collapses since container is `w-fit`) |
| Gap between items | `space-x-6` | `space-x-5` |
| Transition | -- | `transition-all duration-500 ease-out` on the wrapper |

## Technical Implementation

### `src/components/Navigation.tsx`

1. Add a `scrolled` state via a scroll listener (threshold: 50px)
2. Conditionally apply classes to the wrapper and LiquidGlassCard:
   - **Not scrolled**: `mx-6` (full width with side margins)
   - **Scrolled**: `mx-auto w-fit px-6` (shrink-to-fit, centered)
3. Bump nav link text from `text-sm` to `text-[15px]`
4. All changes animate via CSS `transition-all duration-500`
5. The LiquidGlassCard already handles mouse interactions -- no changes needed there

### Scroll listener (simple, no dependencies)

```typescript
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);
```

### Class application

The outer card wrapper switches between:
- `mx-6 mt-2` (full width state)
- `mx-auto w-fit mt-2 px-8` (compact centered state)

Both states keep `p-2 px-4 rounded-2xl` and the glass variant.

No changes to mobile behavior -- the compact mode only applies on `md:` and up, since mobile already uses a hamburger menu.
