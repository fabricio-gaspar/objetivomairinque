import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle, GraduationCap, Paintbrush, Landmark, Users, Sparkles, Award, BookOpen, HeartHandshake, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { wa } from "@/lib/site";
import { useCountUp } from "@/hooks/use-count-up";
import slide1 from "@/assets/slide-1.jpg";
import slide2 from "@/assets/slide-2.jpg";
import slide3 from "@/assets/slide-3.jpg";
import slide4 from "@/assets/slide-4.jpg";
import infantilImg from "@/assets/infantil.jpg";
import fund1Img from "@/assets/fund1.jpg";
import fund2Img from "@/assets/fund2.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Colégio Objetivo Mairinque" },
      { name: "description", content: "Ensino de qualidade há mais de 20 anos. Educação Infantil, Fundamental I e Fundamental II em Mairinque-SP. Matrículas abertas 2026." },
      { property: "og:title", content: "Colégio Objetivo Mairinque" },
      { property: "og:description", content: "Ensino de qualidade há mais de 20 anos em Mairinque-SP." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const slides = [slide1, slide2, slide3, slide4];

const niveis = [
  {
    to: "/educacao-infantil",
    img: infantilImg,
    title: "EDUCAÇÃO INFANTIL",
    age: "2 a 5 anos",
    text: "O período de 0 a 5 anos é o mais importante na formação da criança. Nessa etapa ela constrói os principais recursos para lidar e interagir com as novas experiências.",
  },
  {
    to: "/fundamental-1",
    img: fund1Img,
    title: "FUNDAMENTAL I",
    age: "6 a 10 anos",
    text: "O Ensino Fundamental I tem como finalidade a formação integral do aluno, baseado na reflexão permite o desenvolvimento da criatividade, da autonomia e da responsabilidade,",
  },
  {
    to: "/fundamental-2",
    img: fund2Img,
    title: "FUNDAMENTAL II",
    age: "11 a 14 anos",
    text: "No Ensino Fundamental II surgem novas questões que exigem soluções mais complexas. É preciso inteligência para discriminar a importância das questões essenciais. Liderança para enfrentá-las.",
  },
] as const;

const stats = [
  { l: "GRADUAÇÃO", n: 9572, Icon: GraduationCap },
  { l: "PROFESSORES", n: 20, Icon: Paintbrush },
  { l: "SALAS DE AULA", n: 15, Icon: Landmark },
  { l: "ALUNOS", n: 1624, Icon: Users },
];

const beneficios = [
  { Icon: Award, title: "Tradição reconhecida", text: "Mais de 20 anos formando alunos em Mairinque." },
  { Icon: BookOpen, title: "Sistema Objetivo", text: "Material didático de referência nacional." },
  { Icon: Clock, title: "Período Integral", text: "Apoio educacional em horário estendido." },
  { Icon: HeartHandshake, title: "Acompanhamento próximo", text: "Equipe atenta ao desenvolvimento de cada aluno." },
];

const selos = [
  "Matrículas abertas 2026",
  "Sistema Objetivo de Ensino",
  "+20 anos em Mairinque",
  "Educação Infantil ao Fundamental II",
  "Período Integral",
  "Agende sua visita",
];

function StatNumber({ target }: { target: number }) {
  const { value, ref } = useCountUp(target);
  return <span ref={ref}>{value.toLocaleString("pt-BR")}</span>;
}

function Home() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* SLIDESHOW com decoração */}
      <section className="relative w-full overflow-hidden bg-primary">
        <div className="relative aspect-[21/9] max-h-[640px] min-h-[320px] w-full">
          {slides.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}

          {/* Sparkles decorativas */}
          <Sparkles aria-hidden className="pointer-events-none absolute left-[6%] top-[14%] h-7 w-7 text-[var(--gold)] opacity-80 animate-float" />
          <Sparkles aria-hidden className="pointer-events-none absolute right-[8%] top-[20%] h-5 w-5 text-white/70 animate-float-delayed" />
          <Sparkles aria-hidden className="pointer-events-none absolute left-[12%] bottom-[24%] h-4 w-4 text-white/60 animate-float-delayed" />

          {/* Selo giratório */}
          <a
            href={wa("Olá! Gostaria de agendar uma visita ao colégio.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agende sua visita"
            className="absolute bottom-16 right-6 hidden h-28 w-28 md:flex items-center justify-center md:bottom-20 md:right-10"
          >
            <span className="absolute inset-0 rounded-full bg-[var(--gold)]/15 backdrop-blur-sm ring-1 ring-[var(--gold)]/50" />
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow">
              <defs>
                <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text fill="white" fontSize="10" fontFamily="var(--font-display), sans-serif" letterSpacing="2">
                <textPath href="#circ">MATRÍCULAS 2026 · AGENDE SUA VISITA · </textPath>
              </text>
            </svg>
            <Sparkles className="relative h-7 w-7 text-[var(--gold)]" />
          </a>

          <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${idx === i ? "w-8 bg-white" : "w-2 bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE DE SELOS */}
      <section aria-label="Destaques" className="border-y border-border bg-card py-5">
        <div className="marquee">
          <div className="marquee__track gap-10 px-5">
            {[...selos, ...selos].map((s, idx) => (
              <span key={idx} className="flex items-center gap-3 whitespace-nowrap text-sm font-semibold uppercase tracking-wider text-foreground/70">
                <Sparkles className="h-4 w-4 text-[var(--gold)]" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* NÍVEIS DE ENSINO */}
      <section className="container-tight py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {niveis.map((n) => (
            <article key={n.to} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="relative overflow-hidden">
                <img src={n.img} alt={n.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-[var(--gold)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary shadow-soft">
                  {n.age}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h2 className="font-display text-lg font-bold tracking-wide text-primary">{n.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{n.text}</p>
                <Link to={n.to} className="mt-5 inline-flex items-center text-sm font-semibold text-primary transition-all group-hover:gap-2">
                  Saiba Mais <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* POR QUE ESCOLHER */}
      <section className="page-header py-20">
        <div className="container-tight relative">
          <SectionHeading eyebrow="Nossos diferenciais" title="Por que escolher o Objetivo Mairinque" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {beneficios.map(({ Icon, title, text }) => (
              <div key={title} className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--gold)]/15 ring-1 ring-[var(--gold)]/40 transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-5 font-display text-base font-bold text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOSSA REALIZAÇÃO */}
      <section className="bg-hero py-20 text-primary-foreground">
        <div className="container-tight text-center">
          <h2 className="font-display text-3xl font-bold text-[var(--gold)] md:text-4xl">NOSSA REALIZAÇÃO</h2>
          <p className="mt-3 text-base opacity-85">Ensino de qualidade há mais de 20 anos</p>
          <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
            {stats.map(({ l, n, Icon }) => (
              <div key={l} className="group relative overflow-hidden rounded-2xl bg-white p-7 text-left shadow-soft ring-1 ring-white/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant">
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[var(--gold)] transition-transform duration-500 group-hover:scale-x-100" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium tracking-wide text-foreground/70">{l}</span>
                  <Icon className="h-7 w-7 text-primary transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="mt-6 font-display text-4xl font-light text-foreground md:text-5xl">
                  <StatNumber target={n} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA MATRÍCULAS */}
      <section className="page-header py-20">
        <div className="container-tight relative text-center">
          <SectionHeading eyebrow="Faça parte deste time!" title="Matrículas abertas 2026" />

          <div className="mt-8">
            <Button asChild size="lg" className="bg-[var(--gold)] text-primary hover:bg-[var(--gold)]/90">
              <a href={wa("Olá! Gostaria de mais informações sobre matrículas.")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Contato
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
