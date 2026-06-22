import { Link } from "@tanstack/react-router";
import { img } from "@/lib/images";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail, MapPin, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "./WhatsAppButton";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-background">
      <div className="container-prose py-16 grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <img src={img.logo} alt="Future Founders" className="h-12 w-12 bg-background/95 rounded-md p-1" />
            <div>
              <div className="font-display text-lg">Future Founders</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-background/60">Learn. Build. Lead. Succeed.</div>
            </div>
          </div>
          <p className="text-sm text-background/70 leading-relaxed max-w-md">
            A business network, youth organisation, financial literacy academy and entrepreneurship school for the next generation — empowering youth aged 14 to 39.
          </p>

          <div className="mt-6 max-w-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-background/60 mb-3">Newsletter</p>
            <NewsletterForm source="footer" />
          </div>

          <div className="flex gap-3 mt-6">
            {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link" className="w-9 h-9 rounded-full border border-background/20 flex items-center justify-center hover:bg-royal hover:text-white hover:border-royal transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-background font-display text-base mb-4">About</h4>
          <ul className="space-y-2.5 text-sm text-background/70">
            {[["/about-future-founders","About"],["/vision-mission","Vision & Mission"],["/core-values","Core Values"],["/functions","Our Functions"],["/who-we-serve","Who We Serve"]].map(([to,l])=>(
              <li key={to}><Link to={to} className="hover:text-royal">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-background font-display text-base mb-4">Academy</h4>
          <ul className="space-y-2.5 text-sm text-background/70">
            {[["/financial-literacy","Financial Literacy"],["/entrepreneurship","Entrepreneurship"],["/leadership-development","Leadership"],["/programs-activities","Programs & Activities"],["/resources","Resources"],["/events","Events"],["/testimonials","Stories"]].map(([to,l])=>(
              <li key={to}><Link to={to} className="hover:text-royal">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-background font-display text-base mb-4">Get involved</h4>
          <ul className="space-y-2.5 text-sm text-background/70">
            {[["/join-future-founders","Join Future Founders"],["/sponsors","Become a sponsor"],["/donate","Donate"],["/share-your-story","Share your story"],["/contact","Contact us"],["/faqs","FAQs"]].map(([to,l])=>(
              <li key={to}><Link to={to} className="hover:text-royal">{l}</Link></li>
            ))}
          </ul>
          <ul className="space-y-3 text-sm text-background/70 mt-6 pt-6 border-t border-background/10">
            <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5 text-royal" /> hello@futurefounders.org</li>
            <li className="flex gap-2"><MessageCircle className="w-4 h-4 mt-0.5 text-royal" /> <a className="hover:text-royal" href={`https://wa.me/${WHATSAPP_NUMBER}`}>+263 71 742 8535</a></li>
            <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-royal" /> Zimbabwe · Pan-African</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container-prose py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-background/55">
          <p>© {new Date().getFullYear()} Future Founders. All rights reserved.</p>
          <p className="font-display italic text-royal">Learn. Build. Lead. Succeed.</p>
        </div>
      </div>
    </footer>
  );
}
