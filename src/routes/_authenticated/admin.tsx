import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { img } from "@/lib/images";
import { LogOut, Users, Mail, ShieldAlert, RefreshCw, Heart, Calendar, Image, Quote, FileText, Award, Handshake, ClipboardList, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { ResourceManager, StatusBadge } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/_authenticated/admin")({
  component: Admin,
});

type Registration = { id: string; full_name: string; email: string; phone_number: string; whatsapp_number: string; age: number; gender: string; location: string | null; area_of_interest: string; reason_for_joining: string; sync_status: string; created_at: string };
type Contact = { id: string; full_name: string; email: string; phone_number: string | null; reason: string | null; message: string; is_read: boolean; created_at: string };
type Donation = { id: string; donor_name: string; email: string; amount: number; currency: string; impact_area: string; status: string; created_at: string };
type SyncLog = { id: string; source: string; status: string; rows_synced: number; error_message: string | null; created_at: string };

type Tab = "registrations" | "contacts" | "donations" | "events" | "gallery" | "testimonials" | "blog" | "resources" | "sponsors" | "partners" | "sync";

const TABS: { id: Tab; label: string; icon: typeof Users }[] = [
  { id: "registrations", label: "Registrations", icon: Users },
  { id: "contacts", label: "Messages", icon: Mail },
  { id: "donations", label: "Donations", icon: Heart },
  { id: "events", label: "Events", icon: Calendar },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "testimonials", label: "Testimonials", icon: Quote },
  { id: "blog", label: "Blog", icon: FileText },
  { id: "resources", label: "Resources", icon: BookOpen },
  { id: "sponsors", label: "Sponsors", icon: Award },
  { id: "partners", label: "Partners", icon: Handshake },
  { id: "sync", label: "Sync logs", icon: ClipboardList },
];

