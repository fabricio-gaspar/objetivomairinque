import { createFileRoute } from "@tanstack/react-router";
import { NivelLayout } from "@/components/site/NivelLayout";
import fund2Img from "@/assets/fund2.jpg";

export const Route = createFileRoute("/fundamental-2")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Fundamental II — Colégio Objetivo Mairinque" },
      { name: "description", content: "Ensino Fundamental II (6º ao 9º ano) no Objetivo Mairinque: aprofundamento, protagonismo e preparo para o Ensino Médio." },
      { property: "og:title", content: "Fundamental II — Objetivo Mairinque" },
      { property: "og:description", content: "Preparo acadêmico e formação para a transição ao Ensino Médio." },
      { property: "og:url", content: "/fundamental-2" },
      { property: "og:image", content: "/src/assets/fund2.jpg" },
    ],
    links: [{ rel: "canonical", href: "/fundamental-2" }],
  }),
});

function Page() {
  return (
    <NivelLayout
      eyebrow="Ensino Fundamental II"
      title="Onde o pensamento crítico ganha forma."
      age="6º ao 9º ano"
      image={fund2Img}
      intro="No Fundamental II surgem novas questões que exigem soluções mais complexas. É preciso inteligência para discriminar o que é essencial — e liderança para enfrentá-lo."
      paragraphs={[
        "Nesta etapa, seu filho aprofunda o repertório acadêmico, desenvolve o pensamento crítico e começa a assumir verdadeiro protagonismo sobre os próprios estudos.",
        "Nossa proposta combina exigência intelectual e suporte humano: professores especialistas, projetos desafiadores e um ambiente que valoriza tanto o resultado quanto o processo.",
        "Ao final desta etapa, o aluno chega ao Ensino Médio com base sólida, autonomia de estudo e clareza sobre o caminho que quer construir.",
      ]}
      highlights={[
        "Aprofundamento em todas as áreas do conhecimento",
        "Desenvolvimento do pensamento crítico e argumentativo",
        "Professores especialistas por disciplina",
        "Preparo para o Ensino Médio e processos seletivos",
        "Protagonismo, liderança e responsabilidade",
      ]}
      nextLabel="Conheça a escola"
      nextTo="/sobre"
      whatsappMsg="Olá! Gostaria de saber mais sobre o Fundamental II."
    />
  );
}
