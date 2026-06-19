// Client-side helpers para coleções CRUD genéricas. RLS protege escrita por admin.
import { supabase } from "@/integrations/supabase/client";

export const COLLECTIONS = [
  "hero_slides",
  "segments",
  "accessories",
  "differentials",
  "stats",
  "history_events",
  "faqs",
  "materials",
  "menu_items",
  "footer_columns",
  "footer_links",
] as const;
export type Collection = (typeof COLLECTIONS)[number];

export type SingletonName = "big_counter" | "home_layout";

export async function listCollection(input: { collection: Collection; orderBy?: string }) {
  const orderBy = input.orderBy ?? "position";
  const { data, error } = await supabase
    .from(input.collection)
    .select("*")
    .order(orderBy, { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createCollectionItem(input: { collection: Collection; values: Record<string, unknown> }) {
  const { data, error } = await supabase
    .from(input.collection)
    .insert(input.values as never)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateCollectionItem(input: { collection: Collection; id: string; values: Record<string, unknown> }) {
  const { error } = await supabase
    .from(input.collection)
    .update({ ...input.values, updated_at: new Date().toISOString() } as never)
    .eq("id", input.id);
  if (error) throw new Error(error.message);
  return { ok: true as const };
}

export async function deleteCollectionItem(input: { collection: Collection; id: string }) {
  const { error } = await supabase.from(input.collection).delete().eq("id", input.id);
  if (error) throw new Error(error.message);
  return { ok: true as const };
}

export async function reorderCollection(input: { collection: Collection; ids: string[] }) {
  for (let i = 0; i < input.ids.length; i++) {
    await supabase.from(input.collection).update({ position: i } as never).eq("id", input.ids[i]);
  }
  return { ok: true as const };
}

export async function getSingleton(name: SingletonName) {
  const { data } = await supabase.from(name).select("*").eq("id", 1).maybeSingle();
  return data;
}

export async function updateSingleton(input: { name: SingletonName; values: Record<string, unknown> }) {
  const { error } = await supabase
    .from(input.name)
    .upsert({ id: 1, ...input.values, updated_at: new Date().toISOString() } as never);
  if (error) throw new Error(error.message);
  return { ok: true as const };
}
