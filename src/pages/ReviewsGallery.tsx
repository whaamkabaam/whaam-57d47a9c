import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Filter } from "lucide-react";
import { useReviewScreenshots, useGameTags } from "@/hooks/useReviewScreenshots";
import ReviewLightbox from "@/components/ReviewLightbox";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Navigation from "@/components/Navigation";

export default function ReviewsGallery() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { data: screenshots = [], isLoading } = useReviewScreenshots({
    gameTag: selectedTag || undefined,
  });
  const { data: gameTags = [] } = useGameTags();

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection="" />
      
      <main className="container mx-auto px-6 pt-28 pb-16">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <h1 className="text-4xl font-bold glass-text-contrast mb-2">
            Player Reviews
          </h1>
          <p className="text-muted-foreground">
            Real feedback from real players. {screenshots.length} reviews and counting.
          </p>
        </div>

        {/* Filters */}
        {gameTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant={selectedTag === null ? "secondary" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              All Games
            </Button>
            {gameTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "secondary" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        )}

        {/* Masonry Grid */}
        {isLoading ? (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="break-inside-avoid mb-4">
                <Skeleton className="w-full h-48 rounded-lg" />
              </div>
            ))}
          </div>
        ) : screenshots.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No reviews yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {screenshots.map((screenshot, index) => (
              <div
                key={screenshot.id}
                className="break-inside-avoid mb-4 group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden rounded-lg bg-muted">
                  <img
                    src={screenshot.url}
                    alt={screenshot.filename}
                    loading="lazy"
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  />
                  {screenshot.game_tag && (
                    <div className="absolute top-2 left-2 px-2 py-1 rounded bg-secondary/80 text-secondary-foreground text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {screenshot.game_tag}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <ReviewLightbox
          images={screenshots}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
