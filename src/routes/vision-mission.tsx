import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, ContentSection } from "@/components/site/SiteShell";
import { img } from "@/lib/images";
import { Eye, Target } from "lucide-react";

export const Route = createFileRoute("/vision-mission")({
  head: () => ({
    meta: [
      { title: "Vision & Mission — Future Founders" },
      { name: "description", content: "Our vision: a generation of African youth that earns, invests and leads. Our mission: equip 14–39 year-olds with financial literacy, entrepreneurship and leadership." },
      { property: "og:image", content: img.graduate },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Why we exist" title="Vision & Mission." subtitle="A clear north star for a generation that will earn, invest, lead and succeed." image={img.graduate} />
      <ContentSection>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-2xl p-10 shadow-soft">
            <Eye className="w-10 h-10 text-royal mb-5" />
            <p className="text-xs uppercase tracking-[0.25em] text-royal mb-3">Our vision</p>
            <h2 className="font-display text-3xl mb-4">A generation that earns, invests and leads — together.</h2>
            <p className="text-muted-foreground leading-relaxed">
              We see an Africa where every young person between 14 and 39 has the financial literacy, entrepreneurship skills and leadership confidence to build a life of meaning — and to lift their community as they rise.
            </p>
          </div>
          <div className="bg-ink text-background rounded-2xl p-10 shadow-elegant">
            <Target className="w-10 h-10 text-royal mb-5" />
            <p className="text-xs uppercase tracking-[0.25em] text-royal mb-3">Our mission</p>
            <h2 className="font-display text-3xl text-background mb-4">Equip, mentor, launch.</h2>
            <p className="text-background/80 leading-relaxed">
              Future Founders equips young people with practical financial literacy, real-world entrepreneurship training and leadership development — then mentors and supports them as they launch businesses, careers and community projects.
            </p>
          </div>
        </div>
      </ContentSection>
      <ContentSection className="bg-surface">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-royal mb-3">Our promise</p>
          <h2 className="font-display text-4xl md:text-5xl mb-5 text-balance">Learn. Build. Lead. Succeed.</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">Four words. One commitment. To every young African who walks through our doors — physically or digitally — we promise the tools, the network and the runway to build the life and business they imagine.</p>
        </div>
      </ContentSection>
    </SiteShell>
  );
}
