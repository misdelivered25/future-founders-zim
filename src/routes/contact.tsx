import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Phone, MapPin, MessageSquare, CheckCircle2 } from "lucide-react";
import { img } from "@/lib/images";
import { futureFoundersBrand, whatsappLink } from "@/lib/futureFoundersBrand";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Future Founders" },
      { name: "description", content: "Reach the Future Founders team for partnerships, programs, press or general questions." },
      { property: "og:title", content: "Contact Future Founders" },
      { property: "og:description", content: "Get in touch about partnerships, workshops or joining the academy." },
      { property: "og:url", content: "https://future-founders-zim.lovable.app/contact" },
      { property: "og:image", content: img.speaking },
    ],
    links: [{ rel: "canonical", href: "https://future-founders-zim.lovable.app/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ full_name: "", email: "", phone_number: "", reason: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const upd = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.full_name.trim().length < 2) return toast.error("Please enter your name.");
    if (form.message.trim().length < 5) return toast.error("Message is too short.");
    setSubmitting(true);
    const { error } = await supabase.from("contacts").insert({
      full_name: form.full_name.trim(),
      email: form.email.trim().toLowerCase(),
      phone_number: form.phone_number.trim() || null,
      reason: form.reason.trim() || null,
      message: form.message.trim(),
    });
    setSubmitting(false);
    if (error) { toast.error(error.message); return; }
    setDone(true);
    toast.success("Message sent.");
  }

  return (
    <SiteShell>
      <PageHeader eyebrow="Contact" title="Let's talk." subtitle="Partnership? Press? Workshop request? Drop us a line." image={img.speaking} />
      <section className="py-20">
        <div className="container-prose grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Phone, t: "Phone", v: futureFoundersBrand.contactNumber, href: `tel:${futureFoundersBrand.contactNumber.replace(/\s/g, "")}` },
              { icon: MessageSquare, t: "WhatsApp", v: futureFoundersBrand.contactNumber, href: whatsappLink() },
              { icon: Mail, t: "Email", v: "hello@futurefounders.org", href: "mailto:hello@futurefounders.org" },
              { icon: MapPin, t: "Headquarters", v: "Zimbabwe · Pan-African" },
            ].map((i) => (
              <a key={i.t} href={i.href || "#"} target={i.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors">
                <i.icon className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div><div className="font-display text-base">{i.t}</div><div className="text-sm text-muted-foreground">{i.v}</div></div>
              </a>
            ))}
          </div>

          {done ? (
            <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-10 text-center">
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-display text-2xl mb-2">Message sent.</h2>
              <p className="text-muted-foreground mb-6">We'll get back to you shortly. Need a faster response? Reach us on WhatsApp.</p>
              <a href={whatsappLink(`Hi Future Founders, I just sent you a message via your contact form. — ${form.full_name}`)} target="_blank" rel="noreferrer">
                <Button className="bg-[#25D366] hover:bg-[#22c55e] text-white">Continue on WhatsApp</Button>
              </a>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="lg:col-span-3 bg-card border border-border rounded-2xl p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div><Label htmlFor="n">Full name *</Label><Input id="n" required maxLength={120} value={form.full_name} onChange={upd("full_name")} /></div>
                <div><Label htmlFor="e">Email *</Label><Input id="e" type="email" required maxLength={254} value={form.email} onChange={upd("email")} /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div><Label htmlFor="p">Phone</Label><Input id="p" maxLength={32} value={form.phone_number} onChange={upd("phone_number")} /></div>
                <div><Label htmlFor="r">Reason</Label><Input id="r" maxLength={200} value={form.reason} onChange={upd("reason")} placeholder="Partnership, workshop, press…" /></div>
              </div>
              <div>
                <Label htmlFor="m">Message *</Label>
                <Textarea id="m" required rows={6} maxLength={4000} value={form.message} onChange={upd("message")} />
                <p className="text-xs text-muted-foreground mt-1">{form.message.length}/4000</p>
              </div>
              <Button type="submit" disabled={submitting} className="w-full bg-primary h-12 text-base">{submitting ? "Sending…" : "Send message"}</Button>
            </form>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
