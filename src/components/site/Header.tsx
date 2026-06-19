import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV } from "@/lib/site";
import { useSiteSettings, waLink } from "@/hooks/useSiteSettings";
import logo from "@/assets/logo.png";


export function Header() {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const SITE = useSiteSettings();
  const wa = (m: string) => waLink(SITE.whatsapp, m);

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
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Colégio Objetivo Mairinque" className="h-12 w-auto md:h-14" />
          </Link>


          <nav className="ml-auto hidden items-center gap-7 pr-6 lg:flex">
            {NAV.map((item) => {
              if ("children" in item) {
                const active = item.children.some((c) => c.to === pathname);
                return (
                  <div key={item.label} className="group relative">
                    <button
                      data-active={active}
                      className={`nav-link inline-flex items-center gap-1 text-sm font-medium transition-colors whitespace-pre-line ${active ? "text-primary" : "text-foreground/70 hover:text-primary"}`}
                    >
                      {item.label} <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                    </button>
                    <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 translate-y-1 rounded-xl border border-border bg-background/95 p-2 opacity-0 shadow-elegant backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {item.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          className="block rounded-lg px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              if ("external" in item && item.external) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link text-sm font-medium text-foreground/70 transition-colors hover:text-primary whitespace-pre-line"
                  >
                    {item.label}
                  </a>
                );
              }
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  data-active={active}
                  className={`nav-link text-sm font-medium transition-colors whitespace-pre-line ${active ? "text-primary" : "text-foreground/70 hover:text-primary"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Button asChild className="hidden bg-[var(--gold)] text-primary shadow-soft transition-all hover:-translate-y-0.5 hover:bg-[var(--gold)]/90 hover:shadow-elegant lg:inline-flex" size="sm">
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
              {NAV.map((item) => {
                if ("children" in item) {
                  const isSubOpen = openSub === item.label;
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => setOpenSub(isSubOpen ? null : item.label)}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted whitespace-pre-line"
                      >
                        {item.label} <ChevronDown className={`h-4 w-4 transition-transform ${isSubOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isSubOpen && (
                        <div className="ml-3 flex flex-col">
                          {item.children.map((c) => (
                            <Link
                              key={c.to}
                              to={c.to}
                              onClick={() => setOpen(false)}
                              className="rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-muted"
                            >
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                if ("external" in item && item.external) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted whitespace-pre-line"
                    >
                      {item.label}
                    </a>
                  );
                }
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted whitespace-pre-line"
                  >
                    {item.label}
                  </Link>
                );
              })}
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
