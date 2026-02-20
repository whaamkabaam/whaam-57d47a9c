

# Smooth Enter/Exit for Daily Cost Line

## Change

Wrap the `~$X.XX/day` line in an `AnimatePresence` + `motion.p` so it fades and slides in/out smoothly when toggling between Day Pass and Week/Monthly.

## File

`src/components/pricing/TierCard.tsx` -- lines 254-258

Replace the conditional `{duration !== 'daily' && (<p>...</p>)}` with:

```tsx
<AnimatePresence>
  {duration !== 'daily' && (
    <motion.p
      key="daily-cost"
      initial={{ opacity: 0, height: 0, marginTop: 0 }}
      animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
      exit={{ opacity: 0, height: 0, marginTop: 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="text-[11px] text-white/35 overflow-hidden"
    >
      ~${animatedDailyCost.toFixed(2)}/day
    </motion.p>
  )}
</AnimatePresence>
```

This animates opacity + height so the element slides in/out without causing a jarring layout jump, matching the smooth feel of the other pricing animations.

