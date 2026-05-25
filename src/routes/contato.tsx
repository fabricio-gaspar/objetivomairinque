import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, wa } from "@/lib/site";

export const Route = createFileRoute("/contato")({
  component: Contato,
  head: () => ({
    meta: [
      { title: "Contato — Colégio Objetivo Mairinque" },
      { name: "description", content: "Fale com o Colégio Objetivo Mairinque. Agende uma visita, tire dúvidas e conheça a proposta pedagógica." },
      { property: "og:title", content: "Contato — Objetivo Mairinque" },
      { property: "og:description", content: "Agende uma visita ou fale conosco no WhatsApp." },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
});

function Contato() {
  return (
    <>
      <section className="bg-hero py-20 text-primary-foreground">
        <div className="container-tight max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">Contato</span>
          <h1 className="mt-4 font-display text-4xl font-bold text-balance md:text-5xl lg:text-6xl">
            Fale com a equipe do colégio.
          </h1>
          <p className="mt-6 text-lg opacity-85 text-pretty">
            Estamos prontos para tirar dúvidas, agendar uma visita guiada ou orientar você sobre o processo de matrícula.
          </p>
        </div>
      </section>

      <section className="container-tight py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">Endereço</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{SITE.address}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-7 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">Telefones</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{SITE.phone}<br />{SITE.whatsappLabel}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-7 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">E-mail</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{SITE.email}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-7 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">Horários</h3>
                  <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                    <li>Educação Infantil: 13h às 17h</li>
                    <li>Fundamental I: 13h às 17h30</li>
                    <li>Fundamental II: 7h30 às 12h50</li>
                    <li>Secretaria: 9h às 18h</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-hero p-10 text-primary-foreground">
            <MessageCircle className="h-10 w-10 text-[var(--gold)]" />
            <h2 className="mt-5 font-display text-2xl font-bold">A forma mais rápida de falar conosco</h2>
            <p className="mt-3 text-sm leading-relaxed opacity-85">
              Envie uma mensagem agora pelo WhatsApp. Nossa equipe responde em horário comercial com todas as informações que você precisa.
            </p>
            <Button asChild size="lg" className="mt-7 w-full bg-[var(--gold)] text-primary hover:bg-[var(--gold)]/90">
              <a href={wa("Olá! Tenho interesse em conhecer o Colégio Objetivo Mairinque.")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Falar no WhatsApp
              </a>
            </Button>

            <div className="mt-10 border-t border-white/15 pt-6">
              <h3 className="font-display text-lg font-semibold">Prefere ligar?</h3>
              <a href={`tel:${SITE.phoneRaw}`} className="mt-2 inline-block text-2xl font-bold text-[var(--gold)]">
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-border shadow-soft">
          <iframe
            title="Localização do Colégio Objetivo Mairinque"
            src="https://www.google.com/maps?q=R.+Jos%C3%A9+Alves+Ferreira+Filho%2C+59%2C+Mairinque+-+SP&output=embed"
            className="h-[420px] w-full"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}
