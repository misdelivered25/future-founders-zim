import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { img } from "@/lib/images";
import { Button } from "@/components/ui/button";

type Item = { to: string; label: string };

const ABOUT_MENU: Item[] = [
  { to: "/about-future-founders", label: "About Future Founders" },
  { to: "/vision-mission", label: "Vision & Mission" },
  { to: "/core-values", label: "Core Values" },
  { to: "/functions", label: "Our Functions" },
];

const PILLARS_MENU: Item[] = [
  { to: "/financial-literacy", label: "Financial Literacy" },
  { to: "/entrepreneurship", label: "Entrepreneurship" },
  { to: "/leadership-development", label: "Leadership Development" },
];

const PROGRAMS_MENU: Item[] = [
  { to: "/programs", label: "Programs Overview" },
  { to: "/programs-activities", label: "Programs & Activities" },
  { to: "/who-we-serve", label: "Who We Serve" },
  { to: "/events", label: "Events" },
];

const TOP: Item[] = [
  { to: "/", label: "Home" },
  { to: "/resources", label: "Resources" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Blog" },
  { to: "/sponsors", label: "Sponsors" },
  { to: "/contact", label: "Contact" },
];

function Dropdown({ label, items }: { label: string; items: Item[] }) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-sm font-medium text-foreground/75 hover:text-primary transition-colors">
        {label} <ChevronDown className="w-3.5 h-3.5" />
      </button>
      <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all min-w-[240px]">
        <div className="bg-card border border-border rounded-xl shadow-elegant py-2">
          {items.map((i) => (
            <Link key={i.to} to={i.to} className="block px-4 py-2.5 text-sm hover:bg-secondary hover:text-primary">
              {i.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const mobileLinks: Item[] = [
    { to: "/", label: "Home" },
    ...ABOUT_MENU,
    ...PILLARS_MENU,
    ...PROGRAMS_MENU,
    { to: "/resources", label: "Resources" },
    { to: "/gallery", label: "Gallery" },
    { to: "/blog", label: "Blog" },
    { to: "/sponsors", label: "Sponsors" },
    { to: "/donate", label: "Donate" },
    { to: "/contact", label: "Contact" },
    { to: "/join-future-founders", label: "Join Future Founders" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="container-prose flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={img.logo} alt="Future Founders" className="h-12 w-12 object-contain" />
          <div className="leading-tight">
            <div className="font-display text-lg font-semibold tracking-tight text-ink">Future Founders</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Building Tomorrow's Founders</div>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-7">
          <Link to="/" activeProps={{ className: "text-primary" }} className="text-sm font-medium text-foreground/75 hover:text-primary">Home</Link>
          <Dropdown label="About" items={ABOUT_MENU} />
          <Dropdown label="What we teach" items={PILLARS_MENU} />
          <Dropdown label="Programs" items={PROGRAMS_MENU} />
          {TOP.slice(1).map((n) => (
            <Link key={n.to} to={n.to} activeProps={{ className: "text-primary" }} className="text-sm font-medium text-foreground/75 hover:text-primary transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-2">
          <Link to="/donate">
            <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/5">Donate</Button>
          </Link>
          <Link to="/join-future-founders">
            <Button size="sm" className="bg-royal hover:bg-royal/90 text-white">Join Now</Button>
          </Link>
        </div>

        <button className="xl:hidden p-2 -mr-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden border-t border-border bg-background max-h-[80vh] overflow-y-auto">
          <div className="container-prose py-4 flex flex-col gap-1">
            {mobileLinks.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2.5 text-sm font-medium text-foreground/80 hover:text-primary">
                {n.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-3 border-t border-border mt-2">
              <Link to="/donate" onClick={() => setOpen(false)} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">Donate</Button>
              </Link>
              <Link to="/join-future-founders" onClick={() => setOpen(false)} className="flex-1">
                <Button size="sm" className="w-full bg-royal text-white">Join Now</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
