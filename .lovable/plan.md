

# Fix Pricing Card Height Alignment and Inheritance Visibility

## Problem
1. Feature lists have different item counts per tier, causing uneven card heights and misaligned CTAs.
2. The "Includes Basic, and:" inheritance line is too small (text-xs, white/40) and easy to miss.

## Solution

### 1. Prominent inheritance badge
Replace the faint "Includes Basic, and:" text with a styled pill/badge that's impossible to miss:

```
[Everything in Basic, plus:]
```

- Styled as a subtle bordered pill with slightly larger text (text-sm) and higher contrast (white/60 text, white/10 background, white/15 border)
- Uses a visual separator feel so users immediately understand the tier builds on the previous one

### 2. Equalize card content height
Add `min-h-[220px]` to the feature list container (`flex-1 mb-6` div) so all three cards' feature sections occupy the same vertical space regardless of item count. This keeps CTAs and microlines perfectly aligned across the grid.

## File changed

| File | Change |
|------|--------|
| `src/components/pricing/TierCard.tsx` | Style the "includes" line as a prominent pill; add min-height to feature list container |

## Technical details

### Inheritance badge (in DeltaFeatures component)
Replace:
```tsx
<p className="text-xs text-white/40 mb-3">
  {config.includes}
</p>
```

With:
```tsx
<div className="mb-3 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.1] text-sm text-white/60 text-center">
  {config.includes}
</div>
```

### Min-height on feature container
Both the basic features and delta features wrapper divs get a consistent `min-h-[220px]` so all cards align:
```tsx
<div className="flex-1 mb-6 min-h-[220px]">
```

This applies to both return paths in the `DeltaFeatures` component (the basic features list and the delta features list).

