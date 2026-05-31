import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings, FileText, Image as ImageIcon } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminHome,
});

function AdminHome() {
  const cards = [
    { to: "/admin/configuracoes", title: "Configurações", desc: "Contato, WhatsApp, e-mail, endereço e portal.", icon: Settings },
    { to: "/admin/paginas", title: "Páginas", desc: "Edite o conteúdo das páginas do site.", icon: FileText },
    { to: "/admin/midia", title: "Mídia", desc: "Envie e gerencie imagens.", icon: ImageIcon },
  ] as const;
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-2xl font-bold text-primary">Bem-vindo</h1>
      <p className="mt-1 text-sm text-muted-foreground">Use os atalhos abaixo para gerenciar o site.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.to} to={c.to} className="group rounded-2xl border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elegant">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
              <div className="mt-3 font-display font-bold text-primary">{c.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
