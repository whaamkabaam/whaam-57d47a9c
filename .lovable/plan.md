

# Make Pricing CTA Buttons Pop More

The buttons currently have a subtle yellow glow that's barely visible. We'll crank up the intensity to make them unmistakably golden CTAs while staying on-design with the liquid glass system.

## Changes

### File: `src/components/pricing/TierCard.tsx`

Increase shadow spread, opacity, and border brightness on all tier buttons:

- **All buttons (base):** `shadow-[0_0_20px_rgba(255,215,64,0.35)]` with `border-whaam-yellow/30`, hover escalates to `shadow-[0_0_30px_rgba(255,215,64,0.5)]` and `border-whaam-yellow/60`
- **Popular tier (Plus):** Override to `shadow-[0_0_30px_rgba(255,215,64,0.5)]` base, hover to `shadow-[0_0_40px_rgba(255,215,64,0.65)]` and `border-whaam-yellow/70`

This roughly doubles the glow radius and opacity compared to current values, making the yellow unmissable without introducing any new components or classes.

### Technical Summary

**1 file changed:** `src/components/pricing/TierCard.tsx` -- stronger yellow glow values on CTA buttons

