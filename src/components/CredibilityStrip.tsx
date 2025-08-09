import { LiquidGlassCard } from "./LiquidGlassEffects";

export default function CredibilityStrip() {
  return (
    <section aria-label="credibility" className="py-6">
      <div className="container mx-auto px-6">
        <LiquidGlassCard
          variant="secondary"
          className="text-center py-3 px-4 text-sm text-muted-foreground"
        >
          Verified reviews • 55k+ Discord • Trusted by competitive FPS players
        </LiquidGlassCard>
      </div>
    </section>
  );
}
