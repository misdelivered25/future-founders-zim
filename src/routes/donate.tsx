import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { img } from "@/lib/images";
import { GraduationCap, Briefcase, BookOpen, Bus, Rocket, HandHeart, CheckCircle2, Heart } from "lucide-react";
import { whatsappLink } from "@/lib/futureFoundersBrand";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Future Founders" },
      { name: "description", content: "Sponsor a learner, fund a workshop, or back a young founder. Every donation builds the next generation." },
      { property: "og:title", content: "Donate — Future Founders" },
      { property: "og:description", content: "100% of your gift goes into youth empowerment programs." },
      { property: "og:url", content: "https://future-founders-zim.lovable.app/donate" },
      { property: "og:image", content: img.graduate },
    ],
    links: [{ rel: "canonical", href: "https://future-founders-zim.lovable.app/donate" }],
  }),
  component: Donate,
});

const IMPACT = [
  { icon: GraduationCap, t: "Sponsor a learner", d: "Cover a full Future Founders academy seat for one young person.", a: "from $25 / month", area: "Sponsor a learner" },
  { icon: BookOpen, t: "Support a workshop", d: "Bring a community workshop to a school, market or village.", a: "from $150", area: "Workshop" },
  { icon: Briefcase, t: "Training materials", d: "Workbooks, devices and digital licences for our cohorts.", a: "from $50", area: "Materials" },
  { icon: Bus, t: "Support transport", d: "Help rural youth reach training centres safely.", a: "from $20 / week", area: "Transport" },
  { icon: Rocket, t: "Youth startup funding", d: "Micro-grants for graduates ready to launch.", a: "from $500", area: "Startup funding" },
  { icon: HandHeart, t: "Community outreach", d: "Fund mentor visits, scholarships and outreach drives.", a: "any amount", area: "Outreach" },
];

const PRESETS = [25, 50, 100, 250, 500];
const PAYMENT = ["EcoCash", "Bank transfer", "PayPal", "Card / Stripe", "Other"];

function Donate() {
  const [impact, setImpact] = useState<string>("Sponsor a learner");
  const [amount, setAmount] = useState<string>("50");
  const [currency, setCurrency] = useState<"USD" | "ZWL" | "ZAR">("USD");
  const [payment, setPayment] = useState<string>("EcoCash");
  const [form, setForm] = useState({ donor_name: "", email: "", phone_number: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const upd = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!amt || amt <= 0 || amt > 1_000_000) return toast.error("Please enter a valid amount.");
    if (form.donor_name.trim().length < 2) return toast.error("Please enter your name.");
    setSubmitting(true);
    const { error } = await supabase.from("donations").insert({
      donor_name: form.donor_name.trim(),
      email: form.email.trim().toLowerCase(),
      phone_number: form.phone_number.trim() || null,
      amount: amt,
      currency,
      impact_area: impact,
      message: `${payment} | ${form.message.trim()}`.slice(0, 1000) || null,
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
            <p className="text-muted-foreground mb-2">Your pledge of <strong>{currency} {amount}</strong> toward <strong>{impact}</strong> has been received.</p>
            <p className="text-muted-foreground mb-8">We'll reach out shortly with payment instructions for <strong>{payment}</strong>.</p>
            <a href={whatsappLink(`Hi, I just pledged a donation of ${currency} ${amount} for ${impact}. My name is ${form.donor_name}.`)} target="_blank" rel="noreferrer">
              <Button className="bg-[#25D366] hover:bg-[#22c55e] text-white">Continue on WhatsApp</Button>
            </a>
          </div>
        </section>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <PageHeader eyebrow="Donate" title="Build a founder. Change a future." subtitle="100% of your donation goes directly into youth empowerment programs." image={img.graduate} />

      <section className="py-20">
        <div className="container-prose grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-5">
            <h2 className="font-display text-2xl mb-2">Pick the impact area</h2>
            <p className="text-sm text-muted-foreground mb-5">Choose what your gift powers. Every option fuels a real young founder.</p>
            <div className="grid gap-3">
              {IMPACT.map((i) => (
                <button
                  key={i.area}
                  type="button"
                  onClick={() => setImpact(i.area)}
                  className={`text-left p-4 rounded-xl border transition-all ${impact === i.area ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border bg-card hover:border-primary/40"}`}
                >
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center shrink-0 text-ink">
                      <i.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-display text-base leading-tight">{i.t}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{i.d}</div>
                      <div className="text-xs uppercase tracking-wider text-primary font-semibold mt-1">{i.a}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-3 bg-card border border-border rounded-2xl p-8 space-y-6 shadow-soft h-fit">
            <div>
              <Label>Amount</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setAmount(String(p))}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${amount === String(p) ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/40"}`}
                  >
                    {currency} {p}
                  </button>
                ))}
              </div>
              <div className="grid sm:grid-cols-[1fr_auto] gap-3 mt-3">
                <Input type="number" min={1} step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Custom amount" />
                <select value={currency} onChange={(e) => setCurrency(e.target.value as "USD" | "ZWL" | "ZAR")} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option value="USD">USD</option>
                  <option value="ZWL">ZWL</option>
                  <option value="ZAR">ZAR</option>
                </select>
              </div>
            </div>

            <div>
              <Label>Payment method</Label>
              <RadioGroup value={payment} onValueChange={setPayment} className="grid sm:grid-cols-2 gap-2 mt-2">
                {PAYMENT.map((p) => (
                  <Label key={p} htmlFor={`pay-${p}`} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${payment === p ? "border-primary bg-primary/5" : "border-border"}`}>
                    <RadioGroupItem value={p} id={`pay-${p}`} />
                    <span className="text-sm font-medium">{p}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label htmlFor="dn">Your name *</Label><Input id="dn" required value={form.donor_name} onChange={upd("donor_name")} /></div>
              <div><Label htmlFor="de">Email *</Label><Input id="de" type="email" required value={form.email} onChange={upd("email")} /></div>
            </div>
            <div><Label htmlFor="dp">Phone / WhatsApp</Label><Input id="dp" value={form.phone_number} onChange={upd("phone_number")} /></div>
            <div><Label htmlFor="dm">Message (optional)</Label><Textarea id="dm" rows={3} value={form.message} onChange={upd("dm" as never) || upd("message")} placeholder="Anything we should know?" /></div>

            <Button type="submit" disabled={submitting} className="w-full bg-primary h-12 text-base">
              <Heart className="w-4 h-4 mr-2" />
              {submitting ? "Submitting…" : `Pledge ${currency} ${amount || "0"}`}
            </Button>
            <p className="text-xs text-muted-foreground text-center">After submitting we'll reach out with payment instructions. Your details stay private.</p>
          </form>
        </div>
      </section>
    </SiteShell>
  );
}
