import { LiquidGlassCard } from "./LiquidGlassEffects";

export default function CredibilityStrip() {
  return (
    <section aria-label="credibility" className="sticky top-[100px] z-40 py-8 md:py-10">
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
