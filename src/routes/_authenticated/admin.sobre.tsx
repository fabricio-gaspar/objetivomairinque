import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPageBySlug, updatePage } from "@/lib/cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImagePicker } from "@/components/admin/ImagePicker";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/sobre")({
  component: SobrePage,
});

type SobreContent = {
  hero_title: string;
  hero_eyebrow: string;
  intro_paragraphs: string;
  proposta_title: string;
  proposta_text: string;
  extra_title: string;
  extra_intro: string;
  extra_items: string;
  image_url: string;
};

const DEFAULTS: SobreContent = {
  hero_title: "Sobre Nós",
  hero_eyebrow: "Conheça um pouco da nossa história",
  intro_paragraphs: "",
  proposta_title: "Proposta Pedagógica",
  proposta_text: "",
  extra_title: "Atividade Extracurricular",
  extra_intro: "",
  extra_items: "Informática\nMusicalidade\nExpressão corporal\nEspanhol",
  image_url: "",
};

function SobrePage() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["page", "sobre"], queryFn: () => getPageBySlug("sobre") });
  const [f, setF] = useState<SobreContent>(DEFAULTS);
  const [title, setTitle] = useState("Sobre Nós");

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setF({ ...DEFAULTS, ...(data.content as Partial<SobreContent>) });
    }
  }, [data]);

  const onSave = async () => {
    try {
      await updatePage({ slug: "sobre", title, content: f as unknown as Record<string, unknown> });
      toast.success("Página Sobre salva.");
      qc.invalidateQueries({ queryKey: ["page", "sobre"] });
    } catch (e) { toast.error((e as Error).message); }
  };

  if (!data) return <div className="text-sm text-muted-foreground">Carregando… (se for a primeira vez, crie a página "sobre" via Páginas, ou apenas salve abaixo.)</div>;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-primary">Sobre</h1>
      <div className="mt-6 space-y-4 rounded-2xl border bg-card p-6 shadow-soft">
        <div><Label>Título da página (aba do navegador)</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
        <div><Label>Eyebrow (subtítulo do topo)</Label><Input value={f.hero_eyebrow} onChange={(e) => setF({ ...f, hero_eyebrow: e.target.value })} /></div>
        <div><Label>Título do topo</Label><Input value={f.hero_title} onChange={(e) => setF({ ...f, hero_title: e.target.value })} /></div>
        <div><Label>Imagem principal</Label><ImagePicker value={f.image_url} onChange={(v) => setF({ ...f, image_url: v })} /></div>
        <div><Label>Texto introdutório (parágrafos separados por linha em branco)</Label><Textarea rows={6} value={f.intro_paragraphs} onChange={(e) => setF({ ...f, intro_paragraphs: e.target.value })} /></div>
        <div><Label>Título Proposta</Label><Input value={f.proposta_title} onChange={(e) => setF({ ...f, proposta_title: e.target.value })} /></div>
        <div><Label>Texto Proposta</Label><Textarea rows={5} value={f.proposta_text} onChange={(e) => setF({ ...f, proposta_text: e.target.value })} /></div>
        <div><Label>Título Extracurricular</Label><Input value={f.extra_title} onChange={(e) => setF({ ...f, extra_title: e.target.value })} /></div>
        <div><Label>Intro Extracurricular</Label><Textarea rows={3} value={f.extra_intro} onChange={(e) => setF({ ...f, extra_intro: e.target.value })} /></div>
        <div><Label>Itens (um por linha)</Label><Textarea rows={5} value={f.extra_items} onChange={(e) => setF({ ...f, extra_items: e.target.value })} /></div>
        <Button onClick={onSave}>Salvar</Button>
      </div>
    </div>
  );
}
