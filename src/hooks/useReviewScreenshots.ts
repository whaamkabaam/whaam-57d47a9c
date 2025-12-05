import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

export interface ReviewScreenshot {
  id: string;
  filename: string;
  storage_path: string;
  game_tag: string | null;
  is_featured: boolean;
  display_order: number | null;
  created_at: string;
  url: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const PAGE_SIZE = 20;

function getPublicUrl(storagePath: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/reviews/${storagePath}`;
}

export function useReviewScreenshots(options?: {
  featured?: boolean;
  gameTag?: string;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["review-screenshots", options],
    queryFn: async (): Promise<ReviewScreenshot[]> => {
      let query = supabase
        .from("review_screenshots")
        .select("*")
        .order("display_order", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (options?.featured !== undefined) {
        query = query.eq("is_featured", options.featured);
      }

      if (options?.gameTag) {
        query = query.eq("game_tag", options.gameTag);
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) throw error;

      return (data || []).map((item) => ({
        ...item,
        url: getPublicUrl(item.storage_path),
      }));
    },
  });
}

// Infinite scroll version for gallery
export function useInfiniteReviewScreenshots(options?: {
  gameTag?: string;
}) {
  return useInfiniteQuery({
    queryKey: ["review-screenshots-infinite", options],
    queryFn: async ({ pageParam = 0 }): Promise<ReviewScreenshot[]> => {
      let query = supabase
        .from("review_screenshots")
        .select("*")
        .order("created_at", { ascending: false })
        .range(pageParam, pageParam + PAGE_SIZE - 1);

      if (options?.gameTag) {
        query = query.eq("game_tag", options.gameTag);
      }

      const { data, error } = await query;

      if (error) throw error;

      return (data || []).map((item) => ({
        ...item,
        url: getPublicUrl(item.storage_path),
      }));
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length * PAGE_SIZE;
    },
  });
}

export function useGameTags() {
  return useQuery({
    queryKey: ["review-game-tags"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("review_screenshots")
        .select("game_tag")
        .not("game_tag", "is", null);

      if (error) throw error;

      const uniqueTags = [...new Set(data?.map((d) => d.game_tag).filter(Boolean))];
      return uniqueTags as string[];
    },
  });
}

// Progressive loading: first 30 immediately, then lazy load rest
export function useProgressiveReviewScreenshots(initialBatchSize = 30) {
  const [allReviews, setAllReviews] = useState<ReviewScreenshot[]>([]);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  // Load first batch immediately
  const { data: initialBatch, isLoading: isInitialLoading } = useQuery({
    queryKey: ["review-screenshots-initial", initialBatchSize],
    queryFn: async (): Promise<ReviewScreenshot[]> => {
      const { data, error } = await supabase
        .from("review_screenshots")
        .select("*")
        .eq("is_featured", true)
        .order("display_order", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false })
        .limit(initialBatchSize);

      if (error) throw error;

      return (data || []).map((item) => ({
        ...item,
        url: getPublicUrl(item.storage_path),
      }));
    },
  });

  // Lazy load remaining after initial batch is set
  const { data: remainingBatch } = useQuery({
    queryKey: ["review-screenshots-remaining", initialBatchSize],
    queryFn: async (): Promise<ReviewScreenshot[]> => {
      const { data, error } = await supabase
        .from("review_screenshots")
        .select("*")
        .eq("is_featured", true)
        .order("display_order", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false })
        .range(initialBatchSize, 999);

      if (error) throw error;

      return (data || []).map((item) => ({
        ...item,
        url: getPublicUrl(item.storage_path),
      }));
    },
    enabled: isInitialLoaded,
  });

  // Set initial batch
  useEffect(() => {
    if (initialBatch && !isInitialLoaded) {
      setAllReviews(initialBatch);
      setIsInitialLoaded(true);
    }
  }, [initialBatch, isInitialLoaded]);

  // Append remaining batch
  useEffect(() => {
    if (remainingBatch && isInitialLoaded && !isFullyLoaded) {
      setAllReviews((prev) => [...prev, ...remainingBatch]);
      setIsFullyLoaded(true);
    }
  }, [remainingBatch, isInitialLoaded, isFullyLoaded]);

  return {
    reviews: allReviews,
    isInitialLoading,
    isInitialLoaded,
    isFullyLoaded,
  };
}
