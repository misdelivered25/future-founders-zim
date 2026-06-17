import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { img } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { Coins, Briefcase, Users, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — Future Founders" },
      { name: "description", content: "Financial literacy, entrepreneurship, leadership and life-skills programs for youth aged 14–39." },
      { property: "og:image", content: img.skills },
    ],
  }),
  component: Programs,
});

const PROGRAMS = [
  { icon: Coins, color: "from-amber-400 to-yellow-600", title: "Financial Literacy Academy", image: img.financial,
    desc: "Master the language of money: budgeting, saving, investing, credit, taxes, and personal finance fundamentals.",
    bullets: ["Personal money management", "Saving & investment basics", "Avoiding debt traps", "Building generational wealth"] },
  { icon: Briefcase, color: "from-blue-500 to-indigo-700", title: "Entrepreneurship Academy", image: img.vendor,
    desc: "Turn ideas into income. From identifying opportunities to launching, marketing and scaling a real business.",
    bullets: ["Idea validation & business modelling", "Sales, marketing & branding", "Operations & bookkeeping", "Pitch & micro-funding access"] },
  { icon: Users, color: "from-emerald-500 to-teal-700", title: "Leadership Development", image: img.speaking,
    desc: "Confidence, communication and ethics — the leadership toolkit every founder and professional needs.",
    bullets: ["Public speaking & storytelling", "Team building & emotional intelligence", "Ethical decision-making", "Mentor pairing"] },
  { icon: Sparkles, color: "from-violet-500 to-fuchsia-700", title: "Life & Digital Skills", image: img.skills,
    desc: "The future-ready capabilities employers and customers reward — productivity, tech and self-management.",
    bullets: ["Critical & creative thinking", "Digital literacy & AI tools", "Time & goal management", "Career & CV coaching"] },
];

function Programs() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Programs" title="Four academies. One unstoppable generation." subtitle="Our curriculum is built around four pillars that work together — because real founders need more than one kind of intelligence." image={img.skills} />

      <section className="py-20">
        <div className="container-prose space-y-20">
          {PROGRAMS.map((p, i) => (
            <div key={p.title} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}>
              <div className="relative">
                <div className={`absolute -inset-4 rounded-3xl bg-gradient-to-br ${p.color} opacity-20 blur-2xl`} />
                <img src={p.image} alt={p.title} loading="lazy" className="relative rounded-2xl shadow-elegant w-full" />
              </div>
              <div>
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} text-white mb-5`}>
                  <p.icon className="w-7 h-7" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl mb-4">{p.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-5">{p.desc}</p>
                <ul className="space-y-2 mb-7">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm"><span className="text-primary mt-1">✦</span>{b}</li>
                  ))}
                </ul>
                <Link to="/register">
                  <Button className="bg-primary">Enrol in this program <ArrowRight className="ml-2 w-4 h-4" /></Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
