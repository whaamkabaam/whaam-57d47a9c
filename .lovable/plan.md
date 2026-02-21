

# Merge "Compare all features" toggle + table into one unified liquid glass component

## Problems
1. **Toggle pill is too large** -- it's a full-width LiquidGlassCard spanning `max-w-4xl`. Should be a small centered pill.
2. **Two separate containers** -- the toggle and the table are visually disconnected (separate glass cards with a gap between them). They should be one unified element.
3. **Table wrapper uses `glass-secondary`** -- this is an opaque dark class that doesn't match the transparent liquid glass aesthetic used everywhere else.

## Changes

### `src/components/Products.tsx`

- **Small pill toggle**: Replace the full-width `LiquidGlassCard` with a compact inline `LiquidGlassCard` that auto-sizes to its content (`w-fit mx-auto`, small padding `px-6 py-3`, pill radius `rounded-full`).
- **Unified container**: When expanded, wrap both the pill and the table inside a single `LiquidGlassCard`. When collapsed, only the pill shows. The structure becomes:
  - Outer wrapper: single `LiquidGlassCard` that appears when open (the pill sits at the top of it)
  - When closed: just the small pill, no outer card
  - This is achieved by conditionally applying the glass card around both elements, or more simply: always render a single `LiquidGlassCard` container, but when closed it shrinks to just fit the pill (using the grid-template-rows trick for the table portion)
- **Remove `glass-secondary`**: The table content wrapper drops the `glass-secondary` class entirely -- the parent `LiquidGlassCard` provides the glass surface.

### Approach (simplest)

Keep one `LiquidGlassCard` as the outer container always. Inside it:
1. The clickable header row (pill-like text + chevron) -- centered, compact
2. The grid-animated table section below it

When collapsed, the card naturally shrinks to just the header row. When expanded, it grows to include the table. This makes them feel like one unified component.

The card itself uses smaller padding when collapsed (`p-3`) and the table section animates in below.

```text
Collapsed:
+---------------------------+
|   Compare all features v  |  <-- small LiquidGlassCard, w-fit, rounded-full
+---------------------------+

Expanded:
+---------------------------------------+
|      Compare all features ^           |  <-- top of a LiquidGlassCard
|---------------------------------------|
|  Feature  | Basic | Plus  | Ultra     |  <-- table inside same card
|  ...      |  ...  |  ...  |  ...      |
+---------------------------------------+
```

### Implementation detail

- Single `LiquidGlassCard` wrapper with dynamic className: `w-fit mx-auto rounded-full p-3` when closed, `max-w-4xl mx-auto rounded-2xl p-4 md:p-6` when open
- Clickable header div with `cursor-pointer` and keyboard handler
- Grid-template-rows animation for the table below
- Remove the inner `glass-secondary` div -- table renders directly inside the card
- Transition the width/padding change with CSS transition classes for a smooth morph

