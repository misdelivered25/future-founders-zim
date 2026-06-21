import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { supabase } from "@/integrations/supabase/client";
import { img } from "@/lib/images";
import { BookOpen } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Future Founders" },
      { name: "description", content: "Stories, insights and toolkits from the Future Founders community." },
      { property: "og:title", content: "Future Founders Blog" },
      { property: "og:description", content: "Knowledge for the next generation of African founders." },
      { property: "og:url", content: "https://future-founders-zim.lovable.app/blog" },
      { property: "og:image", content: img.skills },
    ],
    links: [{ rel: "canonical", href: "https://future-founders-zim.lovable.app/blog" }],
  }),
  component: Blog,
});

type Post = { id: string; slug: string; title: string; excerpt: string | null; cover_url: string | null; author: string | null; published_at: string | null; created_at: string };

const FALLBACK: Post[] = [
  { id: "f1", slug: "#", title: "5 money habits every young African should master before 25", excerpt: "Practical financial literacy that compounds.", cover_url: img.financial, author: "Future Founders", published_at: "2026-06-01", created_at: "2026-06-01" },
  { id: "f2", slug: "#", title: "The five high-income skills powering the next decade", excerpt: "Where to invest your learning hours.", cover_url: img.skills, author: "Future Founders", published_at: "2026-05-24", created_at: "2026-05-24" },
  { id: "f3", slug: "#", title: "From market stall to micro-empire: a young vendor's playbook", excerpt: "How to grow a small business with discipline.", cover_url: img.vendor, author: "Future Founders", published_at: "2026-05-11", created_at: "2026-05-11" },
];

function Blog() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  useEffect(() => {
    supabase.from("blog_posts").select("id, slug, title, excerpt, cover_url, author, published_at, created_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false })
      .then(({ data }) => setPosts((data as Post[]) ?? []));
  }, []);

  const list = posts && posts.length > 0 ? posts : posts === null ? null : FALLBACK;

  return (
    <SiteShell>
      <PageHeader eyebrow="Blog" title="Knowledge that compounds." subtitle="Stories, frameworks and toolkits for the next generation of founders." image={img.skills} />
      <section className="py-20">
        <div className="container-prose">
          {list === null && <p className="text-center text-muted-foreground">Loading…</p>}
          {list && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((p) => {
                const Article = (
                  <article className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-elegant transition-all h-full">
                    <div className="aspect-[16/10] overflow-hidden bg-surface">
                      {p.cover_url ? <img src={p.cover_url} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /> : <div className="w-full h-full flex items-center justify-center text-muted-foreground"><BookOpen /></div>}
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
                      {p.excerpt && <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{p.excerpt}</p>}
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-4">
                        <span>{p.author ?? "Future Founders"}</span>
                        <span>{new Date(p.published_at ?? p.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </article>
                );
                return p.slug && p.slug !== "#" ? (
                  <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }}>{Article}</Link>
                ) : (
                  <div key={p.id}>{Article}</div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
