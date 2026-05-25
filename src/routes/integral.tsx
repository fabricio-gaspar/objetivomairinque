import { createFileRoute } from "@tanstack/react-router";
import { NivelLayout } from "@/components/site/NivelLayout";
import integralImg from "@/assets/integral.jpg";

export const Route = createFileRoute("/integral")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Integral — Colégio Objetivo Mairinque" },
      { name: "description", content: "Ensino moderno para o seu filho crescer feliz e brincando. Período integral para crianças de 2 a 10 anos." },
      { property: "og:title", content: "Integral — Objetivo Mairinque" },
      { property: "og:url", content: "/integral" },
    ],
    links: [{ rel: "canonical", href: "/integral" }],
  }),
});

function Page() {
  return (
    <NivelLayout
      eyebrow="Integral"
      title="Ensino moderno para o seu filho crescer feliz e brincando"
      image={integralImg}
      paragraphs={[
        "Destinado para crianças à partir de 2 a 10 anos de idade.",
        "Nosso objetivo é oferecer, além do período regular de aulas, atendimento especial e diferenciado para as famílias que necessitam deixar seus filhos em período integral ou parte do dia em local seguro e confiável.",
        "A programação respeita a faixa etária e desenvolvimento das crianças, intercalando momentos de brincar, descansar e se alimentar.",
      ]}
      atividades={["Oficinas", "Hora do conto", "Movimento", "Atividades lúdicas"]}
      whatsappMsg="Olá! Gostaria de saber mais sobre o período Integral."
    />
  );
}
