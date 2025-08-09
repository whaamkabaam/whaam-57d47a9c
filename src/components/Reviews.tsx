import { Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { LiquidGlassCard } from "./LiquidGlassEffects";

const reviews = [
  { name: "Verified Player", game: "FPS", stars: 5, headline: "Flicks feel effortless", quote: "Dialed my micro-aim in a day. Crosshair lands exactly where I want." },
  { name: "Verified Player", game: "FPS", stars: 5, headline: "Steadier tracking", quote: "Stopped over-aiming. Tracking heads feels natural and consistent." },
  { name: "Verified Player", game: "FPS", stars: 5, headline: "Instant improvement", quote: "Went from fighting my aim to focusing on game sense. Big difference." },
  { name: "Verified Player", game: "FPS", stars: 5, headline: "Confidence boost", quote: "Same feel across games so I don't waste time relearning." },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} star rating`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} className={` ${i < count ? "fill-current text-secondary" : "text-muted-foreground"}`} />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section aria-labelledby="reviews-heading" className="py-16">
      <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-8 items-stretch">
        <div className="lg:col-span-2">
          <h2 id="reviews-heading" className="text-3xl font-bold glass-text-contrast mb-6">What players say</h2>
          <Carousel>
            <CarouselContent>
              {reviews.map((r, idx) => (
                <CarouselItem key={idx} className="basis-full lg:basis-1/2 pr-6">
                  <LiquidGlassCard variant="secondary" className="p-6 h-full">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-semibold glass-text-contrast">{r.name} — {r.game}</div>
                      <Stars count={r.stars} />
                    </div>
                    <div className="text-sm glass-text-contrast mb-2">{r.headline}</div>
                    <p className="text-sm text-muted-foreground">{r.quote}</p>
                  </LiquidGlassCard>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <LiquidGlassCard variant="accent" className="p-0 overflow-hidden">
          <video
            src="/media/hero-demo.mp4"
            poster="/media/hero-demo.jpg"
            controls
            muted
            className="w-full h-full object-cover"
          />
        </LiquidGlassCard>
      </div>
    </section>
  );
}
