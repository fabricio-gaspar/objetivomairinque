// Client-side helpers para mensagens. RLS protege leitura por admin; insert é público.
import { supabase } from "@/integrations/supabase/client";

export type MessageRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  read: boolean;
  created_at: string;
};

export async function submitMessage(input: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<{ ok: true }> {
  const { error } = await supabase.from("messages").insert({
    name: input.name,
    email: input.email,
    phone: input.phone ?? "",
    subject: input.subject ?? "",
    message: input.message,
  });
  if (error) throw new Error(error.message);
  return { ok: true };
}

export async function listMessages(): Promise<MessageRow[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) throw new Error(error.message);
  return (data ?? []) as MessageRow[];
}

export async function setMessageRead(input: { id: string; read: boolean }): Promise<{ ok: true }> {
  const { error } = await supabase.from("messages").update({ read: input.read }).eq("id", input.id);
  if (error) throw new Error(error.message);
  return { ok: true };
}

export async function deleteMessage(input: { id: string }): Promise<{ ok: true }> {
  const { error } = await supabase.from("messages").delete().eq("id", input.id);
  if (error) throw new Error(error.message);
  return { ok: true };
}

export async function countUnreadMessages(): Promise<{ count: number }> {
  const { count } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("read", false);
  return { count: count ?? 0 };
}
