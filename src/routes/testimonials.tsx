import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/testimonials")({ component: Testimonials });

type Testimonial = { id: string; full_name: string; category: string | null; message: string; photo_url: string | null; rating: number | null };

function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  useEffect(() => {
    (supabase as any).from("testimonials").select("*").eq("status", "approved").order("created_at", { ascending: false }).then(({ data }: any) => setItems(data ?? []));
  }, []);
  return (
    <SiteShell>
      <section className="bg-[#02060E] px-6 py-24 text-white lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Testimonials</p>
          <h1 className="mt-4 text-5xl font-black uppercase md:text-7xl">Founder Stories</h1>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {items.length === 0 && <p className="text-white/70">Approved testimonials will appear here.</p>}
            {items.map((item) => (
              <article key={item.id} className="rounded-[2rem] border border-blue-500/30 bg-white/[0.04] p-6">
                <p className="text-blue-300">{item.category}</p>
                <p className="mt-4 leading-7 text-white/75">“{item.message}”</p>
                <h2 className="mt-5 font-bold text-white">{item.full_name}</h2>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
