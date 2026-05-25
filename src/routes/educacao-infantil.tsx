import { createFileRoute } from "@tanstack/react-router";
import { NivelLayout } from "@/components/site/NivelLayout";
import infantilImg from "@/assets/infantil.jpg";

export const Route = createFileRoute("/educacao-infantil")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Educação Infantil — Colégio Objetivo Mairinque" },
      { name: "description", content: "Educação Infantil (0 a 5 anos) no Colégio Objetivo Mairinque: ambiente acolhedor, desenvolvimento integral e atenção individual." },
      { property: "og:title", content: "Educação Infantil — Objetivo Mairinque" },
      { property: "og:description", content: "Acolhimento, brincadeira e aprendizagem nos primeiros anos de vida." },
      { property: "og:url", content: "/educacao-infantil" },
      { property: "og:image", content: "/src/assets/infantil.jpg" },
    ],
    links: [{ rel: "canonical", href: "/educacao-infantil" }],
  }),
});

function Page() {
  return (
    <NivelLayout
      eyebrow="Educação Infantil"
      title="Os primeiros passos da formação."
      age="0 a 5 anos"
      image={infantilImg}
      intro="O período de 0 a 5 anos é o mais importante na formação da criança. Aqui, ela constrói os principais recursos para lidar com o mundo, com os outros e consigo mesma."
      paragraphs={[
        "Na Educação Infantil do Objetivo Mairinque, cada criança encontra um ambiente acolhedor, planejado para estimular a curiosidade, a autonomia e a linguagem nas fases mais decisivas do desenvolvimento.",
        "Nossa proposta une brincadeira, rotina estruturada e mediação atenta dos educadores para que o aprendizado aconteça de forma natural, respeitando o ritmo individual de cada aluno.",
        "Valorizamos a parceria com a família — porque essa fase exige diálogo próximo, transparência e cuidado em cada detalhe da experiência escolar.",
      ]}
      highlights={[
        "Turmas reduzidas com atenção individual",
        "Rotina estruturada e ambiente acolhedor",
        "Estímulo à autonomia, linguagem e socialização",
        "Comunicação próxima e diária com as famílias",
        "Atividades lúdicas e pedagógicas equilibradas",
      ]}
      nextLabel="Fundamental I"
      nextTo="/fundamental-1"
      whatsappMsg="Olá! Gostaria de saber mais sobre a Educação Infantil."
    />
  );
}
