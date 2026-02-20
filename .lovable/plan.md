

# Match Step Number Background to Card Glass Layer

## What's changing

The step number boxes (1, 2, 3) currently use a hardcoded dark background (`bg-[rgba(20,20,25,0.85)]`) with a manual border and shadow. This looks disconnected from the glass card they sit on.

The fix: use the same glass card background color/transparency as the parent `LiquidGlassCard`, but without the specular light pseudo-elements (`liquid-refract` spans). This means matching the card's `background`, `border`, and `backdrop-blur` values from the `.liquid-glass` CSS class, just on a smaller rounded box -- no cursor-tracking highlights.

## Technical detail

**File: `src/components/ThreeSteps.tsx`** (line 47)

Replace the current hardcoded style:
```
bg-[rgba(20,20,25,0.85)] border border-white/10 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]
```

With classes that sample the same glass surface as the parent card:
```
bg-card/40 border border-white/[0.06] backdrop-blur-md
```

This uses `bg-card/40` (the same card token at 40% opacity) so the number box inherits the same tint and transparency as the surrounding card, just without the `liquid-refract` highlight spans. The result: the numbers look embedded in the card surface rather than floating on a separate dark slab.

One line change, same file.

