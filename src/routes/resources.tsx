import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { supabase } from "@/integrations/supabase/client";
import { img } from "@/lib/images";
import { FileText, Link as LinkIcon, PlayCircle, Download } from "lucide-react";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resource Library — Future Founders" },
      { name: "description", content: "Free guides, templates, videos and links to help young Africans build skills, businesses and confidence." },
      { property: "og:title", content: "Resource Library — Future Founders" },
      { property: "og:description", content: "Free guides, templates and videos curated for young African founders and learners." },
      { property: "og:url", content: "https://future-founders-zim.lovable.app/resources" },
      { property: "og:image", content: img.skills },
    ],
    links: [{ rel: "canonical", href: "https://future-founders-zim.lovable.app/resources" }],
  }),
  component: Resources,
});

type Resource = {
  id: string;
  title: string;
  description: string | null;
  url: string;
  kind: string;
  category: string | null;
  cover_url: string | null;
};

const KIND_ICON: Record<string, typeof FileText> = { pdf: FileText, link: LinkIcon, video: PlayCircle, template: Download };

function Resources() {
  const [items, setItems] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState<string>("all");

  useEffect(() => {
    supabase
      .from("resources")
      .select("id, title, description, url, kind, category, cover_url")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setItems((data as Resource[]) ?? []);
        setLoading(false);
      });
  }, []);

  const cats = useMemo(() => Array.from(new Set(items.map((r) => r.category).filter(Boolean))) as string[], [items]);
  const visible = cat === "all" ? items : items.filter((r) => r.category === cat);

  return (
    <SiteShell>
      <PageHeader eyebrow="Library" title="Resources to build with." subtitle="Guides, templates, videos and links curated by the Future Founders team. Free for the community." image={img.skills} />
      <section className="py-20">
        <div className="container-prose">
          {cats.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <button onClick={() => setCat("all")} className={`px-4 py-2 rounded-full text-sm border transition-colors ${cat === "all" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground hover:bg-surface"}`}>All</button>
              {cats.map((c) => (
                <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-full text-sm border transition-colors ${cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground hover:bg-surface"}`}>{c}</button>
              ))}
            </div>
          )}

          {loading && <p className="text-center text-muted-foreground">Loading resources…</p>}
          {!loading && visible.length === 0 && (
            <div className="text-center max-w-md mx-auto py-12">
              <FileText className="w-10 h-10 text-primary/40 mx-auto mb-4" />
              <p className="text-muted-foreground">New resources are being curated — check back soon.</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((r) => {
              const Icon = KIND_ICON[r.kind] ?? LinkIcon;
              return (
                <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer" className="group block rounded-2xl border border-border bg-card overflow-hidden hover:shadow-elegant transition-all">
                  {r.cover_url && (
                    <div className="aspect-video overflow-hidden bg-surface">
                      <img src={r.cover_url} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-3">
                      <Icon className="w-4 h-4 text-primary" />
                      <span>{r.kind}</span>
                      {r.category && <span>· {r.category}</span>}
                    </div>
                    <h3 className="font-display text-xl mb-2 group-hover:text-primary transition-colors">{r.title}</h3>
                    {r.description && <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{r.description}</p>}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
