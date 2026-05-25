import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle, GraduationCap, Paintbrush, Landmark, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { wa } from "@/lib/site";
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
    text: "O período de 0 a 5 anos é o mais importante na formação da criança. Nessa etapa ela constrói os principais recursos para lidar e interagir com as novas experiências.",
  },
  {
    to: "/fundamental-1",
    img: fund1Img,
    title: "FUNDAMENTAL I",
    text: "O Ensino Fundamental I tem como finalidade a formação integral do aluno, baseado na reflexão permite o desenvolvimento da criatividade, da autonomia e da responsabilidade,",
  },
  {
    to: "/fundamental-2",
    img: fund2Img,
    title: "FUNDAMENTAL II",
    text: "No Ensino Fundamental II surgem novas questões que exigem soluções mais complexas. É preciso inteligência para discriminar a importância das questões essenciais. Liderança para enfrentá-las.",
  },
] as const;

const stats = [
  { l: "GRADUAÇÃO", n: "9572", Icon: GraduationCap },
  { l: "PROFESSORES", n: "20", Icon: Paintbrush },
  { l: "SALAS DE AULA", n: "15", Icon: Landmark },
  { l: "ALUNOS", n: "1624", Icon: Users },
];

function Home() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* SLIDESHOW */}
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


      {/* NÍVEIS DE ENSINO */}
      <section className="container-tight py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {niveis.map((n) => (
            <article key={n.to} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="overflow-hidden">
                <img src={n.img} alt={n.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h2 className="font-display text-lg font-bold tracking-wide text-primary">{n.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{n.text}</p>
                <Link to={n.to} className="mt-5 inline-flex items-center text-sm font-semibold text-primary transition-all group-hover:gap-2">
                  Saiba Mais <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* NOSSA REALIZAÇÃO */}
      <section className="bg-hero py-20 text-primary-foreground">
        <div className="container-tight text-center">
          <h2 className="font-display text-3xl font-bold text-[var(--gold)] md:text-4xl">NOSSA REALIZAÇÃO</h2>
          <p className="mt-3 text-base opacity-85">Ensino de qualidade há mais de 20 anos</p>
          <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
            {stats.map(({ l, n, Icon }) => (
              <div key={l} className="rounded-xl bg-white p-7 text-left shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium tracking-wide text-foreground/70">{l}</span>
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <div className="mt-6 text-4xl font-light text-foreground md:text-5xl">{n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA MATRÍCULAS */}
      <section className="container-tight py-20 text-center">
        <SectionHeading eyebrow="Faça parte deste time!" title="Matrículas abertas 2026" />

        <div className="mt-8">
          <Button asChild size="lg" className="bg-[var(--gold)] text-primary hover:bg-[var(--gold)]/90">
            <a href={wa("Olá! Gostaria de mais informações sobre matrículas.")} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" /> Contato
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
