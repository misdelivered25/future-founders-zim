import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader, ContentSection } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { img } from "@/lib/images";
import { PiggyBank, TrendingUp, CreditCard, ShieldCheck, LineChart, Receipt } from "lucide-react";

export const Route = createFileRoute("/financial-literacy")({
  head: () => ({
    meta: [
      { title: "Financial Literacy Academy — Future Founders" },
      { name: "description", content: "From budgeting to investing — Future Founders' financial literacy academy gives young people the money skills school never taught." },
      { property: "og:image", content: img.financial },
    ],
  }),
  component: Page,
});

const MODULES = [
  { i: PiggyBank, t: "Money Mindset & Budgeting", d: "Earning, spending, saving — the foundations." },
  { i: ShieldCheck, t: "Personal Finance & Insurance", d: "Protect what you build with smart financial choices." },
  { i: CreditCard, t: "Banking, Mobile Money & Credit", d: "Use modern financial tools without falling into debt." },
  { i: TrendingUp, t: "Saving & Investing", d: "Make your money work — stocks, bonds, real estate, business." },
  { i: LineChart, t: "Business Finance", d: "Read accounts, manage cash flow, price for profit." },
  { i: Receipt, t: "Tax, Records & Compliance", d: "Keep clean books from day one — and sleep well at night." },
];

function Page() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Academy" title="Financial literacy that pays for itself." subtitle="A practical, life-long curriculum: from the first salary to the first business to the first investment portfolio." image={img.financial} />
      <ContentSection>
        <div className="grid lg:grid-cols-3 gap-5">
          {MODULES.map((m) => (
            <div key={m.t} className="bg-card border border-border rounded-2xl p-7 hover:shadow-elegant transition-all">
              <div className="w-12 h-12 rounded-xl bg-royal text-white flex items-center justify-center mb-5"><m.i className="w-6 h-6" /></div>
              <h3 className="font-display text-xl mb-2">{m.t}</h3>
              <p className="text-sm text-muted-foreground">{m.d}</p>
            </div>
          ))}
        </div>
      </ContentSection>
      <ContentSection className="bg-surface">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-4xl mb-4">Start with the money skills that change everything.</h2>
          <p className="text-muted-foreground mb-7">Join the academy — fully free for accepted members.</p>
          <Link to="/join-future-founders"><Button size="lg" className="bg-royal text-white hover:bg-royal/90">Apply now</Button></Link>
        </div>
      </ContentSection>
    </SiteShell>
  );
}
