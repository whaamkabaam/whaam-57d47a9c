
# Fix Nav Bar Height and Round Corners

## Problem
Restoring `w-16 h-16` (64px) made the bar tall again. You want the logo to fill the bar's height without making the bar bigger, plus rounder corners.

## Changes

**File: `src/components/Navigation.tsx`**

1. **Logo size** (line 67): Change `w-16 h-16` to `h-10 w-auto` -- this caps the logo height at 40px and lets width scale proportionally, so it looks full-size relative to the bar without inflating it
2. **Corner radius** (line 54): Change `rounded-2xl` to `rounded-3xl` for softer, more rounded corners
3. **Padding stays** at `py-1` -- with the 40px logo this gives a slim ~48px total bar height

Result: logo fills the bar height naturally, bar stays compact, corners are rounder.
