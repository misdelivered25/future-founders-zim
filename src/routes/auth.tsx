import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { img } from "@/lib/images";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Future Founders" },
      { name: "description", content: "Sign in or create your Future Founders admin account." },
    ],
  }),
  component: Auth,
});

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { if (data.session) nav({ to: "/admin" }); });
  }, [nav]);

  async function signIn(e: React.FormEvent) {
    e.preventDefault(); setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back.");
    nav({ to: "/admin" });
  }

  async function signUp(e: React.FormEvent) {
    e.preventDefault(); setLoading(true);
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Account created. Check your inbox if email confirmation is required.");
  }

  return (
    <SiteShell>
      <section className="min-h-[80vh] grid lg:grid-cols-2">
        <div className="relative hidden lg:block">
          <img src={img.graduate} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 gradient-hero opacity-80" />
          <div className="relative h-full flex flex-col justify-end p-12 text-background">
            <h2 className="font-display text-4xl text-background mb-3">Future Founders Console</h2>
            <p className="text-background/80">Manage members, registrations and the community.</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Link to="/" className="inline-block text-sm text-muted-foreground mb-8 hover:text-primary">← Back to home</Link>
            <h1 className="font-display text-3xl mb-2">Welcome</h1>
            <p className="text-muted-foreground mb-8">Sign in to access the admin dashboard.</p>
            <Tabs defaultValue="signin">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="signin">Sign in</TabsTrigger>
                <TabsTrigger value="signup">Sign up</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <form onSubmit={signIn} className="space-y-4 mt-6">
                  <div><Label htmlFor="e1">Email</Label><Input id="e1" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                  <div><Label htmlFor="p1">Password</Label><Input id="p1" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                  <Button type="submit" disabled={loading} className="w-full bg-primary h-11">{loading ? "Signing in…" : "Sign in"}</Button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={signUp} className="space-y-4 mt-6">
                  <div><Label htmlFor="e2">Email</Label><Input id="e2" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                  <div><Label htmlFor="p2">Password (min 6 chars)</Label><Input id="p2" type="password" minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                  <Button type="submit" disabled={loading} className="w-full bg-primary h-11">{loading ? "Creating…" : "Create account"}</Button>
                  <p className="text-xs text-muted-foreground">After signing up, your account needs to be granted admin access before you can view the dashboard.</p>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
