import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { reportLovableError } from "@/lib/lovable-error-reporting";

type Post = { id: string; slug: string; title: string; excerpt: string | null; content: string; cover_url: string | null; author: string | null; published_at: string | null; created_at: string };

async function fetchPost(slug: string): Promise<Post> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, content, cover_url, author, published_at, created_at")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error) throw error;
  if (!data) throw notFound();
  return data as Post;
}

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => fetchPost(params.slug),
  head: ({ params, loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — Future Founders` : "Post — Future Founders" },
      { name: "description", content: loaderData?.excerpt ?? "Future Founders blog post." },
      { property: "og:title", content: loaderData?.title ?? "Future Founders" },
      { property: "og:description", content: loaderData?.excerpt ?? "" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `https://future-founders-zim.lovable.app/blog/${params.slug}` },
      ...(loaderData?.cover_url ? [{ property: "og:image", content: loaderData.cover_url }] : []),
    ],
    links: [{ rel: "canonical", href: `https://future-founders-zim.lovable.app/blog/${params.slug}` }],
    scripts: loaderData ? [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: loaderData.title,
        description: loaderData.excerpt ?? undefined,
        image: loaderData.cover_url ?? undefined,
        author: { "@type": "Person", name: loaderData.author ?? "Future Founders" },
        datePublished: loaderData.published_at ?? loaderData.created_at,
      }),
    }] : [],
  }),
  component: BlogPost,
  notFoundComponent: () => (
    <SiteShell>
      <section className="py-32 text-center container-prose">
        <h1 className="font-display text-4xl mb-3">Post not found</h1>
        <p className="text-muted-foreground mb-6">This article may have been moved or unpublished.</p>
        <Link to="/blog"><Button className="bg-primary">Back to blog</Button></Link>
      </section>
    </SiteShell>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    useEffect(() => reportLovableError(error, { boundary: "blog_slug" }), [error]);
    return (
      <SiteShell>
        <section className="py-32 text-center container-prose">
          <h1 className="font-display text-3xl mb-3">Could not load this post</h1>
          <Button onClick={() => { router.invalidate(); reset(); }} className="bg-primary">Try again</Button>
        </section>
      </SiteShell>
    );
  },
});

function BlogPost() {
  const post = Route.useLoaderData();
  return (
    <SiteShell>
      <article className="py-16">
        <div className="container-prose max-w-3xl">
          <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"><ArrowLeft className="w-4 h-4 mr-1" />All articles</Link>
          <h1 className="font-display text-4xl md:text-5xl mb-4 text-balance">{post.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
            {post.author && <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{post.author}</span>}
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(post.published_at ?? post.created_at).toLocaleDateString()}</span>
          </div>
          {post.cover_url && <img src={post.cover_url} alt={post.title} className="rounded-2xl mb-10 w-full aspect-[16/9] object-cover" />}
          <div className="prose prose-lg max-w-none whitespace-pre-wrap leading-relaxed text-foreground/85">
            {post.content}
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
