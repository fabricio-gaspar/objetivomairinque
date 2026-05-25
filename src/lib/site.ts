export const SITE = {
  name: "Colégio Objetivo Mairinque",
  shortName: "Objetivo Mairinque",
  phone: "(11) 4718-2255",
  phoneRaw: "+551147182255",
  whatsapp: "5511997898763",
  whatsappLabel: "(11) 99789-8763",
  email: "contato@objetivomairinque.com.br",
  address: "R. José Alves Ferreira Filho, 59 — Res. Parque Cristiane, Mairinque-SP, 18120-000",
};

export const wa = (message: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

export const NAV = [
  { label: "Início", to: "/" },
  { label: "Sobre", to: "/sobre" },
  { label: "Educação Infantil", to: "/educacao-infantil" },
  { label: "Fundamental I", to: "/fundamental-1" },
  { label: "Fundamental II", to: "/fundamental-2" },
  { label: "Contato", to: "/contato" },
] as const;
