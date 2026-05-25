import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Sparkles } from "lucide-react";
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

const atividades: { nome: string; flag?: string }[] = [
  { nome: "Informática" },
  { nome: "Musicalidade" },
  { nome: "Expressão corporal" },
  { nome: "Espanhol", flag: "🇪🇸" },
];

function Sobre() {
  return (
    <>
      <section className="relative overflow-hidden bg-muted/40 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--gold)_0%,_transparent_55%)] opacity-[0.07]" />
        <div className="container-tight relative text-center">
          <SectionHeading eyebrow="Conheça um pouco da nossa história" title="Sobre Nós" />
        </div>
      </section>

      <section className="container-tight py-16">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="relative">
            <img
              src={sobreImg}
              alt="Colégio Objetivo Mairinque"
              className="w-full rounded-2xl object-cover shadow-soft ring-1 ring-[var(--gold)]/30 ring-offset-4 ring-offset-background"
            />
            <div className="absolute -bottom-4 -right-4 flex items-center gap-2 rounded-full bg-[var(--gold)] px-5 py-2 text-sm font-bold text-primary shadow-elegant">
              <Sparkles className="h-4 w-4" /> +22 anos
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="section-title font-display text-2xl font-bold text-primary">Sobre Nós</h2>
            <p className="leading-relaxed text-foreground/80">
              O <strong>Colégio Objetivo Mairinque</strong> atua no mercado educacional há 22 anos, atendendo desde a Educação Infantil ao Ensino Fundamental, oferecendo na região uma educação de qualidade. A instituição fica localizada em Mairinque, no estado de São Paulo, e tem como objetivo desenvolver em seus alunos o senso crítico e o espírito questionador, tornando-os pessoas independentes e responsáveis.
            </p>
            <p className="leading-relaxed text-foreground/80">
              Comprometida com o serviço que desenvolve, o Colégio Objetivo Mairinque possibilita que o aluno tenha acesso aos materiais didáticos do Sistema Objetivo de Ensino, dando todo o suporte pedagógico necessário para a sua formação e condições para um aprendizado integrado. A instituição conta ainda com um corpo docente qualificado, responsável por desenvolver atividades práticas e dinâmicas que contribuem para o desenvolvimento dos seus alunos.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-muted/40 py-16">
        <BookOpen className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 text-[var(--gold)] opacity-[0.06]" />
        <div className="container-tight relative">
          <h2 className="section-title font-display text-2xl font-bold text-primary">Proposta Pedagógica</h2>
          <p className="mt-5 leading-relaxed text-foreground/80">
            Compreendendo que para uma instituição alcançar os objetivos propostos é necessário que ela tenha uma linha norteadora, que auxiliará na condução de todas as ações relacionadas à escola — desde a sua estrutura curricular até as suas práticas de gestão — o Colégio Objetivo Mairinque adotou uma proposta pedagógica construtivista, onde o aprendizado é construído entre o professor e o aluno. A finalidade principal desse método é permitir que o aluno participe ativamente do seu processo de aprendizado, com acompanhamento contínuo da sua evolução.
          </p>
        </div>
      </section>

      <section className="container-tight py-16">
        <h2 className="section-title font-display text-2xl font-bold text-primary">Atividade Extracurricular</h2>
        <p className="mt-5 leading-relaxed text-foreground/80">
          Para auxiliar no desenvolvimento das capacidades motoras, afetivas e intelectuais das crianças, o Colégio Objetivo Mairinque oferece atividades extracurriculares que incentivam os pequenos a desde cedo se adaptarem ao ambiente escolar, além de estimular o desejo pela arte. Através de aulas dinâmicas, oferecemos:
        </p>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {atividades.map((a) => (
            <li
              key={a.nome}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 text-sm font-medium text-foreground/85 shadow-soft transition-all hover:-translate-y-0.5 hover:border-[var(--gold)]/50 hover:shadow-elegant"
            >
              {a.flag ? (
                <span className="text-xl leading-none" aria-hidden>
                  {a.flag}
                </span>
              ) : (
                <span className="h-2 w-2 rotate-45 bg-[var(--gold)]" aria-hidden />
              )}
              {a.nome}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
