import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { img } from "@/lib/images";
import { GraduationCap, Briefcase, BookOpen, Bus, Rocket, HandHeart } from "lucide-react";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Future Founders" },
      { name: "description", content: "Sponsor a learner, fund a workshop, or back a young founder. Every donation builds the next generation." },
      { property: "og:image", content: img.graduate },
    ],
  }),
  component: Donate,
});

const IMPACT = [
  { icon: GraduationCap, t: "Sponsor a learner", d: "Cover a full Future Founders academy seat for one young person.", a: "from $25 / month" },
  { icon: BookOpen, t: "Support a workshop", d: "Bring a community workshop to a school, market or village.", a: "from $150" },
  { icon: Briefcase, t: "Training materials", d: "Workbooks, devices and digital licences for our cohorts.", a: "from $50" },
  { icon: Bus, t: "Support transport", d: "Help rural youth reach training centres safely.", a: "from $20 / week" },
  { icon: Rocket, t: "Youth startup funding", d: "Micro-grants for graduates ready to launch.", a: "from $500" },
  { icon: HandHeart, t: "Community outreach", d: "Fund mentor visits, scholarships and outreach drives.", a: "any amount" },
];

function Donate() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Donate" title="Build a founder. Change a future." subtitle="100% of your donation goes directly into youth empowerment programs." image={img.graduate} />
      <section className="py-20">
        <div className="container-prose grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {IMPACT.map((i) => (
            <div key={i.t} className="p-7 rounded-2xl border border-border bg-card hover:border-gold/40 hover:shadow-elegant transition-all">
              <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center mb-5 text-ink">
                <i.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl mb-2">{i.t}</h3>
              <p className="text-sm text-muted-foreground mb-4">{i.d}</p>
              <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-5">{i.a}</p>
              <Button className="w-full bg-primary">Donate now</Button>
            </div>
          ))}
        </div>
      </section>
      <section className="py-16 bg-surface">
        <div className="container-prose text-center max-w-2xl">
          <h2 className="font-display text-3xl mb-3">Prefer to give once?</h2>
          <p className="text-muted-foreground mb-6">One-time gifts, recurring monthly donations and corporate matching all welcome. Reach out for partnership packages.</p>
          <Button size="lg" className="bg-gold text-ink hover:bg-gold/90 font-semibold">Make a one-time gift</Button>
        </div>
      </section>
    </SiteShell>
  );
}
