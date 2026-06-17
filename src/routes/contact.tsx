import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { img } from "@/lib/images";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Future Founders" },
      { name: "description", content: "Reach the Future Founders team for partnerships, programs, press or general questions." },
      { property: "og:image", content: img.speaking },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ full_name: "", email: "", phone_number: "", reason: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const upd = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
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
    toast.success("Thank you — we'll be in touch.");
    setForm({ full_name: "", email: "", phone_number: "", reason: "", message: "" });
  }

  return (
    <SiteShell>
      <PageHeader eyebrow="Contact" title="Let's talk." subtitle="Partnership? Press? Workshop request? Drop us a line." image={img.speaking} />
      <section className="py-20">
        <div className="container-prose grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: Mail, t: "Email", v: "hello@futurefounders.org" },
              { icon: Phone, t: "Phone", v: "+234 800 000 0000" },
              { icon: MapPin, t: "Headquarters", v: "Pan-African (hybrid)" },
              { icon: MessageSquare, t: "WhatsApp", v: "+234 800 000 0000" },
            ].map((i) => (
              <div key={i.t} className="flex gap-4 p-5 rounded-xl border border-border bg-card">
                <i.icon className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div><div className="font-display text-base">{i.t}</div><div className="text-sm text-muted-foreground">{i.v}</div></div>
              </div>
            ))}
          </div>
          <form onSubmit={onSubmit} className="lg:col-span-3 bg-card border border-border rounded-2xl p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div><Label htmlFor="n">Full name *</Label><Input id="n" required value={form.full_name} onChange={upd("full_name")} /></div>
              <div><Label htmlFor="e">Email *</Label><Input id="e" type="email" required value={form.email} onChange={upd("email")} /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div><Label htmlFor="p">Phone</Label><Input id="p" value={form.phone_number} onChange={upd("phone_number")} /></div>
              <div><Label htmlFor="r">Reason</Label><Input id="r" value={form.reason} onChange={upd("reason")} placeholder="Partnership, workshop, press…" /></div>
            </div>
            <div><Label htmlFor="m">Message *</Label><Textarea id="m" required rows={6} value={form.message} onChange={upd("message")} /></div>
            <Button type="submit" disabled={submitting} className="w-full bg-primary h-12 text-base">{submitting ? "Sending…" : "Send message"}</Button>
          </form>
        </div>
      </section>
    </SiteShell>
  );
}
