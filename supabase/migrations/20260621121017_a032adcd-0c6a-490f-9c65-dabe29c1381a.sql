
CREATE SCHEMA IF NOT EXISTS extensions;
DROP EXTENSION IF EXISTS pg_net;
CREATE EXTENSION pg_net WITH SCHEMA extensions;

DROP POLICY IF EXISTS "Anyone can submit a registration" ON public.registrations;
CREATE POLICY "Anyone can submit a registration" ON public.registrations
FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(full_name) BETWEEN 1 AND 120
  AND char_length(email) BETWEEN 3 AND 254
  AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(phone_number) BETWEEN 5 AND 32
  AND char_length(whatsapp_number) BETWEEN 5 AND 32
  AND age BETWEEN 10 AND 120
  AND char_length(gender) BETWEEN 1 AND 32
  AND char_length(area_of_interest) BETWEEN 1 AND 200
  AND char_length(reason_for_joining) BETWEEN 1 AND 2000
  AND (location IS NULL OR char_length(location) <= 200)
  AND (school_university_business IS NULL OR char_length(school_university_business) <= 200)
);

DROP POLICY IF EXISTS "Anyone can submit a contact message" ON public.contacts;
CREATE POLICY "Anyone can submit a contact message" ON public.contacts
FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(full_name) BETWEEN 1 AND 120
  AND char_length(email) BETWEEN 3 AND 254
  AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(message) BETWEEN 1 AND 4000
  AND (phone_number IS NULL OR char_length(phone_number) <= 32)
  AND (reason IS NULL OR char_length(reason) <= 200)
);

DROP POLICY IF EXISTS "Anyone can submit a donation pledge" ON public.donations;
CREATE POLICY "Anyone can submit a donation pledge" ON public.donations
FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(donor_name) BETWEEN 1 AND 120
  AND char_length(email) BETWEEN 3 AND 254
  AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND amount > 0 AND amount <= 1000000
  AND char_length(currency) BETWEEN 3 AND 8
  AND char_length(impact_area) BETWEEN 1 AND 200
  AND (message IS NULL OR char_length(message) <= 2000)
  AND (phone_number IS NULL OR char_length(phone_number) <= 32)
  AND status = 'pending'
);

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
