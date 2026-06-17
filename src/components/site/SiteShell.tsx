import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({ eyebrow, title, subtitle, image }: { eyebrow?: string; title: string; subtitle?: string; image?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 gradient-hero opacity-95" />
      {image && (
        <div className="absolute inset-0 opacity-25 mix-blend-overlay">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="container-prose relative py-24 lg:py-32 text-background">
        {eyebrow && <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4 anim-fade">{eyebrow}</p>}
        <h1 className="font-display text-4xl md:text-6xl font-semibold text-background max-w-3xl text-balance anim-fade-up">{title}</h1>
        {subtitle && <p className="mt-5 text-lg text-background/80 max-w-2xl anim-fade-up">{subtitle}</p>}
      </div>
    </section>
  );
}
