import { Link } from "@tanstack/react-router";
import { Menu, X, LogIn } from "lucide-react";
import { useState } from "react";
import { img } from "@/lib/images";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/who-we-serve", label: "Who We Serve" },
  { to: "/gallery", label: "Gallery" },
  { to: "/events", label: "Events" },
  { to: "/blog", label: "Blog" },
  { to: "/sponsors", label: "Sponsors" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-prose flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={img.logo} alt="Future Founders" className="h-12 w-12 object-contain" />
          <div className="leading-tight">
            <div className="font-display text-lg font-semibold tracking-tight text-ink">Future Founders</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Building Tomorrow's Founders</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-primary" }}
              className="text-sm font-medium text-foreground/75 hover:text-primary transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Link to="/auth">
            <Button variant="ghost" size="sm"><LogIn className="w-4 h-4 mr-1.5" />Sign in</Button>
          </Link>
          <Link to="/donate">
            <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/5">Donate</Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="bg-primary hover:bg-primary/90">Join Now</Button>
          </Link>
        </div>

        <button className="lg:hidden p-2 -mr-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-prose py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                className="py-2.5 text-sm font-medium text-foreground/80 hover:text-primary">
                {n.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-3 border-t border-border mt-2">
              <Link to="/auth" onClick={() => setOpen(false)} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">Sign in</Button>
              </Link>
              <Link to="/register" onClick={() => setOpen(false)} className="flex-1">
                <Button size="sm" className="w-full bg-primary">Join Now</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
