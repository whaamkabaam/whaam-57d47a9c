

# Bottom-Align Feature Lists Across Tier Cards

## What you want
The feature items should align horizontally across all three cards from the bottom up. "Beta testing" in Basic should sit at the same Y-level as "Beta testing" in Plus and Ultra. Right now only the buttons are bottom-anchored, but the feature lists still start from the top, leaving a gap between the last feature and the button that varies per card.

## Fix
Move `DeltaFeatures` inside the `mt-auto` wrapper so the entire block (features + button + microline) is pushed to the bottom of the card together. This way, the last item in each list aligns with the last item in every other list, and items naturally line up row-by-row going upward.

## File: `src/components/pricing/TierCard.tsx`

Current structure (lines ~297-317):
```
<DeltaFeatures config={config} />

<div className="mt-auto">
  <LiquidGlassButton ... />
  <p microline />
</div>
```

New structure:
```
<div className="mt-auto">
  <DeltaFeatures config={config} />
  <LiquidGlassButton ... />
  <p microline />
</div>
```

By wrapping both the features and the CTA in one `mt-auto` container, the entire bottom section sticks to the card's bottom edge. Since each card has the same height (CSS grid), the features naturally align from the bottom up -- Basic's longer list just extends higher while the shared items (Form settings, Beta testing) sit at the same level.

## Technical note
- Single line change: move `<DeltaFeatures config={config} />` from above the `mt-auto` div to inside it as the first child
- No other files or components need changes
