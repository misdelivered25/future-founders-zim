import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader, ContentSection } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { img } from "@/lib/images";
import { Rocket, Target, Megaphone, BarChart3, Users, Building2 } from "lucide-react";

export const Route = createFileRoute("/entrepreneurship")({
  head: () => ({
    meta: [
      { title: "Entrepreneurship Academy — Future Founders" },
      { name: "description", content: "From idea to launch to scale — Future Founders' entrepreneurship academy turns young dreamers into real founders." },
      { property: "og:image", content: img.vendor },
    ],
  }),
  component: Page,
});

const STAGES = [
  { i: Target, t: "Discover your idea", d: "Identify real problems, real customers and real opportunities." },
  { i: Rocket, t: "Build the MVP", d: "Design, prototype and validate your first product or service." },
  { i: Megaphone, t: "Find your customers", d: "Marketing, branding, storytelling and your first 10 sales." },
  { i: BarChart3, t: "Run the business", d: "Pricing, finance, operations and team — the engine room." },
  { i: Users, t: "Grow your network", d: "Mentors, peers, suppliers, partners — build your founder community." },
  { i: Building2, t: "Scale & sustain", d: "Funding, expansion, hiring and long-term resilience." },
];

function Page() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Academy" title="From dreamer to founder." subtitle="A practical, mentor-led journey through every stage of building a real business — designed for young Africans, taught by people who've done it." image={img.vendor} />
      <ContentSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {STAGES.map((s, i) => (
            <div key={s.t} className="bg-card border border-border rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-display text-royal">0{i + 1}</span>
                <s.i className="w-6 h-6 text-royal/70" />
              </div>
              <h3 className="font-display text-xl mb-2">{s.t}</h3>
              <p className="text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </ContentSection>
      <ContentSection className="bg-ink text-background">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-4xl text-background mb-4">Your first business could start this year.</h2>
          <p className="text-background/75 mb-7">Apply to the next entrepreneurship cohort.</p>
          <Link to="/join-future-founders"><Button size="lg" className="bg-royal text-white hover:bg-royal/90">Join the cohort</Button></Link>
        </div>
      </ContentSection>
    </SiteShell>
  );
}
