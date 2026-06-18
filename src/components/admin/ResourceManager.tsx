import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "number" | "url" | "datetime-local" | "textarea" | "select" | "boolean";
  options?: string[];
  required?: boolean;
  defaultValue?: string | number | boolean;
};

export type Column = {
  name: string;
  label: string;
  render?: (row: Record<string, unknown>) => React.ReactNode;
};

export function ResourceManager({
  table, title, fields, columns, togglePublished,
}: {
  table: string;
  title: string;
  fields: Field[];
  columns: Column[];
  togglePublished?: "is_published" | "is_active" | null;
}) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Record<string, unknown>>({});

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from(table as never).select("*").order("created_at", { ascending: false }).limit(500);
    if (error) toast.error(`${title}: ${error.message}`);
    setRows((data as Record<string, unknown>[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const payload: Record<string, unknown> = {};
    for (const f of fields) {
      let v = form[f.name];
      if (f.type === "number") v = v === "" || v == null ? null : Number(v);
      if (f.type === "boolean") v = !!v;
      if (f.type === "datetime-local" && v) v = new Date(String(v)).toISOString();
      if (f.required && (v === "" || v == null)) { toast.error(`${f.label} is required`); return; }
      payload[f.name] = v ?? null;
    }
    const { error } = await supabase.from(table as never).insert(payload as never);
    if (error) return toast.error(error.message);
    toast.success(`${title} added`);
    setForm({}); setAdding(false); load();
  }

  async function del(id: string) {
    if (!confirm("Delete this item?")) return;
    const { error } = await supabase.from(table as never).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted"); load();
  }

  async function togglePub(id: string, current: boolean) {
    if (!togglePublished) return;
    const { error } = await supabase.from(table as never).update({ [togglePublished]: !current } as never).eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl">{title}</h2>
        <Button onClick={() => setAdding(!adding)} size="sm" className="bg-royal text-white hover:bg-royal/90">
          <Plus className="w-4 h-4 mr-1" />{adding ? "Cancel" : "Add new"}
        </Button>
      </div>

      {adding && (
        <form onSubmit={add} className="bg-card border border-border rounded-xl p-5 grid sm:grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.name} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
              <Label>{f.label}{f.required && " *"}</Label>
              {f.type === "textarea" ? (
                <textarea className="w-full border border-input rounded-md p-2 text-sm min-h-[100px]" value={String(form[f.name] ?? "")} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} />
              ) : f.type === "select" ? (
                <select className="w-full border border-input rounded-md h-10 px-2 text-sm bg-background" value={String(form[f.name] ?? "")} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}>
                  <option value="">Select…</option>
                  {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : f.type === "boolean" ? (
                <label className="flex items-center gap-2 h-10">
                  <input type="checkbox" checked={!!form[f.name]} onChange={(e) => setForm({ ...form, [f.name]: e.target.checked })} />
                  <span className="text-sm text-muted-foreground">Yes</span>
                </label>
              ) : (
                <Input type={f.type ?? "text"} value={String(form[f.name] ?? "")} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} />
              )}
            </div>
          ))}
          <div className="sm:col-span-2 flex justify-end gap-2">
            <Button type="submit" className="bg-royal text-white">Save</Button>
          </div>
        </form>
      )}

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow>
              {columns.map((c) => <TableHead key={c.name}>{c.label}</TableHead>)}
              <TableHead className="w-32 text-right">Actions</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {loading && <TableRow><TableCell colSpan={columns.length + 1} className="text-center py-8 text-muted-foreground">Loading…</TableCell></TableRow>}
              {!loading && rows.length === 0 && <TableRow><TableCell colSpan={columns.length + 1} className="text-center py-12 text-muted-foreground">Nothing here yet. Click “Add new”.</TableCell></TableRow>}
              {rows.map((r) => (
                <TableRow key={String(r.id)}>
                  {columns.map((c) => <TableCell key={c.name}>{c.render ? c.render(r) : String(r[c.name] ?? "—")}</TableCell>)}
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      {togglePublished && (
                        <Button size="sm" variant="ghost" onClick={() => togglePub(String(r.id), !!r[togglePublished])} title="Toggle visibility">
                          {r[togglePublished] ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" onClick={() => del(String(r.id))}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ value, trueLabel = "Published", falseLabel = "Draft" }: { value: boolean; trueLabel?: string; falseLabel?: string }) {
  return <Badge variant={value ? "default" : "secondary"}>{value ? trueLabel : falseLabel}</Badge>;
}
