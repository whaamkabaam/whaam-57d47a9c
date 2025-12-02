import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { LiquidGlassCard } from "./LiquidGlassEffects";
import { useReviewScreenshots } from "@/hooks/useReviewScreenshots";
import { Skeleton } from "@/components/ui/skeleton";

const textReviews = [
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
  const { data: featuredScreenshots = [], isLoading } = useReviewScreenshots({
    featured: true,
    limit: 8,
  });

  return (
    <section aria-labelledby="reviews-heading" className="py-16">
      <div className="container mx-auto px-6">
        {/* Header with link to full gallery */}
        <div className="flex items-center justify-between mb-6">
          <h2 id="reviews-heading" className="text-3xl md:text-4xl font-bold glass-text-contrast">
            Here are 100+ Reviews from my<br />
            51.000+ Members Discord Server.
          </h2>
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors font-medium"
          >
            See all reviews
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Screenshots Gallery */}
        {(isLoading || featuredScreenshots.length > 0) && (
          <div className="mb-8">
            <Carousel>
              <CarouselContent>
                {isLoading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <CarouselItem key={i} className="basis-full sm:basis-1/2 lg:basis-1/4 pr-4">
                        <Skeleton className="aspect-video rounded-lg" />
                      </CarouselItem>
                    ))
                  : featuredScreenshots.map((screenshot) => (
                      <CarouselItem key={screenshot.id} className="basis-full sm:basis-1/2 lg:basis-1/4 pr-4">
                        <Link to="/reviews" className="block group">
                          <div className="relative overflow-hidden rounded-lg bg-muted aspect-video">
                            <img
                              src={screenshot.url}
                              alt={screenshot.filename}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {screenshot.game_tag && (
                              <div className="absolute top-2 left-2 px-2 py-1 rounded bg-secondary/80 text-secondary-foreground text-xs font-medium">
                                {screenshot.game_tag}
                              </div>
                            )}
                          </div>
                        </Link>
                      </CarouselItem>
                    ))}
              </CarouselContent>
            </Carousel>
          </div>
        )}

        {/* Text Reviews + Video */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          <div className="lg:col-span-2">
            <Carousel>
              <CarouselContent>
                {textReviews.map((r, idx) => (
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
      </div>
    </section>
  );
}
