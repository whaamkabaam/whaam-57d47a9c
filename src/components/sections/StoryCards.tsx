// src/components/sections/StoryCards.tsx
import { LiquidGlassCard } from "../LiquidGlassEffects";

export default function StoryCards() {
  return (
    <section
      aria-labelledby="story-cards-heading"
      className="relative isolate z-0 mx-auto max-w-6xl px-4 py-8 md:py-12"
    >
      <h2 id="story-cards-heading" className="sr-only">From problem to solution</h2>

      {/* CredibilityStrip - simple non-sticky, scrolls normally */}
      <div className="py-4 mb-6">
        <div className="flex justify-center px-6">
          <LiquidGlassCard
            variant="secondary"
            className="text-center py-3 px-6 text-sm text-muted-foreground max-w-3xl w-full"
          >
            +1100 Real Clients • Instant Start • Real Benefits • 55.000+ Member Discord
          </LiquidGlassCard>
        </div>
      </div>

      {/* Card stacking container - cards stack as you scroll */}
      <div className="relative md:min-h-[120vh] md:pb-24">
        {/* Card 1 */}
        <div className="md:sticky md:top-48 md:z-10 h-fit">
          <LiquidGlassCard
            variant="secondary"
            className="mx-auto md:w-[68vw] md:max-w-[720px] md:min-h-[300px] p-6 md:px-10 md:py-10 md:-rotate-[0.8deg] motion-reduce:transform-none"
          >
            <h3 className="text-2xl md:text-[30px] leading-tight tracking-[-0.01em] font-extrabold text-gradient-warm">
              Aiming can be hard. Face your Issues.
            </h3>

            <div className="mt-4 text-base md:text-lg glass-text leading-relaxed space-y-4">
              <p>
                You often feel like your <strong className="glass-text-contrast">Sensitivity</strong> is either <strong className="glass-text-contrast">too fast</strong> or <strong className="glass-text-contrast">too slow</strong>, and
                through that <strong className="glass-text-contrast">not precise enough</strong>. So you often feel <strong className="glass-text-contrast">frustrated</strong> and feel like it <strong className="glass-text-contrast">limits</strong> your full potential as a player.
              </p>
              <p>
                Aiming should just feel <strong className="glass-text-contrast">natural</strong> for maximized <strong className="glass-text-contrast">confidence</strong> and <strong className="glass-text-contrast">fun</strong>.
              </p>
            </div>
          </LiquidGlassCard>
        </div>

        {/* Card 2 - margin-top delays entry */}
        <div className="md:sticky md:top-56 md:z-20 md:mt-16 h-fit">
          <LiquidGlassCard
            variant="secondary"
            className="mx-auto md:w-[68vw] md:max-w-[720px] md:min-h-[300px] p-6 md:px-10 md:py-10 md:rotate-[0.8deg] motion-reduce:transform-none"
          >
            <h3 className="text-2xl md:text-[30px] leading-tight tracking-[-0.01em] font-extrabold text-gradient-warm">
              I know that feeling.
            </h3>

            <div className="mt-4 text-base md:text-lg glass-text leading-relaxed space-y-4">
              <p>
                That is how I started four years ago before exploring <strong className="glass-text-contrast">Mouse Acceleration</strong>.
              </p>
              <p>
                And within my journey I gained a total of over <strong className="glass-text-contrast">1900 RR</strong> in <strong className="glass-text-contrast">VALORANT</strong> and have
                <strong className="glass-text-contrast"> 75k followers</strong> on <strong className="glass-text-contrast">TikTok</strong>, where I am known for my Aim.
              </p>
            </div>
          </LiquidGlassCard>
        </div>

        {/* Card 3 - margin-top delays entry */}
        <div className="md:sticky md:top-64 md:z-30 md:mt-16 h-fit">
          <LiquidGlassCard
            variant="secondary"
            className="mx-auto md:w-[68vw] md:max-w-[720px] md:min-h-[240px] p-6 md:px-10 md:py-10 md:-rotate-[0.45deg] motion-reduce:transform-none flex flex-col justify-center"
          >
            <h3 className="text-2xl md:text-[30px] leading-tight tracking-[-0.01em] font-extrabold text-gradient-warm">
              That is why I want to share my knowledge to help you become your best self.
            </h3>
          </LiquidGlassCard>
        </div>
      </div>

      {/* Mobile (no sticky) */}
      <div className="md:hidden mt-8 space-y-6">
        <LiquidGlassCard variant="secondary" className="p-6">
          <h3 className="text-2xl font-extrabold text-gradient-warm">
            Aiming can be hard. Face your Issues.
          </h3>
          <p className="mt-3 glass-text leading-relaxed">
            You often feel like your <strong className="glass-text-contrast">Sensitivity</strong> is either <strong className="glass-text-contrast">too fast</strong> or <strong className="glass-text-contrast">too slow</strong>, and through that <strong className="glass-text-contrast">not precise enough</strong>. So you often feel <strong className="glass-text-contrast">frustrated</strong> and feel like it <strong className="glass-text-contrast">limits</strong> your full potential as a player. Aiming should just feel <strong className="glass-text-contrast">natural</strong> for maximized <strong className="glass-text-contrast">confidence</strong> and <strong className="glass-text-contrast">fun</strong>.
          </p>
        </LiquidGlassCard>
        <LiquidGlassCard variant="secondary" className="p-6">
          <h3 className="text-2xl font-extrabold text-gradient-warm">
            I know that feeling.
          </h3>
          <p className="mt-3 glass-text leading-relaxed">
            That is how I started four years ago before exploring <strong className="glass-text-contrast">Mouse Acceleration</strong>. I reached <strong className="glass-text-contrast">1900 RR</strong> in <strong className="glass-text-contrast">VALORANT</strong> and have <strong className="glass-text-contrast">75k</strong> TikTok followers for my aim work.
          </p>
        </LiquidGlassCard>
        <LiquidGlassCard variant="secondary" className="p-6">
          <h3 className="text-2xl font-extrabold text-gradient-warm">
            That is why I want to share my knowledge to help you become your best self.
          </h3>
        </LiquidGlassCard>
      </div>
    </section>
  );
}
