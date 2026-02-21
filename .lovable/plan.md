

# Fix Homepage Feature Comparison + Remove Standalone Pricing Page

## What's changing

### 1. `src/components/Products.tsx` -- Liquid glass toggle + smooth animation
The homepage pricing section still uses the old Radix Collapsible with a plain ghost Button. Applying the same fixes already done on `Pricing.tsx`:

- **Replace Radix Collapsible** with a `LiquidGlassCard` toggle button (`role="button"`, `cursor-pointer`, keyboard accessible) and CSS `grid-template-rows` transition (`0fr` to `1fr`) for smooth height animation
- **Animated chevron** using `motion.div` from `motion/react`
- **Remove** unused `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`, and `Button` imports

### 2. Delete `src/pages/Pricing.tsx`
The standalone pricing page is redundant -- the `/pricing` route already redirects to `/#products`, and all pricing UI lives in `Products.tsx` on the homepage. Removing the file entirely.

### 3. `src/App.tsx` -- Clean up dead import
Remove `import Pricing from "./pages/Privacy"` line (the old Pricing import and its comment). The redirect route (`/pricing -> /#products`) stays so any old links still work.

## Technical detail

The `grid-template-rows` trick in Products.tsx:
```text
Container: display: grid
  Closed: grid-template-rows: 0fr  ->  content collapses to 0 height
  Open:   grid-template-rows: 1fr  ->  content expands to natural height
  Inner:  overflow: hidden; min-height: 0

Transition: transition-[grid-template-rows] duration-500
```

This is the same pattern already working on the (now-deleted) Pricing page -- reliable cross-browser smooth height animation without JS measurement.

