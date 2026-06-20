import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ffImages } from "@/lib/futureFoundersImages";
import { futureFoundersBrand } from "@/lib/futureFoundersBrand";

const slides = [
  { image: ffImages.students, label: "Collaboration" },
  { image: ffImages.chess, label: "Leadership" },
  { image: ffImages.publicSpeaking, label: "Training" },
  { image: ffImages.skills, label: "Skills" },
  { image: ffImages.financial, label: "Financial Literacy" },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const active = useMemo(() => slides[index], [index]);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 5500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden bg-[#02060E] text-white">
      {slides.map((slide, i) => (
        <div
          key={slide.label}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${i === index ? "opacity-50" : "opacity-0"}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-[#02060E] via-[#02060E]/90 to-[#02060E]/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(3,86,197,0.45),transparent_35%)]" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-6 py-24 lg:px-10">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.4em] text-blue-300">
            {futureFoundersBrand.slogan}
          </p>
          <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            Unleash Your <span className="block text-[#0356C5]">Business</span> Potential
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
            Learn practical money skills, business thinking, leadership, and real-world confidence through Future Founders.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild className="h-12 rounded-full bg-[#0356C5] px-8 text-base text-white shadow-[0_0_24px_rgba(3,86,197,0.55)] hover:bg-blue-600">
              <Link to="/register">{futureFoundersBrand.mainCta}</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-full border-white/30 bg-white/5 px-8 text-base text-white hover:bg-white/10">
              <Link to="/sponsors">Partner With Us</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {[
            ["14 to 39", "Youth age range"],
            ["3", "Core focus areas"],
            [active.label, "Current focus"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-3xl border border-blue-500/30 bg-white/5 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(3,86,197,0.16)]">
              <div className="text-3xl font-black text-white">{value}</div>
              <div className="mt-1 text-sm uppercase tracking-[0.25em] text-blue-200/80">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
