import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader, ContentSection } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { img } from "@/lib/images";
import { Target, Compass, Users, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about-future-founders")({
  head: () => ({
    meta: [
      { title: "About Future Founders — Building Tomorrow's Founders" },
      { name: "description", content: "Future Founders is a business network, youth organisation, financial literacy academy and entrepreneurship school empowering youth ages 14–39." },
      { property: "og:title", content: "About Future Founders" },
      { property: "og:description", content: "A movement empowering Africa's next generation of founders." },
      { property: "og:image", content: img.classroom },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <PageHeader eyebrow="About us" title="A movement, not a moment." subtitle="Future Founders is building Africa's next generation of business leaders, financiers and changemakers — one young person at a time." image={img.classroom} />
      <ContentSection>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <img src={img.students} alt="Students collaborating" className="rounded-2xl shadow-elegant" />
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-royal mb-3">Who we are</p>
            <h2 className="font-display text-4xl mb-5">Four things at once — a network, an academy, a school and a community.</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Future Founders is a business network, youth organisation, financial literacy academy and entrepreneurship school. We work with high-school students, university students, young vendors, young farmers, graduates and early-career professionals between the ages of 14 and 39.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We meet young people where they are — in the classroom, on the farm, behind a market stall, or in their first professional role — and walk with them all the way from learning to launching.
            </p>
          </div>
        </div>
      </ContentSection>
      <ContentSection className="bg-surface">
        <div className="max-w-2xl mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-royal mb-3">What drives us</p>
          <h2 className="font-display text-4xl">Why Future Founders exists.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { i: Target, t: "Close the skills gap", d: "School doesn't teach money, business or leadership. We do." },
            { i: Compass, t: "Unleash potential", d: "Every young person carries a founder inside them. We help them out." },
            { i: Users, t: "Build community", d: "A lifetime network of peers, mentors, sponsors and alumni." },
            { i: Sparkles, t: "Create real outcomes", d: "Businesses launched, jobs created, lives changed." },
          ].map((x) => (
            <div key={x.t} className="bg-card border border-border rounded-2xl p-6">
              <div className="w-11 h-11 rounded-xl bg-royal/10 text-royal flex items-center justify-center mb-4"><x.i className="w-5 h-5" /></div>
              <h3 className="font-display text-lg mb-2">{x.t}</h3>
              <p className="text-sm text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </div>
      </ContentSection>
      <ContentSection>
        <div className="bg-ink text-background rounded-3xl p-12 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-background mb-4">Ready to start?</h2>
          <p className="text-background/70 mb-7 max-w-xl mx-auto">Join the academy, build your network, and start writing your founder story today.</p>
          <Link to="/join-future-founders"><Button size="lg" className="bg-royal text-white hover:bg-royal/90">Join Future Founders →</Button></Link>
        </div>
      </ContentSection>
    </SiteShell>
  );
}
