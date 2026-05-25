import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Send, Facebook, Instagram, Youtube } from "lucide-react";
import { SITE } from "@/lib/site";
import logo from "@/assets/logo.png";

const BLUE = "#1d6cf3";

export function Footer() {
  return (
    <footer className="mt-24 text-white" style={{ backgroundColor: BLUE }}>
      <div className="container-tight py-16">
        {/* CTA + Newsletter */}
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
              Vamos caminhar juntos
            </h2>
            <p className="mt-3 max-w-md text-sm text-white/80">
              Receba novidades sobre matrículas, eventos e o dia a dia do Colégio Objetivo Mairinque.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative flex items-center rounded-full border border-white/20 bg-white/10 p-1.5 backdrop-blur-sm focus-within:border-white/30"
          >
            <input
              type="email"
              required
              placeholder="Digite seu e-mail…"
              className="w-full bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ color: BLUE }}
            >
              Inscreva-se <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

        <div className="my-12 h-px w-full bg-white/20" />

        {/* Columns */}
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <img src={logo} alt={SITE.name} className="h-12 w-auto brightness-0 invert" />
            <p className="mt-5 text-sm leading-relaxed text-white/80">
              Educação de excelência há mais de 20 anos em Mairinque-SP. Tradição, autoridade pedagógica e formação integral para os desafios do futuro.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-blue-600"
                  aria-label="Rede social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-base font-bold text-white">Institucional</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              <li><Link to="/" className="hover:text-white">Início</Link></li>
              <li><Link to="/sobre" className="hover:text-white">Sobre Nós</Link></li>
              <li><Link to="/integral" className="hover:text-white">Período Integral</Link></li>
              <li><Link to="/contato" className="hover:text-white">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-bold text-white">Ensino</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              <li><Link to="/educacao-infantil" className="hover:text-white">Educação Infantil</Link></li>
              <li><Link to="/fundamental-1" className="hover:text-white">Fundamental I</Link></li>
              <li><Link to="/fundamental-2" className="hover:text-white">Fundamental II</Link></li>
              <li>
                <a href={SITE.portalUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Portal do Aluno
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-bold text-white">Contate-nos</h4>
            <ul className="mt-5 space-y-4 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/20 text-white">
                  <Phone className="h-3.5 w-3.5" />
                </span>
                <span>{SITE.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/20 text-white">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                <span>{SITE.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/20 text-white">
                  <MapPin className="h-3.5 w-3.5" />
                </span>
                <span>{SITE.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 py-5">
        <div className="container-tight text-center text-xs text-white/60">
          © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
