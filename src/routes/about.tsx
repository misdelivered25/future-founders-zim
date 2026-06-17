import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { img } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { Target, Eye, Heart, Compass, Award, Handshake } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Future Founders" },
      { name: "description", content: "Future Founders is a business network, youth organisation and financial literacy academy building tomorrow's leaders across Africa." },
      { property: "og:title", content: "About Future Founders" },
      { property: "og:image", content: img.students },
    ],
  }),
  component: About,
});

const VALUES = [
  { icon: Award, t: "Excellence", d: "We pursue mastery in everything we teach and build." },
  { icon: Heart, t: "Empathy", d: "We meet every young person where they are." },
  { icon: Handshake, t: "Integrity", d: "Honest money, honest work, honest leadership." },
  { icon: Compass, t: "Purpose", d: "Skills are tools — purpose is the destination." },
];

function About() {
  return (
    <SiteShell>
      <PageHeader eyebrow="About us" title="A generation rising — together." subtitle="Future Founders exists to equip youth aged 14 to 39 with the knowledge, network and confidence to build their own future." image={img.students} />

      <section className="py-20">
        <div className="container-prose grid lg:grid-cols-2 gap-14 items-center">
          <img src={img.classroom} alt="" loading="lazy" className="rounded-2xl shadow-elegant" />
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Our story</p>
            <h2 className="font-display text-4xl mb-5">We saw a gap. We built a bridge.</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Across our communities, brilliant young minds were leaving school with grades but no game plan — no idea how money works, no business toolkit, no leadership confidence. Future Founders was born to close that gap.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today we run cohort academies, community workshops, mentor networks and startup support — wherever youth are, from high-school halls to market stalls and farming fields.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="container-prose grid md:grid-cols-2 gap-8">
          <div className="p-10 bg-card border border-border rounded-2xl">
            <Eye className="w-10 h-10 text-primary mb-5" />
            <h3 className="font-display text-2xl mb-3">Vision</h3>
            <p className="text-muted-foreground leading-relaxed">A continent where every young person has the financial knowledge, entrepreneurial skill and leadership courage to build a life — and a livelihood — of their own design.</p>
          </div>
          <div className="p-10 gradient-hero text-background rounded-2xl">
            <Target className="w-10 h-10 text-gold mb-5" />
            <h3 className="font-display text-2xl mb-3 text-background">Mission</h3>
            <p className="text-background/85 leading-relaxed">To empower youth aged 14–39 through financial literacy, entrepreneurship, leadership and life-skills training — and to connect them with mentors, capital and a community that lasts a lifetime.</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-prose">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Core values</p>
          <h2 className="font-display text-4xl mb-12">The principles we teach and live.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => (
              <div key={v.t} className="p-7 rounded-2xl border border-border bg-card hover:border-primary/40 transition-colors">
                <v.icon className="w-9 h-9 text-primary mb-4" />
                <h3 className="font-display text-xl mb-2">{v.t}</h3>
                <p className="text-sm text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="container-prose text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Our functions</p>
          <h2 className="font-display text-4xl mb-5">We are a network, an academy and a launchpad — all in one.</h2>
          <p className="text-muted-foreground mb-10">Members get access to learning cohorts, founder circles, mentor matchmaking, micro-grants and community events.</p>
          <Link to="/register"><Button size="lg" className="bg-primary h-12 px-8">Become a member</Button></Link>
        </div>
      </section>
    </SiteShell>
  );
}
