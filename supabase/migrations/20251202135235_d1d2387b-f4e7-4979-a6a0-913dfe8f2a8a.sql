-- Create review_screenshots table
CREATE TABLE public.review_screenshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  game_tag TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS with public read access (reviews are public)
ALTER TABLE public.review_screenshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view review screenshots"
ON public.review_screenshots FOR SELECT
TO anon, authenticated
USING (true);

-- Create reviews storage bucket (public for serving images)
INSERT INTO storage.buckets (id, name, public)
VALUES ('reviews', 'reviews', true);

-- Allow public read access for review images
CREATE POLICY "Public read access for reviews"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'reviews');