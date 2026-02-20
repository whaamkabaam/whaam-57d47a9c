

# Align Basic Card Features with Plus/Ultra

## Problem
Basic's feature list starts higher than Plus and Ultra because it lacks the inheritance badge (the "Includes everything in..." pill). This causes the CTA buttons to misalign -- Basic's button sits higher.

## Fix
Re-add the spacer div to Basic's feature list in the `DeltaFeatures` component. This invisible block matches the height of the inheritance badge pill on Plus/Ultra, pushing Basic's features down so everything lines up.

## File: `src/components/pricing/TierCard.tsx`

Add a spacer before the `<ul>` in the Basic features path (line ~167):

```tsx
<div className="flex-1 mb-6">
  <div className="mb-3 h-[34px]" />  <!-- spacer matching badge height -->
  <ul className="space-y-2">
    ...
```

This is the same approach from earlier that was accidentally removed in the last edit. The spacer ensures all three cards' content starts at the same vertical offset, keeping CTAs perfectly aligned.
