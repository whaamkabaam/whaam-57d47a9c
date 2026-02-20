import { LiquidGlassCard } from '@/components/LiquidGlassEffects';

const limits = [
  { label: 'Adjustments/day', basic: '5', plus: '25', ultra: '∞' },
  { label: 'Library slots', basic: '5', plus: '20', ultra: '∞' },
  { label: 'Favorites', basic: '1', plus: '5', ultra: '∞' },
  { label: 'Precision', basic: '0.5x', plus: '0.1x', ultra: '0.1x' },
];

const tiers = [
  { key: 'basic', label: 'Basic' },
  { key: 'plus', label: 'Plus' },
  { key: 'ultra', label: 'Ultra' },
] as const;

export function KeyLimitsComparator() {
  return (
    <LiquidGlassCard className="border border-white/[0.06] p-4 md:p-6 max-w-5xl mx-auto mb-8">
      <p className="text-[11px] text-white/30 uppercase tracking-wider mb-4 text-center">
        Key limits
      </p>

      {/* Grid: label + 3 value columns */}
      <div className="grid grid-cols-4 gap-y-2 items-center">
        {/* Header row */}
        <div /> {/* empty label cell */}
        {tiers.map((t) => (
          <div
            key={t.key}
            className={`text-center text-xs uppercase tracking-wide ${
              t.key === 'plus' ? 'text-whaam-yellow/60' : 'text-white/50'
            }`}
          >
            {t.label}
          </div>
        ))}

        {/* Data rows */}
        {limits.map((row) => (
          <>
            <div key={`${row.label}-label`} className="text-[11px] text-white/40 pr-4">
              {row.label}
            </div>
            {tiers.map((t) => {
              const val = row[t.key];
              const isInfinity = val === '∞';
              return (
                <div
                  key={`${row.label}-${t.key}`}
                  className={`text-center font-semibold ${
                    isInfinity ? 'text-lg' : 'text-base'
                  } ${
                    t.key === 'plus'
                      ? 'text-whaam-yellow/70'
                      : 'text-white/90'
                  }`}
                >
                  {val}
                </div>
              );
            })}
          </>
        ))}
      </div>
    </LiquidGlassCard>
  );
}
