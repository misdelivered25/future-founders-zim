import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Quote } from "lucide-react";
import { img } from "@/lib/images";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Stories — Future Founders" },
      { name: "description", content: "Read what young founders, learners and mentors say about the Future Founders community." },
      { property: "og:title", content: "Founder Stories — Future Founders" },
      { property: "og:description", content: "Real stories from the Future Founders community." },
      { property: "og:url", content: "https://future-founders-zim.lovable.app/testimonials" },
      { property: "og:image", content: img.graduate },
    ],
    links: [{ rel: "canonical", href: "https://future-founders-zim.lovable.app/testimonials" }],
  }),
  component: Testimonials,
});

type Testimonial = {
  id: string;
  author_name: string;
  author_role: string | null;
  author_location: string | null;
  quote: string;
  image_url: string | null;
};

function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("testimonials")
      .select("id, author_name, author_role, author_location, quote, image_url")
      .eq("is_published", true)
      .eq("status", "approved")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setItems((data as Testimonial[]) ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <SiteShell>
      <PageHeader eyebrow="Stories" title="Founder stories." subtitle="Real voices from the Future Founders community — learners, vendors, graduates and mentors." image={img.graduate} />
      <section className="py-20">
        <div className="container-prose">
          {loading && <p className="text-muted-foreground text-center">Loading stories…</p>}
          {!loading && items.length === 0 && (
            <div className="text-center max-w-md mx-auto">
              <Quote className="w-10 h-10 text-primary/40 mx-auto mb-4" />
              <p className="text-muted-foreground">Approved stories will appear here. Be the first to share yours.</p>
            </div>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((t) => (
              <article key={t.id} className="rounded-2xl border border-border bg-card p-7 hover:shadow-elegant transition-all">
                <Quote className="w-7 h-7 text-primary/60 mb-4" />
                <p className="text-foreground/85 leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  {t.image_url ? (
                    <img src={t.image_url} alt="" className="w-11 h-11 rounded-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display">
                      {t.author_name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-display text-base leading-tight">{t.author_name}</div>
                    <div className="text-xs text-muted-foreground">
                      {[t.author_role, t.author_location].filter(Boolean).join(" • ") || "Future Founder"}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center bg-surface rounded-2xl p-10 border border-border">
            <h2 className="font-display text-3xl mb-3">Got a Future Founders story?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">We'd love to hear how the community shaped your journey. Share your story — we review every submission.</p>
            <Link to="/share-your-story"><Button className="bg-primary h-11 px-6">Share your story</Button></Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
