import { createFileRoute } from "@tanstack/react-router";
import { NivelLayout } from "@/components/site/NivelLayout";
import fund2Img from "@/assets/fund2.jpg";

export const Route = createFileRoute("/fundamental-2")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Fundamental II — Colégio Objetivo Mairinque" },
      { name: "description", content: "Transformamos adolescentes em protagonistas com mentes brilhantes." },
      { property: "og:title", content: "Fundamental II — Objetivo Mairinque" },
      { property: "og:url", content: "/fundamental-2" },
    ],
    links: [{ rel: "canonical", href: "/fundamental-2" }],
  }),
});

function Page() {
  return (
    <NivelLayout
      eyebrow="Fundamental II"
      title="Transformamos adolescentes em protagonistas com mentes brilhantes"
      image={fund2Img}
      paragraphs={[
        "No Ensino Fundamental II surgem novas questões que exigem soluções mais complexas. É preciso inteligência para discriminar a importância das questões essenciais. Liderança para enfrentá-las. Criatividade para encontrar soluções. Persistência para não desistir diante das dificuldades.",
        "Estimulá-los nessa fase é preparar o estudante para enfrentar um mundo que se transforma em ritmo acelerado. Revoluções sucedem-se incessantemente em todos os campos do conhecimento e em todas as áreas de atividade.",
      ]}
      atividades={["Laboratório de ciências", "Informática", "Sustentabilidade", "Línguas"]}
      whatsappMsg="Olá! Gostaria de saber mais sobre o Fundamental II."
    />
  );
}
