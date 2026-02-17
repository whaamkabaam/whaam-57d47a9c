

# Move Pricing to Homepage + Pass Framing

## What's Changing

Three things in one go:
1. Replace the old one-time-purchase Products section ($39/$47/$149) with the subscription tier cards (Basic/Plus/Ultra)
2. Reframe daily and weekly as "passes" (one-time purchase, valid for X time) while monthly stays a subscription
3. Remove the standalone `/pricing` page and redirect all links to `/#products`

---

## Copy: Pass vs. Subscription

| Duration | Toggle Label | Price suffix | Microline |
|----------|-------------|-------------|-----------|
| Daily | Day Pass | /day | One-time purchase -- valid for 24 hours |
| Weekly | Week Pass | /week | One-time purchase -- valid for 7 days |
| Monthly | Monthly | /month | Auto-renews monthly -- cancel anytime |

The word "valid" frames it as value you're getting, not a countdown.

---

## Files to Modify (13 files)

### Core pricing components

**`src/components/Products.tsx`** -- Full rewrite
- Replace old $39/$47/$149 one-time plans with DurationToggle + 3 TierCards + collapsible FeatureComparisonTable + LiveSessionCard
- Wire up `useFastSpringCheckout` for checkout flow
- Include `ProcessingModal` for checkout state
- Keep `id="products"` so nav links still work
- Keep the "Why choose WHAAMKABAAM?" benefits section
- Default duration: `monthly`

**`src/components/pricing/DurationToggle.tsx`** -- Update labels
- "Daily" becomes "Day Pass"
- "Weekly" becomes "Week Pass"
- "Monthly" stays "Monthly"

**`src/components/pricing/TierCard.tsx`** -- Update features + dynamic microline
- Pass `duration` prop drives the microline text (pass vs. subscription)
- Updated feature lists per the accurate tier doc:
  - Basic: 5 adj/day, preset buttons (0.5), 5 library, 1 fav, restore last only, no upload, no form settings
  - Plus: 25 adj/day, fine slider (0.1), 20 library, 5 fav, restore any, upload, multiple lineages, no form settings
  - Ultra: unlimited adj, fine slider (0.1), unlimited library, unlimited fav, restore any, upload, multiple lineages, form settings
- Descriptions updated: "Get started with the essentials" / "For serious aimers who want room to tweak" / "Unlimited everything, full control"

**`src/components/pricing/FeatureComparisonTable.tsx`** -- Update rows
- Remove "Feedback precision" row (merge into "Feedback control")
- Add "Restore version" row: Last only / Any / Any
- Add "Multiple lineages" row: No / Yes / Yes
- Update "Feedback control": Buttons (0.5) / Slider (0.1) / Slider (0.1)

### Routing

**`src/App.tsx`**
- Remove `Pricing` import and `/pricing` route
- Add redirect: `/pricing` navigates to `/#products` (so old links/bookmarks still work)

### Internal link updates (7 files)

All `Link to="/pricing"` and `Navigate to="/pricing"` updated to point to `/#products`:

| File | What changes |
|------|-------------|
| `src/components/app/SubscriptionGate.tsx` | `Navigate to="/pricing"` becomes `Navigate to="/#products"` |
| `src/components/app/SubscriptionBanner.tsx` | Two `Link to="/pricing"` become `/#products` |
| `src/components/app/account/SubscriptionCard.tsx` | Two `Link to="/pricing"` become `/#products` |
| `src/components/app/curves/CurveUploadCard.tsx` | `Link to="/pricing"` becomes `/#products` |
| `src/components/app/feedback/UpgradePromptCard.tsx` | `Link to="/pricing"` becomes `/#products` |
| `src/components/app/feedback/ExpiredOverlay.tsx` | `Link to="/pricing"` becomes `/#products` |

### Other updates

**`src/components/StickyCTA.tsx`**
- Change "See plans (from $39)" to "See plans (from $3.99/day)"

**`supabase/functions/upload-review/index.ts`**
- Fix TS18046 build error: `error.message` becomes `(error as Error).message`

---

## What Stays the Same

- All FastSpring checkout infrastructure (hooks, callbacks, config, pricing data)
- LiveSessionCard, ProcessingModal components (reused as-is)
- Dashboard feedback controls and subscription gating logic
- Subscription context and feature access
- All admin functionality

