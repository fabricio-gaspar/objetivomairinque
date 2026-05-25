import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV, SITE, wa } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="container-tight flex items-center justify-between py-2 text-xs">
          <a href={`tel:${SITE.phoneRaw}`} className="flex items-center gap-2 opacity-90 hover:opacity-100">
            <Phone className="h-3 w-3" /> {SITE.phone}
          </a>
          <span className="opacity-80">{SITE.email}</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-lg">
        <div className="container-tight flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-base font-bold tracking-tight text-primary">OBJETIVO</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Mairinque</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((l) => {
              const active = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-sm font-medium transition-colors ${active ? "text-primary" : "text-foreground/70 hover:text-primary"}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <Button asChild className="hidden lg:inline-flex" size="sm">
            <a href={wa("Olá! Gostaria de agendar uma visita ao colégio.")} target="_blank" rel="noopener noreferrer">
              Agendar visita
            </a>
          </Button>

          <button onClick={() => setOpen(!open)} aria-label="Menu" className="lg:hidden">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <nav className="border-t border-border bg-background lg:hidden">
            <div className="container-tight flex flex-col gap-1 py-3">
              {NAV.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
                >
                  {l.label}
                </Link>
              ))}
              <Button asChild className="mt-2" size="sm">
                <a href={wa("Olá! Gostaria de agendar uma visita ao colégio.")} target="_blank" rel="noopener noreferrer">
                  Agendar visita
                </a>
              </Button>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
