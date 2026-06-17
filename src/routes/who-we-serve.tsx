import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { img } from "@/lib/images";

export const Route = createFileRoute("/who-we-serve")({
  head: () => ({
    meta: [
      { title: "Who We Serve — Future Founders" },
      { name: "description", content: "Future Founders empowers high school students, university students, young vendors, young farmers and emerging professionals aged 14–39." },
      { property: "og:image", content: img.farmer },
    ],
  }),
  component: WhoWeServe,
});

const SEGMENTS = [
  { img: img.classroom, t: "High school students (14–18)", d: "Discover money, business and leadership early — before the world hands you bills." },
  { img: img.students, t: "University students (18–25)", d: "Turn your degree into a launchpad with practical business and finance skills." },
  { img: img.vendor, t: "Young vendors (18–35)", d: "Run your hustle like a real business — pricing, profit, growth, capital." },
  { img: img.farmer, t: "Young farmers (18–39)", d: "Modern agribusiness models, post-harvest finance and market access." },
  { img: img.graduate, t: "Graduates & professionals (22–39)", d: "Lead with confidence, invest with knowledge, build wealth on purpose." },
  { img: img.speaking, t: "Community youth groups", d: "Group cohorts for clubs, churches, NGOs and youth associations." },
];

function WhoWeServe() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Who we serve" title="Every young African with the courage to start." subtitle="Our doors are open to youth 14–39 across every walk of life." image={img.farmer} />
      <section className="py-20">
        <div className="container-prose grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEGMENTS.map((s) => (
            <div key={s.t} className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-elegant transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={s.img} alt={s.t} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl mb-2">{s.t}</h3>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
