
# Fix: Yellow Glow Not Applying to Pricing CTA Buttons

## Root Cause

The `LiquidGlassButton` with `variant="primary"` applies the CSS class `.liquid-glow`, which sets:

```css
.liquid-glow {
  box-shadow: 
    0 0 20px hsla(var(--primary), 0.3),
    0 0 40px hsla(var(--primary), 0.2),
    0 0 60px hsla(var(--primary), 0.1);
}
```

This CSS rule wins over the Tailwind `shadow-[...]` utility classes because it appears later in the cascade. The yellow glow Tailwind classes are being completely overridden by the grey/primary `.liquid-glow` box-shadow.

## Fix

Create a dedicated CSS class `.liquid-glow-yellow` in `src/index.css` that uses the whaam-yellow color (`#FFD740` = `rgb(255, 215, 64)`), and apply it instead of relying on Tailwind shadow utilities.

### File: `src/index.css` (after `.liquid-glow-accent` block, ~line 507)

Add two new classes:

```css
.liquid-glow-yellow {
  box-shadow: 
    0 0 20px rgba(255, 215, 64, 0.35),
    0 0 40px rgba(255, 215, 64, 0.2);
}

.liquid-glow-yellow-strong {
  box-shadow: 
    0 0 30px rgba(255, 215, 64, 0.5),
    0 0 50px rgba(255, 215, 64, 0.3);
}
```

### File: `src/components/pricing/TierCard.tsx`

Remove the Tailwind `shadow-*` classes and instead:
- Pass `variant` as a non-glow option or override the glow class
- Apply `.liquid-glow-yellow` to all buttons and `.liquid-glow-yellow-strong` to the popular tier
- Keep the `border-whaam-yellow` Tailwind classes for the border accent

The button className becomes:

```tsx
className={cn(
  "w-full h-12 liquid-glow-yellow border border-whaam-yellow/30 hover:border-whaam-yellow/60",
  isPopular && "liquid-glow-yellow-strong border-whaam-yellow/40 hover:border-whaam-yellow/70"
)}
```

And we stop passing `variant="primary"` (which adds `.liquid-glow`) by either:
- Adding a `variant="none"` option to `LiquidGlassButton`, OR
- Simply removing the `variant` prop so no glow class is added, since our custom yellow glow class handles it

### File: `src/components/LiquidGlassEffects.tsx`

Add a `'none'` variant option that skips the glow class:

```tsx
const variantClasses = {
  primary: 'liquid-glow',
  secondary: 'liquid-glow-secondary',
  accent: 'liquid-glow-accent',
  none: '',
};
```

Update the type to include `'none'`.

## Summary

| File | Change |
|------|--------|
| `src/index.css` | Add `.liquid-glow-yellow` and `.liquid-glow-yellow-strong` classes |
| `src/components/LiquidGlassEffects.tsx` | Add `'none'` variant to skip default glow |
| `src/components/pricing/TierCard.tsx` | Use `variant="none"` + yellow glow CSS classes instead of Tailwind shadows |
