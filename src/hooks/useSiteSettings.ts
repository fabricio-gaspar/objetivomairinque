import { useQuery } from "@tanstack/react-query";
import { getSiteSettings, type SiteSettings } from "@/lib/cms.functions";
import { SITE } from "@/lib/site";

const FALLBACK: SiteSettings = {
  name: SITE.name,
  shortName: SITE.shortName,
  phone: SITE.phone,
  phoneRaw: SITE.phoneRaw,
  whatsapp: SITE.whatsapp,
  whatsappLabel: SITE.whatsappLabel,
  email: SITE.email,
  address: SITE.address,
  portalUrl: SITE.portalUrl,
};

export function useSiteSettings(): SiteSettings {
  const { data } = useQuery({
    queryKey: ["site-settings"],
    queryFn: () => getSiteSettings(),
    staleTime: 60_000,
    placeholderData: FALLBACK,
  });
  return data ?? FALLBACK;
}

export const waLink = (whatsapp: string, message: string) =>
  `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
