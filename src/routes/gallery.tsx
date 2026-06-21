import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { supabase } from "@/integrations/supabase/client";
import { gallery as fallbackGallery, img } from "@/lib/images";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Future Founders" },
      { name: "description", content: "Photos from our workshops, classrooms and community programs." },
      { property: "og:title", content: "Future Founders Gallery" },
      { property: "og:description", content: "Inside our workshops, classrooms, farm visits and graduations." },
      { property: "og:url", content: "https://future-founders-zim.lovable.app/gallery" },
      { property: "og:image", content: img.students },
    ],
    links: [{ rel: "canonical", href: "https://future-founders-zim.lovable.app/gallery" }],
  }),
  component: Gallery,
});

type Item = { id: string; title: string | null; image_url: string; category: string | null };

function Gallery() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    supabase.from("gallery_items").select("id, title, image_url, category")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .then(({ data }) => setItems((data as Item[]) ?? []));
  }, []);

  const list: Item[] = useMemo(() => {
    if (items === null) return [];
    if (items.length > 0) return items;
    return fallbackGallery.map((g, i) => ({ id: `f-${i}`, title: g.caption, image_url: g.src, category: g.tag }));
  }, [items]);

  const categories = useMemo(() => ["All", ...Array.from(new Set(list.map((i) => i.category).filter(Boolean) as string[]))], [list]);
  const filtered = filter === "All" ? list : list.filter((i) => i.category === filter);

  return (
    <SiteShell>
      <PageHeader eyebrow="Gallery" title="The faces of Future Founders." subtitle="Inside our workshops, classrooms, farm visits and graduations." image={img.students} />
      <section className="py-16">
        <div className="container-prose">
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((c) => (
                <button key={c} onClick={() => setFilter(c)} className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${filter === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/40"}`}>{c}</button>
              ))}
            </div>
          )}
          {items === null && <p className="text-center text-muted-foreground">Loading…</p>}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((g) => (
              <figure key={g.id} className="group relative overflow-hidden rounded-2xl aspect-square">
                <img src={g.image_url} alt={g.title ?? ""} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                {(g.title || g.category) && (
                  <figcaption className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent flex flex-col justify-end p-4 text-background opacity-0 group-hover:opacity-100 transition-opacity">
                    {g.category && <span className="text-[10px] uppercase tracking-[0.2em] text-gold">{g.category}</span>}
                    {g.title && <p className="text-sm mt-1">{g.title}</p>}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
