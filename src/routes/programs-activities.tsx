import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader, ContentSection } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { img } from "@/lib/images";
import { CalendarDays, Mic, Users, Wrench, Trophy, Sparkles } from "lucide-react";

export const Route = createFileRoute("/programs-activities")({
  head: () => ({
    meta: [
      { title: "Programs & Activities — Future Founders" },
      { name: "description", content: "Cohort academies, hackathons, founder dinners, school visits, pitch days, community workshops and more — see what we do every month." },
      { property: "og:image", content: img.classroom },
    ],
  }),
  component: Page,
});

const ACTIVITIES = [
  { i: CalendarDays, t: "Cohort Academies", d: "12-week immersive academies in financial literacy and entrepreneurship." },
  { i: Wrench, t: "Weekend Workshops", d: "Practical skill-building Saturdays in cities and rural districts." },
  { i: Mic, t: "Speaker Series", d: "Founders, investors and leaders share lessons from the trenches." },
  { i: Trophy, t: "Pitch Days & Hackathons", d: "Compete, build, win seed funding and visibility." },
  { i: Users, t: "Founder Dinners & Mixers", d: "Curated network nights for serious young entrepreneurs." },
  { i: Sparkles, t: "School & Community Outreach", d: "We bring the academy to schools, churches and youth centres." },
];

function Page() {
  return (
    <SiteShell>
      <PageHeader eyebrow="What we do" title="Programs & activities." subtitle="From multi-week academies to one-day workshops to high-energy pitch nights — there's always something happening at Future Founders." image={img.classroom} />
      <ContentSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACTIVITIES.map((a) => (
            <div key={a.t} className="bg-card border border-border rounded-2xl p-7 hover:shadow-elegant transition-all">
              <div className="w-12 h-12 rounded-xl gradient-gold text-white flex items-center justify-center mb-5"><a.i className="w-6 h-6" /></div>
              <h3 className="font-display text-xl mb-2">{a.t}</h3>
              <p className="text-sm text-muted-foreground">{a.d}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 flex flex-wrap gap-3 justify-center">
          <Link to="/events"><Button size="lg" variant="outline">See upcoming events</Button></Link>
          <Link to="/join-future-founders"><Button size="lg" className="bg-royal text-white hover:bg-royal/90">Join a program</Button></Link>
        </div>
      </ContentSection>
    </SiteShell>
  );
}
