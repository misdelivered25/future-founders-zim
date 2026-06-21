import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle2 } from "lucide-react";

export function NewsletterForm({ source = "footer" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = email.trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) return toast.error("Enter a valid email.");
    setBusy(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: v, source });
    setBusy(false);
    if (error) {
      if (error.code === "23505") { setDone(true); return; }
      toast.error("Could not subscribe. Try again."); return;
    }
    setDone(true);
    toast.success("You're in. Welcome!");
  }

  if (done) {
    return (
      <div className="flex items-center gap-2 text-sm text-background/90 bg-background/10 rounded-lg px-4 py-3 border border-background/15">
        <CheckCircle2 className="w-4 h-4 text-gold" /> Thanks — keep an eye on your inbox.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <div className="relative flex-1">
        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-background/50" />
        <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="pl-9 bg-background/10 border-background/20 text-background placeholder:text-background/50" />
      </div>
      <Button type="submit" disabled={busy} className="bg-royal hover:bg-royal/90 text-white shrink-0">{busy ? "…" : "Subscribe"}</Button>
    </form>
  );
}
