import { useLayoutEffect, useRef, useState } from "react";

export default function StoryCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const c1Ref = useRef<HTMLDivElement>(null);
  const c2Ref = useRef<HTMLDivElement>(null);
  const c3Ref = useRef<HTMLDivElement>(null);
  const [stackH, setStackH] = useState<number>(0);

  // Measure tallest card + 2*gap so the wrapper has the correct height.
  useLayoutEffect(() => {
    const recalc = () => {
      const s = sectionRef.current ? getComputedStyle(sectionRef.current) : null;
      // read --gap (in px); fallback ~11vh at current viewport
      const gapPx =
        s?.getPropertyValue("--gap")?.trim().endsWith("vh")
          ? (parseFloat(s!.getPropertyValue("--gap")) / 100) * window.innerHeight
          : parseFloat(s?.getPropertyValue("--gap") || "0");

      const h1 = c1Ref.current?.offsetHeight ?? 0;
      const h2 = c2Ref.current?.offsetHeight ?? 0;
      const h3 = c3Ref.current?.offsetHeight ?? 0;
      setStackH(Math.max(h1, h2, h3) + 2 * gapPx);
    };

    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="story-cards-heading"
      className="
        relative isolate z-0 mx-auto max-w-6xl px-4 py-14 md:py-20
        md:[--stack-top:184px]   /* clears navbar */
        md:[--gap:11vh]         /* distance between cards; tune 10–12vh */
      "
    >
      <h2 id="story-cards-heading" className="sr-only">From problem to solution</h2>

      {/* One sticky wrapper for the whole stack */}
      <div
        className="relative md:sticky md:top-[var(--stack-top)]"
        style={{ height: stackH ? `${stackH}px` : undefined }}
      >
        {/* Card 1 */}
        <article
          ref={c1Ref}
          className="
            absolute inset-x-0 top-0
            mx-auto md:w-[68vw] md:max-w-[720px]
            rounded-[26px] bg-white/7 backdrop-blur-xl
            p-6 md:px-10 md:py-10 border-0 shadow-none
            md:-rotate-[0.6deg] motion-reduce:transform-none
          "
        >
          <h3 className="text-2xl md:text-[30px] leading-tight tracking-[-0.01em] font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
            Aiming can be hard. Face your <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">Issues.</span>
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
          ref={c2Ref}
          className="
            absolute inset-x-0 top-[var(--gap)]
            mx-auto md:w-[68vw] md:max-w-[720px]
            rounded-[26px] bg-white/7 backdrop-blur-xl
            p-6 md:px-10 md:py-10 border-0 shadow-none
            md:rotate-[0.6deg] motion-reduce:transform-none
          "
        >
          <h3 className="text-2xl md:text-[30px] leading-tight tracking-[-0.01em] font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
            I know that feeling.
          </h3>
          <div className="mt-4 text-base md:text-lg text-white/90 leading-relaxed space-y-4">
            <p>That is how I started four years ago before exploring <strong>Mouse Acceleration</strong>.</p>
            <p>
              And within my journey I gained a total of over <strong>1900 RR</strong> in <strong>VALORANT</strong> and have
              <strong> 75k followers</strong> on <strong>TikTok</strong>, where I am known for my Aim.
            </p>
          </div>
        </article>

        {/* Card 3 (headline only) */}
        <article
          ref={c3Ref}
          className="
            absolute inset-x-0 top-[calc(var(--gap)*2)]
            mx-auto md:w-[64vw] md:max-w-[680px]  /* slightly smaller so the stack peeks (≈15–20%) */
            rounded-[26px] bg-white/7 backdrop-blur-xl
            p-6 md:px-9 md:py-8 border-0 shadow-none
            md:-rotate-[0.4deg] motion-reduce:transform-none
            flex flex-col justify-center
          "
        >
          <h3 className="text-2xl md:text-[30px] leading-tight tracking-[-0.01em] font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
            That is why I want to share my knowledge to help you become your best self.
          </h3>
        </article>
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