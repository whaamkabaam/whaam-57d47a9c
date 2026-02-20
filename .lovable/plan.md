

# Shared Key Limits Comparator + Delta Upgrade Bullets

## Overview

Replace the per-card 2x2 stats blocks with a single shared "Key Limits" comparator strip placed above the three tier cards. Update the in-card feature lists to use concise delta statements with bold changing tokens.

## Architecture

### New component: `src/components/pricing/KeyLimitsComparator.tsx`

A single horizontal strip that spans the full width of the 3-card grid (`max-w-5xl`). Layout:

```text
             Basic    Plus     Ultra
Adj/day        5       25        ∞
Library        5       20        ∞
Favs           1        5        ∞
Precision    0.5x     0.1x     0.1x
```

Structure:
- Wrapped in a `LiquidGlassCard` with reduced padding and very subtle styling (no heavy borders)
- CSS Grid: 4 columns -- label column + 3 value columns
- Label column: `text-[11px] text-white/40`, left-aligned
- Value columns: `text-base font-semibold text-white/90`, center-aligned
- Column headers show tier names in `text-xs text-white/50 uppercase tracking-wide`
- Values for Plus column get a subtle gold tint (`text-whaam-yellow/70`) to echo "Most Popular"
- Infinity symbols styled slightly larger for visual weight
- Rows separated by spacing only (`gap-y-2`), no divider lines
- On mobile (below `md`): the strip stacks or scrolls horizontally

### Modified: `src/components/pricing/TierCard.tsx`

**Remove**: `CapsBlock` component and its rendering from the card entirely.

**Update `tierConfig` data** -- replace current `deltaFeatures` with arrow-style deltas:

- **Basic**: No `includes` line. Instead, a single muted "Core" summary:
  - `coreSummary: "Coarse tuning + last-version restore"`
  - `deltaFeatures: []` (empty -- no bullets needed)
  - `notIncluded: ".ccurve upload, lineages, form settings, beta"`

- **Plus**: `includes: "Includes Basic, plus:"`
  - Delta bullets:
    - `"Precision: **0.5 → 0.1**"`
    - `"Restore: **last → any**"`
    - `"**+ .ccurve** upload/edit"`
    - `"**+ multiple** curve families"`
  - `notIncluded: "form settings, beta"`

- **Ultra**: `includes: "Includes Plus, plus:"`
  - Delta bullets:
    - `"Adj/day: **25 → ∞**"`
    - `"Library + favs: **20/5 → ∞**"`
    - `"**+ form settings**"`
    - `"**+ beta testing**"`
  - `notIncluded: null`

**Bold tokens rendering**: Store features as objects `{ text: string, bold: string }` or use a simple inline pattern where the changing part is wrapped in `<strong className="text-white/95 font-semibold">`. This avoids markdown parsing -- just split at known delimiters.

Data structure change:
```typescript
interface TierConfig {
  name: string;
  bestFor: string;
  coreSummary: string | null;  // new -- only for Basic
  includes: string | null;
  deltaFeatures: Array<{ prefix: string; bold: string; suffix?: string }>;
  notIncluded: string | null;
}
```

Each delta feature has a muted prefix, a bold highlight, and optional suffix. Examples:
- `{ prefix: "Precision: ", bold: "0.5 → 0.1" }`
- `{ prefix: "", bold: "+ .ccurve", suffix: " upload/edit" }`

**Remove** the `caps` field from `TierConfig` entirely (data moves to the comparator).

**Update `DeltaFeatures` render**:
- Basic: show `coreSummary` as a single muted line (`text-xs text-white/45`) with no bullets
- Plus/Ultra: show `includes` label + bullet list with bold tokens
- Check icon stays at `w-3.5 h-3.5 text-whaam-yellow/50`

### Modified: `src/pages/Pricing.tsx`

- Import `KeyLimitsComparator`
- Place it between the duration toggle and the tier cards grid:
  ```
  DurationToggle
  ↓ (mb-8)
  KeyLimitsComparator  (max-w-5xl mx-auto)
  ↓ (mb-8)
  Tier Cards Grid
  ```

### Modified: `src/components/Products.tsx`

- Same placement as Pricing.tsx -- add `KeyLimitsComparator` between duration toggle and tier cards

## Visual Details

- Comparator strip: `LiquidGlassCard` with `p-4 md:p-6`, `border-white/[0.06]` (extremely subtle)
- No thick separators inside the strip -- rely on consistent column widths and spacing
- Tier card height will decrease since caps block is removed, making cards shorter and more scannable
- Cards keep: badge image, name, best-for line, price, daily cost, delta section, CTA, microline
- "Most Popular" badge stays attached to Plus card top-right

## Mobile Handling

- Below `md` breakpoint, the comparator strip uses a scrollable horizontal layout or collapses to show values inline
- Cards stack vertically as before

## Files Changed

| File | Action |
|------|--------|
| `src/components/pricing/KeyLimitsComparator.tsx` | New -- shared comparator strip |
| `src/components/pricing/TierCard.tsx` | Remove CapsBlock, update tierConfig to delta format with bold tokens, add coreSummary |
| `src/pages/Pricing.tsx` | Add KeyLimitsComparator above cards |
| `src/components/Products.tsx` | Add KeyLimitsComparator above cards |

## What Stays the Same

- LiquidGlassCard wrapper, mouse-tracking effects, animated price counter
- Badge images, tier names, CTA button styling and logic
- Duration toggle, processing modal, feature comparison collapsible
- "Most Popular" badge position and styling
- All pricing logic (getPrice, formatPrice, etc.)

