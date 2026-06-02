import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// Whitelisted tables for the generic CRUD server functions.
// All these tables share the shape: id (uuid) + position + active (most) + arbitrary fields.
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

const collectionSchema = z.enum(COLLECTIONS);

async function assertAdmin(userId: string) {
  const { data } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (!data) throw new Error("Forbidden: admin role required");
}

export const listCollection = createServerFn({ method: "GET" })
  .inputValidator((d: { collection: Collection; orderBy?: string }) =>
    z.object({ collection: collectionSchema, orderBy: z.string().max(40).optional() }).parse(d),
  )
  .handler(async ({ data }) => {
    const orderBy = data.orderBy ?? "position";
    const { data: rows, error } = await supabaseAdmin
      .from(data.collection)
      .select("*")
      .order(orderBy, { ascending: true });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const createCollectionItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { collection: Collection; values: Record<string, unknown> }) =>
    z.object({ collection: collectionSchema, values: z.record(z.string(), z.unknown()) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const { data: row, error } = await supabaseAdmin
      .from(data.collection)
      .insert(data.values as never)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const updateCollectionItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { collection: Collection; id: string; values: Record<string, unknown> }) =>
    z.object({
      collection: collectionSchema,
      id: z.string().min(1).max(64),
      values: z.record(z.string(), z.unknown()),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const { error } = await supabaseAdmin
      .from(data.collection)
      .update({ ...data.values, updated_at: new Date().toISOString() } as never)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteCollectionItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { collection: Collection; id: string }) =>
    z.object({ collection: collectionSchema, id: z.string().min(1).max(64) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const { error } = await supabaseAdmin.from(data.collection).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const reorderCollection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { collection: Collection; ids: string[] }) =>
    z.object({ collection: collectionSchema, ids: z.array(z.string().min(1)).max(200) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    for (let i = 0; i < data.ids.length; i++) {
      await supabaseAdmin.from(data.collection).update({ position: i } as never).eq("id", data.ids[i]);
    }
    return { ok: true };
  });

// --- Singletons ---
const singletonSchema = z.enum(["big_counter", "home_layout"]);
export type Singleton = z.infer<typeof singletonSchema>;

export const getSingleton = createServerFn({ method: "GET" })
  .inputValidator((d: { name: Singleton }) => z.object({ name: singletonSchema }).parse(d))
  .handler(async ({ data }) => {
    const { data: row } = await supabaseAdmin.from(data.name).select("*").eq("id", 1).maybeSingle();
    return row;
  });

export const updateSingleton = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { name: Singleton; values: Record<string, unknown> }) =>
    z.object({ name: singletonSchema, values: z.record(z.string(), z.unknown()) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const { error } = await supabaseAdmin
      .from(data.name)
      .upsert({ id: 1, ...data.values, updated_at: new Date().toISOString() } as never);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
