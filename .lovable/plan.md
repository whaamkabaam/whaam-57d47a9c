

# Keep Number Badges Dark -- Block Cursor Light Effect

## Problem

The step number badges (1, 2, 3) sit inside the `LiquidGlassCard`, which has a `::after` pseudo-element that creates a radial gradient highlight following the cursor. Since the badges use `glass-primary` with a semi-transparent `rgba(0,0,0,0.1)` background, the cursor light bleeds through and washes them out. The "3" badge in the screenshot looks correct only because the cursor is far from it.

## Solution

Replace the `glass-primary` class on the number badge with inline styles / a new utility that gives it:
- A solid dark background (`rgba(20, 20, 25, 0.85)`) so the light effect can't bleed through
- `position: relative` and `z-index: 20` to sit above the `::after` specular highlight layer (which is `z-index: 2`)
- `isolation: isolate` to create its own stacking context
- Keep the existing border and rounded corners for the glassy look

## File Changed

**`src/components/ThreeSteps.tsx`** -- Update the number badge div class from `glass-primary` to a custom set of classes that create an opaque dark glass look immune to the parent card's light effect.

Change:
```text
<div className="glass-primary w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
```

To:
```text
<div className="relative z-20 isolate w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-[rgba(20,20,25,0.85)] border border-white/10 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
```

This makes the badge consistently dark and glassy regardless of where the cursor is on the card.

