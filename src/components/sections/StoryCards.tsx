// src/components/sections/StoryCards.tsx
export default function StoryCards() {
  return (
    <section
      aria-labelledby="story-cards-heading"
      className="
        relative isolate z-0 mx-auto max-w-6xl px-4 py-14 md:py-20
        md:[--stack-top:184px]      /* clears the navbar */
        md:[--gap:9.5vh]            /* equal spacing steps between cards */
        md:[--card-w:68vw]          /* narrower for better text wrap */
        md:[--card-max:720px]

        /* heights */
        md:[--h12:300px]            /* #1 & #2 min height */
        md:[--h3:240px]             /* #3 min height (~20% shorter) */

        /* compensation so 2→3 looks same as 1→2 */
        md:[--delta:calc((var(--h12)-var(--h3))/2)]
      "
    >
      <h2 id="story-cards-heading" className="sr-only">From problem to solution</h2>

      {/* Pin + stack */}
      <div className="relative md:h-[122vh]">
        {/* Card 1 */}
        <article
          className="
            group mx-auto md:w-[var(--card-w)] md:max-w-[var(--card-max)] md:min-h-[var(--h12)]
            relative rounded-[26px] border border-white/12 bg-white/7
            p-6 md:px-10 md:py-10 backdrop-blur-xl
            shadow-none overflow-hidden isolate
            md:sticky md:top-[var(--stack-top)] md:z-[1] md:-rotate-[0.8deg]
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

        {/* Card 2 */}
        <article
          className="
            group mx-auto md:w-[var(--card-w)] md:max-w-[var(--card-max)] md:min-h-[var(--h12)]
            relative rounded-[26px] border border-white/12 bg-white/7
            p-6 md:px-10 md:py-10 backdrop-blur-xl
            shadow-none overflow-hidden isolate
            md:sticky md:top-[var(--stack-top)] md:z-[2] md:mt-[var(--gap)] md:rotate-[0.8deg]
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

        {/* Card 3 (headline only, centered) */}
        <article
          className="
            group mx-auto md:w-[var(--card-w)] md:max-w-[var(--card-max)] md:min-h-[var(--h3)]
            relative rounded-[26px] border border-white/12 bg-white/7
            p-6 md:px-10 md:py-10 backdrop-blur-xl
            shadow-none overflow-hidden isolate
            md:sticky md:top-[var(--stack-top)] md:z-[3]
            md:mt-[calc(var(--gap)*1.4-var(--delta))] md:-rotate-[0.45deg]
            motion-reduce:transform-none
            flex flex-col justify-center
          "
        >
          <h3 className="text-2xl md:text-[30px] leading-tight tracking-[-0.01em] font-extrabold text-gradient-warm">
            That is why I want to share my knowledge to help you become your best self.
          </h3>
        </article>

        {/* Spacer so the last card unpins before the next section */}
        <div aria-hidden className="pointer-events-none h-[calc(var(--gap)+16vh)]" />
      </div>

      {/* Mobile (no sticky) unchanged */}
      <div className="md:hidden mt-8 space-y-6">
        <div className="rounded-[26px] border border-white/12 bg-white/7 p-6 backdrop-blur-xl">
          <h3 className="text-2xl font-extrabold text-gradient-warm">
            Aiming can be hard. Face your Issues.
          </h3>
          <p className="mt-3 text-white/90 leading-relaxed">
            You often feel like your <strong>Sensitivity</strong> is either <strong>too fast</strong> or <strong>too slow</strong>, and through that <strong>not precise enough</strong>. So you often feel <strong>frustrated</strong> and feel like it <strong>limits</strong> your full potential as a player. Aiming should just feel <strong>natural</strong> for maximized <strong>confidence</strong> and <strong>fun</strong>.
          </p>
        </div>
        <div className="rounded-[26px] border border-white/12 bg-white/7 p-6 backdrop-blur-xl">
          <h3 className="text-2xl font-extrabold text-gradient-warm">
            I know that feeling.
          </h3>
          <p className="mt-3 text-white/90 leading-relaxed">
            That is how I started four years ago before exploring <strong>Mouse Acceleration</strong>. I reached <strong>1900 RR</strong> in <strong>VALORANT</strong> and have <strong>75k</strong> TikTok followers for my aim work.
          </p>
        </div>
        <div className="rounded-[26px] border border-white/12 bg-white/7 p-6 backdrop-blur-xl">
          <h3 className="text-2xl font-extrabold text-gradient-warm">
            That is why I want to share my knowledge to help you become your best self.
          </h3>
        </div>
      </div>
    </section>
  );
}