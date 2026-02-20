

# Navigation Tweaks: Bigger Logo + Tighter Compact Pill

## What's changing

### 1. Bigger logo
Current: `w-10 h-10` (40px).
New: `w-14 h-14` (56px) -- much more prominent and matches the visual weight you'd expect from the brand mark.

### 2. Tighter compact pill
Current compact max-width: `max-w-[820px]` -- way too wide, leaves a big empty gap between the logo and nav items.
New: `max-w-[620px]` -- snug fit around logo + nav items + CTA, eliminating the dead space.

### 3. Reduce inner gap
Current: `gap-8` (32px) between logo and nav items.
New: `gap-4` (16px) in compact state, `gap-8` in expanded -- keeps the compact pill tight while the expanded state breathes.

## Technical changes

**File: `src/components/Navigation.tsx`**

| Line | What | Before | After |
|------|------|--------|-------|
| 57 | Compact max-width | `max-w-[820px]` | `max-w-[620px]` |
| 61 | Flex gap | `gap-8` (always) | `gap-4` when scrolled, `gap-8` when expanded |
| 67 | Logo size | `w-10 h-10` | `w-14 h-14` |

Three lines, no structural changes.

