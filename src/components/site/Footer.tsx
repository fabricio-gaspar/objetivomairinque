import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import logo from "@/assets/logo.png";


export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="container-tight grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <img src={logo} alt="Colégio Objetivo Mairinque" className="h-12 w-auto" />
          <p className="mt-4 text-sm opacity-75 text-pretty">
            Educação de excelência há mais de 20 anos, formando estudantes preparados para os desafios do futuro.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Navegação</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.flatMap((item) => {
              if ("children" in item) return item.children;
              if ("external" in item && item.external)
                return [{ label: item.label, to: item.href, _ext: true as const }];
              return [item];
            }).map((l) => (
              <li key={l.to}>
                {"_ext" in l ? (
                  <a href={l.to} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 hover:underline">
                    {l.label}
                  </a>
                ) : (
                  <Link to={l.to} className="opacity-80 hover:opacity-100 hover:underline">
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Contato</h4>
          <ul className="mt-4 space-y-3 text-sm opacity-90">
            <li className="flex gap-2.5"><MapPin className="h-4 w-4 shrink-0 mt-0.5" /> {SITE.address}</li>
            <li className="flex gap-2.5"><Phone className="h-4 w-4 shrink-0 mt-0.5" /> {SITE.phone} · {SITE.whatsappLabel}</li>
            <li className="flex gap-2.5"><Mail className="h-4 w-4 shrink-0 mt-0.5" /> {SITE.email}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Horários</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-90">
            <li className="flex gap-2"><Clock className="h-4 w-4 shrink-0 mt-0.5" /> Educação Infantil: 13h às 17h</li>
            <li className="flex gap-2"><Clock className="h-4 w-4 shrink-0 mt-0.5" /> Fundamental I: 13h às 17h30</li>
            <li className="flex gap-2"><Clock className="h-4 w-4 shrink-0 mt-0.5" /> Fundamental II: 7h30 às 12h50</li>
            <li className="flex gap-2"><Clock className="h-4 w-4 shrink-0 mt-0.5" /> Secretaria: 9h às 18h</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-tight text-center text-xs opacity-70">
          © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
