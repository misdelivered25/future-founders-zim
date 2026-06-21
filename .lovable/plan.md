# Future Founders — Full Audit & Upgrade Plan

## Phase 1 — Forms & data capture (must work end-to-end)
- **Registration** (`/register`): wire Zod (`registrationSchema`) instead of ad-hoc checks; add consent checkbox; better duplicate / age messages; success page CTA to WhatsApp + share.
- **Contact** (`/contact`): wire `contactSchema`, length counters, success state.
- **Donation** (`/donate`): wire `donationSchema`, preset amounts, payment-method radios, currency display, success state with WhatsApp follow-up.
- **Testimonial submission**: new public form at `/share-your-story` writing to `testimonials` with `status='pending'`; tighten RLS for anon insert with validation; admin approves.
- **Google Sheets sync**: verify pending → synced flow still runs; surface last-sync status in admin.

## Phase 2 — Public content & SEO
- Add proper per-route `head()` (title, description, og:title, og:description, og:url, og:image, canonical) on every public route — currently many routes share home meta.
- Add `public/robots.txt` + `public/sitemap.xml` listing all public routes.
- Add JSON-LD: Organization on root, Article on blog posts, Event on events, FAQPage on `/faqs`.
- Fill in thin content pages (vision-mission, core-values, who-we-serve, programs-activities, leadership-development, financial-literacy, entrepreneurship, sponsors, faqs) using `futureFoundersContent.ts`.
- Add a real `/blog` index + `/blog/$slug` reading from `blog_posts`.
- Add `/events` list + `/events/$slug` reading from `events`.
- Add `/gallery` reading from `gallery_items`.

## Phase 3 — Visual polish & consistency
- Unify hero treatment using `HeroSlider` across landing + key pages.
- Consistent section rhythm (eyebrow → H2 → body → CTA) via `ContentPage` helper.
- Mobile nav polish (sheet menu, active state, sticky CTA).
- Loading skeletons on data-driven pages; empty states everywhere.
- Toast feedback standardized via `sonner`.
- Image lazy-loading + width/height to stop CLS.

## Phase 4 — Admin dashboard completeness (`/_authenticated/admin`)
- Tabs: Registrations · Contacts · Donations · Testimonials · Blog · Events · Gallery · Sponsors · Sync logs.
- Each tab: search, filter, CSV export, row actions (approve/publish/delete).
- Role gate: only `admin` (via `has_role`) can see admin; non-admin authenticated users get a friendly "request access" screen.
- Add "Trigger sync now" button calling `/api/public/hooks/sync-registrations`.
- Notifications table → simple bell in admin header.

## Phase 5 — Innovations
- **AI assistant** (Lovable AI Gateway): floating "Ask Future Founders" chat that answers from a system prompt about programs / how to join / FAQ; falls back to WhatsApp.
- **Mentor matching teaser**: form on `/programs` capturing area + goal, stored in `registrations` with a flag.
- **Resource library** page pulling from a new `resources` table (PDF / link / video) with category filter.
- **Newsletter** capture in footer → writes to `contacts` with `reason='newsletter'`.
- **Share buttons** + copy-link on blog and events.
- **PWA basics**: manifest + favicon set + theme color.

## Phase 6 — Security & quality
- Re-run security + SEO scans; fix what's actionable.
- Add `errorComponent` + `notFoundComponent` to every route with a loader.
- Wire `sonner` errors consistently; never `console.log` PII.
- Update `@security-memory` and `mem://index.md` with new invariants.

## Technical notes
- All new tables go through one migration with `GRANT`s + RLS scoped properly. Anon writes only on `testimonials` (validated + `status='pending'`) and `contacts` (newsletter).
- Public read-only data uses server publishable client with narrow `TO anon` SELECT policies (blog_posts published, events published, gallery_items published, sponsors active, approved testimonials).
- Per-route `head()` follows the canonical pattern; canonical only on leaves; og:image only on leaves.
- AI features use Lovable AI Gateway (`LOVABLE_API_KEY`) — no extra secrets.

## Delivery order
1. Migration (testimonials anon insert + resources table + sponsors/blog/events read policies).
2. Forms (register, contact, donate, testimonial submit) with Zod + success states.
3. Per-route SEO heads + sitemap/robots + JSON-LD.
4. Content pages + blog/events/gallery list & detail routes.
5. Admin tabs + role gate + CSV/export + sync trigger.
6. Innovations: AI chat, newsletter, resources, share buttons, PWA.
7. Polish pass + scan re-runs + memory updates.

This is roughly 30–40 file changes across ~6 batches. Want me to proceed with all phases, or trim any?
