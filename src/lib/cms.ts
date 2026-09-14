// Client-side CMS helpers — usa o Supabase no browser (RLS protege).
// Substitui src/lib/cms.functions.ts (server functions) para funcionar em hospedagem estática (cPanel).
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { SITE } from "@/lib/site";

export type SiteSettings = {
  name: string;
  shortName: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappLabel: string;
  email: string;
  address: string;
  portalUrl: string;
};

export type PageContent = {
  slug: string;
  title: string;
  content: Json;
  updatedAt: string;
};

function mapSettings(row: Record<string, unknown>): SiteSettings {
  const usesLegacyContact =
    row.phone === "(11) 4718-2255" ||
    row.phone_raw === "+551147182255" ||
    row.whatsapp === "5511970625449" ||
    row.whatsapp_label === "(11) 97062-5449";

  return {
    name: row.name as string,
    shortName: row.short_name as string,
    phone: usesLegacyContact ? SITE.phone : (row.phone as string),
    phoneRaw: usesLegacyContact ? SITE.phoneRaw : (row.phone_raw as string),
    whatsapp: usesLegacyContact ? SITE.whatsapp : (row.whatsapp as string),
    whatsappLabel: usesLegacyContact ? SITE.whatsappLabel : (row.whatsapp_label as string),
    email: row.email as string,
    address: row.address as string,
    portalUrl: row.portal_url as string,
  };
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("name, short_name, phone, phone_raw, whatsapp, whatsapp_label, email, address, portal_url")
    .eq("id", 1)
    .maybeSingle();
  if (error) {
    console.error("getSiteSettings", error);
    return null;
  }
  return data ? mapSettings(data as unknown as Record<string, unknown>) : null;
}

export async function updateSiteSettings(input: SiteSettings): Promise<{ ok: true }> {
  const { error } = await supabase
    .from("site_settings")
    .update({
      name: input.name,
      short_name: input.shortName,
      phone: input.phone,
      phone_raw: input.phoneRaw,
      whatsapp: input.whatsapp,
      whatsapp_label: input.whatsappLabel,
      email: input.email,
      address: input.address,
      portal_url: input.portalUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);
  if (error) throw new Error(error.message);
  return { ok: true };
}

export async function getAllPages(): Promise<PageContent[]> {
  const { data, error } = await supabase
    .from("pages")
    .select("slug, title, content, updated_at")
    .order("slug");
  if (error) {
    console.error("getAllPages", error);
    return [];
  }
  return (data ?? []).map((r) => ({
    slug: r.slug as string,
    title: r.title as string,
    content: (r.content ?? {}) as Json,
    updatedAt: r.updated_at as string,
  }));
}

export async function getPageBySlug(slug: string): Promise<PageContent | null> {
  const { data, error } = await supabase
    .from("pages")
    .select("slug, title, content, updated_at")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("getPageBySlug", error);
    return null;
  }
  if (!data) return null;
  return {
    slug: data.slug as string,
    title: data.title as string,
    content: (data.content ?? {}) as Json,
    updatedAt: data.updated_at as string,
  };
}

export async function updatePage(input: { slug: string; title: string; content: Json }): Promise<{ ok: true }> {
  const { error } = await supabase
    .from("pages")
    .update({
      title: input.title,
      content: input.content,
      updated_at: new Date().toISOString(),
    })
    .eq("slug", input.slug);
  if (error) throw new Error(error.message);
  return { ok: true };
}
