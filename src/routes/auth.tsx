import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { img } from "@/lib/images";
import { Shield } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin sign-in — Future Founders" },
      { name: "description", content: "Sign in to the Future Founders admin console." },
    ],
  }),
  component: Auth,
});

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const nav = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { if (data.session) nav({ to: "/admin" }); });
    // Hidden sign-up access: append ?signup=1 to URL
    if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("signup") === "1") {
      setMode("signup");
    }
  }, [nav]);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Welcome back.");
      nav({ to: "/admin" });
    } else {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Account created. An existing admin must grant your account access before you can use the dashboard.");
    }
  }

  return (
    <SiteShell>
      <section className="min-h-[80vh] grid lg:grid-cols-2">
        <div className="relative hidden lg:block">
          <img src={img.graduate} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 gradient-hero opacity-85" />
          <div className="relative h-full flex flex-col justify-end p-12 text-background">
            <Shield className="w-10 h-10 text-royal mb-4" />
            <h2 className="font-display text-4xl text-background mb-3">Future Founders Console</h2>
            <p className="text-background/80">Admin access only. Manage members, registrations and the community.</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Link to="/" className="inline-block text-sm text-muted-foreground mb-8 hover:text-primary">← Back to home</Link>
            <h1 className="font-display text-3xl mb-2">{mode === "signin" ? "Admin sign in" : "Create admin account"}</h1>
            <p className="text-muted-foreground mb-8">{mode === "signin" ? "Sign in to access the admin dashboard." : "New accounts must be granted admin access by an existing admin."}</p>
            <form onSubmit={submit} className="space-y-4">
              <div><Label htmlFor="e">Email</Label><Input id="e" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              <div><Label htmlFor="p">Password{mode === "signup" ? " (min 8 chars)" : ""}</Label><Input id="p" type="password" minLength={mode === "signup" ? 8 : undefined} required value={password} onChange={(e) => setPassword(e.target.value)} /></div>
              <Button type="submit" disabled={loading} className="w-full bg-royal text-white hover:bg-royal/90 h-11">
                {loading ? "Working…" : mode === "signin" ? "Sign in" : "Create account"}
              </Button>
            </form>
            <p className="mt-6 text-center text-xs text-muted-foreground">
              Not an admin?{" "}
              <Link to="/join-future-founders" className="text-royal hover:underline">Join Future Founders as a member instead →</Link>
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
