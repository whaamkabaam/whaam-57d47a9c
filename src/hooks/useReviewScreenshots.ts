import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
