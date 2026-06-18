import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader, ContentSection } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { img } from "@/lib/images";
import { Mic, Users, Compass, BrainCircuit, Heart, Award } from "lucide-react";

export const Route = createFileRoute("/leadership-development")({
  head: () => ({
    meta: [
      { title: "Leadership Development — Future Founders" },
      { name: "description", content: "Public speaking, ethics, team building and emotional intelligence — develop the leadership confidence to build, lead and inspire." },
      { property: "og:image", content: img.speaking },
    ],
  }),
  component: Page,
});

const TRACKS = [
  { i: Mic, t: "Public Speaking & Communication", d: "Speak up. Pitch. Persuade. Inspire rooms big and small." },
  { i: BrainCircuit, t: "Critical Thinking", d: "Think clearly, decide well, solve hard problems with confidence." },
  { i: Users, t: "Team & People Skills", d: "Recruit, motivate, lead and grow a high-performing team." },
  { i: Heart, t: "Emotional Intelligence", d: "Self-awareness, empathy, resilience — the inner game of leadership." },
  { i: Compass, t: "Ethics & Integrity", d: "Lead with values. Build trust that compounds for decades." },
  { i: Award, t: "Vision & Strategy", d: "Set the direction, rally the team, deliver the outcome." },
];

function Page() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Academy" title="Leadership that earns trust." subtitle="The skills that turn a smart young person into the leader their team, business and community follow." image={img.speaking} />
      <ContentSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TRACKS.map((t) => (
            <div key={t.t} className="bg-card border border-border rounded-2xl p-7">
              <div className="w-12 h-12 rounded-xl bg-royal/10 text-royal flex items-center justify-center mb-5"><t.i className="w-6 h-6" /></div>
              <h3 className="font-display text-xl mb-2">{t.t}</h3>
              <p className="text-sm text-muted-foreground">{t.d}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/join-future-founders"><Button size="lg" className="bg-royal text-white hover:bg-royal/90">Develop your leadership</Button></Link>
        </div>
      </ContentSection>
    </SiteShell>
  );
}
