

# Align Pricing Card Buttons and Add Ultra Swag

## Problem
1. Basic's feature list starts higher than Plus/Ultra because it lacks the inheritance badge, causing CTAs to misalign vertically.
2. Ultra has fewer rows (6 visual elements) compared to Plus (9), leaving its CTA button floating higher.

## Changes

### File: `src/components/pricing/TierCard.tsx`

#### 1. Add spacer to Basic card
In the `DeltaFeatures` component, when rendering Basic features (the `config.basicFeatures` path), add a blank spacer div with the same height as the inheritance badge (~40px) so the feature bullets start at the same vertical position as Plus/Ultra.

#### 2. Add fun bonus rows to Ultra
Add 3 tongue-in-cheek items to Ultra's `notIncludedFeatures` array -- but these aren't "not included", they're bonus perks. Instead, add a new `bonusFeatures` field to `TierConfig`:

```
bonusFeatures: string[]
```

Ultra gets:
- `Extra swag`
- `Extra aura`
- `You cannot get more VIP than this`

These render with a Sparkles icon in `text-whaam-yellow/30` and `text-white/40` italic text -- clearly playful, not mistaken for real features.

#### 3. Interface update
Add `bonusFeatures: string[]` to `TierConfig`. Basic and Plus get empty arrays.

#### 4. Render bonus features
In `DeltaFeatures`, after `NotIncludedFeatures`, render bonus items with the Sparkles icon, styled lighter/italic to read as tongue-in-cheek extras.

### Row count after changes
- **Basic**: spacer + 5 features + 4 not-included = matches Plus height
- **Plus**: badge + 6 delta + 2 not-included = 9 visual elements (tallest, sets the bar)
- **Ultra**: badge + 5 delta + 3 bonus = 9 visual elements (matches Plus)

All three CTAs will align.

## Technical details

### Data changes in `tierConfig`

```typescript
// Add to interface
bonusFeatures: string[];

// Basic
bonusFeatures: [],

// Plus  
bonusFeatures: [],

// Ultra
bonusFeatures: ['Extra swag', 'Extra aura', 'You cannot get more VIP than this'],
```

### Basic spacer (in DeltaFeatures, basicFeatures path)
Add before the `<ul>`:
```tsx
<div className="mb-3 h-[34px]" /> {/* spacer to match inheritance badge height */}
```

### BonusFeatures sub-component
```tsx
function BonusFeatures({ features }: { features: string[] }) {
  if (features.length === 0) return null;
  return (
    <ul className="space-y-2 mt-3">
      {features.map((feat, i) => (
        <li key={i} className="flex items-start gap-2">
          <Sparkles className="w-3.5 h-3.5 mt-0.5 text-whaam-yellow/30 shrink-0" />
          <span className="text-sm text-white/35 italic">{feat}</span>
        </li>
      ))}
    </ul>
  );
}
```

Rendered after `NotIncludedFeatures` in both code paths of `DeltaFeatures`.

