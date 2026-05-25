import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, GraduationCap, BookOpen, Users, Award, Menu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import heroImg from "@/assets/hero-school.jpg";
import infantilImg from "@/assets/infantil.jpg";
import fund1Img from "@/assets/fund1.jpg";
import fund2Img from "@/assets/fund2.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Colégio Objetivo Mairinque — Ensino de qualidade há mais de 20 anos" },
      { name: "description", content: "Colégio Objetivo Mairinque: Educação Infantil, Fundamental I e II em Mairinque-SP. Matrículas abertas." },
    ],
  }),
});

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Educação Infantil", href: "#infantil" },
  { label: "Fundamental I", href: "#fund1" },
  { label: "Fundamental II", href: "#fund2" },
  { label: "Contatos", href: "#contato" },
];

function Index() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-sm">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 px-4 py-2">
          <div className="flex items-center gap-4">
            <a href="tel:+551147182255" className="flex items-center gap-2 hover:opacity-80">
              <Phone className="h-3.5 w-3.5" /> (11) 4718-2255
            </a>
            <a href="mailto:contato@objetivomairinque.com.br" className="hidden items-center gap-2 hover:opacity-80 sm:flex">
              <Mail className="h-3.5 w-3.5" /> contato@objetivomairinque.com.br
            </a>
          </div>
          <a href="#contato" className="font-medium hover:underline">Portal do Aluno</a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <a href="#home" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-primary">OBJETIVO</div>
              <div className="text-xs text-muted-foreground">Mairinque</div>
            </div>
          </a>
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <Button asChild className="hidden lg:inline-flex">
            <a href="#matriculas">Matricule-se</a>
          </Button>
          <button onClick={() => setOpen(!open)} className="lg:hidden" aria-label="Menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
        {open && (
          <nav className="border-t border-border lg:hidden">
            <div className="container mx-auto flex flex-col gap-1 px-4 py-3">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm font-medium hover:bg-muted">
                  {l.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="container mx-auto grid items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div className="text-primary-foreground">
            <span className="inline-block rounded-full bg-secondary px-4 py-1 text-sm font-semibold text-secondary-foreground">
              Matrículas Abertas 2024
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Colégio Objetivo <span className="text-secondary">Mairinque</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg opacity-90">
              Ensino de qualidade há mais de 20 anos. Formando cidadãos preparados para os desafios do futuro.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" variant="secondary" asChild>
                <a href="#matriculas">Faça sua matrícula <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/40 hover:bg-primary-foreground hover:text-primary" asChild>
                <a href="#sobre">Conheça a escola</a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="Alunos do Colégio Objetivo Mairinque"
              width={1600}
              height={1024}
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Níveis de ensino */}
      <section id="sobre" className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Nossos Níveis de Ensino</h2>
          <p className="mt-3 text-muted-foreground">
            Acompanhamos cada aluno em todas as fases da sua formação.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              id: "infantil",
              img: infantilImg,
              title: "Educação Infantil",
              text: "O período de 0 a 5 anos é o mais importante na formação da criança. Nessa etapa ela constrói os principais recursos para lidar e interagir com novas experiências.",
            },
            {
              id: "fund1",
              img: fund1Img,
              title: "Fundamental I",
              text: "Tem como finalidade a formação integral do aluno, baseado na reflexão. Permite o desenvolvimento da criatividade, da autonomia e da responsabilidade.",
            },
            {
              id: "fund2",
              img: fund2Img,
              title: "Fundamental II",
              text: "Surgem novas questões que exigem soluções mais complexas. É preciso inteligência para discriminar a importância das questões essenciais e liderança para enfrentá-las.",
            },
          ].map((c) => (
            <article
              key={c.id}
              id={c.id}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <img src={c.img} alt={c.title} loading="lazy" width={800} height={640} className="h-52 w-full object-cover transition-transform group-hover:scale-105" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
                <a href="#contato" className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:gap-2 transition-all">
                  Saiba mais <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Nossa Realização</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Ensino de qualidade há mais de 20 anos</h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Award, n: "20+", l: "Anos de tradição" },
              { icon: Users, n: "40+", l: "Professores" },
              { icon: BookOpen, n: "25+", l: "Salas de aula" },
              { icon: GraduationCap, n: "600+", l: "Alunos" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-card p-6 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
                <s.icon className="mx-auto h-8 w-8 text-primary" />
                <div className="mt-3 text-3xl font-bold text-primary">{s.n}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="matriculas" className="relative overflow-hidden py-20" style={{ background: "var(--gradient-hero)" }}>
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold md:text-4xl">Faça parte deste time!</h2>
          <p className="mt-3 text-lg opacity-90">Matrículas abertas 2024 — venha nos conhecer.</p>
          <Button size="lg" variant="secondary" className="mt-8" asChild>
            <a href="#contato">Quero me matricular</a>
          </Button>
        </div>
      </section>

      {/* Footer / Contato */}
      <footer id="contato" className="bg-card pt-16">
        <div className="container mx-auto grid gap-10 px-4 pb-12 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold text-primary">Contatos</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-primary" /> R. José Alves Ferreira Filho, 59 — Res. Parque Cristiane, Mairinque-SP, 18120-000</li>
              <li className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-primary" /> (11) 4718-2255 · (11) 99789-8763</li>
              <li className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-primary" /> contato@objetivomairinque.com.br</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary">Horários</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><Clock className="h-4 w-4 text-primary" /> Educação Infantil: 13h às 17h</li>
              <li className="flex gap-2"><Clock className="h-4 w-4 text-primary" /> Fundamental I: 13h às 17h30</li>
              <li className="flex gap-2"><Clock className="h-4 w-4 text-primary" /> Fundamental II: 7h30 às 12h50</li>
              <li className="flex gap-2"><Clock className="h-4 w-4 text-primary" /> Secretaria: 9h às 18h</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary">Newsletter</h3>
            <p className="mt-4 text-sm text-muted-foreground">Digite seu e-mail e enviaremos mais informações.</p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" required placeholder="seu@email.com" className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm" />
              <Button type="submit">Enviar</Button>
            </form>
          </div>
        </div>
        <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Colégio Objetivo Mairinque. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
