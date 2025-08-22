export default function StoryCards() {
  return (
    <section
      className="relative mx-auto max-w-6xl px-4 py-14 md:py-20"
      aria-labelledby="story-cards-heading"
    >
      <h2 id="story-cards-heading" className="sr-only">From problem to solution</h2>

      {/* One shared sticky parent. Shorter height = less scroll. */}
      <div className="relative md:h-[130vh]"> {/* was 145vh */}
        {/* Card 1 (bottom) */}
        <article
          className="
            group mx-auto md:w-[min(92vw,980px)] md:min-h-[220px]
            relative rounded-[26px] border border-white/12 bg-white/7
            p-6 md:px-10 md:py-8 backdrop-blur-xl
            shadow-[0_24px_70px_-24px_rgba(0,0,0,0.6)]
            md:sticky md:top-[124px] md:z-10
            md:-rotate-[0.9deg]
            motion-reduce:transform-none
          "
        >
          <h3 className="text-2xl md:text-[28px] font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
            Aiming can be hard. Face your issues.
          </h3>
          <p className="mt-3 text-base md:text-lg text-white/90 leading-relaxed">
            You often feel like your sensitivity is either <strong>too fast</strong> or{" "}
            <strong>too slow</strong>, and because of that not precise enough. So you get
            frustrated and it feels like it <strong>limits your potential</strong> as a player.
            Aiming should feel <strong>natural</strong>—for confidence and fun.
          </p>
        </article>

        {/* Card 2 (middle) – enters sooner, same sticky top */}
        <article
          className="
            group mx-auto md:w-[min(92vw,980px)] md:min-h-[220px]
            relative rounded-[26px] border border-white/12 bg-white/7
            p-6 md:px-10 md:py-8 backdrop-blur-xl
            shadow-[0_24px_70px_-24px_rgba(0,0,0,0.6)]
            md:sticky md:top-[124px] md:z-20 md:mt-[20vh]  /* was 28vh */
            md:rotate-[0.9deg]
            motion-reduce:transform-none
          "
        >
          <h3 className="text-2xl md:text-[28px] font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
            I know that feeling.
          </h3>
          <p className="mt-3 text-base md:text-lg text-white/90 leading-relaxed">
            That's how I started four years ago before exploring <strong>mouse acceleration</strong>.
            Along the way I reached <strong>1900 RR in VALORANT</strong> and grew to
            <strong> 75k+ TikTok followers</strong> for my aim work.
          </p>
        </article>

        {/* Card 3 (top) – newest sits on top */}
        <article
          className="
            group mx-auto md:w-[min(92vw,980px)] md:min-h-[220px]
            relative rounded-[26px] border border-white/12 bg-white/7
            p-6 md:px-10 md:py-8 backdrop-blur-xl
            shadow-[0_24px_70px_-24px_rgba(0,0,0,0.6)]
            md:sticky md:top-[124px] md:z-30 md:mt-[40vh]  /* was 56vh */
            md:-rotate-[0.45deg]
            motion-reduce:transform-none
          "
        >
          <h3 className="text-2xl md:text-[28px] font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
            That's why I'm here—to help you become your best self.
          </h3>
          <p className="mt-3 text-base md:text-lg text-white/90 leading-relaxed">
            I'll take the guesswork out and tune a curve that feels right for <strong>you</strong>,
            so your aim becomes consistent, natural, and confident.
          </p>
        </article>
      </div>

      {/* Mobile fallback (no sticky) */}
      <div className="md:hidden space-y-6 mt-8">
        <div className="rounded-[26px] border border-white/12 bg-white/7 p-6 backdrop-blur-xl">
          <h3 className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
            Aiming can be hard. Face your issues.
          </h3>
          <p className="mt-3 text-white/90 leading-relaxed">
            You often feel like your sensitivity is either too fast or too slow…
          </p>
        </div>
        <div className="rounded-[26px] border border-white/12 bg-white/7 p-6 backdrop-blur-xl">
          <h3 className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
            I know that feeling.
          </h3>
          <p className="mt-3 text-white/90 leading-relaxed">That's how I started four years ago…</p>
        </div>
        <div className="rounded-[26px] border border-white/12 bg-white/7 p-6 backdrop-blur-xl">
          <h3 className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
            That's why I'm here—to help you become your best self.
          </h3>
          <p className="mt-3 text-white/90 leading-relaxed">I'll take the guesswork out…</p>
        </div>
      </div>
    </section>
  );
}