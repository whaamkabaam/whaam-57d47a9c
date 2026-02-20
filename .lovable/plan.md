

# Swap KeyLimitsComparator for DashboardExplainer

## What's changing

Remove the "Key Limits" comparator table (the grid showing Adjustments/day, Library slots, etc.) from both pages and restore the "AI-powered curve studio" dashboard preview section in its place.

## Files changed

| File | Change |
|------|--------|
| `src/components/Products.tsx` | Replace `KeyLimitsComparator` import/usage with `DashboardExplainer`, placed between Live Session and Benefits |
| `src/pages/Pricing.tsx` | Replace `KeyLimitsComparator` import/usage with `DashboardExplainer`, placed below Live Session |

## Details

### `src/components/Products.tsx`
- Remove `KeyLimitsComparator` import (line 9) and usage (line 83)
- Add `DashboardExplainer` import
- Insert `<DashboardExplainer />` between the Live Session card and the Benefits section (between lines 139 and 141)

### `src/pages/Pricing.tsx`
- Remove `KeyLimitsComparator` import (line 9) and usage (line 95)
- Add `DashboardExplainer` import
- Insert `<DashboardExplainer />` after the Live Session card (after line 151, before closing `</main>`)

No changes to the `DashboardExplainer` component itself -- it's already correct.

