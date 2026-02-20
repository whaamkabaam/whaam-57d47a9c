

# Default Light to Center-Bottom + Update Upload Text

## Change 1: Move default DOM light to center-bottom

The liquid glass "specular highlight" position is controlled by `--mx` and `--my` CSS custom properties. Currently `--my` defaults to `0.3` (upper area). We'll change it to `0.8` (center-bottom) so the resting glow sits at the bottom of each card.

**Files:**
- `src/index.css` (line 722): Change `--my: .3` to `--my: .8` for `.liquid-glass`
- `src/index.css` (line ~805): Same change for `.liquid-glass-nav`
- `src/components/LiquidGlassEffects.tsx` (line 78): Update `lastMouse` initial ref from `{ x: 0.5, y: 0.5 }` to `{ x: 0.5, y: 0.8 }` so the JS-side default matches the CSS default

## Change 2: Update upload feature text

Change "Upload .ccurve files" to "Upload & Edit your own .ccurve files" in both locations:

- `src/components/pricing/TierCard.tsx`: Update the feature text in all three tier configs (basic, plus, ultra)
- `src/components/pricing/FeatureComparisonTable.tsx`: Update the feature name in the `features` array

---

### Technical Summary

**4 files changed:**
- `src/index.css` -- default `--my` from `.3` to `.8` (2 locations)
- `src/components/LiquidGlassEffects.tsx` -- `lastMouse` initial y from `0.5` to `0.8`
- `src/components/pricing/TierCard.tsx` -- feature text update (3 tiers)
- `src/components/pricing/FeatureComparisonTable.tsx` -- feature name update
