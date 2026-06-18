import { createFileRoute } from "@tanstack/react-router";

// Google Sheets sync — appends pending registrations to a Google Sheet
// via the Lovable connector gateway, then marks them as synced.
//
// Auth model: this lives under /api/public (no edge auth). We additionally
// require the request to carry the project's anon/publishable key in the
// `apikey` header, matching the pg_cron pattern.

const SPREADSHEET_ID = "1-K_WwQz_HmK0KpV87ReZ7hADjOMupqkGiXJ6r6cy-SQ";
const TAB = "Registrations";
const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";

const HEADERS = [
  "id", "full_name", "age", "gender", "phone_number", "whatsapp_number",
  "email", "location", "school_university_business", "area_of_interest",
  "reason_for_joining", "registration_source", "created_at", "synced_at",
];

type Reg = {
  id: string; full_name: string; age: number; gender: string;
  phone_number: string; whatsapp_number: string; email: string;
  location: string | null; school_university_business: string | null;
  area_of_interest: string; reason_for_joining: string;
  created_at: string;
};

async function gatewayFetch(path: string, init: RequestInit) {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const sheetsKey = process.env.GOOGLE_SHEETS_API_KEY;
  if (!lovableKey || !sheetsKey) throw new Error("Missing LOVABLE_API_KEY or GOOGLE_SHEETS_API_KEY");
  const res = await fetch(`${GATEWAY}${path}`, {
    ...init,
    headers: {
      ...(init.headers || {}),
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": sheetsKey,
    },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Sheets gateway ${res.status}: ${text}`);
  return text ? JSON.parse(text) : {};
}

async function ensureHeader() {
  const data = await gatewayFetch(`/spreadsheets/${SPREADSHEET_ID}/values/${TAB}!A1:N1`, { method: "GET" });
  const existing = (data.values?.[0] ?? []) as string[];
  if (existing.length === 0) {
    await gatewayFetch(`/spreadsheets/${SPREADSHEET_ID}/values/${TAB}!A1:N1?valueInputOption=RAW`, {
      method: "PUT",
      body: JSON.stringify({ range: `${TAB}!A1:N1`, majorDimension: "ROWS", values: [HEADERS] }),
    });
  }
}

async function runSync() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: pending, error: selErr } = await supabaseAdmin
    .from("registrations")
    .select("id, full_name, age, gender, phone_number, whatsapp_number, email, location, school_university_business, area_of_interest, reason_for_joining, created_at")
    .eq("sync_status", "pending")
    .order("created_at", { ascending: true })
    .limit(500);

  if (selErr) throw new Error(`DB read failed: ${selErr.message}`);
  const rows = (pending ?? []) as Reg[];

  if (rows.length === 0) {
    await supabaseAdmin.from("sync_logs").insert({ source: "google_sheets", status: "ok", rows_synced: 0 });
    return { ok: true, synced: 0, message: "No pending registrations." };
  }

  try {
    await ensureHeader();
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    await supabaseAdmin.from("sync_logs").insert({ source: "google_sheets", status: "error", rows_synced: 0, error_message: `ensureHeader: ${msg}` });
    throw e;
  }

  const syncedAt = new Date().toISOString();
  const values = rows.map((r) => [
    r.id, r.full_name, String(r.age), r.gender, r.phone_number, r.whatsapp_number,
    r.email, r.location ?? "", r.school_university_business ?? "", r.area_of_interest,
    r.reason_for_joining, "website", r.created_at, syncedAt,
  ]);

  try {
    await gatewayFetch(`/spreadsheets/${SPREADSHEET_ID}/values/${TAB}!A:N:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, {
      method: "POST",
      body: JSON.stringify({ range: `${TAB}!A:N`, majorDimension: "ROWS", values }),
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    await supabaseAdmin.from("sync_logs").insert({ source: "google_sheets", status: "error", rows_synced: 0, error_message: msg });
    throw e;
  }

  const ids = rows.map((r) => r.id);
  await supabaseAdmin.from("registrations").update({ sync_status: "synced", synced_at: syncedAt }).in("id", ids);
  await supabaseAdmin.from("sync_logs").insert({ source: "google_sheets", status: "ok", rows_synced: rows.length });

  return { ok: true, synced: rows.length };
}

async function handle(request: Request): Promise<Response> {
  const apiKey = request.headers.get("apikey") ?? request.headers.get("x-api-key");
  const expected = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!expected || apiKey !== expected) {
    return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
  }
  try {
    const result = await runSync();
    return new Response(JSON.stringify(result), { headers: { "Content-Type": "application/json" } });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ ok: false, error: msg }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}

export const Route = createFileRoute("/api/public/hooks/sync-registrations")({
  server: {
    handlers: {
      POST: ({ request }) => handle(request),
      GET: ({ request }) => handle(request),
    },
  },
});
