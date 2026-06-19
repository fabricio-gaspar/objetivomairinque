// Client-side helpers para mídia. RLS protege escrita por admin.
import { supabase } from "@/integrations/supabase/client";

export type MediaRow = {
  id: string;
  name: string;
  path: string;
  url: string;
  mime_type: string | null;
  size: number | null;
  created_at: string;
};

export async function listMedia(): Promise<MediaRow[]> {
  const { data, error } = await supabase
    .from("media")
    .select("id, name, path, url, mime_type, size, created_at")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) throw new Error(error.message);
  return (data ?? []) as MediaRow[];
}

export async function registerMedia(input: {
  name: string;
  path: string;
  url: string;
  mimeType?: string;
  size?: number;
}): Promise<MediaRow> {
  const { data, error } = await supabase
    .from("media")
    .insert({
      name: input.name,
      path: input.path,
      url: input.url,
      mime_type: input.mimeType ?? null,
      size: input.size ?? null,
    })
    .select("id, name, path, url, mime_type, size, created_at")
    .single();
  if (error) throw new Error(error.message);
  return data as MediaRow;
}

export async function deleteMedia(input: { id: string; path: string }): Promise<{ ok: true }> {
  const { error: sErr } = await supabase.storage.from("site-media").remove([input.path]);
  if (sErr) console.warn("storage remove", sErr);
  const { error } = await supabase.from("media").delete().eq("id", input.id);
  if (error) throw new Error(error.message);
  return { ok: true };
}
