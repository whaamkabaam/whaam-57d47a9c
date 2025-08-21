export default function StoryCards() {
  return (
    <section 
      className="relative mx-auto max-w-5xl px-4 py-16 md:py-24"
      aria-labelledby="story-cards-heading"
    >
      {/* Hidden heading for accessibility */}
      <h2 id="story-cards-heading" className="sr-only">
        Our Story: From Problem to Solution
      </h2>

      <div className="space-y-6 md:space-y-0 md:relative">
        {/* Card 1 - Problem */}
        <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out group-hover:-translate-y-1 md:-rotate-[1.5deg] motion-reduce:transform-none motion-reduce:hover:transform-none">
          <h3 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
            Aiming can be hard. Face your issues.
          </h3>
          <p className="mt-3 text-base md:text-lg text-white/90 leading-relaxed">
            You often feel like your sensitivity is either too fast or too slow, and because of that not precise enough. So you get frustrated and it feels like it limits your potential as a player.
            Aiming should feel natural—for confidence and fun.
          </p>
        </div>

        {/* Card 2 - Empathy & Cred */}
        <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out group-hover:-translate-y-1 md:rotate-[1.5deg] md:-mt-12 motion-reduce:transform-none motion-reduce:hover:transform-none motion-reduce:mt-0">
          <h3 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
            I know that feeling.
          </h3>
          <p className="mt-3 text-base md:text-lg text-white/90 leading-relaxed">
            That's how I started four years ago before exploring mouse acceleration. Along the way I reached 1900 RR in VALORANT and grew to 75k+ TikTok followers for my aim work.
          </p>
        </div>

        {/* Card 3 - Promise */}
        <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out group-hover:-translate-y-1 md:-rotate-[0.75deg] md:-mt-12 motion-reduce:transform-none motion-reduce:hover:transform-none motion-reduce:mt-0">
          <h3 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
            That's why I'm here—to help you become your best self.
          </h3>
          <p className="mt-3 text-base md:text-lg text-white/90 leading-relaxed">
            I'll take the guesswork out and tune a curve that feels right for you, so your aim becomes consistent, natural, and confident.
          </p>
        </div>
      </div>
    </section>
  );
}