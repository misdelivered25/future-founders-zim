import { Link } from "@tanstack/react-router";
import { img } from "@/lib/images";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-background">
      <div className="container-prose py-16 grid gap-12 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img src={img.logo} alt="Future Founders" className="h-12 w-12 bg-background/95 rounded-md p-1" />
            <div>
              <div className="font-display text-lg">Future Founders</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-background/60">Learn. Build. Lead. Succeed.</div>
            </div>
          </div>
          <p className="text-sm text-background/70 leading-relaxed">
            A business network, youth organisation, financial literacy academy and entrepreneurship school for the next generation.
          </p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full border border-background/20 flex items-center justify-center hover:bg-gold hover:text-ink hover:border-gold transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-background font-display text-base mb-4">Explore</h4>
          <ul className="space-y-2.5 text-sm text-background/70">
            {[["/about","About"],["/programs","Programs"],["/who-we-serve","Who We Serve"],["/gallery","Gallery"],["/events","Events"]].map(([to,l])=>(
              <li key={to}><Link to={to} className="hover:text-gold">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-background font-display text-base mb-4">Get involved</h4>
          <ul className="space-y-2.5 text-sm text-background/70">
            {[["/register","Join as a member"],["/sponsors","Become a sponsor"],["/donate","Donate"],["/contact","Contact us"],["/faqs","FAQs"]].map(([to,l])=>(
              <li key={to}><Link to={to} className="hover:text-gold">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-background font-display text-base mb-4">Reach us</h4>
          <ul className="space-y-3 text-sm text-background/70">
            <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5 text-gold" /> hello@futurefounders.org</li>
            <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-gold" /> Pan-African youth empowerment</li>
          </ul>
          <Link to="/register" className="inline-block mt-5 px-4 py-2.5 rounded-md gradient-gold text-ink text-sm font-semibold hover:opacity-90">
            Start your journey →
          </Link>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container-prose py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-background/55">
          <p>© {new Date().getFullYear()} Future Founders. All rights reserved.</p>
          <p className="font-display italic text-gold/90">Learn. Build. Lead. Succeed.</p>
        </div>
      </div>
    </footer>
  );
}
