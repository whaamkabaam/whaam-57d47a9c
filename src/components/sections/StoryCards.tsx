// src/components/sections/StoryCards.tsx
import { LiquidGlassCard } from "../LiquidGlassEffects";

export default function StoryCards() {
  return (
    <section
      aria-labelledby="story-cards-heading"
      className="relative isolate z-0 mx-auto max-w-6xl px-4 py-8 md:py-12"
    >
      <h2 id="story-cards-heading" className="sr-only">From problem to solution</h2>

      {/* Sticky container - viewport-based height + bottom padding prevents shift */}
      <div className="relative md:min-h-[150vh] md:pb-24">
        {/* CredibilityStrip */}
        <div className="md:sticky md:top-24 md:z-50 md:h-20 py-4">
          <div className="flex justify-center px-6">
            <LiquidGlassCard
              variant="secondary"
              className="text-center py-3 px-6 text-sm text-muted-foreground max-w-3xl w-full"
            >
              +1100 Real Clients • Instant Start • Real Benefits • 55.000+ Member Discord
            </LiquidGlassCard>
          </div>
        </div>

        {/* Card 1 */}
        <div className="md:sticky md:top-48 md:z-10 h-fit">
          <article
            className="
              group mx-auto md:w-[68vw] md:max-w-[720px] md:min-h-[300px]
              relative rounded-[26px] border border-white/20 bg-gray-900/95
              p-6 md:px-10 md:py-10 shadow-2xl
              overflow-hidden isolate
              md:-rotate-[0.8deg]
              motion-reduce:transform-none
            "
          >
            <h3 className="text-2xl md:text-[30px] leading-tight tracking-[-0.01em] font-extrabold text-gradient-warm">
              Aiming can be hard. Face your Issues.
            </h3>

            <div className="mt-4 text-base md:text-lg text-white/90 leading-relaxed space-y-4">
              <p>
                You often feel like your <strong>Sensitivity</strong> is either <strong>too fast</strong> or <strong>too slow</strong>, and
                through that <strong>not precise enough</strong>. So you often feel <strong>frustrated</strong> and feel like it <strong>limits</strong> your full potential as a player.
              </p>
              <p>
                Aiming should just feel <strong>natural</strong> for maximized <strong>confidence</strong> and <strong>fun</strong>.
              </p>
            </div>
          </article>
        </div>

        {/* Card 2 - margin-top delays entry */}
        <div className="md:sticky md:top-56 md:z-20 md:mt-24 h-fit">
          <article
            className="
              group mx-auto md:w-[68vw] md:max-w-[720px] md:min-h-[300px]
              relative rounded-[26px] border border-white/20 bg-gray-900/95
              p-6 md:px-10 md:py-10 shadow-2xl
              overflow-hidden isolate
              md:rotate-[0.8deg]
              motion-reduce:transform-none
            "
          >
            <h3 className="text-2xl md:text-[30px] leading-tight tracking-[-0.01em] font-extrabold text-gradient-warm">
              I know that feeling.
            </h3>

            <div className="mt-4 text-base md:text-lg text-white/90 leading-relaxed space-y-4">
              <p>
                That is how I started four years ago before exploring <strong>Mouse Acceleration</strong>.
              </p>
              <p>
                And within my journey I gained a total of over <strong>1900 RR</strong> in <strong>VALORANT</strong> and have
                <strong> 75k followers</strong> on <strong>TikTok</strong>, where I am known for my Aim.
              </p>
            </div>
          </article>
        </div>

        {/* Card 3 - margin-top delays entry */}
        <div className="md:sticky md:top-64 md:z-30 md:mt-24 h-fit">
          <article
            className="
              group mx-auto md:w-[68vw] md:max-w-[720px] md:min-h-[240px]
              relative rounded-[26px] border border-white/20 bg-gray-900/95
              p-6 md:px-10 md:py-10 shadow-2xl
              overflow-hidden isolate
              md:-rotate-[0.45deg]
              motion-reduce:transform-none
              flex flex-col justify-center
            "
          >
            <h3 className="text-2xl md:text-[30px] leading-tight tracking-[-0.01em] font-extrabold text-gradient-warm">
              That is why I want to share my knowledge to help you become your best self.
            </h3>
          </article>
        </div>
      </div>

      {/* Mobile (no sticky) */}
      <div className="md:hidden mt-8 space-y-6">
        <div className="rounded-[26px] border border-white/20 bg-gray-900/95 p-6 shadow-2xl">
          <h3 className="text-2xl font-extrabold text-gradient-warm">
            Aiming can be hard. Face your Issues.
          </h3>
          <p className="mt-3 text-white/90 leading-relaxed">
            You often feel like your <strong>Sensitivity</strong> is either <strong>too fast</strong> or <strong>too slow</strong>, and through that <strong>not precise enough</strong>. So you often feel <strong>frustrated</strong> and feel like it <strong>limits</strong> your full potential as a player. Aiming should just feel <strong>natural</strong> for maximized <strong>confidence</strong> and <strong>fun</strong>.
          </p>
        </div>
        <div className="rounded-[26px] border border-white/20 bg-gray-900/95 p-6 shadow-2xl">
          <h3 className="text-2xl font-extrabold text-gradient-warm">
            I know that feeling.
          </h3>
          <p className="mt-3 text-white/90 leading-relaxed">
            That is how I started four years ago before exploring <strong>Mouse Acceleration</strong>. I reached <strong>1900 RR</strong> in <strong>VALORANT</strong> and have <strong>75k</strong> TikTok followers for my aim work.
          </p>
        </div>
        <div className="rounded-[26px] border border-white/20 bg-gray-900/95 p-6 shadow-2xl">
          <h3 className="text-2xl font-extrabold text-gradient-warm">
            That is why I want to share my knowledge to help you become your best self.
          </h3>
        </div>
      </div>
    </section>
  );
}
