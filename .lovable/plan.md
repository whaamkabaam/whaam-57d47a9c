

# Fix Plus Tier Delta Feature Order

## Problem
The Plus card's delta features don't follow the same order as Basic's feature list, and the daily adjustments upgrade (5 to 25) is completely missing from Plus.

**Basic order:** adjustments, precision, library, favorites, restore
**Plus current order:** precision, restore, library, favorites, +ccurve, +families

## Changes

### `src/components/pricing/TierCard.tsx`

Reorder and complete the Plus `deltaFeatures` array to mirror Basic's feature order:

1. **Adjustments/day: 5 → 25** (add -- currently missing)
2. Precision: 0.5x Button → 0.1x Slider (was 1st, now 2nd)
3. Library slots: 5 → 20 (stays 3rd)
4. Favorite slots: 1 → 5 (stays 4th)
5. Restore: last → any version (was 2nd, now 5th)
6. + .ccurve upload/edit (unchanged)
7. + multiple curve families (unchanged)

Single config object change, no structural or logic changes.

