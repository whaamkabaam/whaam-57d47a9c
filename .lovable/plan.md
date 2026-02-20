

# Premium Tier Card Refinement

Refactor `src/components/pricing/TierCard.tsx` to reduce visual clutter and improve typographic rhythm while keeping the same data architecture.

## Changes

### 1. Caps Block -- remove the box, use open stat chips
Replace the bordered `bg-muted/30 border border-border/50 rounded-lg` container with a borderless 2x2 grid. Each stat uses spacing alone for separation:
- Labels shortened: "Adj/day", "Library", "Favs", "Precision"
- Label: `text-[11px] text-white/50`
- Value: `text-sm font-semibold text-white/90`, right-aligned
- No dividers, no background -- just `gap-x-6 gap-y-1.5` for breathing room
- Outer wrapper gets only a subtle top border (`border-t border-white/[0.06]`) to softly delineate from the price above

### 2. "Best for" line -- pill instead of italic text
Remove `<Target>` icon and italic styling. Render as a subtle pill:
- `px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[11px] text-muted-foreground`
- Centered under the tier name, no icon

### 3. Price spacing and daily cost
- Increase bottom margin on price block (`mb-6`) so price anchors clearly
- Daily cost line: `text-[11px] text-white/40` (smaller, lighter, non-competing)

### 4. Feature list refinements
- Check icon: `w-3.5 h-3.5 text-whaam-yellow/60` (smaller, gold at lower opacity)
- Feature text: `text-sm text-foreground/85 font-normal` (regular weight, not bold)
- "Everything in X, plus:" rendered as `text-[11px] text-white/45 uppercase tracking-wide` (not italic)
- "Not included" line: `text-[11px] text-white/30` with shortened text to avoid wrapping

### 5. Card framing
- Reduce border from `border-2` to `border border-white/[0.08]`
- Popular card: `border-white/[0.15] shadow-lg shadow-secondary/10`
- Add a very subtle inner gradient via a pseudo-element or inline style (top-to-bottom from white/[0.03] to transparent)

### 6. CTA consistency
- All CTAs: identical `h-11 rounded-xl` sizing
- Add `shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]` for pressable glass depth
- Keep yellow glow styling as-is

### 7. "Most Popular" badge
- Move from `-right-3` to centered: `left-1/2 -translate-x-1/2 -top-3`

## File changed
`src/components/pricing/TierCard.tsx` -- update `CapsBlock`, `DeltaFeatures`, and main render layout styling.

## What stays the same
- All data in `tierConfig` (caps, deltaFeatures, includes, notIncluded)
- LiquidGlassCard wrapper and mouse-tracking effects
- Animated price counter and duration label transitions
- Badge images, tier names, CTA logic
- Processing/current-tier states

