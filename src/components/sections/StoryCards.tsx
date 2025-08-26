import { useLayoutEffect, useRef, useState } from "react";

export default function StoryCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const c1Ref = useRef<HTMLDivElement>(null);
  const c2Ref = useRef<HTMLDivElement>(null);
  const c3Ref = useRef<HTMLDivElement>(null);
  const [y2, setY2] = useState(0);    // translateY for card 2
  const [y3, setY3] = useState(0);    // translateY for card 3

  // helper to read --gap in px
  const readGapPx = () => {
    const s = getComputedStyle(sectionRef.current!);
    const raw = s.getPropertyValue("--gap").trim();
    const n = parseFloat(raw);
    return raw.endsWith("vh") ? (n / 100) * window.innerHeight : n;
  };

  // measure + scroll progress
  useLayoutEffect(() => {
    let rAF = 0;
    const onScroll = () => {
      if (rAF) return;
      rAF = requestAnimationFrame(() => {
        rAF = 0;
        const gap = readGapPx();                 // distance between cards
        const stackTop = parseFloat(getComputedStyle(sectionRef.current!).getPropertyValue("--stack-top"));
        const railTop = railRef.current!.getBoundingClientRect().top; // moves while wrapper is sticky
        const span = gap * 1.8;                  // scroll span for animation (≈ 1.8–2 * gap)

        // progress 0..1 while the rail passes the sticky top
        const p = Math.min(1, Math.max(0, (stackTop - railTop) / span));

        // card2: from top = gap → top = 0
        setY2(-gap * p);

        // card3: from top = 2*gap → top = gap (leave ~20% reveal)
        const reveal = gap * 0.2;                // keep 15–20% visible
        setY3(-(gap - reveal) * p);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rAF) cancelAnimationFrame(rAF);
    };
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
        ref={stickyRef}
        className="relative md:sticky md:top-[var(--stack-top)]"
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
          style={{ transform: `translateY(${y2}px)` }}
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
          style={{ transform: `translateY(${y3}px)` }}
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

      {/* tiny progress rail = the scroll distance used for the animation */}
      <div ref={railRef} aria-hidden className="h-[calc(var(--gap)*1.8)]" />

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