import { createFileRoute } from "@tanstack/react-router";
import { Award, Target, Heart, BookOpen, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { wa } from "@/lib/site";
import campusImg from "@/assets/campus.jpg";

export const Route = createFileRoute("/sobre")({
  component: Sobre,
  head: () => ({
    meta: [
      { title: "Sobre o Colégio — Objetivo Mairinque" },
      { name: "description", content: "Conheça a história, a missão e os valores do Colégio Objetivo Mairinque. Mais de 20 anos formando estudantes em Mairinque-SP." },
      { property: "og:title", content: "Sobre o Colégio Objetivo Mairinque" },
      { property: "og:description", content: "Tradição, autoridade pedagógica e formação humana há mais de 20 anos." },
      { property: "og:url", content: "/sobre" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
});

const valores = [
  { icon: Target, title: "Excelência acadêmica", text: "Currículo robusto e exigente, alinhado às melhores práticas pedagógicas." },
  { icon: Heart, title: "Acolhimento humano", text: "Cada aluno é reconhecido pelo nome, pela história e pelo potencial único." },
  { icon: BookOpen, title: "Formação integral", text: "Conhecimento técnico aliado ao desenvolvimento ético, emocional e social." },
  { icon: Award, title: "Tradição reconhecida", text: "Mais de duas décadas de confiança das famílias de Mairinque e região." },
];

function Sobre() {
  return (
    <>
      <section className="bg-hero py-20 text-primary-foreground">
        <div className="container-tight max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">Sobre nós</span>
          <h1 className="mt-4 font-display text-4xl font-bold text-balance md:text-5xl lg:text-6xl">
            Mais de 20 anos formando <span className="text-[var(--gold)]">gerações</span> em Mairinque.
          </h1>
          <p className="mt-6 text-lg opacity-85 text-pretty">
            Uma escola construída sobre tradição pedagógica, atenção real ao aluno e compromisso com resultados que vão além da sala de aula.
          </p>
        </div>
      </section>

      <section className="container-tight py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <img src={campusImg} alt="Colégio Objetivo Mairinque" loading="lazy" width={1600} height={1024} className="rounded-3xl shadow-elegant aspect-[4/3] object-cover" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">Nossa história</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-balance md:text-4xl">Uma escola feita por quem entende de educação.</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground text-pretty">
              <p>
                [SUBSTITUIR: parágrafo com a história real do colégio — ano de fundação, fundadores, marcos importantes ao longo dos 20+ anos de atuação em Mairinque.]
              </p>
              <p>
                Hoje, somos referência regional em Educação Infantil, Fundamental I e Fundamental II, com uma proposta pedagógica que une rigor acadêmico, formação humana e preparo para os desafios contemporâneos.
              </p>
              <p>
                Acreditamos que educação de verdade acontece quando cada aluno é acompanhado de perto — e é por isso que mantemos turmas planejadas, comunicação próxima com as famílias e uma equipe pedagógica que conhece cada estudante.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="container-tight">
          <SectionHeading eyebrow="Missão e valores" title="O que move o nosso trabalho todos os dias" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {valores.map((v) => (
              <div key={v.title} className="rounded-2xl bg-card p-7 shadow-soft">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-tight py-20 text-center">
        <h2 className="font-display text-3xl font-bold text-balance md:text-4xl">Venha conhecer pessoalmente.</h2>
        <p className="mt-4 text-muted-foreground">Agende uma visita guiada e veja de perto a proposta que pode transformar a trajetória do seu filho.</p>
        <Button asChild size="lg" className="mt-8 bg-[var(--gold)] text-primary hover:bg-[var(--gold)]/90">
          <a href={wa("Olá! Gostaria de agendar uma visita ao colégio.")} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" /> Agendar visita
          </a>
        </Button>
      </section>
    </>
  );
}
