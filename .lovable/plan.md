

# Fix Three Steps Cards Glass Effect During Animation

## Problem

The `motion.div` wrapper around each `LiquidGlassCard` animates `y: 30 -> 0` (CSS transform). This is a known browser rendering issue: `backdrop-filter` breaks when an ancestor element has an active CSS `transform`. During the slide-in animation, the blur effect is suppressed, making the cards look flat and transparent instead of glassy. Once the animation completes and the transform is removed, the glass effect works again -- which is why card 1 (already finished) looks correct while cards 2 and 3 (still animating) look broken.

## Solution

Remove the `motion.div` wrapper from the step cards entirely. The cards don't need a scroll-triggered entrance animation -- they should just be present and glassy when they scroll into view. The `LiquidGlassCard` already has its own interactive mouse-tracking effects which provide plenty of visual interest.

The section header and CTA below the cards can keep their fade-in animations since those elements don't use `backdrop-filter`.

## File Changed

**`src/components/ThreeSteps.tsx`** (lines 44-72)

Replace the `motion.div` wrapper around each step card with a plain `div`. The `LiquidGlassCard` inside remains unchanged.

Before:
```text
{steps.map((step, index) => <motion.div key={step.number} initial={{
  opacity: 1, y: 30
}} whileInView={{
  opacity: 1, y: 0
}} ...>
  <LiquidGlassCard ...>
```

After:
```text
{steps.map((step) => <div key={step.number}>
  <LiquidGlassCard ...>
```

This is a 1-file, ~5-line change.
