import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { img } from "@/lib/images";
import { Calendar, MapPin } from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Future Founders" },
      { name: "description", content: "Upcoming workshops, summits and academy cohorts." },
      { property: "og:title", content: "Future Founders Events" },
      { property: "og:description", content: "Find a Future Founders event near you or join online." },
      { property: "og:url", content: "https://future-founders-zim.lovable.app/events" },
      { property: "og:image", content: img.speaking },
    ],
    links: [{ rel: "canonical", href: "https://future-founders-zim.lovable.app/events" }],
  }),
  component: Events,
});

type EventRow = { id: string; slug: string; title: string; description: string | null; starts_at: string; ends_at: string | null; location: string | null; image_url: string | null };

const FALLBACK: EventRow[] = [
  { id: "f1", slug: "#", title: "Future Founders Youth Summit", description: "Our flagship annual gathering.", starts_at: "2026-03-22T09:00:00Z", ends_at: null, location: "Harare, Zimbabwe", image_url: img.speaking },
  { id: "f2", slug: "#", title: "Financial Literacy Bootcamp (Cohort 7)", description: "Hands-on money management training.", starts_at: "2026-04-14T09:00:00Z", ends_at: null, location: "Online + Bulawayo", image_url: img.financial },
  { id: "f3", slug: "#", title: "Young Vendors Marketplace Workshop", description: "From market stall to micro-empire.", starts_at: "2026-05-03T09:00:00Z", ends_at: null, location: "Mutare, Zimbabwe", image_url: img.vendor },
];

function Events() {
  const [events, setEvents] = useState<EventRow[] | null>(null);
  useEffect(() => {
    supabase.from("events").select("id, slug, title, description, starts_at, ends_at, location, image_url")
      .eq("is_published", true)
      .order("starts_at", { ascending: true })
      .then(({ data }) => setEvents((data as EventRow[]) ?? []));
  }, []);

  const list = events && events.length > 0 ? events : events === null ? null : FALLBACK;

  return (
    <SiteShell>
      <PageHeader eyebrow="Events" title="Show up. Connect. Level up." subtitle="Find a Future Founders event near you — or join us online." image={img.speaking} />
      <section className="py-20">
        <div className="container-prose">
          {list === null && <p className="text-center text-muted-foreground">Loading…</p>}
          {list && (
            <div className="grid md:grid-cols-2 gap-6">
              {list.map((e) => (
                <article key={e.id} className="group flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-border bg-card hover:shadow-elegant transition-all">
                  <div className="md:w-48 shrink-0">
                    <div className="aspect-square md:aspect-[4/5] rounded-xl overflow-hidden bg-surface">
                      {e.image_url && <img src={e.image_url} alt={e.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-display text-xl mb-3 leading-tight">{e.title}</h3>
                    {e.description && <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{e.description}</p>}
                    <div className="space-y-1.5 text-sm text-muted-foreground mb-5">
                      <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" />{new Date(e.starts_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}</div>
                      {e.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" />{e.location}</div>}
                    </div>
                    <div className="mt-auto"><Link to="/register"><Button size="sm" className="bg-primary">Reserve a seat</Button></Link></div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
