import { createFileRoute } from "@tanstack/react-router";
import { NivelLayout } from "@/components/site/NivelLayout";
import fund1Img from "@/assets/fund1.jpg";

export const Route = createFileRoute("/fundamental-1")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Fundamental I — Colégio Objetivo Mairinque" },
      { name: "description", content: "Ensino Fundamental I (1º ao 5º ano) no Objetivo Mairinque: leitura, escrita, raciocínio lógico e formação integral." },
      { property: "og:title", content: "Fundamental I — Objetivo Mairinque" },
      { property: "og:description", content: "Base sólida para a vida acadêmica do seu filho." },
      { property: "og:url", content: "/fundamental-1" },
      { property: "og:image", content: "/src/assets/fund1.jpg" },
    ],
    links: [{ rel: "canonical", href: "/fundamental-1" }],
  }),
});

function Page() {
  return (
    <NivelLayout
      eyebrow="Ensino Fundamental I"
      title="A base que sustenta a vida acadêmica."
      age="1º ao 5º ano"
      image={fund1Img}
      intro="O Fundamental I tem como finalidade a formação integral do aluno. Baseado na reflexão, permite o desenvolvimento da criatividade, da autonomia e da responsabilidade."
      paragraphs={[
        "É nesta etapa que seu filho consolida leitura, escrita, raciocínio lógico e os hábitos de estudo que vão acompanhá-lo por toda a vida escolar.",
        "Nossa proposta pedagógica equilibra rigor acadêmico e estímulo à curiosidade, com professores que sabem despertar o interesse genuíno pelo conhecimento.",
        "Mais do que ensinar conteúdos, formamos estudantes capazes de pensar, criar, argumentar e se relacionar com responsabilidade — competências fundamentais para o que vem depois.",
      ]}
      highlights={[
        "Consolidação da leitura, escrita e cálculo",
        "Desenvolvimento da autonomia de estudo",
        "Projetos pedagógicos interdisciplinares",
        "Acompanhamento individualizado do aprendizado",
        "Formação ética e socioemocional",
      ]}
      nextLabel="Fundamental II"
      nextTo="/fundamental-2"
      whatsappMsg="Olá! Gostaria de saber mais sobre o Fundamental I."
    />
  );
}
