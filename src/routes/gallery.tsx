import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { gallery, img } from "@/lib/images";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Future Founders" },
      { name: "description", content: "Photos from our workshops, classrooms and community programs." },
      { property: "og:image", content: img.students },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Gallery" title="The faces of Future Founders." subtitle="Inside our workshops, classrooms, farm visits and graduations." image={img.students} />
      <section className="py-20">
        <div className="container-prose grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((g, i) => (
            <figure key={i} className={`group relative overflow-hidden rounded-2xl ${i % 5 === 0 ? "md:row-span-2 md:aspect-auto" : "aspect-square"}`}>
              <img src={g.src} alt={g.caption} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <figcaption className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent flex flex-col justify-end p-5 text-background">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold mb-1">{g.tag}</span>
                <span className="text-sm">{g.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
