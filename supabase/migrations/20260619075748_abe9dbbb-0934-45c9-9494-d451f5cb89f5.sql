
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Remove prior schedule if it exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'ff-sync-registrations-5min') THEN
    PERFORM cron.unschedule('ff-sync-registrations-5min');
  END IF;
END $$;

SELECT cron.schedule(
  'ff-sync-registrations-5min',
  '*/5 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://future-founders-zim.lovable.app/api/public/hooks/sync-registrations',
    headers := '{"Content-Type":"application/json","apikey":"sb_publishable_eBZHj6Qk1te6z5vHcAlmVA_gnej1aJF"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);
