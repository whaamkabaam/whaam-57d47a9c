

# Smarter, Leaner Navigation Bar

## Problem Analysis

1. **Too much vertical space**: The nav uses `p-3` padding on the glass card plus `rounded-[28px]` and large logo/text, making it tall and heavy
2. **"Get Started" is a dead-end for new visitors**: Both "Get Started" and "Sign In" go to `/auth`. A new visitor hasn't seen pricing or understood the product yet -- asking them to create an account before they know what they're paying for is a UX anti-pattern

## Design Decision: Smarter CTA Strategy

For **logged-out users**, replace the two buttons with:
- **"See Plans"** (primary CTA) -- scrolls to pricing section. This is where conversion happens. New visitors need to understand value before signing up.
- **"Sign In"** (text link, no button chrome) -- for returning users, it's always visible but doesn't compete visually.

For **logged-in users**, keep the single "Studio" button (already correct).

This follows Krug's principle: the primary action should match the user's most likely intent at that moment. A first-time visitor wants to understand the product, not create an account.

## Visual Tightening

| Element | Current | Proposed |
|---------|---------|----------|
| Card padding | `p-3` | `p-2 px-4` |
| Card corners | `rounded-[28px]` (from LiquidGlassCard) | `rounded-2xl` override |
| Logo size | `w-10 h-10` | `w-8 h-8` |
| Brand text | `text-2xl` | `text-xl` |
| Nav link gap | `space-x-8` | `space-x-6` |
| Logo-text gap | `space-x-3` | `space-x-2` |
| Button area | Two full buttons with gap-3 | One text link + one compact primary button |

Net effect: the navbar drops from roughly 64px tall to around 48px -- tighter without losing any functionality.

## Technical Changes

### `src/components/Navigation.tsx`

**Desktop (logged-out state)**:
- Replace "Get Started" LiquidGlassButton with "See Plans" LiquidGlassButton that calls `scrollToSection("products")`
- Replace "Sign In" LiquidGlassButton with a plain text button (same `glass-text-contrast` style as nav links) that navigates to `/auth`
- Reduce spacing/sizing classes as described above

**Mobile (logged-out state)**:
- Same logic: "See Plans" as primary, "Sign In" as secondary text link
- Keep the existing mobile menu structure

**Logged-in state**: No changes -- "Studio" button stays as-is.

### `src/components/LiquidGlassEffects.tsx`

No changes needed. The card `rounded-[28px]` will be overridden via className on the Navigation component.

## File Changes Summary

| File | Changes |
|------|---------|
| `src/components/Navigation.tsx` | Tighten padding/sizing; replace "Get Started" with "See Plans" (scroll to pricing); make "Sign In" a plain text link |

