
# Restore Full-Size Logo in Navigation Bar

## Change

**File: `src/components/Navigation.tsx`**

- **Line 67**: Increase logo from `w-10 h-10` (40px) back to `w-16 h-16` (64px) so it displays at full size
- **Line 54**: Adjust vertical padding from `py-1.5` to `py-1` so the bar wraps the logo snugly with minimal extra space on top/bottom
- **Line 57**: Bump the scrolled pill widths slightly to accommodate the larger logo -- authenticated from `max-w-[480px]` to `max-w-[520px]`, unauthenticated from `max-w-[620px]` to `max-w-[660px]`

The logo drives the bar height; the padding just adds a slim breathing margin around it. Both login states (signed-in with "Studio" button, signed-out with "Sign In" + "See Plans") will have the same proportional padding.
