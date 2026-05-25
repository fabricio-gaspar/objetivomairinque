import { createFileRoute } from "@tanstack/react-router";
import { NivelLayout } from "@/components/site/NivelLayout";
import fund1Img from "@/assets/fund1.jpg";

export const Route = createFileRoute("/fundamental-1")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Fundamental I — Colégio Objetivo Mairinque" },
      { name: "description", content: "O ambiente perfeito para identificar e potencializar os talentos de cada criança." },
      { property: "og:title", content: "Fundamental I — Objetivo Mairinque" },
      { property: "og:url", content: "/fundamental-1" },
    ],
    links: [{ rel: "canonical", href: "/fundamental-1" }],
  }),
});

function Page() {
  return (
    <NivelLayout
      eyebrow="Fundamental I"
      title="O ambiente perfeito para identificar e potencializar os talentos de cada criança."
      image={fund1Img}
      paragraphs={[
        "O Ensino Fundamental I tem como finalidade a formação integral do aluno, baseado na reflexão permite o desenvolvimento da criatividade, da autonomia e da responsabilidade, tornando-os solidários e conscientes de seu papel na sociedade.",
        "São desenvolvidos muitos projetos e atividades que permitem ao aluno vivenciar, aprender de maneira prazerosa e a desenvolver valores como empatia, respeito, organização e disciplina.",
      ]}
      atividades={["Musicalidade", "Informática", "Expressão Corporal", "Respeito e empatia"]}
      whatsappMsg="Olá! Gostaria de saber mais sobre o Fundamental I."
    />
  );
}
