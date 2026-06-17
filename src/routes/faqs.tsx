import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { img } from "@/lib/images";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Future Founders" },
      { name: "description", content: "Frequently asked questions about Future Founders membership, programs and events." },
    ],
  }),
  component: Faqs,
});

const FAQ = [
  { q: "Who can join Future Founders?", a: "Any young person aged 14 to 39 — high-school and university students, young vendors and farmers, graduates and emerging professionals." },
  { q: "Is membership free?", a: "Yes, our base membership and community programs are free for youth. Some advanced cohorts and certifications have a subsidised fee, with full scholarships available for those in need." },
  { q: "Where are you based?", a: "We are Pan-African with chapters and partners across the continent. Most programs run as a hybrid of in-person workshops and online cohorts." },
  { q: "How do I sponsor a learner?", a: "Visit our donate page and choose the 'Sponsor a learner' option, or contact our partnerships team for corporate sponsorships." },
  { q: "Can I host Future Founders at my school or community?", a: "Absolutely. Reach out via the contact page and our community team will set up a workshop." },
  { q: "What programs do you offer?", a: "Four pillars: Financial Literacy, Entrepreneurship, Leadership and Life & Digital Skills — each with cohort academies and community workshops." },
  { q: "How long do programs run?", a: "Cohorts range from 4 to 12 weeks depending on track. Workshops are 1–3 days. Membership is lifelong." },
];

function Faqs() {
  return (
    <SiteShell>
      <PageHeader eyebrow="FAQs" title="Answers, before you ask." image={img.classroom} />
      <section className="py-20">
        <div className="container-prose max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ.map((f, i) => (
              <AccordionItem key={i} value={`i${i}`} className="border border-border rounded-xl bg-card px-6">
                <AccordionTrigger className="font-display text-lg text-left hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </SiteShell>
  );
}
