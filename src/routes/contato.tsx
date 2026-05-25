import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SITE, wa } from "@/lib/site";

export const Route = createFileRoute("/contato")({
  component: Contato,
  head: () => ({
    meta: [
      { title: "Contatos — Colégio Objetivo Mairinque" },
      { name: "description", content: "Fale com o Colégio Objetivo Mairinque. Endereço, telefone, WhatsApp e e-mail." },
      { property: "og:title", content: "Contatos — Colégio Objetivo Mairinque" },
      { property: "og:description", content: "Entre em contato conosco." },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
});

function Contato() {
  return (
    <>
      <section className="page-header py-16">
        <div className="container-tight relative text-center">
          <SectionHeading eyebrow="Entre em contato caso tenha alguma dúvida ou sugestão" title="Contatos" />
        </div>
      </section>

      <section className="container-tight py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-primary">Endereço</div>
                <p className="text-sm text-foreground/80">{SITE.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-primary">Telefone</div>
                <a href={`tel:${SITE.phoneRaw}`} className="text-sm text-foreground/80 hover:text-primary">{SITE.phone}</a>
                <div className="text-sm text-foreground/80">WhatsApp: {SITE.whatsappLabel}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-primary">E-mail</div>
                <a href={`mailto:${SITE.email}`} className="text-sm text-foreground/80 hover:text-primary">{SITE.email}</a>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display font-bold text-primary">Horários</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
                <li>Educação Infantil: 13h às 17h</li>
                <li>Ensino Fundamental I: 13h às 17h30</li>
                <li>Ensino Fundamental II: 7h30 às 12h50</li>
                <li>Secretaria: 9h às 18h</li>
              </ul>
            </div>

            <Button asChild size="lg" className="bg-[var(--whatsapp)] text-white hover:bg-[var(--whatsapp)]/90">
              <a href={wa("Olá! Gostaria de mais informações.")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Falar no WhatsApp
              </a>
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
            <iframe
              title="Mapa Colégio Objetivo Mairinque"
              src="https://www.google.com/maps?q=R.%20Jos%C3%A9%20Alves%20Ferreira%20Filho%2C%2059%20-%20Res.%20Parque%20Cristiane%2C%20Mairinque%20-%20SP&output=embed"
              className="h-full min-h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
