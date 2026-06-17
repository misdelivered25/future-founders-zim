import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { img } from "@/lib/images";
import { Building2, Megaphone, Trophy } from "lucide-react";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "Sponsors & Partners — Future Founders" },
      { name: "description", content: "Partner with Future Founders. Sponsor cohorts, host workshops, fund startup capital — and reach Africa's next generation of leaders." },
      { property: "og:image", content: img.skills },
    ],
  }),
  component: Sponsors,
});

const TIERS = [
  { icon: Megaphone, t: "Community Partner", price: "$1,000+", b: ["Logo on community materials", "Recognition at one workshop", "Quarterly impact report"] },
  { icon: Building2, t: "Cohort Sponsor", price: "$5,000+", b: ["Sponsor an entire academy cohort", "Branded session & guest speaker slot", "Year-round logo placement", "Annual impact summit invitation"] },
  { icon: Trophy, t: "Founding Partner", price: "$25,000+", b: ["Multi-year strategic partnership", "Co-branded flagship program", "Board advisory access", "Exclusive press & media moments"] },
];

function Sponsors() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Sponsors & Partners" title="Build the next generation — with us." subtitle="Companies, foundations and individuals fueling Future Founders' mission across Africa." image={img.skills} />

      <section className="py-20">
        <div className="container-prose grid md:grid-cols-3 gap-5">
          {TIERS.map((t, i) => (
            <div key={t.t} className={`p-8 rounded-2xl border ${i === 1 ? "gradient-hero text-background border-primary" : "bg-card border-border"} hover:shadow-elegant transition-all`}>
              <t.icon className={`w-10 h-10 mb-5 ${i === 1 ? "text-gold" : "text-primary"}`} />
              <h3 className={`font-display text-2xl mb-2 ${i === 1 ? "text-background" : ""}`}>{t.t}</h3>
              <p className={`text-3xl font-display mb-5 ${i === 1 ? "text-gold" : "text-primary"}`}>{t.price}</p>
              <ul className={`space-y-2 text-sm mb-8 ${i === 1 ? "text-background/80" : "text-muted-foreground"}`}>
                {t.b.map((x) => <li key={x}>✦ {x}</li>)}
              </ul>
              <Link to="/contact">
                <Button className={`w-full ${i === 1 ? "bg-gold text-ink hover:bg-gold/90" : "bg-primary"}`}>Become a partner</Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="container-prose">
          <h2 className="font-display text-3xl text-center mb-10">Trusted by partners across Africa</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 opacity-70">
            {["Sahara Foundation","Pan-African Ed","NextGen Capital","Lumière Group","UbuntuWorks"].map((n) => (
              <div key={n} className="text-center font-display text-lg text-muted-foreground border border-border rounded-xl py-6 bg-card">{n}</div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
