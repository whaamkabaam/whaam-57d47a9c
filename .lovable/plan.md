
# Add Line Break in ThreeSteps Heading

## Change
In `src/components/ThreeSteps.tsx` (line 33), wrap "in 3 easy steps:" in a `<br />` + `<span>` so it renders on a new line visually, but the full text stays in a single `<h2>` for SEO (search engines ignore `<br>` tags).

From:
```
Become the best Aimer you can be in 3 easy steps:
```

To:
```
Become the best Aimer you can be<br />in 3 easy steps:
```

Single line change, no structural or SEO impact.
