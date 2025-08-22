export default function StoryCards() {
  return (
    <section
      aria-labelledby="story-cards-heading"
      className="relative mx-auto max-w-6xl px-4 py-14 md:py-20"
    >
      <h2 id="story-cards-heading" className="sr-only">
        From problem to solution
      </h2>

      {/* One parent controls the whole pin/stack. Shorter height = tighter scroll. */}
      <div className="relative md:h-[120vh]">
        {/* SHARED CARD CLASSES
            - width: min(78vw, 760px) => narrower, more lines, "playing-card" feel
            - sticky top: 150px => clears the navbar
            - z order: later card sits on top
            - mt offsets create equal spacing between each stacked card
        */}

        {/* Card 1 (bottom) */}
        <article
          className="
            group mx-auto md:w-[min(78vw,760px)] md:min-h-[230px]
            relative rounded-[26px] border border-white/12 bg-white/7
            p-6 md:px-9 md:py-8 backdrop-blur-xl
            shadow-[0_24px_70px_-24px_rgba(0,0,0,0.6)]
            md:sticky md:top-[150px] md:z-10
            md:-rotate-[0.9deg] motion-reduce:transform-none
          "
        >
          <h3 className="text-2xl md:text-[30px] font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
            Aiming can be hard. Face your <span className="inline-block">Issues.</span>
          </h3>
          <div className="mt-3 text-base md:text-lg text-white/90 leading-relaxed space-y-4">
            <p>
              You often feel like your <strong>Sensitivity</strong> is either <strong>too fast</strong> or <strong>too slow</strong>, and
              through that <strong>not precise enough</strong>. So you often feel <strong>frustrated</strong> and feel like it <strong>limits</strong> your full potential as a player.
            </p>
            <p>
              Aiming should just feel <strong>natural</strong> for maximized <strong>confidence</strong> and <strong>fun</strong>.
            </p>
          </div>
        </article>

        {/* Card 2 (middle) */}
        <article
          className="
            group mx-auto md:w-[min(78vw,760px)] md:min-h-[230px]
            relative rounded-[26px] border border-white/12 bg-white/7
            p-6 md:px-9 md:py-8 backdrop-blur-xl
            shadow-[0_24px_70px_-24px_rgba(0,0,0,0.6)]
            md:sticky md:top-[150px] md:z-20 md:mt-[20vh]
            md:rotate-[0.9deg] motion-reduce:transform-none
          "
        >
          <h3 className="text-2xl md:text-[30px] font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
            I know that feeling.
          </h3>
          <div className="mt-3 text-base md:text-lg text-white/90 leading-relaxed space-y-4">
            <p>
              That is how I started four years ago before exploring <strong>Mouse Acceleration</strong>.
            </p>
            <p>
              And within my journey I gained a total of over <strong>1900 RR</strong> in <strong>VALORANT</strong> and have
              <strong> 75k followers</strong> on <strong>TikTok</strong>, where I am known for my Aim.
            </p>
          </div>
        </article>

        {/* Card 3 (top) */}
        <article
          className="
            group mx-auto md:w-[min(78vw,760px)] md:min-h-[230px]
            relative rounded-[26px] border border-white/12 bg-white/7
            p-6 md:px-9 md:py-8 backdrop-blur-xl
            shadow-[0_24px_70px_-24px_rgba(0,0,0,0.6)]
            md:sticky md:top-[150px] md:z-30 md:mt-[40vh]
            md:-rotate-[0.45deg] motion-reduce:transform-none
          "
        >
          <h3 className="text-2xl md:text-[30px] font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
            That is why I want to share my knowledge to help you become your best self.
          </h3>
          {/* No body here on purpose—matches your original card 3 layout/ratio */}
        </article>
      </div>

      {/* Mobile: no sticky, normal vertical stack */}
      <div className="md:hidden mt-8 space-y-6">
        <div className="rounded-[26px] border border-white/12 bg-white/7 p-6 backdrop-blur-xl">
          <h3 className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
            Aiming can be hard. Face your <span className="inline-block">Issues.</span>
          </h3>
          <p className="mt-3 text-white/90 leading-relaxed">
            You often feel like your <strong>Sensitivity</strong> is either <strong>too fast</strong> or <strong>too slow</strong>, and through that <strong>not precise enough</strong>.
            So you often feel <strong>frustrated</strong> and feel like it <strong>limits</strong> your full potential as a player.
            Aiming should just feel <strong>natural</strong> for maximized <strong>confidence</strong> and <strong>fun</strong>.
          </p>
        </div>

        <div className="rounded-[26px] border border-white/12 bg-white/7 p-6 backdrop-blur-xl">
          <h3 className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
            I know that feeling.
          </h3>
          <p className="mt-3 text-white/90 leading-relaxed">
            That is how I started four years ago before exploring <strong>Mouse Acceleration</strong>. I reached <strong>1900 RR</strong> in <strong>VALORANT</strong> and
            have <strong>75k</strong> TikTok followers for my aim work.
          </p>
        </div>

        <div className="rounded-[26px] border border-white/12 bg-white/7 p-6 backdrop-blur-xl">
          <h3 className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
            That is why I want to share my knowledge to help you become your best self.
          </h3>
        </div>
      </div>
    </section>
  );
}