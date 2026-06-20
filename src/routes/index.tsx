import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { img, gallery } from "@/lib/images";
import { ArrowRight, BookOpen, Briefcase, Coins, Users, Sparkles, GraduationCap, Trophy, Heart } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Future Founders — Unleash Your Business Potential" },
      { name: "description", content: "Join Future Founders: a youth empowerment platform building tomorrow's founders through financial literacy, entrepreneurship, leadership and life skills for ages 14–39." },
      { property: "og:title", content: "Future Founders — Building Tomorrow's Founders" },
      { property: "og:description", content: "Learn. Build. Lead. Succeed. Africa's premier youth entrepreneurship academy." },
      { property: "og:image", content: img.speaking },
    ],
  }),
  component: Home,
});

const PILLARS = [
  { icon: Coins, title: "Financial Literacy", desc: "Money management, saving, investing and personal finance fundamentals for life." },
  { icon: Briefcase, title: "Entrepreneurship", desc: "Idea to launch — business modelling, marketing, sales and operations." },
  { icon: Users, title: "Leadership", desc: "Public speaking, confidence, ethics and team building for a new generation." },
  { icon: Sparkles, title: "Life & Digital Skills", desc: "Critical thinking, productivity, tech literacy and career-ready capabilities." },
];

const AUDIENCE = [
  { img: img.classroom, title: "High school & university students", desc: "Build the skills school doesn't teach." },
  { img: img.vendor, title: "Young vendors & micro-entrepreneurs", desc: "Grow your business with structure and capital." },
  { img: img.farmer, title: "Young farmers", desc: "Turn agriculture into a profitable, modern enterprise." },
  { img: img.graduate, title: "Graduates & emerging professionals", desc: "Lead with confidence, finance literacy and clarity." },
];


function Home() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <img src={img.speaking} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container-prose relative py-24 lg:py-36 text-background">
          <p className="text-xs uppercase tracking-[0.3em] text-gold anim-fade mb-5">Future Founders Academy</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-semibold leading-[1.02] text-background max-w-4xl text-balance anim-fade-up">
            Unleash Your <span className="italic text-gold">Business</span> Potential
          </h1>
          <p className="mt-7 text-lg md:text-xl text-background/85 max-w-2xl leading-relaxed anim-fade-up">
            We are a business network, youth organisation and financial literacy academy building Africa's next generation of founders — ages 14 to 39.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 anim-fade-up">
            <Link to="/register">
              <Button size="lg" className="bg-gold text-ink hover:bg-gold/90 font-semibold h-12 px-7">
                Join the movement <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/programs">
              <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10 h-12 px-7 bg-transparent">
                Explore programs
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
            {IMPACT.map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl md:text-4xl text-gold">{s.n}</div>
                <div className="text-xs uppercase tracking-wider text-background/65 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-24">
        <div className="container-prose">
          <div className="max-w-2xl mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Four pillars</p>
            <h2 className="font-display text-4xl md:text-5xl text-balance">Everything you need to build, lead and succeed.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map((p) => (
              <div key={p.title} className="group p-7 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-elegant transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-background transition-colors">
                  <p.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="py-24 bg-surface">
        <div className="container-prose">
          <div className="max-w-2xl mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Who we serve</p>
            <h2 className="font-display text-4xl md:text-5xl text-balance">From the classroom to the marketplace — and everywhere in between.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {AUDIENCE.map((a) => (
              <div key={a.title} className="group rounded-2xl overflow-hidden bg-card border border-border hover:shadow-elegant transition-all">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={a.img} alt={a.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg leading-tight">{a.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPLIT FEATURE */}
      <section className="py-24">
        <div className="container-prose grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src={img.financial} alt="Financial literacy" loading="lazy" className="rounded-2xl shadow-elegant" />
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-card border border-border rounded-xl p-5 shadow-soft max-w-xs">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-gold" />
                <div>
                  <div className="font-display text-lg">Real outcomes</div>
                  <div className="text-xs text-muted-foreground">Businesses launched • jobs created</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Our mission</p>
            <h2 className="font-display text-4xl md:text-5xl mb-5 text-balance">A generation that earns, invests and leads — together.</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Future Founders combines hands-on entrepreneurship coaching with financial literacy and life-skill training. We meet youth where they are — in schools, on the farm, behind the market stall — and walk with them all the way to launch.
            </p>
            <ul className="space-y-3 mt-6">
              {["Cohort-based academy with mentors", "Community workshops in your city", "Startup support & micro-funding", "Lifetime founder network"].map((t) => (
                <li key={t} className="flex gap-3"><GraduationCap className="w-5 h-5 text-primary mt-0.5 shrink-0" /><span>{t}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <section className="py-24 bg-surface">
        <div className="container-prose">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Inside Future Founders</p>
              <h2 className="font-display text-4xl md:text-5xl">Real youth. Real growth.</h2>
            </div>
            <Link to="/gallery" className="hidden md:inline-flex items-center text-sm font-medium text-primary hover:gap-3 gap-2 transition-all">
              View gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {gallery.slice(0, 6).map((g, i) => (
              <div key={i} className={`group relative overflow-hidden rounded-xl ${i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}>
                <img src={g.src} alt={g.caption} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-background text-xs">{g.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container-prose">
          <div className="relative overflow-hidden rounded-3xl gradient-hero p-12 md:p-20 text-background">
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
              <img src={img.graduate} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative max-w-2xl">
              <Heart className="w-10 h-10 text-gold mb-5" />
              <h2 className="font-display text-4xl md:text-5xl text-background mb-5 text-balance">
                Your support builds a founder. <span className="italic text-gold">Today.</span>
              </h2>
              <p className="text-background/80 text-lg mb-8">
                Sponsor a learner, fund a workshop or back a young founder's first launch. Every contribution is multiplied in our community.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/donate"><Button size="lg" className="bg-gold text-ink hover:bg-gold/90 h-12 px-7 font-semibold">Donate now</Button></Link>
                <Link to="/sponsors"><Button size="lg" variant="outline" className="border-background/40 text-background hover:bg-background/10 h-12 px-7 bg-transparent">Become a sponsor</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG TEASER */}
      <section className="pb-24">
        <div className="container-prose">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">From the blog</p>
              <h2 className="font-display text-4xl md:text-5xl">Insights for the next generation.</h2>
            </div>
            <Link to="/blog" className="hidden md:inline-flex items-center text-sm font-medium text-primary gap-2 hover:gap-3 transition-all">
              All articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { img: img.financial, tag: "Finance", title: "5 money habits every young African should master before 25" },
              { img: img.skills, tag: "Skills", title: "The five high-income skills powering the next decade" },
              { img: img.vendor, tag: "Business", title: "From market stall to micro-empire: a young vendor's playbook" },
            ].map((p, i) => (
              <article key={i} className="group rounded-2xl overflow-hidden bg-card border border-border hover:shadow-elegant transition-all">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">{p.tag}</span>
                  <h3 className="font-display text-xl mt-2 leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
                  <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                    <BookOpen className="w-3.5 h-3.5" /> 5 min read
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
