import { createFileRoute } from "@tanstack/react-router";
import { NivelLayout } from "@/components/site/NivelLayout";
import infantilImg from "@/assets/infantil.jpg";

export const Route = createFileRoute("/educacao-infantil")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Educação Infantil — Colégio Objetivo Mairinque" },
      { name: "description", content: "Ensino moderno para o seu filho crescer feliz e brincando. Educação Infantil no Colégio Objetivo Mairinque." },
      { property: "og:title", content: "Educação Infantil — Objetivo Mairinque" },
      { property: "og:url", content: "/educacao-infantil" },
    ],
    links: [{ rel: "canonical", href: "/educacao-infantil" }],
  }),
});

function Page() {
  return (
    <NivelLayout
      eyebrow="Educação Infantil"
      title="Ensino moderno para o seu filho crescer feliz e brincando"
      image={infantilImg}
      paragraphs={[
        "O período de 0 a 5 anos é o mais importante na formação da criança. Nessa etapa ela constrói os principais recursos para lidar e interagir com as novas experiências. O tempo todo a criança age, descobrindo, criando, perguntando, elaborando, refazendo e socializando-se.",
        "Nesse processo de formação, a Educação Infantil deve proporcionar um conjunto de meios, materiais e oportunidades para um crescimento saudável em todos os aspectos.",
      ]}
      atividades={["Musicalidade", "Arte", "Hora do conto", "Bosque"]}
      whatsappMsg="Olá! Gostaria de saber mais sobre a Educação Infantil."
    />
  );
}
