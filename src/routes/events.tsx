import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { img } from "@/lib/images";
import { Calendar, MapPin } from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Future Founders" },
      { name: "description", content: "Upcoming workshops, summits and academy cohorts." },
      { property: "og:image", content: img.speaking },
    ],
  }),
  component: Events,
});

const EVENTS = [
  { img: img.speaking, date: "Mar 22", year: "2026", title: "Future Founders Youth Summit", loc: "Lagos, Nigeria", tag: "Flagship" },
  { img: img.financial, date: "Apr 14", year: "2026", title: "Financial Literacy Bootcamp (Cohort 7)", loc: "Online + Accra", tag: "Cohort" },
  { img: img.vendor, date: "May 03", year: "2026", title: "Young Vendors Marketplace Workshop", loc: "Nairobi, Kenya", tag: "Workshop" },
  { img: img.farmer, date: "Jun 18", year: "2026", title: "Agri-Founders Field Day", loc: "Kigali, Rwanda", tag: "Field" },
];

function Events() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Events" title="Show up. Connect. Level up." subtitle="Find a Future Founders event near you — or join us online." image={img.speaking} />
      <section className="py-20">
        <div className="container-prose grid md:grid-cols-2 gap-6">
          {EVENTS.map((e) => (
            <article key={e.title} className="group flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-border bg-card hover:shadow-elegant transition-all">
              <div className="md:w-48 shrink-0">
                <div className="aspect-square md:aspect-[4/5] rounded-xl overflow-hidden">
                  <img src={e.img} alt={e.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">{e.tag}</span>
                <h3 className="font-display text-2xl mt-2 mb-3">{e.title}</h3>
                <div className="space-y-1.5 text-sm text-muted-foreground mb-5">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" />{e.date}, {e.year}</div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" />{e.loc}</div>
                </div>
                <div className="mt-auto">
                  <Link to="/register"><Button size="sm" className="bg-primary">Reserve a seat</Button></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
