import { useState } from "react";
import { Link } from "react-router-dom";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { useProgressiveReviewScreenshots } from "@/hooks/useReviewScreenshots";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import ParallaxControls from "@/components/ParallaxControls";

const ReviewsHeader = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-4 md:py-8 px-4 w-full left-0 top-0">
      <h2 className="text-2xl md:text-5xl lg:text-7xl font-bold text-foreground">
        Here are 100+ Reviews from my<br />
        51.000+ Members Discord Server.
      </h2>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-muted-foreground">
        Real feedback from the community. Hover over any review to see details.
      </p>
      <Link
        to="/reviews"
        className="inline-flex items-center gap-2 mt-6 text-primary hover:text-primary/80 transition-colors font-medium"
      >
        View All Reviews <ArrowRight size={18} />
      </Link>
    </div>
  );
};

export default function ReviewsParallax() {
  const { reviews, isInitialLoading, isInitialLoaded } = useProgressiveReviewScreenshots(30);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);

  if (isInitialLoading || !isInitialLoaded) {
    return (
      <div className="h-[200vh] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <Skeleton className="h-20 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="grid grid-cols-3 gap-8 mt-20">
            {Array.from({ length: 9 }).map((_, i) => (
              <Skeleton key={i} className="h-96 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Transform screenshots to product format for HeroParallax
  const products = reviews.map((screenshot, index) => ({
    title: screenshot.game_tag || `Review ${index + 1}`,
    link: "/reviews",
    thumbnail: screenshot.url,
  }));

  // If we have fewer than 15, duplicate to fill rows
  while (products.length < 15 && products.length > 0) {
    products.push({ ...products[products.length % reviews.length] });
  }

  return (
    <>
      <HeroParallax 
        products={products} 
        header={<ReviewsHeader />}
        isPaused={isPaused}
        speedMultiplier={speed}
      />
      <ParallaxControls
        isPaused={isPaused}
        speed={speed}
        onPauseToggle={() => setIsPaused(!isPaused)}
        onSpeedChange={setSpeed}
      />
    </>
  );
}
