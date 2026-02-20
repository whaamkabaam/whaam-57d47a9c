

# Pricing Section Adjustments

## Changes Overview

Seven targeted updates across three files, no new files needed.

---

### 1. Effective daily cost for Week Pass and Monthly

**File: `src/components/pricing/TierCard.tsx`**

Below the price block (after line 181), add a line that computes and shows the effective daily rate when duration is `weekly` or `monthly`:

- Weekly: price / 7, formatted as `~$X.XX/day`
- Monthly: price / 30, formatted as `~$X.XX/day`
- Daily: hidden (redundant)

Shown as a small muted line: `~$1.14/day on average`

---

### 2. CTA button text and styling

**File: `src/components/pricing/TierCard.tsx`**

- Replace `<Button>` (lines 204-214) with `<LiquidGlassButton>` from LiquidGlassEffects
- Change label from `Get Basic` to `Start Basic` (and same for Plus/Ultra)
- Use `variant="primary"` for all tiers (consistent liquid glass look)
- Keep disabled states for processing/current tier

---

### 3. "Best for" tagline

**File: `src/components/pricing/TierCard.tsx`**

Add a `bestFor` field to `tierConfig`:
- Basic: "Light tweaking / casual use"
- Plus: "Most players who iterate daily"
- Ultra: "Power users + full control"

Render it below the description as a small italic/muted line with a target icon or similar visual cue.

---

### 4. Beta testing feature for Ultra

**File: `src/components/pricing/TierCard.tsx`**

Add `{ text: 'Beta feature testing', included: true }` to Ultra's features list.
Also add it as `false` to Basic and Plus for visual contrast.

Also update `FeatureComparisonTable.tsx` to include the row:
`{ name: 'Beta testing', basic: false, plus: false, ultra: true }`

---

### 5. "Why passes exist" contextual line

**File: `src/components/Products.tsx`** (homepage) and **`src/pages/Pricing.tsx`** (standalone page)

Below the DurationToggle, add a single muted-text line:
"Just visiting? Grab a Day or Week Pass. Serious improvement? Monthly saves you money."

---

### 6. Comparison table header note

**File: `src/components/pricing/FeatureComparisonTable.tsx`**

Add a note above the table (before `<table>`):
"All durations include the same features. Differences below are by tier."
Styled as small muted italic text.

---

### 7. Header text update

**File: `src/components/Products.tsx`** (line 68-69) and **`src/pages/Pricing.tsx`** (line 80-82)

Change subtitle from "Choose the pass or subscription that fits your needs. Upgrade or downgrade anytime." to:
"Choose your tier and duration. Upgrade or downgrade anytime."

---

## Technical Details

### TierCard.tsx changes
- Import `LiquidGlassButton` from `@/components/LiquidGlassEffects`
- Add `bestFor: string` to the tierConfig type and populate for each tier
- Add daily cost calculation: `const dailyCost = duration === 'daily' ? null : price / (duration === 'weekly' ? 7 : 30)`
- Render daily cost line with AnimatePresence for smooth toggle transitions
- Replace `<Button variant={isPopular ? "whaam" : "outline"}>` with `<LiquidGlassButton variant="primary">` for all tiers

### FeatureComparisonTable.tsx changes
- Add `beta testing` row to features array
- Add header note paragraph before the table element

### Products.tsx + Pricing.tsx changes
- Update subtitle text
- Add contextual pass explanation line after DurationToggle

