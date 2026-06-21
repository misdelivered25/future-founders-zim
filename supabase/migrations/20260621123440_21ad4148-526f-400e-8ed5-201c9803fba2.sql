-- Add status & author_email to testimonials so the public can submit, admin curates
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'approved';
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS author_email text;
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS author_location text;

-- Backfill: anything currently published stays approved
UPDATE public.testimonials SET status = 'approved' WHERE is_published = true;

-- Allow anyone to submit a testimonial (forced pending, never auto-published)
DROP POLICY IF EXISTS "Anyone can submit a testimonial" ON public.testimonials;
CREATE POLICY "Anyone can submit a testimonial"
  ON public.testimonials
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    is_published = false
    AND status = 'pending'
    AND char_length(author_name) BETWEEN 2 AND 120
    AND char_length(quote) BETWEEN 10 AND 2000
    AND (author_role IS NULL OR char_length(author_role) <= 120)
    AND (author_location IS NULL OR char_length(author_location) <= 120)
    AND (author_email IS NULL OR (char_length(author_email) <= 254 AND author_email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'))
  );

-- Tighten the public read policy to only show approved + published
DROP POLICY IF EXISTS "Public reads published testimonials" ON public.testimonials;
CREATE POLICY "Public reads approved published testimonials"
  ON public.testimonials
  FOR SELECT
  TO anon, authenticated
  USING ((is_published = true AND status = 'approved') OR has_role(auth.uid(), 'admin'::app_role));

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.newsletter_subscribers TO anon, authenticated;
GRANT SELECT, DELETE ON public.newsletter_subscribers TO authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON public.newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(email) BETWEEN 3 AND 254
    AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (source IS NULL OR char_length(source) <= 80)
  );

CREATE POLICY "Admins read subscribers"
  ON public.newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins delete subscribers"
  ON public.newsletter_subscribers
  FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Resources library (PDF / link / video) for the new resource library page
CREATE TABLE IF NOT EXISTS public.resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  url text NOT NULL,
  kind text NOT NULL DEFAULT 'link', -- 'link' | 'pdf' | 'video'
  category text,
  cover_url text,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.resources TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.resources TO authenticated;
GRANT ALL ON public.resources TO service_role;

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads published resources"
  ON public.resources FOR SELECT TO anon, authenticated
  USING (is_published = true OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins write resources"
  ON public.resources FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_resources_updated
  BEFORE UPDATE ON public.resources
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
