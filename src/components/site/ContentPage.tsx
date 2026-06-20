import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/SiteShell";
import { contentPages, type ContentPageKey } from "@/lib/futureFoundersContent";
import { futureFoundersBrand } from "@/lib/futureFoundersBrand";
import { CheckCircle2 } from "lucide-react";

export function ContentPage({ pageKey }: { pageKey: ContentPageKey }) {
  const page = contentPages[pageKey];

  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-[#02060E] text-white">
        <div className="absolute inset-0 bg-cover bg-center opacity-35" style={{ backgroundImage: `url(${page.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#02060E] via-[#02060E]/95 to-[#02060E]/60" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-300">{page.eyebrow}</p>
            <h1 className="text-5xl font-black uppercase leading-tight md:text-7xl">
              {page.title.split(" ").slice(0, -1).join(" ")} <span className="text-[#0356C5]">{page.title.split(" ").slice(-1)}</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">{page.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-[#0356C5] px-7 text-white hover:bg-blue-600">
                <Link to="/register">{futureFoundersBrand.mainCta}</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/30 bg-white/5 px-7 text-white hover:bg-white/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#02060E] px-6 py-16 text-white lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-5">
            {page.sections.map((section) => (
              <article key={section.title} className="rounded-3xl border border-blue-500/30 bg-white/[0.04] p-6 shadow-[0_0_30px_rgba(3,86,197,0.1)] backdrop-blur">
                <h2 className="text-2xl font-black uppercase tracking-wide text-[#0356C5]">{section.title}</h2>
                {section.body && <p className="mt-3 text-white/80 leading-7">{section.body}</p>}
                {section.bullets && (
                  <ul className="mt-4 space-y-3 text-white/80">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex gap-3">
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0356C5]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>

          <aside className="space-y-6">
            {page.supportingImages && (
              <div className="grid grid-cols-2 gap-4">
                {page.supportingImages.map((image, i) => (
                  <div key={image + i} className="overflow-hidden rounded-3xl border border-blue-500/30 bg-white/5">
                    <img src={image} alt="Future Founders visual" className="h-48 w-full object-cover opacity-90" />
                  </div>
                ))}
              </div>
            )}
            {page.quote && (
              <div className="rounded-[2rem] border border-blue-500/40 bg-[#0356C5]/15 p-8 text-center shadow-[0_0_40px_rgba(3,86,197,0.18)]">
                <p className="text-3xl font-black uppercase leading-tight text-white">{page.quote}</p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
