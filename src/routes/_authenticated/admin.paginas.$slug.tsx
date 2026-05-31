import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getPageBySlug, updatePage } from "@/lib/cms.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/paginas/$slug")({
  component: PageEditor,
});

function PageEditor() {
  const { slug } = Route.useParams();
  const qc = useQueryClient();
  const fetchPage = useServerFn(getPageBySlug);
  const save = useServerFn(updatePage);
  const { data, isLoading } = useQuery({ queryKey: ["page", slug], queryFn: () => fetchPage({ data: { slug } }) });

  const [title, setTitle] = useState("");
  const [contentText, setContentText] = useState("{}");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContentText(JSON.stringify(data.content ?? {}, null, 2));
    }
  }, [data]);

  if (isLoading) return <div className="text-sm text-muted-foreground">Carregando…</div>;
  if (!data) return <div className="text-sm text-muted-foreground">Página não encontrada.</div>;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let parsed: unknown;
    try { parsed = JSON.parse(contentText); } catch (err) {
      setError("JSON inválido: " + (err as Error).message);
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await save({ data: { slug, title, content: parsed as never } });
      toast.success("Página salva.");
      qc.invalidateQueries({ queryKey: ["page", slug] });
      qc.invalidateQueries({ queryKey: ["pages"] });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/admin/paginas" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Voltar para páginas
      </Link>
      <h1 className="mt-3 font-display text-2xl font-bold text-primary">Editar: {data.title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">Slug: <code>{slug}</code></p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl border bg-card p-6 shadow-soft">
        <div className="space-y-1.5">
          <Label htmlFor="title">Título</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="content">Conteúdo (JSON)</Label>
          <Textarea
            id="content"
            value={contentText}
            onChange={(e) => setContentText(e.target.value)}
            rows={20}
            className="font-mono text-xs"
          />
          {error && <div className="text-xs text-destructive">{error}</div>}
          <p className="text-xs text-muted-foreground">
            O conteúdo é armazenado em formato livre (JSON). Esta versão inicial permite edição direta do JSON; em iterações futuras este editor pode ser substituído por campos visuais.
          </p>
        </div>
        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={saving}>{saving ? "Salvando…" : "Salvar"}</Button>
        </div>
      </form>
    </div>
  );
}
