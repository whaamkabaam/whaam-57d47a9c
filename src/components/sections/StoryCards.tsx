export default function StoryCards() {
  return (
    <section
      className="relative mx-auto max-w-5xl px-4 py-16 md:py-24"
      aria-labelledby="story-cards-heading"
    >
      <h2 id="story-cards-heading" className="sr-only">
        Our Story: From Problem to Solution
      </h2>

      {/* Each wrapper has height to allow the sticky card to pin.
          On desktop, all cards share the same top so they stack.
          On mobile we disable sticky and show normal stacked blocks. */}
      <div className="space-y-8 md:space-y-0">
        {/* Card 1 */}
        <div className="md:h-[120vh]">
          <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] md:sticky md:top-24 z-30 md:-rotate-[1.5deg] motion-reduce:transform-none">
            <h3 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
              Aiming can be hard. Face your issues.
            </h3>
            <p className="mt-3 text-base md:text-lg text-white/90 leading-relaxed">
              You often feel like your sensitivity is either <strong>too fast</strong> or <strong>too slow</strong>, and because of that not precise enough. So you get frustrated and it feels like it limits your potential as a player. Aiming should feel <strong>natural</strong>—for confidence and fun.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="md:h-[120vh] md:-mt-24">
          <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] md:sticky md:top-24 z-20 md:rotate-[1.5deg] motion-reduce:transform-none">
            <h3 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
              I know that feeling.
            </h3>
            <p className="mt-3 text-base md:text-lg text-white/90 leading-relaxed">
              That's how I started four years ago before exploring <strong>mouse acceleration</strong>. Along the way I reached <strong>1900 RR in VALORANT</strong> and grew to <strong>75k+ TikTok followers</strong> for my aim work.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="md:h-[120vh] md:-mt-24">
          <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] md:sticky md:top-24 z-10 md:-rotate-[0.75deg] motion-reduce:transform-none">
            <h3 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
              That's why I'm here—to help you become your best self.
            </h3>
            <p className="mt-3 text-base md:text-lg text-white/90 leading-relaxed">
              I'll take the guesswork out and tune a curve that feels right for <strong>you</strong>, so your aim becomes consistent, natural, and confident.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}