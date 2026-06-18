import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader, ContentSection } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { img } from "@/lib/images";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/join-future-founders")({
  head: () => ({
    meta: [
      { title: "Join Future Founders — Apply Now" },
      { name: "description", content: "Apply to join Future Founders. Free academy membership for young Africans 14–39 ready to learn, build, lead and succeed." },
      { property: "og:image", content: img.graduate },
    ],
  }),
  component: Page,
});

const BENEFITS = [
  "Free access to all academies and workshops",
  "Lifetime membership of the founder network",
  "Personal mentor matched to your goals",
  "Eligibility for micro-grant funding",
  "Invitations to events, dinners and pitch days",
  "A community of peers building alongside you",
];

function Page() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Apply" title="Join Future Founders." subtitle="Membership is free for accepted youth between 14 and 39. Registration takes two minutes." image={img.graduate} />
      <ContentSection>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl mb-5">What you get when you join.</h2>
            <ul className="space-y-3">
              {BENEFITS.map((b) => (
                <li key={b} className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-royal mt-0.5 shrink-0" /><span>{b}</span></li>
              ))}
            </ul>
            <Link to="/register" className="inline-block mt-8"><Button size="lg" className="bg-royal text-white hover:bg-royal/90 h-12 px-8">Continue to registration →</Button></Link>
          </div>
          <div className="relative">
            <img src={img.classroom} alt="" className="rounded-2xl shadow-elegant" />
            <div className="absolute -bottom-6 -left-6 bg-card border border-border p-5 rounded-xl shadow-soft hidden md:block">
              <p className="font-display text-2xl text-royal">2 minutes</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">to register</p>
            </div>
          </div>
        </div>
      </ContentSection>
    </SiteShell>
  );
}
