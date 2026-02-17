

# Fix Three Steps Cards -- Remove Opacity Fade-in

## Problem

The three step cards use `motion.div` with `initial={{ opacity: 0 }}` which makes them look greyish/opaque as they fade in. The liquid glass effect only looks correct at full opacity.

## Solution

Remove the opacity animation from the card wrappers. Keep the subtle upward slide (`y: 30 -> 0`) for a clean entrance, but start at `opacity: 1` so the glass effect is immediately visible.

## File Changed

**`src/components/ThreeSteps.tsx`** (lines 44-55)

Change the motion.div animation for each step card:
- Before: `initial={{ opacity: 0, y: 30 }}` / `whileInView={{ opacity: 1, y: 0 }}`
- After: `initial={{ opacity: 1, y: 30 }}` / `whileInView={{ opacity: 1, y: 0 }}`

This keeps the upward slide motion but the cards are fully glassy from the moment they render.

