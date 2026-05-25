import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import sobreImg from "@/assets/sobre.jpg";

export const Route = createFileRoute("/sobre")({
  component: Sobre,
  head: () => ({
    meta: [
      { title: "Sobre Nós — Colégio Objetivo Mairinque" },
      { name: "description", content: "Conheça a história e a proposta pedagógica do Colégio Objetivo Mairinque, há 22 anos formando alunos em Mairinque-SP." },
      { property: "og:title", content: "Sobre Nós — Colégio Objetivo Mairinque" },
      { property: "og:description", content: "Conheça nossa história e proposta pedagógica." },
      { property: "og:url", content: "/sobre" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
});

function Sobre() {
  return (
    <>
      <section className="bg-muted/40 py-16">
        <div className="container-tight text-center">
          <SectionHeading eyebrow="Conheça um pouco da nossa história" title="Sobre Nós" />
        </div>
      </section>

      <section className="container-tight py-16">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <img src={sobreImg} alt="Colégio Objetivo Mairinque" className="w-full rounded-2xl object-cover shadow-soft" />
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-primary">Sobre Nós</h2>
            <p className="text-foreground/80 leading-relaxed">
              O <strong>Colégio Objetivo Mairinque</strong> atua no mercado educacional há 22 anos, atendendo desde a Educação Infantil ao Ensino Fundamental, oferecendo na região uma educação de qualidade. A instituição fica localizada em Mairinque, no estado de São Paulo, e tem como objetivo desenvolver em seus alunos o senso crítico e o espírito questionador, tornando-os pessoas independentes e responsáveis.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Comprometida com o serviço que desenvolve, o Colégio Objetivo Mairinque possibilita que o aluno tenha acesso aos materiais didáticos do Sistema Objetivo de Ensino, dando todo o suporte pedagógico necessário para a sua formação e condições para um aprendizado integrado. A instituição conta ainda com um corpo docente qualificado, responsável por desenvolver atividades práticas e dinâmicas que contribuem para o desenvolvimento dos seus alunos.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-16">
        <div className="container-tight">
          <h2 className="font-display text-2xl font-bold text-primary">Proposta Pedagógica</h2>
          <p className="mt-4 text-foreground/80 leading-relaxed">
            Compreendendo que para uma instituição alcançar os objetivos propostos é necessário que ela tenha uma linha norteadora, que auxiliará na condução de todas as ações relacionadas à escola — desde a sua estrutura curricular até as suas práticas de gestão — o Colégio Objetivo Mairinque adotou uma proposta pedagógica construtivista, onde o aprendizado é construído entre o professor e o aluno. A finalidade principal desse método é permitir que o aluno participe ativamente do seu processo de aprendizado, com acompanhamento contínuo da sua evolução.
          </p>
        </div>
      </section>

      <section className="container-tight py-16">
        <h2 className="font-display text-2xl font-bold text-primary">Atividade Extracurricular</h2>
        <p className="mt-4 text-foreground/80 leading-relaxed">
          Para auxiliar no desenvolvimento das capacidades motoras, afetivas e intelectuais das crianças, o Colégio Objetivo Mairinque oferece atividades extracurriculares que incentivam os pequenos a desde cedo se adaptarem ao ambiente escolar, além de estimular o desejo pela arte. Através de aulas dinâmicas, oferecemos:
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {["Informática", "Musicalidade", "Expressão corporal", "Espanhol"].map((a) => (
            <li key={a} className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground/80">
              {a}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
