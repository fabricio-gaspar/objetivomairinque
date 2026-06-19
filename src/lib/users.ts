// Client-side helpers para gestão de admins — chama a Edge Function `admin-users`.
// Edge function valida JWT + role admin antes de usar service role.
import { supabase } from "@/integrations/supabase/client";

export type AdminUser = { user_id: string; email: string; created_at: string };

async function invoke<T>(action: string, payload?: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke<T | { error: string }>("admin-users", {
    body: { action, ...payload },
  });
  if (error) throw new Error(error.message);
  if (data && typeof data === "object" && "error" in data && typeof (data as { error: string }).error === "string") {
    throw new Error((data as { error: string }).error);
  }
  return data as T;
}

export const listAdmins = (): Promise<AdminUser[]> => invoke<AdminUser[]>("list");
export const grantAdminByEmail = (input: { email: string }): Promise<{ ok: true; user_id: string }> =>
  invoke("grant", { email: input.email });
export const revokeAdmin = (input: { userId: string }): Promise<{ ok: true }> =>
  invoke("revoke", { userId: input.userId });
