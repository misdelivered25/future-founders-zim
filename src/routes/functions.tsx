import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, ContentSection } from "@/components/site/SiteShell";
import { img } from "@/lib/images";
import { BookOpen, Briefcase, Users, Coins, Wrench, Megaphone } from "lucide-react";

export const Route = createFileRoute("/functions")({
  head: () => ({
    meta: [
      { title: "Our Functions — Future Founders" },
      { name: "description", content: "Training, mentorship, networking, advocacy, micro-funding and community workshops — the six functions of Future Founders." },
      { property: "og:image", content: img.skills },
    ],
  }),
  component: Page,
});

const FUNCS = [
  { i: BookOpen, t: "Education & Training", d: "Cohort-based academies, weekend workshops and online courses in financial literacy, entrepreneurship, leadership and digital skills." },
  { i: Users, t: "Mentorship", d: "Pair every young learner with an experienced founder, executive or community leader for guided growth." },
  { i: Briefcase, t: "Business Incubation", d: "We help members move from idea to launch — business modelling, branding, registration, marketing and sales." },
  { i: Coins, t: "Micro-Funding & Capital Access", d: "Connect promising young founders with seed micro-grants and partner financing to launch and scale." },
  { i: Wrench, t: "Community Workshops", d: "Public workshops in schools, churches, market squares and on the farm — bringing the academy to where youth are." },
  { i: Megaphone, t: "Advocacy & Voice", d: "We speak up for youth: in policy rooms, in media, and in front of sponsors who can move the needle." },
];

function Page() {
  return (
    <SiteShell>
      <PageHeader eyebrow="How we deliver" title="Our six functions." subtitle="Future Founders is built around six interlocking functions — together they form an end-to-end empowerment engine." image={img.skills} />
      <ContentSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FUNCS.map((f) => (
            <div key={f.t} className="bg-card border border-border rounded-2xl p-7">
              <div className="w-12 h-12 rounded-xl gradient-gold text-white flex items-center justify-center mb-5"><f.i className="w-6 h-6" /></div>
              <h3 className="font-display text-xl mb-2">{f.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </ContentSection>
    </SiteShell>
  );
}
