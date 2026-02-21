

# Fix Feature Comparison: Smooth Animation + Liquid Glass Toggle

## Problems
1. **Instant open/close**: The `AnimatePresence` height animation from 0 to `auto` doesn't work reliably in Motion -- `height: 'auto'` often snaps instead of animating smoothly.
2. **Toggle button is a plain ghost Button**: It doesn't match the liquid glass design language used everywhere else on the page.

## Changes

### 1. `src/pages/Pricing.tsx` -- Fix animation + use LiquidGlassCard for toggle

**Animation fix**: Wrap the collapsible content in a `motion.div` that uses `grid-template-rows` trick instead of `height: auto`. This is the reliable CSS-based approach for animating to unknown heights:
- Container uses `display: grid` with `grid-template-rows: 0fr` (closed) and `1fr` (open)
- Inner div has `overflow: hidden` and `min-height: 0`
- Transition is handled via CSS `transition: grid-template-rows 0.4s ease` on a wrapper, toggled by state
- Remove `AnimatePresence` entirely -- use a single always-mounted div that transitions smoothly

**Button upgrade**: Replace the `<Button variant="ghost">` with a `LiquidGlassCard` styled as a clickable element (using `role="button"`, `tabIndex`, `cursor-pointer`). This makes the toggle feel part of the design system rather than a plain text link.

### 2. `src/components/pricing/FeatureComparisonTable.tsx` -- No changes needed

The staggered row animations are fine once the container actually animates open smoothly.

## Technical Detail

The grid-template-rows approach:
```tsx
<div
  className="grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
  style={{ gridTemplateRows: isComparisonOpen ? '1fr' : '0fr' }}
>
  <div className="overflow-hidden min-h-0">
    {/* table content */}
  </div>
</div>
```

This is the most reliable cross-browser method for smooth height animation to/from zero without JS measurement.

