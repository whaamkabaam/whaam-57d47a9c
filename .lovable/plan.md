

# Improve Pricing Card Feature Lists

## Changes

### 1. Update inheritance text
Change "Includes Basic, and:" to "Includes everything in Basic, and:" (and same for Plus).

### 2. Convert Basic's "Not included" into explicit X-marked rows
Instead of the tiny "Not included: .ccurve upload, lineages, form settings, beta testing" text at the bottom of the Basic card, show those as actual list items with a red/muted X icon -- matching the same visual pattern as the checkmark rows. This fills the vertical space so all three cards' CTAs align naturally, and makes it immediately clear what Basic is missing.

Same for Plus's "Not included" items.

### 3. Remove the `notIncluded` string approach
Replace `notIncluded: string | null` with `notIncludedFeatures: string[]` arrays so each missing feature gets its own X-marked row.

## File: `src/components/pricing/TierCard.tsx`

### Data changes (tierConfig)

**Basic:**
- Remove `notIncluded: '...'`
- Add `notIncludedFeatures: ['.ccurve upload/edit', 'Multiple curve families', 'Form settings', 'Beta testing']`

**Plus:**
- Change `includes` to `'Includes everything in Basic, and:'`
- Remove `notIncluded: '...'`
- Add `notIncludedFeatures: ['Form settings', 'Beta testing']`

**Ultra:**
- Change `includes` to `'Includes everything in Plus, and:'`
- `notIncludedFeatures: []`

### Interface changes
- Replace `notIncluded: string | null` with `notIncludedFeatures: string[]` in `TierConfig`

### DeltaFeatures component changes
- Replace the small `<p>` "Not included:" text block with a list of X-marked items rendered identically to the check-marked items but using an `X` icon in `text-white/25` (muted) and `text-white/30` label text
- This applies to both the basic features path and the delta features path

The X items render like:
```
X  .ccurve upload/edit
X  Multiple curve families
X  Form settings
X  Beta testing
```

This fills the vertical space so cards align, and makes missing features scannable at a glance -- no tiny footnote needed.

