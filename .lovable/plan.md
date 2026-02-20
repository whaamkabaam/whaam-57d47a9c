

# Update Tier Cards: Full Basic Features, Unabbreviated Labels, Remove Explainer

## Changes

### 1. Remove DashboardExplainer from both pages
Delete the `<DashboardExplainer />` usage and import from `Products.tsx` and `Pricing.tsx`.

### 2. Unabbreviate labels in KeyLimitsComparator
Update the `limits` array labels:
- `Adj/day` --> `Adjustments/day`
- `Library` --> `Library slots`
- `Favs` --> `Favorites`
- `Precision` stays as-is (already clear)

### 3. Rewrite Basic tier config to list all features
Replace the `coreSummary` approach with a full feature list using check-style bullets:

- 5 daily adjustments
- Buttons feedback (0.5x precision)
- 5 library slots
- 1 favorite slot
- Restore last version only

And a "Not included" line: `.ccurve upload, lineages, form settings, beta testing`

### 4. Change "plus:" to "and:" in includes lines
- Plus: `'Includes Basic, and:'`
- Ultra: `'Includes Plus, and:'`

### 5. Unabbreviate delta feature labels in Plus and Ultra

**Plus** deltas (expanded, with more detail):
- `Precision: 0.5 → 0.1`
- `Restore: last → any version`
- `Library slots: 5 → 20`
- `Favorite slots: 1 → 5`
- `+ .ccurve upload/edit`
- `+ multiple curve families`

**Ultra** deltas (expanded):
- `Adjustments/day: 25 → ∞`
- `Library slots: 20 → ∞`
- `Favorite slots: 5 → ∞`
- `+ form settings`
- `+ beta testing`

### 6. Update TierConfig interface
- Add a `basicFeatures` array (simple string list for Basic's full feature display)
- Keep `coreSummary` as null for all tiers (or remove it)
- Keep `deltaFeatures` for Plus/Ultra

## Files changed

| File | Change |
|------|--------|
| `src/components/pricing/TierCard.tsx` | Rewrite Basic rendering, update tierConfig data, change "plus:" to "and:", expand deltas |
| `src/components/pricing/KeyLimitsComparator.tsx` | Unabbreviate labels |
| `src/components/Products.tsx` | Remove DashboardExplainer import and usage |
| `src/pages/Pricing.tsx` | Remove DashboardExplainer import and usage |

