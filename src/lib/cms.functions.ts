import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Json } from "@/integrations/supabase/types";


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
  return {
    name: row.name as string,
    shortName: row.short_name as string,
    phone: row.phone as string,
    phoneRaw: row.phone_raw as string,
    whatsapp: row.whatsapp as string,
    whatsappLabel: row.whatsapp_label as string,
    email: row.email as string,
    address: row.address as string,
    portalUrl: row.portal_url as string,
  };
}


export const getSiteSettings = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("site_settings")
    .select("name, short_name, phone, phone_raw, whatsapp, whatsapp_label, email, address, portal_url")
    .eq("id", 1)
    .maybeSingle();
  if (error) {
    console.error("getSiteSettings", error);
    return null;
  }
  return data ? mapSettings(data as unknown as Record<string, unknown>) : null;
});

export const getAllPages = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
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
  })) as PageContent[];
});

export const getPageBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string().min(1).max(64) }).parse(d))
  .handler(async ({ data }) => {
    const { data: row, error } = await supabaseAdmin
      .from("pages")
      .select("slug, title, content, updated_at")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) {
      console.error("getPageBySlug", error);
      return null;
    }
    if (!row) return null;
    return {
      slug: row.slug as string,
      title: row.title as string,
      content: (row.content ?? {}) as Json,
      updatedAt: row.updated_at as string,
    } as PageContent;
  });

const settingsSchema = z.object({
  name: z.string().trim().min(1).max(200),
  shortName: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(1).max(40),
  phoneRaw: z.string().trim().min(1).max(40),
  whatsapp: z.string().trim().min(1).max(40),
  whatsappLabel: z.string().trim().min(1).max(40),
  email: z.string().trim().email().max(200),
  address: z.string().trim().min(1).max(500),
  portalUrl: z.string().trim().url().max(500),
});

export const updateSiteSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => settingsSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { data: roles } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!roles) throw new Error("Forbidden: admin role required");

    const { error } = await supabaseAdmin
      .from("site_settings")
      .update({
        name: data.name,
        short_name: data.shortName,
        phone: data.phone,
        phone_raw: data.phoneRaw,
        whatsapp: data.whatsapp,
        whatsapp_label: data.whatsappLabel,
        email: data.email,
        address: data.address,
        portal_url: data.portalUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const pageUpdateSchema = z.object({
  slug: z.string().min(1).max(64),
  title: z.string().trim().min(1).max(200),
  content: z.any().transform((v) => v as Json),
});

export const updatePage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => pageUpdateSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { data: roles } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!roles) throw new Error("Forbidden: admin role required");

    const { error } = await supabaseAdmin
      .from("pages")
      .update({
        title: data.title,
        content: data.content,
        updated_at: new Date().toISOString(),
      })
      .eq("slug", data.slug);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    return { isAdmin: !!data, userId: context.userId };
  });
