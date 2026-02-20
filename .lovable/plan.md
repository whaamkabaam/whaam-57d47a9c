
# Redesign Tier Cards for Instant Comparison

## Problem
The current cards repeat 9 identical feature rows across all 3 tiers, mixing numeric limits with yes/no capabilities. Users must mentally "diff" the tiers to understand what they get when upgrading.

## Solution: Two-Part Card Redesign

### 1. Caps Block (always visible, right under price)
A compact 2-column grid showing the 4 key numeric differentiators at a glance:

| Label | Basic | Plus | Ultra |
|-------|-------|------|-------|
| Adjustments/day | 5 | 25 | Unlimited |
| Library slots | 5 | 20 | Unlimited |
| Favorites | 1 | 5 | Unlimited |
| Tuning precision | 0.5x | 0.1x | 0.1x |

Each card shows only its own values in this block -- users scan across cards horizontally.

### 2. Delta Feature List ("Everything in X, plus...")

- **Basic**: Shows its 5 included features as a simple checklist (coarse tuning, last version restore, etc.)
  - Footer line: "Not included: .ccurve upload, lineages, form settings, beta"
- **Plus**: "Everything in Basic, plus:" followed by only the 4 upgrades (fine tuning, full version history, .ccurve upload, multiple curve families)
  - Footer line: "Not included: form settings, beta"
- **Ultra**: "Everything in Plus, plus:" followed by only the 3 upgrades (unlimited everything, form settings, beta testing)
  - No footer needed

### 3. Outcome-Driven Language
Rename features to what they mean for the user:
- "Preset feedback buttons (0.5x)" -> "Coarse tuning (0.5 steps)"
- "Fine feedback slider (0.1x)" -> "Fine tuning (0.1 steps)"
- "Restore last version only" -> "Last version restore"
- "Restore any version" -> "Full version history"
- "Multiple curve lineages" -> "Multiple curve families"

### Card Layout Order (top to bottom)
1. Tier badge image + name
2. Best-for tagline
3. Price + daily cost
4. **Caps block** (4-row spec grid)
5. **Delta feature list** (with "Everything in X, plus:" header for Plus/Ultra)
6. CTA button
7. Microline

## Technical Details

### File changed
`src/components/pricing/TierCard.tsx` -- complete restructure of the `tierConfig` data and render layout.

### Data structure change
Replace the current flat `features` array with:
- `caps`: array of `{ label, value }` for the spec block
- `includes`: the "Everything in X, plus:" header string (null for Basic)
- `deltaFeatures`: array of strings (only the new features for this tier)
- `notIncluded`: optional string listing excluded features (for Basic and Plus)

### Visual details
- Caps block: 2-column grid (`grid-cols-2`), label left in muted text, value right in bold foreground, with a subtle divider between rows
- Delta list: green check icons, bold text, same style as current included items
- "Everything in X, plus:" line styled as a subtle italic muted-foreground intro
- "Not included" footer: single line, small text, muted, no X icons -- just a comma-separated list
- All existing styling (LiquidGlassCard, animated price, badges, CTA buttons) stays unchanged
