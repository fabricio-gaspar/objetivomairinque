import { MessageCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { wa } from "@/lib/site";

type Props = {
  eyebrow: string;
  title: string;
  image: string;
  paragraphs: string[];
  atividades: string[];
  whatsappMsg: string;
};

export function NivelLayout(p: Props) {
  return (
    <>
      <section className="relative overflow-hidden bg-muted/40 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--gold)_0%,_transparent_55%)] opacity-[0.07]" />
        <div className="container-tight relative text-center">
          <SectionHeading eyebrow={p.eyebrow} title={p.title} size="md" />
        </div>
      </section>

      <section className="container-tight py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <img src={p.image} alt={p.eyebrow} className="w-full rounded-2xl shadow-elegant" />
          <div>
            <h2 className="section-title font-display text-2xl font-bold text-primary">{p.eyebrow}</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-foreground/85 text-pretty">
              {p.paragraphs.map((par, i) => <p key={i}>{par}</p>)}
            </div>

            <h3 className="section-title mt-10 font-display text-lg font-semibold text-primary">Atividades</h3>
            <ul className="mt-5 space-y-3">
              {p.atividades.map((a) => (
                <li key={a} className="flex items-center gap-3 text-base">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-primary">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {a}
                </li>
              ))}
            </ul>

            <Button asChild size="lg" className="mt-10 bg-[var(--gold)] text-primary hover:bg-[var(--gold)]/90">
              <a href={wa(p.whatsappMsg)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
