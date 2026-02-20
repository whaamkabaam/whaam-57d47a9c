

# Fix Compact Navbar Gap for Logged-In State + Bigger Logo

## Problem

The compact (scrolled) navbar uses a fixed `max-w-[620px]` regardless of auth state. When logged in, there are fewer right-side items (just "Studio" vs "Sign In" + "See Plans"), leaving a massive empty gap between the logo and the nav links.

## Changes

**File: `src/components/Navigation.tsx`**

| What | Before | After |
|------|--------|-------|
| Logo size | `w-14 h-14` (56px) | `w-16 h-16` (64px) |
| Compact max-width | Always `max-w-[620px]` | `max-w-[500px]` when authenticated, `max-w-[620px]` when logged out |

The compact width is now auth-aware:
- Logged in: 4 nav items + Studio button = ~500px is snug
- Logged out: 4 nav items + Sign In + See Plans = ~620px fits

The `isLoading` placeholder (`w-[140px]`) keeps the logged-out width as default during load to prevent layout shift.

### Technical detail

Line 57 changes from:
```
scrolled ? 'max-w-[620px] mx-auto' : 'max-w-[1400px] mx-auto'
```
to:
```
scrolled
  ? (isAuthenticated ? 'max-w-[500px] mx-auto' : 'max-w-[620px] mx-auto')
  : 'max-w-[1400px] mx-auto'
```

Line 67 changes from `w-14 h-14` to `w-16 h-16`.

Two lines, no structural changes.
