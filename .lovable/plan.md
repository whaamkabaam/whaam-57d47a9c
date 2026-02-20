

# Add Inter Font Globally

## Problem

The CSS already declares `font-family: 'Inter', sans-serif` on the body, but Inter is never imported -- so the browser falls back to the default system sans-serif. The font needs to be loaded and also set in the Tailwind config so utility classes respect it too.

## Changes

### 1. Load Inter from Google Fonts

**File: `index.html`** -- Add a `<link>` to Google Fonts in the `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
```

### 2. Set Inter as the default font in Tailwind

**File: `tailwind.config.ts`** -- Add `fontFamily` to `theme.extend`:

```ts
fontFamily: {
  sans: ['Inter', 'sans-serif'],
},
```

This ensures every Tailwind `font-sans` class (which is the default body font) uses Inter.

### 3. Keep existing CSS declaration

**File: `src/index.css`** -- The existing `font-family: 'Inter', sans-serif` on `body` (line 212) stays as-is. No change needed there.

---

Three small additions across two files. Every element on the site will render in Inter.

