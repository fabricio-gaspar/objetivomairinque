export const SITE = {
  name: "Colégio Objetivo Mairinque",
  shortName: "Objetivo Mairinque",
  phone: "(11) 4718-2255",
  phoneRaw: "+551147182255",
  whatsapp: "5511997898763",
  whatsappLabel: "(11) 99789-8763",
  email: "contato@objetivomairinque.com.br",
  address: "R. José Alves Ferreira Filho, 59 — Res. Parque Cristiane, Mairinque-SP, 18120-000",
  portalUrl: "https://portal.sponteeducacional.net.br/default.aspx?CID=54326",
};

export const wa = (message: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

export type NavItem =
  | { label: string; to: string; external?: false }
  | { label: string; href: string; external: true }
  | {
      label: string;
      children: { label: string; to: string }[];
    };

export const NAV: NavItem[] = [
  { label: "Início", to: "/" },
  { label: "Sobre Nós", to: "/sobre" },
  {
    label: "Ensino",
    children: [
      { label: "Educação Infantil", to: "/educacao-infantil" },
      { label: "Fundamental I", to: "/fundamental-1" },
      { label: "Fundamental II", to: "/fundamental-2" },
    ],
  },
  { label: "Portal do Aluno", href: "https://portal.sponteeducacional.net.br/default.aspx?CID=54326", external: true },
  { label: "Contatos", to: "/contato" },
];
