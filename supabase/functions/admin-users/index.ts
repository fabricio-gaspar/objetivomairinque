// Edge Function: admin-users
// Lista/concede/revoga papel admin. Verifica que quem chama é admin via JWT.
// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.0";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: CORS });

  const url = Deno.env.get("SUPABASE_URL")!;
  const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const auth = req.headers.get("Authorization") ?? "";
  if (!auth.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);

  // Validate caller and check admin role
  const userClient = createClient(url, anon, { global: { headers: { Authorization: auth } } });
  const { data: userData, error: userErr } = await userClient.auth.getUser();
  if (userErr || !userData.user) return json({ error: "Unauthorized" }, 401);
  const callerId = userData.user.id;

  const admin = createClient(url, serviceKey);
  const { data: role } = await admin
    .from("user_roles")
    .select("role")
    .eq("user_id", callerId)
    .eq("role", "admin")
    .maybeSingle();
  if (!role) return json({ error: "Forbidden" }, 403);

  let body: any = {};
  try { body = await req.json(); } catch { /* empty */ }
  const action = String(body.action ?? "");

  try {
    if (action === "list") {
      const { data: roles, error } = await admin
        .from("user_roles")
        .select("user_id, created_at")
        .eq("role", "admin");
      if (error) throw new Error(error.message);
      const result: { user_id: string; email: string; created_at: string }[] = [];
      for (const r of roles ?? []) {
        const { data } = await admin.auth.admin.getUserById(r.user_id);
        result.push({ user_id: r.user_id, email: data.user?.email ?? "(desconhecido)", created_at: r.created_at });
      }
      return json(result);
    }

    if (action === "grant") {
      const email = String(body.email ?? "").trim().toLowerCase();
      if (!email || !email.includes("@")) return json({ error: "E-mail inválido" }, 400);
      let target: { id: string } | null = null;
      let page = 1;
      while (page < 20) {
        const { data: list, error } = await admin.auth.admin.listUsers({ page, perPage: 100 });
        if (error) throw new Error(error.message);
        const found = list.users.find((u) => u.email?.toLowerCase() === email);
        if (found) { target = { id: found.id }; break; }
        if (list.users.length < 100) break;
        page++;
      }
      if (!target) return json({ error: "Usuário com este e-mail não encontrado. Peça para ele se cadastrar primeiro em /login." }, 404);
      const { error } = await admin.from("user_roles").insert({ user_id: target.id, role: "admin" });
      if (error && !error.message.includes("duplicate")) throw new Error(error.message);
      return json({ ok: true, user_id: target.id });
    }

    if (action === "revoke") {
      const userId = String(body.userId ?? "");
      if (!userId) return json({ error: "userId obrigatório" }, 400);
      if (userId === callerId) return json({ error: "Você não pode remover a si mesmo." }, 400);
      const { error } = await admin.from("user_roles").delete().eq("user_id", userId).eq("role", "admin");
      if (error) throw new Error(error.message);
      return json({ ok: true });
    }

    return json({ error: "Ação desconhecida" }, 400);
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, "content-type": "application/json" },
  });
}