function Admin() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [syncLogs, setSyncLogs] = useState<SyncLog[]>([]);
  const [tab, setTab] = useState<Tab>("registrations");
  const [userEmail, setUserEmail] = useState("");
  const [syncing, setSyncing] = useState(false);
  const nav = useNavigate();

  async function reload() {
    const [r, c, d, s] = await Promise.all([
      supabase.from("registrations").select("*").order("created_at", { ascending: false }).limit(500),
      supabase.from("contacts").select("*").order("created_at", { ascending: false }).limit(500),
      supabase.from("donations").select("*").order("created_at", { ascending: false }).limit(500),
      supabase.from("sync_logs").select("*").order("created_at", { ascending: false }).limit(100),
    ]);
    setRegistrations((r.data as Registration[]) ?? []);
    setContacts((c.data as Contact[]) ?? []);
    setDonations((d.data as Donation[]) ?? []);
    setSyncLogs((s.data as SyncLog[]) ?? []);
  }

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      setUserEmail(u.user.email ?? "");
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", u.user.id);
      const admin = roles?.some((r) => r.role === "admin") ?? false;
      setIsAdmin(admin);
      if (admin) await reload();
      setLoading(false);
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
    nav({ to: "/auth" });
  }

  async function syncNow() {
    setSyncing(true);
    try {
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;
      const res = await fetch("/api/public/hooks/sync-registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: anonKey as string },
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || `HTTP ${res.status}`);
      toast.success(`Synced ${json.synced} registration${json.synced === 1 ? "" : "s"} to Google Sheets`);
      await reload();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      toast.error(`Sync failed: ${msg}`);
    } finally {
      setSyncing(false);
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface p-6">
        <div className="max-w-md w-full bg-card border border-border rounded-2xl p-10 text-center">
          <ShieldAlert className="w-12 h-12 text-royal mx-auto mb-5" />
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
            <Button size="sm" variant="outline" onClick={syncNow} disabled={syncing}>
              <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? "animate-spin" : ""}`} />{syncing ? "Syncing…" : "Sync now"}
            </Button>
            <span className="text-sm text-muted-foreground hidden sm:inline">{userEmail}</span>
            <Button variant="outline" size="sm" onClick={signOut}><LogOut className="w-4 h-4 mr-2" />Sign out</Button>
          </div>
        </div>
      </header>

      <div className="container-prose py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6"><div className="flex items-center gap-3"><Users className="w-8 h-8 text-royal" /><div><div className="text-2xl font-display">{registrations.length}</div><div className="text-xs uppercase tracking-wider text-muted-foreground">Registrations</div></div></div></Card>
          <Card className="p-6"><div className="flex items-center gap-3"><Mail className="w-8 h-8 text-royal" /><div><div className="text-2xl font-display">{contacts.length}</div><div className="text-xs uppercase tracking-wider text-muted-foreground">Messages</div></div></div></Card>
          <Card className="p-6"><div className="flex items-center gap-3"><Heart className="w-8 h-8 text-royal" /><div><div className="text-2xl font-display">{donations.length}</div><div className="text-xs uppercase tracking-wider text-muted-foreground">Donations</div></div></div></Card>
          <Card className="p-6"><div className="flex items-center gap-3"><RefreshCw className="w-8 h-8 text-royal" /><div><div className="text-2xl font-display">{registrations.filter((r) => r.sync_status === "synced").length}</div><div className="text-xs uppercase tracking-wider text-muted-foreground">Synced rows</div></div></div></Card>
        </div>

        <div className="flex gap-1 mb-6 border-b border-border overflow-x-auto">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px whitespace-nowrap flex items-center gap-2 ${tab === t.id ? "border-royal text-royal" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              <t.icon className="w-4 h-4" />{t.label}
            </button>
          ))}
        </div>

        {tab === "registrations" && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden overflow-x-auto">
            <Table>
              <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead><TableHead>Age</TableHead><TableHead>Interest</TableHead><TableHead>Sync</TableHead><TableHead>Date</TableHead></TableRow></TableHeader>
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
        )}

        {tab === "contacts" && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden overflow-x-auto">
            <Table>
              <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Reason</TableHead><TableHead>Message</TableHead><TableHead>Date</TableHead></TableRow></TableHeader>
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

        {tab === "donations" && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden overflow-x-auto">
            <Table>
              <TableHeader><TableRow><TableHead>Donor</TableHead><TableHead>Email</TableHead><TableHead>Amount</TableHead><TableHead>Impact</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead></TableRow></TableHeader>
              <TableBody>
                {donations.length === 0 && <TableRow><TableCell colSpan={6} className="text-center py-12 text-muted-foreground">No donations yet.</TableCell></TableRow>}
                {donations.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">{d.donor_name}</TableCell>
                    <TableCell>{d.email}</TableCell>
                    <TableCell>{d.currency} {Number(d.amount).toLocaleString()}</TableCell>
                    <TableCell>{d.impact_area}</TableCell>
                    <TableCell><Badge variant={d.status === "completed" ? "default" : "secondary"}>{d.status}</Badge></TableCell>
                    <TableCell className="text-xs text-muted-foreground">{new Date(d.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {tab === "events" && (
          <ResourceManager
            table="events" title="Events" togglePublished="is_published"
            fields={[
              { name: "title", label: "Title", required: true },
              { name: "slug", label: "Slug (url-friendly)", required: true },
              { name: "starts_at", label: "Starts at", type: "datetime-local", required: true },
              { name: "ends_at", label: "Ends at", type: "datetime-local" },
              { name: "location", label: "Location" },
              { name: "image_url", label: "Image URL", type: "url" },
              { name: "description", label: "Description", type: "textarea" },
              { name: "is_published", label: "Publish immediately", type: "boolean" },
            ]}
            columns={[
              { name: "title", label: "Title" },
              { name: "starts_at", label: "Starts", render: (r) => new Date(String(r.starts_at)).toLocaleString() },
              { name: "location", label: "Location" },
              { name: "is_published", label: "Status", render: (r) => <StatusBadge value={!!r.is_published} /> },
            ]}
          />
        )}

        {tab === "gallery" && (
          <ResourceManager
            table="gallery_items" title="Gallery" togglePublished="is_published"
            fields={[
              { name: "title", label: "Caption" },
              { name: "image_url", label: "Image URL", type: "url", required: true },
              { name: "category", label: "Category" },
              { name: "sort_order", label: "Sort order", type: "number" },
              { name: "is_published", label: "Published", type: "boolean" },
            ]}
            columns={[
              { name: "image_url", label: "Image", render: (r) => <img src={String(r.image_url)} alt="" className="w-14 h-14 object-cover rounded-md" /> },
              { name: "title", label: "Caption" },
              { name: "category", label: "Category" },
              { name: "is_published", label: "Status", render: (r) => <StatusBadge value={!!r.is_published} /> },
            ]}
          />
        )}

        {tab === "testimonials" && (
          <ResourceManager
            table="testimonials" title="Testimonials" togglePublished="is_published"
            fields={[
              { name: "author_name", label: "Author", required: true },
              { name: "author_role", label: "Role / location" },
              { name: "image_url", label: "Photo URL", type: "url" },
              { name: "quote", label: "Quote", type: "textarea", required: true },
              { name: "sort_order", label: "Sort order", type: "number" },
              { name: "is_published", label: "Published", type: "boolean" },
            ]}
            columns={[
              { name: "author_name", label: "Author" },
              { name: "quote", label: "Quote", render: (r) => <span className="block max-w-md truncate">{String(r.quote)}</span> },
              { name: "is_published", label: "Status", render: (r) => <StatusBadge value={!!r.is_published} /> },
            ]}
          />
        )}

        {tab === "blog" && (
          <ResourceManager
            table="blog_posts" title="Blog posts" togglePublished="is_published"
            fields={[
              { name: "title", label: "Title", required: true },
              { name: "slug", label: "Slug", required: true },
              { name: "author", label: "Author" },
              { name: "cover_url", label: "Cover image URL", type: "url" },
              { name: "excerpt", label: "Excerpt" },
              { name: "content", label: "Content (markdown / text)", type: "textarea", required: true },
              { name: "published_at", label: "Published at", type: "datetime-local" },
              { name: "is_published", label: "Publish immediately", type: "boolean" },
            ]}
            columns={[
              { name: "title", label: "Title" },
              { name: "author", label: "Author" },
              { name: "is_published", label: "Status", render: (r) => <StatusBadge value={!!r.is_published} /> },
              { name: "created_at", label: "Created", render: (r) => new Date(String(r.created_at)).toLocaleDateString() },
            ]}
          />
        )}

        {tab === "sponsors" && (
          <ResourceManager
            table="sponsors" title="Sponsors" togglePublished="is_active"
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "logo_url", label: "Logo URL", type: "url" },
              { name: "website_url", label: "Website URL", type: "url" },
              { name: "tier", label: "Tier", type: "select", options: ["platinum","gold","silver","bronze","partner"] },
              { name: "sort_order", label: "Sort order", type: "number" },
              { name: "is_active", label: "Active", type: "boolean" },
            ]}
            columns={[
              { name: "logo_url", label: "Logo", render: (r) => r.logo_url ? <img src={String(r.logo_url)} alt="" className="h-10 max-w-[120px] object-contain" /> : "—" },
              { name: "name", label: "Name" },
              { name: "tier", label: "Tier" },
              { name: "is_active", label: "Status", render: (r) => <StatusBadge value={!!r.is_active} trueLabel="Active" falseLabel="Hidden" /> },
            ]}
          />
        )}

        {tab === "partners" && (
          <ResourceManager
            table="partners" title="Partners" togglePublished="is_active"
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "logo_url", label: "Logo URL", type: "url" },
              { name: "website_url", label: "Website URL", type: "url" },
              { name: "sort_order", label: "Sort order", type: "number" },
              { name: "is_active", label: "Active", type: "boolean" },
            ]}
            columns={[
              { name: "logo_url", label: "Logo", render: (r) => r.logo_url ? <img src={String(r.logo_url)} alt="" className="h-10 max-w-[120px] object-contain" /> : "—" },
              { name: "name", label: "Name" },
              { name: "is_active", label: "Status", render: (r) => <StatusBadge value={!!r.is_active} trueLabel="Active" falseLabel="Hidden" /> },
            ]}
          />
        )}

        {tab === "resources" && (
          <ResourceManager
            table="resources" title="Resource library" togglePublished="is_published"
            fields={[
              { name: "title", label: "Title", required: true },
              { name: "url", label: "URL", type: "url", required: true },
              { name: "kind", label: "Kind", type: "select", options: ["pdf","link","video","template"] },
              { name: "category", label: "Category" },
              { name: "cover_url", label: "Cover image URL", type: "url" },
              { name: "description", label: "Description", type: "textarea" },
              { name: "sort_order", label: "Sort order", type: "number" },
              { name: "is_published", label: "Published", type: "boolean" },
            ]}
            columns={[
              { name: "title", label: "Title" },
              { name: "kind", label: "Kind" },
              { name: "category", label: "Category" },
              { name: "is_published", label: "Status", render: (r) => <StatusBadge value={!!r.is_published} /> },
            ]}
          />
        )}

        {tab === "sync" && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden overflow-x-auto">
            <Table>
              <TableHeader><TableRow><TableHead>Source</TableHead><TableHead>Status</TableHead><TableHead>Rows</TableHead><TableHead>Error</TableHead><TableHead>When</TableHead></TableRow></TableHeader>
              <TableBody>
                {syncLogs.length === 0 && <TableRow><TableCell colSpan={5} className="text-center py-12 text-muted-foreground">No sync activity yet. Click “Sync now” at the top.</TableCell></TableRow>}
                {syncLogs.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell>{l.source}</TableCell>
                    <TableCell><Badge variant={l.status === "ok" ? "default" : "destructive"}>{l.status}</Badge></TableCell>
                    <TableCell>{l.rows_synced}</TableCell>
                    <TableCell className="max-w-md truncate text-xs text-muted-foreground">{l.error_message ?? "—"}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{new Date(l.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
