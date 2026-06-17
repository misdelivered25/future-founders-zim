import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { img } from "@/lib/images";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Future Founders" },
      { name: "description", content: "Stories, insights and toolkits from the Future Founders community." },
      { property: "og:image", content: img.skills },
    ],
  }),
  component: Blog,
});

const POSTS = [
  { img: img.financial, tag: "Finance", title: "5 money habits every young African should master before 25", date: "Jun 1, 2026", read: "6 min" },
  { img: img.skills, tag: "Skills", title: "The five high-income skills powering the next decade", date: "May 24, 2026", read: "8 min" },
  { img: img.vendor, tag: "Business", title: "From market stall to micro-empire: a young vendor's playbook", date: "May 11, 2026", read: "7 min" },
  { img: img.farmer, tag: "Agribusiness", title: "Why young farmers are the founders of tomorrow", date: "Apr 30, 2026", read: "5 min" },
  { img: img.speaking, tag: "Leadership", title: "Speak so people listen: a beginner's framework", date: "Apr 12, 2026", read: "9 min" },
  { img: img.graduate, tag: "Career", title: "After graduation: the founder mindset shift", date: "Mar 28, 2026", read: "6 min" },
];

function Blog() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Blog" title="Knowledge that compounds." subtitle="Stories, frameworks and toolkits for the next generation of founders." image={img.skills} />
      <section className="py-20">
        <div className="container-prose grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((p, i) => (
            <article key={i} className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-elegant transition-all">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">{p.tag}</span>
                <h3 className="font-display text-xl mt-2 mb-3 leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{p.date}</span><span>{p.read} read</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
