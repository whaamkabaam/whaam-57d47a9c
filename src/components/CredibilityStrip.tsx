import { LiquidGlassCard } from "./LiquidGlassEffects";

export default function CredibilityStrip() {
  return (
    <section aria-label="credibility" className="sticky top-[80px] z-40 py-6">
      <div className="container mx-auto px-6">
        <LiquidGlassCard
          variant="secondary"
          className="text-center py-3 px-4 text-sm text-muted-foreground"
        >
          +1100 Real Clients • Instant Start • Real Benefits • 55.000+ Member Discord
        </LiquidGlassCard>
      </div>
    </section>
  );
}
