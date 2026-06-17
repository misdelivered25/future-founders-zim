import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { img } from "@/lib/images";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Join Future Founders — Register" },
      { name: "description", content: "Register as a Future Founders member. Join thousands of young leaders, entrepreneurs and learners across the continent." },
      { property: "og:image", content: img.classroom },
    ],
  }),
  component: Register,
});

const INTERESTS = ["Financial Literacy", "Entrepreneurship", "Leadership", "Life & Digital Skills", "Mentorship", "Networking"];

function Register() {
  const [form, setForm] = useState({
    full_name: "", age: "", gender: "", phone_number: "", whatsapp_number: "",
    email: "", location: "", school_university_business: "",
    area_of_interest: "", reason_for_joining: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const age = parseInt(form.age, 10);
    if (!age || age < 10 || age > 100) {
      toast.error("Please enter a valid age.");
      setSubmitting(false); return;
    }
    const { error } = await supabase.from("registrations").insert({
      full_name: form.full_name.trim(),
      age, gender: form.gender,
      phone_number: form.phone_number.trim(),
      whatsapp_number: form.whatsapp_number.trim(),
      email: form.email.trim().toLowerCase(),
      location: form.location.trim() || null,
      school_university_business: form.school_university_business.trim() || null,
      area_of_interest: form.area_of_interest,
      reason_for_joining: form.reason_for_joining.trim(),
    });
    setSubmitting(false);
    if (error) { toast.error(error.message); return; }
    setDone(true);
    toast.success("Welcome to Future Founders!");
  }

  if (done) {
    return (
      <SiteShell>
        <section className="py-32">
          <div className="container-prose max-w-xl text-center">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="font-display text-4xl mb-4">You're in.</h1>
            <p className="text-muted-foreground mb-8">Welcome to Future Founders. We'll be in touch soon with your next steps, your cohort and your community.</p>
            <Button onClick={() => navigate({ to: "/" })} className="bg-primary">Back to home</Button>
          </div>
        </section>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <PageHeader eyebrow="Membership" title="Join Future Founders." subtitle="Tell us a little about you. It takes two minutes — and changes everything." image={img.classroom} />
      <section className="py-20">
        <div className="container-prose max-w-2xl">
          <form onSubmit={onSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-5 shadow-soft">
            <div className="grid sm:grid-cols-2 gap-5">
              <div><Label htmlFor="n">Full name *</Label><Input id="n" required value={form.full_name} onChange={update("full_name")} /></div>
              <div><Label htmlFor="a">Age *</Label><Input id="a" type="number" min={10} max={100} required value={form.age} onChange={update("age")} /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label>Gender *</Label>
                <Select value={form.gender} onValueChange={(v) => setForm({ ...form, gender: v })}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {["Female","Male","Prefer not to say","Other"].map(g=>(<SelectItem key={g} value={g}>{g}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div><Label htmlFor="loc">Location (city / country)</Label><Input id="loc" value={form.location} onChange={update("location")} /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div><Label htmlFor="p">Phone number *</Label><Input id="p" required value={form.phone_number} onChange={update("phone_number")} /></div>
              <div><Label htmlFor="w">WhatsApp number *</Label><Input id="w" required value={form.whatsapp_number} onChange={update("whatsapp_number")} /></div>
            </div>
            <div><Label htmlFor="e">Email *</Label><Input id="e" type="email" required value={form.email} onChange={update("email")} /></div>
            <div><Label htmlFor="s">School / University / Business</Label><Input id="s" value={form.school_university_business} onChange={update("school_university_business")} placeholder="Where you study or work" /></div>
            <div>
              <Label>Area of interest *</Label>
              <Select value={form.area_of_interest} onValueChange={(v) => setForm({ ...form, area_of_interest: v })}>
                <SelectTrigger><SelectValue placeholder="What do you want to focus on?" /></SelectTrigger>
                <SelectContent>{INTERESTS.map(i=>(<SelectItem key={i} value={i}>{i}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <div><Label htmlFor="r">Why do you want to join? *</Label><Textarea id="r" required rows={4} value={form.reason_for_joining} onChange={update("reason_for_joining")} placeholder="Tell us a little about your dream." /></div>
            <Button type="submit" disabled={submitting || !form.gender || !form.area_of_interest} className="w-full bg-primary h-12 text-base">
              {submitting ? "Submitting…" : "Become a Future Founder"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">By joining you agree to our community guidelines and privacy policy.</p>
          </form>
        </div>
      </section>
    </SiteShell>
  );
}
