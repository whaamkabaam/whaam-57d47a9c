

# Dashboard Explainer Section

Add a visual explainer section below the pricing cards (inside `Products.tsx`) and the `/pricing` page that showcases the dashboard experience using the uploaded screenshot.

## New Asset

Copy `user-uploads://image-450.png` to `src/assets/dashboard-preview.png`.

## New Component: `src/components/pricing/DashboardExplainer.tsx`

A self-contained section placed between the Live Session card and the Benefits section. Layout:

- **Header**: centered text block
  - Small muted label: `"What you get inside"` (`text-xs text-white/40 uppercase tracking-wider`)
  - Heading: `"Your AI-powered curve studio"` (`text-2xl md:text-3xl font-bold`)
  - Subtitle: 1-line muted description (`text-sm text-muted-foreground`), e.g. "Play games, rate how it felt, and your curve improves automatically."

- **Screenshot**: the uploaded dashboard image
  - Wrapped in a `LiquidGlassCard` with subtle border (`border-white/[0.08]`)
  - `rounded-xl overflow-hidden` with the image inside at full width
  - Subtle shadow/glow beneath for depth (`shadow-2xl shadow-black/30`)
  - Max width: `max-w-4xl mx-auto`

- **Feature callouts** (optional, below the image): 3 compact inline items in a horizontal row
  - "AI curve generation" / "Feedback sliders" / "Version history"
  - Small icons + muted text, no cards -- just a light annotation row

## Integration

### `src/components/Products.tsx`
Insert `<DashboardExplainer />` between the Live Session card and the Benefits ("Why choose WHAAMKABAAM?") section.

### `src/pages/Pricing.tsx`
Insert `<DashboardExplainer />` between the Live Session card and the closing `</main>`.

## Files Changed

| File | Action |
|------|--------|
| `src/assets/dashboard-preview.png` | Copy uploaded image |
| `src/components/pricing/DashboardExplainer.tsx` | New component |
| `src/components/Products.tsx` | Import and place `DashboardExplainer` |
| `src/pages/Pricing.tsx` | Import and place `DashboardExplainer` |

## What stays the same
- All existing pricing card logic, comparator strip, and benefits section
- Liquid-glass aesthetic and dark background
- No new dependencies needed

