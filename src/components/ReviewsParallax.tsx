import { Link } from "react-router-dom";
import { InfiniteMarquee } from "@/components/ui/infinite-marquee";
import { useReviewScreenshots } from "@/hooks/useReviewScreenshots";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";

const ReviewsHeader = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 mb-12 md:mb-16">
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
        Here are 100+ Reviews from my<br />
        <span className="text-primary">51.000+ Members</span> Discord Server.
      </h2>
      <p className="max-w-2xl text-base md:text-lg mt-6 text-muted-foreground">
        Real feedback from the community. Hover over any review to pause and see details.
      </p>
      <Link
        to="/reviews"
        className="inline-flex items-center gap-2 mt-6 text-primary hover:text-primary/80 transition-colors font-medium group"
      >
        View All Reviews 
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};

export default function ReviewsParallax() {
  const { data: screenshots, isLoading } = useReviewScreenshots({ limit: 40 });

  if (isLoading) {
    return (
      <div className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <Skeleton className="h-16 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-4 overflow-hidden">
              {Array.from({ length: 6 }).map((_, j) => (
                <Skeleton key={j} className="h-56 w-72 rounded-xl shrink-0" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Transform screenshots to marquee format
  const images = (screenshots || []).map((screenshot) => ({
    url: screenshot.url,
    title: screenshot.game_tag || "",
  }));

  // If we have fewer than 20, duplicate to fill rows
  while (images.length < 20 && images.length > 0) {
    images.push({ ...images[images.length % screenshots!.length] });
  }

  return (
    <InfiniteMarquee 
      images={images} 
      header={<ReviewsHeader />}
    />
  );
}
