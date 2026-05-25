import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { wa } from "@/lib/site";

type Props = {
  eyebrow: string;
  title: string;
  age: string;
  intro: string;
  image: string;
  highlights: string[];
  paragraphs: string[];
  nextLabel: string;
  nextTo: string;
  whatsappMsg: string;
};

export function NivelLayout(p: Props) {
  return (
    <>
      <section className="bg-hero py-20 text-primary-foreground">
        <div className="container-tight grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">{p.eyebrow}</span>
            <h1 className="mt-4 font-display text-4xl font-bold text-balance md:text-5xl lg:text-6xl">{p.title}</h1>
            <p className="mt-3 text-sm font-medium uppercase tracking-wider text-[var(--gold)]">{p.age}</p>
            <p className="mt-6 text-lg opacity-85 text-pretty">{p.intro}</p>
            <Button asChild size="lg" className="mt-8 bg-[var(--gold)] text-primary hover:bg-[var(--gold)]/90">
              <a href={wa(p.whatsappMsg)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Falar com a escola
              </a>
            </Button>
          </div>
          <img src={p.image} alt={p.title} loading="lazy" width={800} height={640} className="rounded-3xl shadow-elegant aspect-[4/3] object-cover" />
        </div>
      </section>

      <section className="container-tight py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 text-base leading-relaxed text-foreground/85 text-pretty">
            {p.paragraphs.map((par, i) => <p key={i}>{par}</p>)}
          </div>
          <div className="rounded-2xl border border-border bg-muted p-7">
            <h3 className="font-display text-lg font-semibold text-primary">Destaques desta etapa</h3>
            <ul className="mt-5 space-y-3">
              {p.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-tight pb-24">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-card p-8 shadow-soft">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Próxima etapa</div>
            <div className="mt-1 font-display text-xl font-bold text-primary">{p.nextLabel}</div>
          </div>
          <Button asChild variant="outline">
            <Link to={p.nextTo}>Conhecer <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
}

export const route = createFileRoute;
