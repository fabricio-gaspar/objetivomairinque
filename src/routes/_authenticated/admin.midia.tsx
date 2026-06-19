import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { listMedia, registerMedia, deleteMedia } from "@/lib/media";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/midia")({
  component: MediaPage,
});

function MediaPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["media"], queryFn: () => listMedia() });
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const onUpload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() ?? "bin";
      const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("site-media").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type || undefined,
      });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from("site-media").getPublicUrl(path);
      await registerMedia({ name: file.name, path, url: pub.publicUrl, mimeType: file.type, size: file.size });
      toast.success("Imagem enviada.");
      qc.invalidateQueries({ queryKey: ["media"] });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const onDelete = async (id: string, path: string) => {
    if (!confirm("Excluir esta imagem?")) return;
    try {
      await deleteMedia({ id, path });
      toast.success("Imagem excluída.");
      qc.invalidateQueries({ queryKey: ["media"] });
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    toast.success("URL copiada.");
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary">Mídia</h1>
          <p className="mt-1 text-sm text-muted-foreground">Envie e gerencie imagens. Use a URL pública nas páginas.</p>
        </div>
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
          />
          <Button onClick={() => fileRef.current?.click()} disabled={uploading}>
            <Upload className="mr-2 h-4 w-4" /> {uploading ? "Enviando…" : "Enviar imagem"}
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading && <div className="text-sm text-muted-foreground">Carregando…</div>}
        {data?.map((m) => (
          <div key={m.id} className="overflow-hidden rounded-2xl border bg-card shadow-soft">
            <div className="aspect-video bg-muted">
              {m.mime_type?.startsWith("image/") ? (
                <img src={m.url} alt={m.name} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center text-xs text-muted-foreground">{m.mime_type ?? "arquivo"}</div>
              )}
            </div>
            <div className="space-y-2 p-3">
              <div className="truncate text-sm font-medium" title={m.name}>{m.name}</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => copyUrl(m.url)}>
                  <Copy className="mr-1 h-3 w-3" /> URL
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDelete(m.id, m.path)}>
                  <Trash2 className="mr-1 h-3 w-3" /> Excluir
                </Button>
              </div>
            </div>
          </div>
        ))}
        {data && data.length === 0 && <div className="text-sm text-muted-foreground">Nenhuma imagem enviada ainda.</div>}
      </div>
    </div>
  );
}
