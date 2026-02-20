
# Move "Most Popular" Badge to Card Top Edge

## Change
Reposition the "Most Popular" badge from `right-4 -top-3` to `left-1/2 -translate-x-1/2 -top-3` so it sits centered on the top border of the card, rather than floating near the tier logo.

## File: `src/components/pricing/TierCard.tsx`
Update the badge positioning classes (around line 262):
- From: `absolute -top-3 right-4`
- To: `absolute -top-3 left-1/2 -translate-x-1/2`

This centers the badge horizontally on the card's top edge, matching the reference screenshot.
