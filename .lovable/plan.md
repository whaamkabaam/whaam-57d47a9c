

# Remove "Form settings" from Plus tier's not-included list

## Problem
The Plus card shows "Form settings" with an X icon, adding an extra row that makes it taller than the other cards. Removing it will equalize the card heights.

## Change

### `src/components/pricing/TierCard.tsx`
- In the `tierConfig.plus.notIncludedFeatures` array, remove `'Form settings'` so only `['Beta testing']` remains
- This drops one row from the Plus card, aligning its height with Basic and Ultra

One line change in one file.

