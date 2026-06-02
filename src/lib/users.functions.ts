import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(userId: string) {
  const { data } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (!data) throw new Error("Forbidden: admin role required");
}

export const listAdmins = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const { data: roles, error } = await supabaseAdmin
      .from("user_roles")
      .select("user_id, created_at")
      .eq("role", "admin");
    if (error) throw new Error(error.message);
    const result: { user_id: string; email: string; created_at: string }[] = [];
    for (const r of roles ?? []) {
      const { data } = await supabaseAdmin.auth.admin.getUserById(r.user_id);
      result.push({ user_id: r.user_id, email: data.user?.email ?? "(desconhecido)", created_at: r.created_at });
    }
    return result;
  });

export const grantAdminByEmail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ email: z.string().trim().email().max(200) }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    // find user by email via admin listUsers (paginated)
    let target: { id: string; email?: string } | null = null;
    let page = 1;
    while (page < 20) {
      const { data: list, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 100 });
      if (error) throw new Error(error.message);
      const found = list.users.find((u) => u.email?.toLowerCase() === data.email.toLowerCase());
      if (found) {
        target = { id: found.id, email: found.email };
        break;
      }
      if (list.users.length < 100) break;
      page++;
    }
    if (!target) throw new Error("Usuário com este e-mail não encontrado. Peça para ele se cadastrar primeiro em /login.");
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: target.id, role: "admin" })
      .select()
      .maybeSingle();
    if (error && !error.message.includes("duplicate")) throw new Error(error.message);
    return { ok: true, user_id: target.id };
  });

export const revokeAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ userId: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    if (data.userId === context.userId) throw new Error("Você não pode remover a si mesmo.");
    const { error } = await supabaseAdmin
      .from("user_roles")
      .delete()
      .eq("user_id", data.userId)
      .eq("role", "admin");
    if (error) throw new Error(error.message);
    return { ok: true };
  });
