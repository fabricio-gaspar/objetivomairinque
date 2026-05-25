import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Send, ArrowUp, Facebook, Instagram, Youtube } from "lucide-react";
import { SITE } from "@/lib/site";
import logo from "@/assets/logo.png";

export function Footer() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="mt-24 bg-background">
      <div className="container-tight py-16">
        {/* TOPO: chamada + newsletter */}
        <div className="grid items-center gap-8 md:grid-cols-2">
          <h2 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
            <span className="text-primary">Vamos</span> construir o futuro juntos
            <span className="block mt-2 text-base font-normal text-muted-foreground">
              Receba novidades e informações sobre matrículas.
            </span>
          </h2>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 rounded-full border border-border bg-card p-1.5 pl-5 shadow-soft transition-shadow focus-within:shadow-elegant"
          >
            <input
              type="email"
              required
              placeholder="Digite seu e-mail..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-elegant"
            >
              Inscreva-se <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

        <div className="my-12 h-px w-full bg-border" />

        {/* COLUNAS */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Sobre */}
          <div>
            <img src={logo} alt={SITE.name} className="h-12 w-auto" />
            <h3 className="mt-6 font-display text-lg font-bold text-foreground">Sobre nós</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Educação de excelência há mais de 20 anos em Mairinque, formando estudantes preparados
              para os desafios do futuro com o Sistema Objetivo de Ensino.
            </p>

            <div className="mt-5 flex items-center gap-2">
              {[
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-all hover:-translate-y-0.5 hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Ensino */}
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">Ensino</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { label: "Educação Infantil", to: "/educacao-infantil" },
                { label: "Fundamental I", to: "/fundamental-1" },
                { label: "Fundamental II", to: "/fundamental-2" },
                { label: "Período Integral", to: "/integral" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="inline-flex items-center text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links úteis */}
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">Links úteis</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/sobre" className="text-muted-foreground transition-colors hover:text-primary">Sobre nós</Link>
              </li>
              <li>
                <Link to="/contato" className="text-muted-foreground transition-colors hover:text-primary">Contato</Link>
              </li>
              <li>
                <a href={SITE.portalUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary">
                  Portal do Aluno
                </a>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">Matrículas 2026</Link>
              </li>
            </ul>
          </div>

          {/* Contate-nos */}
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">Contate-nos</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/15 ring-1 ring-[var(--gold)]/40">
                  <Phone className="h-4 w-4 text-primary" />
                </span>
                <a href={`tel:${SITE.phoneRaw}`} className="leading-tight text-muted-foreground transition-colors hover:text-primary">
                  {SITE.phone}
                  <span className="block text-xs opacity-80">WhatsApp: {SITE.whatsappLabel}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/15 ring-1 ring-[var(--gold)]/40">
                  <Mail className="h-4 w-4 text-primary" />
                </span>
                <a href={`mailto:${SITE.email}`} className="break-all leading-tight text-muted-foreground transition-colors hover:text-primary">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/15 ring-1 ring-[var(--gold)]/40">
                  <MapPin className="h-4 w-4 text-primary" />
                </span>
                <span className="leading-snug text-muted-foreground">{SITE.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border py-5">
        <div className="container-tight text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.
        </div>
      </div>

      {/* Scroll-to-top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Voltar ao topo"
        className={`fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elegant transition-all hover:-translate-y-1 hover:bg-primary/90 ${
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}
