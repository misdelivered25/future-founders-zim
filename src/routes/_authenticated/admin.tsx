import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { img } from "@/lib/images";
import { LogOut, Users, Mail, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  component: Admin,
});

type Registration = {
  id: string; full_name: string; email: string; phone_number: string; whatsapp_number: string;
  age: number; gender: string; location: string | null; area_of_interest: string;
  reason_for_joining: string; sync_status: string; created_at: string;
};
type Contact = {
  id: string; full_name: string; email: string; phone_number: string | null;
  reason: string | null; message: string; is_read: boolean; created_at: string;
};

function Admin() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [tab, setTab] = useState<"registrations" | "contacts">("registrations");
  const [userEmail, setUserEmail] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      setUserEmail(u.user.email ?? "");
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", u.user.id);
      const admin = roles?.some((r) => r.role === "admin") ?? false;
      setIsAdmin(admin);
      if (admin) {
        const [r, c] = await Promise.all([
          supabase.from("registrations").select("*").order("created_at", { ascending: false }).limit(500),
          supabase.from("contacts").select("*").order("created_at", { ascending: false }).limit(500),
        ]);
        setRegistrations((r.data as Registration[]) ?? []);
        setContacts((c.data as Contact[]) ?? []);
      }
      setLoading(false);
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
    nav({ to: "/auth" });
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface p-6">
        <div className="max-w-md w-full bg-card border border-border rounded-2xl p-10 text-center">
          <ShieldAlert className="w-12 h-12 text-gold mx-auto mb-5" />
          <h1 className="font-display text-2xl mb-3">Admin access required</h1>
          <p className="text-sm text-muted-foreground mb-2">You're signed in as <strong>{userEmail}</strong> but this account is not an admin.</p>
          <p className="text-xs text-muted-foreground mb-6">Ask the Future Founders team to grant your account admin access.</p>
          <div className="flex gap-2">
            <Link to="/" className="flex-1"><Button variant="outline" className="w-full">Home</Button></Link>
            <Button onClick={signOut} className="flex-1 bg-primary"><LogOut className="w-4 h-4 mr-2" />Sign out</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-background sticky top-0 z-20">
        <div className="container-prose flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src={img.logo} alt="" className="h-9 w-9" />
            <div><div className="font-display text-base leading-none">Future Founders</div><div className="text-xs text-muted-foreground">Admin console</div></div>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">{userEmail}</span>
            <Button variant="outline" size="sm" onClick={signOut}><LogOut className="w-4 h-4 mr-2" />Sign out</Button>
          </div>
        </div>
      </header>

      <div className="container-prose py-10">
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Card className="p-6"><div className="flex items-center gap-3"><Users className="w-8 h-8 text-primary" /><div><div className="text-2xl font-display">{registrations.length}</div><div className="text-xs uppercase tracking-wider text-muted-foreground">Registrations</div></div></div></Card>
          <Card className="p-6"><div className="flex items-center gap-3"><Mail className="w-8 h-8 text-primary" /><div><div className="text-2xl font-display">{contacts.length}</div><div className="text-xs uppercase tracking-wider text-muted-foreground">Messages</div></div></div></Card>
          <Card className="p-6"><div className="flex items-center gap-3"><ShieldAlert className="w-8 h-8 text-gold" /><div><div className="text-2xl font-display">{registrations.filter((r) => r.sync_status === "synced").length}</div><div className="text-xs uppercase tracking-wider text-muted-foreground">Synced to sheets</div></div></div></Card>
        </div>

        <div className="flex gap-2 mb-6 border-b border-border">
          {(["registrations","contacts"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px ${tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {t === "registrations" ? "Registrations" : "Contact messages"}
            </button>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {tab === "registrations" ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader><TableRow>
                  <TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead>
                  <TableHead>Age</TableHead><TableHead>Interest</TableHead><TableHead>Sync</TableHead><TableHead>Date</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {registrations.length === 0 && <TableRow><TableCell colSpan={7} className="text-center py-12 text-muted-foreground">No registrations yet.</TableCell></TableRow>}
                  {registrations.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.full_name}</TableCell>
                      <TableCell>{r.email}</TableCell>
                      <TableCell>{r.phone_number}</TableCell>
                      <TableCell>{r.age}</TableCell>
                      <TableCell>{r.area_of_interest}</TableCell>
                      <TableCell><Badge variant={r.sync_status === "synced" ? "default" : "secondary"}>{r.sync_status}</Badge></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader><TableRow>
                  <TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Reason</TableHead><TableHead>Message</TableHead><TableHead>Date</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {contacts.length === 0 && <TableRow><TableCell colSpan={5} className="text-center py-12 text-muted-foreground">No messages yet.</TableCell></TableRow>}
                  {contacts.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.full_name}</TableCell>
                      <TableCell>{c.email}</TableCell>
                      <TableCell>{c.reason ?? "—"}</TableCell>
                      <TableCell className="max-w-md truncate">{c.message}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
