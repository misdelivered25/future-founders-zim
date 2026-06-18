import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, ContentSection } from "@/components/site/SiteShell";
import { img } from "@/lib/images";
import { Shield, Heart, Lightbulb, Handshake, TrendingUp, Globe } from "lucide-react";

export const Route = createFileRoute("/core-values")({
  head: () => ({
    meta: [
      { title: "Core Values — Future Founders" },
      { name: "description", content: "Integrity, excellence, community, innovation, courage and impact — the six values that shape every Future Founders programme." },
      { property: "og:image", content: img.speaking },
    ],
  }),
  component: Page,
});

const VALUES = [
  { i: Shield, t: "Integrity", d: "We do what we say. Our students, sponsors and communities can trust every word and every figure." },
  { i: TrendingUp, t: "Excellence", d: "We don't deliver 'good enough'. Every workshop, every mentor, every product is built to a standard." },
  { i: Heart, t: "Community", d: "We rise together. No founder is an island — and no learner walks alone." },
  { i: Lightbulb, t: "Innovation", d: "We borrow from the best, then build something better for our context and our youth." },
  { i: Handshake, t: "Courage", d: "We back young people to try, to fail, and to try again. Boldness is built, not born." },
  { i: Globe, t: "Impact", d: "We measure what matters: businesses launched, jobs created, lives changed." },
];

function Page() {
  return (
    <SiteShell>
      <PageHeader eyebrow="What we stand for" title="Core values." subtitle="Six principles that shape every Future Founders programme, partnership and decision." image={img.speaking} />
      <ContentSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((v) => (
            <div key={v.t} className="group bg-card border border-border rounded-2xl p-7 hover:border-royal/40 hover:shadow-elegant transition-all">
              <div className="w-12 h-12 rounded-xl bg-royal/10 text-royal flex items-center justify-center mb-5 group-hover:bg-royal group-hover:text-white transition-colors">
                <v.i className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl mb-2">{v.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </ContentSection>
    </SiteShell>
  );
}
