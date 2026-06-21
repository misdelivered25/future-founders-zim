import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { img } from "@/lib/images";

export const Route = createFileRoute("/share-your-story")({
  head: () => ({
    meta: [
      { title: "Share Your Story — Future Founders" },
      { name: "description", content: "Tell us how Future Founders has shaped your journey. We review and feature stories from the community." },
      { property: "og:title", content: "Share Your Story — Future Founders" },
      { property: "og:description", content: "Submit a testimonial to the Future Founders community." },
      { property: "og:url", content: "https://future-founders-zim.lovable.app/share-your-story" },
      { property: "og:image", content: img.publicSpeaking ?? img.speaking },
    ],
    links: [{ rel: "canonical", href: "https://future-founders-zim.lovable.app/share-your-story" }],
  }),
  component: ShareStory,
});

function ShareStory() {
  const [form, setForm] = useState({ author_name: "", author_role: "", author_location: "", author_email: "", quote: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const upd = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.author_name.trim().length < 2) return toast.error("Please enter your full name.");
    if (form.quote.trim().length < 10) return toast.error("Story must be at least 10 characters.");
    setSubmitting(true);
    const { error } = await supabase.from("testimonials").insert({
      author_name: form.author_name.trim(),
      author_role: form.author_role.trim() || null,
      author_location: form.author_location.trim() || null,
      author_email: form.author_email.trim().toLowerCase() || null,
      quote: form.quote.trim(),
      is_published: false,
      status: "pending",
    });
    setSubmitting(false);
    if (error) return toast.error(error.message);
    setDone(true);
  }

  if (done) {
    return (
      <SiteShell>
        <section className="py-32">
          <div className="container-prose max-w-xl text-center">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="font-display text-4xl mb-4">Thank you!</h1>
            <p className="text-muted-foreground mb-8">Your story has been submitted for review. We feature approved stories on our testimonials page.</p>
            <Link to="/testimonials"><Button className="bg-primary">Read other stories</Button></Link>
          </div>
        </section>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <PageHeader eyebrow="Share Your Story" title="Tell us your Future Founders story." subtitle="Inspire the next generation. We review every submission and feature approved ones on our site." />
      <section className="py-20">
        <div className="container-prose max-w-2xl">
          <form onSubmit={onSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-5 shadow-soft">
            <div className="grid sm:grid-cols-2 gap-5">
              <div><Label htmlFor="n">Your full name *</Label><Input id="n" required maxLength={120} value={form.author_name} onChange={upd("author_name")} /></div>
              <div><Label htmlFor="r">Your role</Label><Input id="r" placeholder="e.g. Cohort 5 graduate" maxLength={120} value={form.author_role} onChange={upd("author_role")} /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div><Label htmlFor="l">Location</Label><Input id="l" placeholder="City, country" maxLength={120} value={form.author_location} onChange={upd("author_location")} /></div>
              <div><Label htmlFor="e">Email (optional)</Label><Input id="e" type="email" placeholder="So we can follow up" maxLength={254} value={form.author_email} onChange={upd("author_email")} /></div>
            </div>
            <div>
              <Label htmlFor="q">Your story *</Label>
              <Textarea id="q" required rows={6} maxLength={2000} value={form.quote} onChange={upd("quote")} placeholder="What changed for you? What did you learn, build or launch?" />
              <p className="text-xs text-muted-foreground mt-1">{form.quote.length}/2000 characters</p>
            </div>
            <Button type="submit" disabled={submitting} className="w-full bg-primary h-12 text-base">
              {submitting ? "Submitting…" : "Submit my story"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">Your story will be reviewed before it appears on the site.</p>
          </form>
        </div>
      </section>
    </SiteShell>
  );
}
