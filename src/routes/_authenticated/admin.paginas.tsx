import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getAllPages } from "@/lib/cms.functions";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/paginas")({
  component: PagesList,
});

function PagesList() {
  const fetchPages = useServerFn(getAllPages);
  const { data, isLoading } = useQuery({ queryKey: ["pages"], queryFn: () => fetchPages() });

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-bold text-primary">Páginas</h1>
      <p className="mt-1 text-sm text-muted-foreground">Selecione uma página para editar seu conteúdo.</p>

      <div className="mt-6 divide-y rounded-2xl border bg-card shadow-soft">
        {isLoading && <div className="p-5 text-sm text-muted-foreground">Carregando…</div>}
        {data?.map((p) => (
          <Link key={p.slug} to="/admin/paginas/$slug" params={{ slug: p.slug }} className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-muted/50">
            <div>
              <div className="font-medium text-foreground">{p.title}</div>
              <div className="text-xs text-muted-foreground">/{p.slug === "home" ? "" : p.slug}</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        ))}
        {data && data.length === 0 && <div className="p-5 text-sm text-muted-foreground">Nenhuma página cadastrada.</div>}
      </div>
    </div>
  );
}
