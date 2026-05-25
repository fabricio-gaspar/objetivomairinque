import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, BookOpen, GraduationCap, Heart, Users, Shield, Sparkles, MessageCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/site/SectionHeading";
import { wa } from "@/lib/site";
import heroImg from "@/assets/hero-premium.jpg";
import infantilImg from "@/assets/infantil.jpg";
import fund1Img from "@/assets/fund1.jpg";
import fund2Img from "@/assets/fund2.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Colégio Objetivo Mairinque — Tradição, formação e futuro" },
      { name: "description", content: "Mais de 20 anos formando estudantes em Mairinque-SP. Educação Infantil ao Fundamental II com proposta pedagógica sólida. Agende uma visita." },
      { property: "og:title", content: "Colégio Objetivo Mairinque" },
      { property: "og:description", content: "Educação de excelência há mais de 20 anos em Mairinque-SP." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const niveis = [
  { to: "/educacao-infantil", img: infantilImg, title: "Educação Infantil", age: "0 a 5 anos", text: "Ambiente acolhedor onde seu filho desenvolve autonomia, linguagem e socialização nas fases mais decisivas da formação." },
  { to: "/fundamental-1", img: fund1Img, title: "Fundamental I", age: "1º ao 5º ano", text: "Base sólida em leitura, escrita e raciocínio lógico, com foco em criatividade, autonomia e responsabilidade." },
  { to: "/fundamental-2", img: fund2Img, title: "Fundamental II", age: "6º ao 9º ano", text: "Preparação para os desafios da adolescência e do Ensino Médio, com aprofundamento acadêmico e protagonismo estudantil." },
] as const;

const pilares = [
  { icon: Award, title: "Tradição comprovada", text: "Mais de 20 anos formando gerações de estudantes em Mairinque e região." },
  { icon: Users, title: "Corpo docente qualificado", text: "Professores experientes, em formação continuada, comprometidos com cada aluno." },
  { icon: Heart, title: "Acompanhamento individual", text: "Turmas planejadas para garantir atenção real ao desenvolvimento de cada criança." },
  { icon: BookOpen, title: "Proposta pedagógica sólida", text: "Currículo robusto, alinhado às melhores práticas e às exigências contemporâneas." },
  { icon: Shield, title: "Ambiente seguro e familiar", text: "Estrutura pensada para o bem-estar emocional e a segurança dos estudantes." },
  { icon: Sparkles, title: "Formação integral", text: "Conhecimento técnico, valores humanos e preparo para o protagonismo no futuro." },
];

const stats = [
  { n: "20+", l: "Anos de tradição" },
  { n: "40+", l: "Professores" },
  { n: "25+", l: "Salas de aula" },
  { n: "600+", l: "Alunos formados" },
];

const depoimentos = [
  { name: "[SUBSTITUIR: Nome do responsável]", role: "Mãe de aluno do Fundamental I", text: "[SUBSTITUIR: depoimento real de uma família atual sobre a experiência no colégio.]" },
  { name: "[SUBSTITUIR: Nome do responsável]", role: "Pai de aluno da Educação Infantil", text: "[SUBSTITUIR: depoimento sobre acolhimento, desenvolvimento e atenção da equipe.]" },
  { name: "[SUBSTITUIR: Nome do ex-aluno]", role: "Ex-aluno", text: "[SUBSTITUIR: depoimento sobre como a base construída no colégio impactou a trajetória.]" },
];

const objecoes = [
  "Turmas pequenas para acompanhamento real de cada aluno",
  "Comunicação próxima e transparente com as famílias",
  "Material didático estruturado e atualizado",
  "Atividades extracurriculares incluídas no projeto pedagógico",
];

const faq = [
  { q: "Como faço para matricular meu filho?", a: "Agende uma visita pelo WhatsApp ou venha conhecer pessoalmente. Nossa equipe explica todo o processo, apresenta a estrutura e tira dúvidas." },
  { q: "Quais são os horários de aula?", a: "Educação Infantil: 13h às 17h. Fundamental I: 13h às 17h30. Fundamental II: 7h30 às 12h50. Secretaria: 9h às 18h." },
  { q: "Vocês oferecem período integral?", a: "Sim. [SUBSTITUIR: detalhar dias, horários e atividades inclusas no período integral.]" },
  { q: "O material didático está incluso?", a: "[SUBSTITUIR: explicar política de material didático, livros e plataforma adotada.]" },
  { q: "Há transporte escolar?", a: "[SUBSTITUIR: explicar parcerias de transporte ou orientação às famílias.]" },
  { q: "Posso conhecer a escola antes de matricular?", a: "Sim, e recomendamos. Agende uma visita guiada pelo WhatsApp e conheça nossa estrutura, equipe e proposta pedagógica de perto." },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero">
        <div className="container-tight grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_1fr] lg:py-28">
          <div className="text-primary-foreground animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[var(--gold)] backdrop-blur">
              <Sparkles className="h-3 w-3" /> Matrículas abertas 2024
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-balance md:text-5xl lg:text-6xl">
              Educação que forma <span className="text-[var(--gold)]">mentes preparadas</span> para o futuro.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-85 text-pretty">
              Há mais de 20 anos, o Colégio Objetivo Mairinque oferece uma formação sólida, humana e estratégica — para que seu filho desenvolva conhecimento, autonomia e propósito.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-[var(--gold)] text-primary hover:bg-[var(--gold)]/90">
                <a href={wa("Olá! Gostaria de agendar uma visita ao Colégio Objetivo Mairinque.")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> Agende uma visita
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white hover:text-primary">
                <Link to="/sobre">Conheça o colégio <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm opacity-80">
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--gold)]" /> Turmas reduzidas</div>
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--gold)]" /> Acompanhamento próximo</div>
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--gold)]" /> Tradição reconhecida</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-[var(--gold)]/20 blur-3xl" />
            <img
              src={heroImg}
              alt="Aluna do Colégio Objetivo Mairinque"
              width={1280}
              height={1600}
              className="relative rounded-3xl shadow-elegant aspect-[4/5] object-cover"
            />
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="border-y border-border bg-card">
        <div className="container-tight grid grid-cols-2 gap-px md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="bg-card px-6 py-10 text-center">
              <div className="font-display text-4xl font-bold text-primary md:text-5xl">{s.n}</div>
              <div className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* NÍVEIS */}
      <section className="container-tight py-24">
        <SectionHeading eyebrow="Níveis de ensino" title="Acompanhamos cada fase da formação do seu filho" subtitle="Da primeira infância à transição para o Ensino Médio, com proposta pedagógica integrada e atenção real ao desenvolvimento." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {niveis.map((n) => (
            <Link key={n.to} to={n.to} className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={n.img} alt={n.title} loading="lazy" width={800} height={640} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-primary">
                  {n.age}
                </div>
              </div>
              <div className="p-7">
                <h3 className="font-display text-xl font-bold text-primary">{n.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{n.text}</p>
                <span className="mt-5 inline-flex items-center text-sm font-semibold text-primary transition-all group-hover:gap-2">
                  Saiba mais <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PILARES */}
      <section className="bg-muted py-24">
        <div className="container-tight">
          <SectionHeading eyebrow="Por que Objetivo Mairinque" title="Uma escola pensada para o que realmente importa" subtitle="Os pilares que sustentam mais de duas décadas de confiança das famílias da nossa região." />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pilares.map((p) => (
              <div key={p.title} className="rounded-2xl bg-card p-7 shadow-soft transition-all hover:shadow-elegant">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="container-tight py-24">
        <SectionHeading eyebrow="Quem vive a escola" title="O que as famílias dizem" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {depoimentos.map((d, i) => (
            <figure key={i} className="rounded-2xl border border-border bg-card p-7 shadow-soft">
              <div className="text-[var(--gold)]">★★★★★</div>
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/85">"{d.text}"</blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <div className="font-semibold text-primary">{d.name}</div>
                <div className="text-xs text-muted-foreground">{d.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* QUEBRA DE OBJEÇÕES + CTA */}
      <section className="bg-hero py-24 text-primary-foreground">
        <div className="container-tight grid gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">O que você encontra aqui</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-balance md:text-4xl">Os detalhes que fazem diferença no dia a dia escolar.</h2>
            <ul className="mt-8 space-y-4">
              {objecoes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-base opacity-90">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-primary">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/5 p-10 backdrop-blur">
            <GraduationCap className="h-10 w-10 text-[var(--gold)]" />
            <h3 className="mt-5 font-display text-2xl font-bold">Agende uma visita guiada</h3>
            <p className="mt-3 text-sm leading-relaxed opacity-85">
              Conheça a estrutura, converse com a equipe pedagógica e veja de perto o ambiente em que seu filho vai estudar. É a melhor forma de tomar essa decisão.
            </p>
            <Button asChild size="lg" className="mt-7 w-full bg-[var(--gold)] text-primary hover:bg-[var(--gold)]/90">
              <a href={wa("Olá! Gostaria de agendar uma visita guiada.")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Falar no WhatsApp
              </a>
            </Button>
            <p className="mt-3 text-center text-xs opacity-70">Resposta rápida em horário comercial</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-tight py-24">
        <SectionHeading eyebrow="Perguntas frequentes" title="Tudo que você precisa saber antes de decidir" />
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faq.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-xl border border-border bg-card px-5 shadow-soft">
                <AccordionTrigger className="text-left font-display text-base font-semibold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
