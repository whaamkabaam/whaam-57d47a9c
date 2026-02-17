

# Redesign StickyCTA -- Hide During Pricing, Make It Elegant

## Problems

1. **Shows during the pricing section** -- The StickyCTA with "Book 1:1 Live Session" and "See plans" buttons appears while the user is already looking at the plans. That's redundant and distracting.
2. **Looks bulky and cheap** -- Two stacked glass buttons inside a glass card creates a thick, clunky floating element that feels more like a popup than a premium nudge.
3. **Entrance timing is fine** -- It already appears after scrolling past the hero, which aligns with what you want (visible from the three steps cards onward).

## Changes

### 1. Hide during the products section

In `StickyCTA.tsx`, add `"products"` to the hide condition so it fades out when users are browsing pricing:

```text
// Before
const shouldShow = activeSection !== "home" && activeSection !== "";

// After  
const shouldShow = activeSection !== "home" && activeSection !== "products" && activeSection !== "";
```

### 2. Redesign to a slim, elegant floating bar

Replace the chunky stacked-button glass card with a compact horizontal pill:

- Remove the `LiquidGlassCard` wrapper (it's too thick for a floating element)
- Use a simple frosted dark pill (`bg-[rgba(20,20,25,0.8)] backdrop-blur-xl border border-white/10 rounded-full`)
- Place both buttons inline horizontally with smaller padding
- "Book 1:1 Live Session" stays as the primary CTA (warm gradient text or subtle glow)
- The secondary button (plans/discord) uses muted styling
- Add a subtle separator dot or thin divider between them
- Overall height shrinks from ~120px to ~48px
- Smooth slide-up entrance animation (already exists via translate-y transition)

The result is a slim floating pill in the bottom-right that feels like a gentle nudge rather than an intrusive popup -- similar to how premium SaaS apps handle persistent CTAs.

## File Changed

| File | Change |
|------|--------|
| `src/components/StickyCTA.tsx` | Add products to hide condition, redesign from glass card to slim frosted pill |

