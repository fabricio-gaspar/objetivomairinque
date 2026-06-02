import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type PublicCmsData = {
  heroSlides: Array<{ id: string; title: string; subtitle: string; image_url: string; cta_label: string; cta_link: string }>;
  segments: Array<{ slug: string; name: string; short_description: string; age_range: string; image_url: string; color: string; link: string }>;
  differentials: Array<{ id: string; title: string; description: string; icon: string }>;
  stats: Array<{ id: string; label: string; value: string; suffix: string }>;
  accessories: Array<{ id: string; title: string; description: string; icon: string; image_url: string }>;
  faqs: Array<{ id: string; question: string; answer: string; category: string }>;
  history: Array<{ id: string; year: string; title: string; description: string }>;
  bigCounter: { title: string; number_value: string; caption: string; background_url: string; active: boolean } | null;
  homeLayout: string[];
  menu: Array<{ id: string; label: string; link: string; parent_id: string | null; external: boolean }>;
  footer: Array<{ id: string; title: string; position: number; links: Array<{ id: string; label: string; link: string; external: boolean }> }>;
};

export const getPublicCms = createServerFn({ method: "GET" }).handler(async (): Promise<PublicCmsData> => {
  const [hero, segs, diffs, stats, accs, faqs, hist, bc, hl, menu, cols, links] = await Promise.all([
    supabaseAdmin.from("hero_slides").select("*").eq("active", true).order("position"),
    supabaseAdmin.from("segments").select("*").eq("active", true).order("position"),
    supabaseAdmin.from("differentials").select("*").eq("active", true).order("position"),
    supabaseAdmin.from("stats").select("*").eq("active", true).order("position"),
    supabaseAdmin.from("accessories").select("*").eq("active", true).order("position"),
    supabaseAdmin.from("faqs").select("*").eq("active", true).order("position"),
    supabaseAdmin.from("history_events").select("*").eq("active", true).order("position"),
    supabaseAdmin.from("big_counter").select("*").eq("id", 1).maybeSingle(),
    supabaseAdmin.from("home_layout").select("sections").eq("id", 1).maybeSingle(),
    supabaseAdmin.from("menu_items").select("*").eq("visible", true).order("position"),
    supabaseAdmin.from("footer_columns").select("*").order("position"),
    supabaseAdmin.from("footer_links").select("*").order("position"),
  ]);

  const footer = (cols.data ?? []).map((c) => ({
    id: c.id,
    title: c.title,
    position: c.position,
    links: (links.data ?? []).filter((l) => l.column_id === c.id).map((l) => ({
      id: l.id, label: l.label, link: l.link, external: l.external,
    })),
  }));

  return {
    heroSlides: (hero.data ?? []) as PublicCmsData["heroSlides"],
    segments: (segs.data ?? []) as PublicCmsData["segments"],
    differentials: (diffs.data ?? []) as PublicCmsData["differentials"],
    stats: (stats.data ?? []) as PublicCmsData["stats"],
    accessories: (accs.data ?? []) as PublicCmsData["accessories"],
    faqs: (faqs.data ?? []) as PublicCmsData["faqs"],
    history: (hist.data ?? []) as PublicCmsData["history"],
    bigCounter: (bc.data as PublicCmsData["bigCounter"]) ?? null,
    homeLayout: ((hl.data?.sections as string[]) ?? ["hero","segments","differentials","stats","big_counter","accessories","faqs"]),
    menu: (menu.data ?? []) as PublicCmsData["menu"],
    footer,
  };
});
