// src/components/sections/StoryCards.tsx
export default function StoryCards() {
  return (
    <section
      aria-labelledby="story-cards-heading"
      className="
        relative isolate z-0 mx-auto max-w-6xl px-4 py-14 md:py-20
        md:[--stack-top:196px]           /* more navbar clearance */
        md:[--gap:12vh]                  /* cards not too close (tweak here) */
        md:[--revealComp:2.5vh]          /* tiny compensation because card #3 is shorter */
        md:[--card-w:68vw] md:[--card-max:720px]

        /* Make the parent tall enough so the last card never sticks twice */
        md:[--H:calc(100vh+var(--gap)*2+28rem)]
        md:h-[var(--H)]
      "
    >
      <h2 id="story-cards-heading" className="sr-only">From problem to solution</h2>

      {/* Pin + stack */}
      <div className="relative">
        {/* Card 1 */}
        <article
          className="
            group mx-auto md:w-[var(--card-w)] md:max-w-[var(--card-max)]
            relative rounded-[26px] bg-white/7 backdrop-blur-xl
            shadow-none border-0 p-6 md:px-10 md:py-10
            md:sticky md:top-[var(--stack-top)] md:z-[1] md:-rotate-[0.6deg]
            motion-reduce:transform-none
          "
        >
          <h3 className="text-2xl md:text-[30px] leading-tight tracking-[-0.01em] font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-amber-200 bg-clip-text text-transparent">
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
            group mx-auto md:w-[var(--card-w)] md:max-w-[var(--card-max)]
            relative rounded-[26px] bg-white/7 backdrop-blur-xl
            shadow-none border-0 p-6 md:px-10 md:py-10
            md:sticky md:top-[var(--stack-top)] md:z-[2] md:mt-[var(--gap)] md:rotate-[0.6deg]
            motion-reduce:transform-none
          "
        >
          <h3 className="text-2xl md:text-[30px] leading-tight tracking-[-0.01em] font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-amber-200 bg-clip-text text-transparent">
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
            group mx-auto md:w-[64vw] md:max-w-[680px]
            relative rounded-[26px] bg-white/7 backdrop-blur-xl
            shadow-none border-0 p-6 md:px-9 md:py-8
            md:sticky md:top-[var(--stack-top)] md:z-[3]
            md:mt-[calc(var(--gap)+var(--revealComp))] md:-rotate-[0.4deg]
            motion-reduce:transform-none
            flex flex-col justify-center
          "
        >
          <h3 className="text-2xl md:text-[30px] leading-tight tracking-[-0.01em] font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-amber-200 bg-clip-text text-transparent">
            That is why I want to share my knowledge to help you become your best self.
          </h3>
        </article>

        {/* Spacer so the last card unpins before the next section */}
        <div aria-hidden className="pointer-events-none h-[calc(var(--gap)+16vh)]" />
      </div>

      {/* Mobile (no sticky) unchanged */}
      <div className="md:hidden mt-8 space-y-6">
        <div className="rounded-[26px] border border-white/12 bg-white/7 p-6 backdrop-blur-xl">
          <h3 className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-amber-200 bg-clip-text text-transparent">
            Aiming can be hard. Face your Issues.
          </h3>
          <p className="mt-3 text-white/90 leading-relaxed">
            You often feel like your <strong>Sensitivity</strong> is either <strong>too fast</strong> or <strong>too slow</strong>, and through that <strong>not precise enough</strong>. So you often feel <strong>frustrated</strong> and feel like it <strong>limits</strong> your full potential as a player. Aiming should just feel <strong>natural</strong> for maximized <strong>confidence</strong> and <strong>fun</strong>.
          </p>
        </div>
        <div className="rounded-[26px] border border-white/12 bg-white/7 p-6 backdrop-blur-xl">
          <h3 className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-amber-200 bg-clip-text text-transparent">
            I know that feeling.
          </h3>
          <p className="mt-3 text-white/90 leading-relaxed">
            That is how I started four years ago before exploring <strong>Mouse Acceleration</strong>. I reached <strong>1900 RR</strong> in <strong>VALORANT</strong> and have <strong>75k</strong> TikTok followers for my aim work.
          </p>
        </div>
        <div className="rounded-[26px] border border-white/12 bg-white/7 p-6 backdrop-blur-xl">
          <h3 className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-amber-200 bg-clip-text text-transparent">
            That is why I want to share my knowledge to help you become your best self.
          </h3>
        </div>
      </div>
    </section>
  );
}