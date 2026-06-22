import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://future-founders-zim.lovable.app";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const STATIC_PATHS: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about-future-founders", changefreq: "monthly", priority: "0.8" },
  { path: "/vision-mission", changefreq: "monthly", priority: "0.7" },
  { path: "/core-values", changefreq: "monthly", priority: "0.6" },
  { path: "/functions", changefreq: "monthly", priority: "0.6" },
  { path: "/who-we-serve", changefreq: "monthly", priority: "0.7" },
  { path: "/financial-literacy", changefreq: "monthly", priority: "0.8" },
  { path: "/entrepreneurship", changefreq: "monthly", priority: "0.8" },
  { path: "/leadership-development", changefreq: "monthly", priority: "0.8" },
  { path: "/programs", changefreq: "monthly", priority: "0.7" },
  { path: "/programs-activities", changefreq: "monthly", priority: "0.7" },
  { path: "/events", changefreq: "weekly", priority: "0.7" },
  { path: "/gallery", changefreq: "weekly", priority: "0.6" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/resources", changefreq: "weekly", priority: "0.7" },
  { path: "/testimonials", changefreq: "weekly", priority: "0.7" },
  { path: "/share-your-story", changefreq: "monthly", priority: "0.5" },
  { path: "/sponsors", changefreq: "monthly", priority: "0.6" },
  { path: "/donate", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/faqs", changefreq: "monthly", priority: "0.5" },
  { path: "/register", changefreq: "monthly", priority: "0.9" },
  { path: "/join-future-founders", changefreq: "monthly", priority: "0.9" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [...STATIC_PATHS];

        try {
          const supabase = createClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_PUBLISHABLE_KEY!,
            { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
          );
          const [posts, events] = await Promise.all([
            supabase.from("blog_posts").select("slug, updated_at").eq("is_published", true),
            supabase.from("events").select("slug, updated_at").eq("is_published", true),
          ]);
          (posts.data ?? []).forEach((p: { slug: string; updated_at: string }) =>
            entries.push({ path: `/blog/${p.slug}`, lastmod: p.updated_at, changefreq: "monthly", priority: "0.7" }),
          );
          (events.data ?? []).forEach((e: { slug: string; updated_at: string }) =>
            entries.push({ path: `/events/${e.slug}`, lastmod: e.updated_at, changefreq: "monthly", priority: "0.6" }),
          );
        } catch {
          // Fall back to static-only sitemap on DB error
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ].filter(Boolean).join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
